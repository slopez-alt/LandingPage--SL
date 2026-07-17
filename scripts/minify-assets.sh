#!/bin/zsh
# Regenera los assets minificados que sirven las páginas.
# Editar SIEMPRE los fuentes (styles.css / main.js / tax-calendar-pr-rules.js)
# y luego correr:  zsh scripts/minify-assets.sh
set -e
cd "$(dirname "$0")/.."
npx -y esbuild assets/css/styles.css --minify --outfile=assets/css/styles.min.css
npx -y esbuild assets/js/main.js --minify --outfile=assets/js/main.min.js
npx -y esbuild assets/js/tax-calendar-pr-rules.js --minify --outfile=assets/js/tax-calendar-pr-rules.min.js
echo "Minificados:"
ls -la assets/css/styles.min.css assets/js/main.min.js assets/js/tax-calendar-pr-rules.min.js
