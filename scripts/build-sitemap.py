#!/usr/bin/env python3
"""Genera sitemap.xml desde el filesystem.

- Páginas ES sin versión EN: alternates es-PR + x-default (self).
- Artículos de blog con versión EN: alternates bidireccionales es-PR / en / x-default (ES).
- lastmod: fecha del último commit de git que tocó el archivo (fallback: hoy).

Uso: python3 scripts/build-sitemap.py
"""
import subprocess
import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BASE = "https://accountingsl.com"

def lastmod(path: Path) -> str:
    try:
        out = subprocess.run(
            ["git", "log", "-1", "--format=%cs", "--", str(path.relative_to(ROOT))],
            cwd=ROOT, capture_output=True, text=True, check=True,
        ).stdout.strip()
        if out:
            return out
    except Exception:
        pass
    return datetime.date.today().isoformat()

# (ruta URL, archivo, prioridad, changefreq)
STATIC = [
    ("/",                                                "index.html",                                              "1.0",  "monthly"),
    ("/servicios/",                                      "servicios/index.html",                                    "0.9",  "monthly"),
    ("/contabilidad-mensual-corporaciones/",             "contabilidad-mensual-corporaciones/index.html",           "0.9",  "monthly"),
    ("/clientes-atrasados/",                             "clientes-atrasados/index.html",                           "0.85", "monthly"),
    ("/contable-en-puerto-rico/",                        "contable-en-puerto-rico/index.html",                      "0.85", "monthly"),
    ("/nosotros/",                                       "nosotros/index.html",                                     "0.7",  "monthly"),
    ("/contacto/",                                       "contacto/index.html",                                     "0.8",  "monthly"),
    ("/herramientas/calculadora-alivio-contributivo-2025/", "herramientas/calculadora-alivio-contributivo-2025/index.html", "0.8", "yearly"),
    ("/herramientas/calendario-contributivo-pr/",        "herramientas/calendario-contributivo-pr/index.html",      "0.8",  "monthly"),
]

def url_entry(loc, lm, priority, changefreq, alternates=None):
    lines = [f"  <url>", f"    <loc>{BASE}{loc}</loc>", f"    <lastmod>{lm}</lastmod>",
             f"    <changefreq>{changefreq}</changefreq>", f"    <priority>{priority}</priority>"]
    for hreflang, href in (alternates or []):
        lines.append(f'    <xhtml:link rel="alternate" hreflang="{hreflang}" href="{BASE}{href}"/>')
    lines.append("  </url>")
    return "\n".join(lines)

entries = []

for loc, f, prio, freq in STATIC:
    alts = [("es-PR", loc), ("x-default", loc)]
    entries.append(url_entry(loc, lastmod(ROOT / f), prio, freq, alts))

# Índices del blog (bilingües reales)
blog_alts = [("es-PR", "/blog/"), ("en", "/blog/en/"), ("x-default", "/blog/")]
entries.append(url_entry("/blog/", lastmod(ROOT / "blog/index.html"), "0.8", "weekly", blog_alts))
entries.append(url_entry("/blog/en/", lastmod(ROOT / "blog/en/index.html"), "0.8", "weekly", blog_alts))

# Artículos
es_dir = ROOT / "blog"
for art in sorted(p for p in es_dir.iterdir() if p.is_dir() and p.name != "en" and (p / "index.html").exists()):
    slug = art.name
    es_loc = f"/blog/{slug}/"
    en_file = ROOT / "blog" / "en" / slug / "index.html"
    if en_file.exists():
        en_loc = f"/blog/en/{slug}/"
        alts = [("es-PR", es_loc), ("en", en_loc), ("x-default", es_loc)]
        entries.append(url_entry(es_loc, lastmod(art / "index.html"), "0.75", "monthly", alts))
        entries.append(url_entry(en_loc, lastmod(en_file), "0.75", "monthly", alts))
    else:
        alts = [("es-PR", es_loc), ("x-default", es_loc)]
        entries.append(url_entry(es_loc, lastmod(art / "index.html"), "0.75", "monthly", alts))

xml = ('<?xml version="1.0" encoding="UTF-8"?>\n'
       '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n'
       '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n\n'
       + "\n\n".join(entries) + "\n\n</urlset>\n")

(ROOT / "sitemap.xml").write_text(xml, encoding="utf-8")
print(f"sitemap.xml generado — {len(entries)} URLs")
