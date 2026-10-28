#!/usr/bin/env python3
"""Validate the built paper pages, citations, assets, and discovery links."""
import json
import sys
import xml.etree.ElementTree as ET
from datetime import datetime
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
    hub = Document((built / "research/index.html").read_text())
    require(hub.h1_count == 1, "Research hub: expected exactly one h1")
    require("/research/" in home.links and "/research/" in publications.links, "Research hub: missing discovery link")
    sitemap = ET.parse(built / "sitemap.xml")
    sitemap_urls = {node.findtext("{*}loc"): node for node in sitemap.findall("{*}url")}
    research_sitemap = ET.parse(built / "research-sitemap.xml")
    research_urls = {node.findtext("{*}loc"): node for node in research_sitemap.findall("{*}url")}
    require(len(research_urls) == len(papers), "Research sitemap: wrong page count")
    require("/research-sitemap.xml" in (built / "robots.txt").read_text(), "Research sitemap: absent from robots.txt")
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
        require(paper["path"] in hub.links and "/research/" in doc.links, f"{key}: missing research hub link")
        require(paper["image"] in hub.assets and paper["paper_url"] in hub.links, f"{key}: incomplete research hub resources")
        canonical = meta.canonicals[0]
        require(canonical in sitemap_urls and canonical in research_urls, f"{key}: absent from sitemap")
        lastmod = sitemap_urls[canonical].findtext("{*}lastmod")
        require(lastmod and lastmod == research_urls[canonical].findtext("{*}lastmod"), f"{key}: missing or inconsistent modification date")
        modified = datetime.fromisoformat(lastmod)
        require(modified.tzinfo and modified <= datetime.now(modified.tzinfo), f"{key}: future or ambiguous modification date")
        webpage = next(x for x in meta.schemas if x.get("@type") == "WebPage")
        require(webpage.get("mainEntity", {}).get("@id") == articles[0]["@id"], f"{key}: missing paper–explanation relationship")
        require(webpage.get("dateModified") == lastmod, f"{key}: inconsistent structured modification date")
        images = research_urls[canonical].findall("{http://www.google.com/schemas/sitemap-image/1.1}image/{http://www.google.com/schemas/sitemap-image/1.1}loc")
        image_paths = [urlsplit(node.text).path for node in images]
        require(len(image_paths) == len(set(image_paths)) and set(image_paths) == set(paper["images"]), f"{key}: incomplete or duplicate image sitemap")
        require(all(path in doc.assets for path in image_paths), f"{key}: sitemap image not present in page HTML")
        require(all(urlsplit(node.text).netloc == urlsplit(canonical).netloc for node in images), f"{key}: nonlocal sitemap image")
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
    print(f"Research checks passed for {len(papers)} paper pages, research hub, accurate sitemap dates, image discovery, metadata, and local assets.")


if __name__ == "__main__":
    try:
        main()
    except (ValueError, OSError, KeyError, ET.ParseError, StopIteration, IndexError) as error:
        sys.exit(f"Research check failed: {error}")
