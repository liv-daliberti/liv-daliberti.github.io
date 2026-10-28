#!/usr/bin/env python3
"""Validate the built paper pages, citations, assets, and discovery links."""
import json
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit

sys.path.insert(0, str(Path(__file__).parent))
from importlib import import_module

Metadata = import_module("check-seo").Metadata


class Document(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.h1_count = 0
        self.assets = []
        self.links = []
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "h1":
            self.h1_count += 1
        if tag in {"img", "script"} and attrs.get("src", "").startswith("/"):
            self.assets.append(attrs["src"])
        if tag == "a":
            self.links.append(attrs.get("href", ""))


def require(value, message):
    if not value:
        raise ValueError(message)


def main():
    source = Path(__file__).resolve().parents[1]
    built = Path(sys.argv[1] if len(sys.argv) > 1 else "_site")
    papers = json.loads((source / "_data/research.json").read_text())
    publications = Document((built / "publications/index.html").read_text())
    home = Document((built / "index.html").read_text())
    sitemap = (built / "sitemap.xml").read_text()
    for key, paper in papers.items():
        text = (built / paper["path"].strip("/") / "index.html").read_text()
        meta, doc = Metadata(text), Document(text)
        require(doc.h1_count == 1, f"{key}: expected exactly one h1")
        require(meta.metas.get("citation_title") == [paper["title"]], f"{key}: wrong paper title")
        require(meta.metas.get("citation_author") == paper["authors"], f"{key}: missing or reordered authors")
        require(meta.metas.get("citation_publication_date") == [str(paper["year"])], f"{key}: incorrect publication year")
        articles = [x for x in meta.schemas if x.get("@type") == "ScholarlyArticle"]
        require(len(articles) == 1, f"{key}: missing scholarly article entity")
        require(articles[0]["abstract"] == paper["abstract"], f"{key}: abstract mismatch")
        require(len(articles[0]["author"]) == len(paper["authors"]), f"{key}: author schema mismatch")
        require(paper["path"] in publications.links and paper["path"] in home.links, f"{key}: missing discovery link")
        require(paper["path"] in sitemap, f"{key}: absent from sitemap")
        for asset in doc.assets:
            require((built / urlsplit(asset).path.lstrip("/")).is_file(), f"{key}: missing asset {asset}")
        for resource in paper["resources"]:
            require(resource["url"] in doc.links, f"{key}: missing resource link")
        if paper.get("local_pdf"):
            pdf = built / paper["local_pdf"].lstrip("/")
            require(pdf.read_bytes().startswith(b"%PDF"), f"{key}: invalid PDF")
            require(pdf.stat().st_size < 5_000_000, f"{key}: PDF exceeds Scholar size guidance")
            require(urlsplit(meta.metas["citation_pdf_url"][0]).path == paper["local_pdf"], f"{key}: incorrect PDF metadata")
        else:
            require("citation_pdf_url" not in meta.metas, f"{key}: unhosted PDF declared as local")
        require("{{" not in text and "{%" not in text, f"{key}: unrendered Liquid")
    print(f"Research checks passed for {len(papers)} paper pages, publication/home links, metadata, and local assets.")


if __name__ == "__main__":
    try:
        main()
    except (ValueError, OSError, KeyError) as error:
        sys.exit(f"Research check failed: {error}")
