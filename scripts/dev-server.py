#!/usr/bin/env python3
"""Servidor estático local para previsualizar el sitio (solo desarrollo).

Uso:  python3 scripts/dev-server.py [puerto]      (por defecto 4173)
Luego abre http://127.0.0.1:4173

Sirve la raíz del repositorio para que las rutas absolutas (/assets/...)
resuelvan igual que en producción. No se usa ni se despliega en GitHub Pages.
"""
import functools, http.server, socketserver, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 4173

Handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=ROOT)
socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("127.0.0.1", PORT), Handler) as httpd:
    print(f"Sirviendo {ROOT} en http://127.0.0.1:{PORT}", flush=True)
    httpd.serve_forever()
