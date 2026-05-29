#!/usr/bin/env python3
"""Patch Spanish blog pages with hreflang + language switcher."""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent.parent
BLOG = ROOT / "blog"
BASE = "https://accountingsl.com"


def patch_es_article(path: Path, slug: str) -> bool:
    text = path.read_text(encoding="utf-8")
    es_url = f"{BASE}/blog/{slug}/"
    en_url = f"{BASE}/blog/en/{slug}/"
    changed = False

    new_hreflang = (
        f'<link rel="alternate" hreflang="es-PR" href="{es_url}" />\n'
        f'<link rel="alternate" hreflang="en" href="{en_url}" />\n'
        f'<link rel="alternate" hreflang="x-default" href="{es_url}" />'
    )
    if en_url not in text:
        text, n = re.subn(
            r'<link rel="alternate" hreflang="es-PR" href="[^"]+" />\s*'
            r'<link rel="alternate" hreflang="en" href="[^"]+" />\s*'
            r'<link rel="alternate" hreflang="x-default" href="[^"]+" />',
            new_hreflang,
            text,
            count=1,
        )
        changed = changed or n > 0

    switch = (
        f'<p class="blog-lang-switch">'
        f'<a href="/blog/en/{slug}/" hreflang="en" lang="en">Read in English</a>'
        f"</p>"
    )
    if "blog-lang-switch" not in text:
        new_text, n = re.subn(
            r'(</nav>\s*\n)(\s*<div style="display:flex;align-items:center;gap:16px;margin-bottom:18px">)',
            r'\1      ' + switch + r'\2',
            text,
            count=1,
        )
        if n:
            text = new_text
            changed = True
        else:
            text = text.replace(
                '</nav>\n      <div style="display:flex;align-items:center;gap:16px;margin-bottom:18px">',
                f"</nav>\n      {switch}"
                '<div style="display:flex;align-items:center;gap:16px;margin-bottom:18px">',
                1,
            )
            changed = True

    if changed:
        path.write_text(text, encoding="utf-8")
    return changed


def patch_es_index(path: Path) -> bool:
    text = path.read_text(encoding="utf-8")
    es_url = f"{BASE}/blog/"
    en_url = f"{BASE}/blog/en/"
    changed = False

    if en_url not in text and 'hreflang="en"' in text:
        text = re.sub(
            r'(<link rel="alternate" hreflang="en" href=")[^"]+(" />)',
            rf"\1{en_url}\2",
            text,
            count=1,
        )
        changed = True

    switch = (
        '<p class="blog-lang-switch" style="margin-top:20px">'
        '<a href="/blog/en/" hreflang="en" lang="en">Read in English</a>'
        "</p>"
    )
    if "blog-lang-switch" not in text:
        marker = 'Información verificada con fuentes oficiales'
        if marker in text:
            text = text.replace(
                "contributivas en Puerto Rico.</p>\n    </div>",
                "contributivas en Puerto Rico.</p>\n      " + switch + "\n    </div>",
                1,
            )
            changed = True

    if changed:
        path.write_text(text, encoding="utf-8")
    return changed


def main():
    count = 0
    for path in sorted(BLOG.glob("*/index.html")):
        slug = path.parent.name
        if slug == "en":
            continue
        if slug == "index.html" or str(path) == str(BLOG / "index.html"):
            continue
        if patch_es_article(path, slug):
            count += 1
            print(f"patched ES: {slug}")

    index_path = BLOG / "index.html"
    if index_path.exists() and patch_es_index(index_path):
        count += 1
        print("patched ES: blog index")

    print(f"Done. {count} file(s) updated.")


if __name__ == "__main__":
    main()
