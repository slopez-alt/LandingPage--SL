#!/usr/bin/env python3
"""Fix broken hreflang en links in ES blog pages."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

FIXES = {
    ROOT / "blog/index.html": (
        'hreflang="en"    href="https://accountingsl.com/blog/"',
        'hreflang="en" href="https://accountingsl.com/blog/en/"',
    ),
}

BLOG_ES = ROOT / "blog"
for path in BLOG_ES.glob("*/index.html"):
    slug = path.parent.name
    if slug == "en":
        continue
    en_path = ROOT / "blog" / "en" / slug / "index.html"
    if not en_path.exists():
        continue
    wrong = f'hreflang="en"    href="https://accountingsl.com/blog/{slug}/"'
    right = f'hreflang="en" href="https://accountingsl.com/blog/en/{slug}/"'
    FIXES[path] = (wrong, right)

for path, (old, new) in FIXES.items():
    text = path.read_text(encoding="utf-8")
    if old not in text:
        print(f"SKIP (pattern missing): {path.relative_to(ROOT)}")
        continue
    path.write_text(text.replace(old, new, 1), encoding="utf-8")
    print(f"OK: {path.relative_to(ROOT)}")
