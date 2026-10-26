#!/usr/bin/env python3
"""Check crawler-facing files in the built site before deployment."""

import json
import sys
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse
from urllib.robotparser import RobotFileParser


class Metadata(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.titles = []
        self.metas = {}
        self.canonicals = []
        self.schemas = []
        self.capture = None
        self.buffer = []
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "title" or (
            tag == "script" and attrs.get("type") == "application/ld+json"
        ):
            self.capture = tag
            self.buffer = []
        if tag == "meta":
            name = attrs.get("name", attrs.get("property", ""))
            self.metas.setdefault(name, []).append(attrs.get("content", ""))
        if tag == "link" and "canonical" in attrs.get("rel", "").split():
            self.canonicals.append(attrs.get("href"))

    def handle_data(self, data):
        if self.capture:
            self.buffer.append(data)

    def handle_endtag(self, tag):
        if tag == self.capture:
            value = "".join(self.buffer)
            if tag == "title":
                self.titles.append(value.strip())
            else:
                self.schemas.append(json.loads(value))
            self.capture = None


def check(condition, message):
    if not condition:
        raise ValueError(message)


def main():
    site = Path(sys.argv[1] if len(sys.argv) > 1 else "_site")
    urls = [node.text for node in ET.parse(site / "sitemap.xml").findall("{*}url/{*}loc")]
    check(urls and len(urls) == len(set(urls)), "Sitemap is empty or has duplicate URLs")
    homes = [url for url in urls if urlparse(url).path == "/"]
    check(len(homes) == 1, "Sitemap must include exactly one homepage")
    home = homes[0]
    origin = urlparse(home)
    robots = RobotFileParser()
    robots.parse((site / "robots.txt").read_text().splitlines())
    check(home + "sitemap.xml" in (robots.site_maps() or []), "robots.txt lost its sitemap directive")

    for url in urls:
        parsed = urlparse(url)
        check(parsed.scheme == "https" and parsed.netloc == origin.netloc, f"Invalid sitemap URL: {url}")
        check(not parsed.query and not parsed.fragment, f"Noncanonical sitemap URL: {url}")
        path = unquote(parsed.path).lstrip("/")
        check(not path.startswith(("assets/", "google")) and path != "404.html", f"Utility file in sitemap: {url}")
        check(robots.can_fetch("Googlebot", url), f"Googlebot is blocked: {url}")
        file = site / path
        if parsed.path.endswith("/"):
            file /= "index.html"
        doc = Metadata(file.read_text())
        check(len(doc.titles) == 1 and doc.titles[0], f"Missing or duplicate title: {url}")
        descriptions = doc.metas.get("description", [])
        check(len(descriptions) == 1 and descriptions[0].strip(), f"Missing or duplicate description: {url}")
        check(doc.canonicals == [url], f"Incorrect canonical URL: {url}")
        check("noindex" not in ",".join(doc.metas.get("robots", [])), f"Nonindexable page in sitemap: {url}")
        check(doc.schemas, f"Missing structured data: {url}")
        if url == home:
            website = [data for data in doc.schemas if data.get("@type") == "WebSite"]
            profile = [data for data in doc.schemas if data.get("@type") == "ProfilePage"]
            check(len(website) == 1 and website[0].get("url") == home, "Invalid WebSite markup")
            check(website[0].get("name"), "Missing website name")
            check(len(profile) == 1 and profile[0]["mainEntity"]["@type"] == "Person", "Invalid profile markup")
            check(profile[0]["mainEntity"].get("sameAs"), "Missing profile identity links")
        else:
            check(all(data.get("@type") != "ProfilePage" for data in doc.schemas), f"Wrong profile markup: {url}")
        for data in doc.schemas:
            if data.get("@type") == "BlogPosting":
                check(data.get("datePublished") and data.get("author"), f"Incomplete article markup: {url}")

    error_page = Metadata((site / "404.html").read_text())
    check("noindex" in ",".join(error_page.metas.get("robots", [])), "404 page should have noindex")
    print(f"SEO checks passed for {len(urls)} sitemap pages, robots.txt, and the 404 page.")


if __name__ == "__main__":
    try:
        main()
    except (ValueError, OSError, KeyError, ET.ParseError) as error:
        sys.exit(f"SEO check failed: {error}")
