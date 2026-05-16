# SL Accounting Services PR — Website

Sitio web estático multipágina para SL Accounting Services PR.  
Contabilidad, planillas, cumplimiento contributivo y organización financiera en Puerto Rico.

---

## Tecnología

- HTML5 · CSS3 · JavaScript vanilla
- Sin frameworks, sin bundlers, sin dependencias npm
- Fuentes: Google Fonts (Instrument Serif · Geist · JetBrains Mono)
- Formulario de contacto: [Tally.so](https://tally.so) embed
- WhatsApp: wa.me link directo
- Compatible con hosting estático (Netlify · Vercel · GitHub Pages · cPanel · Hostinger)

---

## Estructura del proyecto

```
/
├── index.html                  ← Página principal (Home)
├── servicios.html              ← Servicios contables y contributivos
├── clientes-atrasados.html     ← Landing para clientes con atrasos
├── nosotros.html               ← Sobre la práctica y Steven López Díaz
├── contacto.html               ← Formulario de contacto y evaluación inicial
├── privacy.html                ← Política de privacidad
├── terms.html                  ← Términos de uso
├── assets/
│   ├── css/
│   │   └── styles.css          ← Hoja de estilos global
│   └── js/
│       └── main.js             ← Lógica JavaScript (animaciones, bilingual toggle, scroll)
├── README.md                   ← Este archivo
├── .gitignore                  ← Archivos a excluir del repositorio
└── tracking-placeholder.md     ← Documentación de tracking pendiente (ver sección)
```

---

## Páginas principales

| Página | Archivo | Descripción |
|---|---|---|
| Home | `index.html` | Hero, para quién, servicios, proceso, trust, CTA |
| Servicios | `servicios.html` | Áreas de práctica, paquetes mensuales, proceso |
| Clientes atrasados | `clientes-atrasados.html` | Landing de conversión para clientes con atrasos |
| Nosotros | `nosotros.html` | Sobre la práctica y el profesional |
| Contacto | `contacto.html` | Formulario Tally, FAQ, datos de contacto |
| Privacidad | `privacy.html` | Política de privacidad (ES/EN) |
| Términos | `terms.html` | Términos de uso (ES/EN) |

---

## Datos de contacto (actuales)

- **Email:** info@accountingsl.com
- **Teléfono:** +1 (787) 961-7041
- **WhatsApp:** https://wa.me/17879617041
- **Ubicación:** Puerto Rico · Servicio remoto

> Para cambiar el número de teléfono o WhatsApp, buscar y reemplazar globalmente:
> - `787-961-7041` (texto visible)
> - `tel:+17879617041` (enlaces tel:)
> - `wa.me/17879617041` (enlaces WhatsApp)

---

## Cómo editar textos básicos

1. Abrir el archivo HTML de la página a editar.
2. Los textos en español están directamente en el contenido HTML.
3. Los textos en inglés están en atributos `data-en` o `data-en-html` del mismo elemento.
4. El toggle de idioma ES/EN funciona automáticamente con `main.js`.

Ejemplo:
```html
<h2 data-en="Our services">Nuestros servicios</h2>
<p data-en="Monthly bookkeeping and compliance.">Bookkeeping mensual y cumplimiento.</p>
```

---

## Sistema bilingüe (ES/EN)

- Atributo `data-en` → texto plano en inglés
- Atributo `data-en-html` → HTML en inglés (para links, spans, etc.)
- El toggle activa/desactiva la clase en el botón de idioma del header
- El estado de idioma se guarda en `localStorage`

---

## Formulario de contacto (Tally)

- El formulario está embebido con `<iframe>` de Tally.so
- ID del formulario: `kdJ6rM` (embed: `https://tally.so/embed/kdJ6rM`)
- Para cambiar el formulario: actualizar el atributo `data-tally-src` en `contacto.html`
- No incluir información sensible (SSN, EIN, documentos contributivos) en el formulario

---

## Cómo correr localmente

```bash
cd "WEB SL ACCOUNTING"
python3 -m http.server 8000
```

Luego abrir: http://localhost:8000

---

## Cómo subir a hosting estático

### Netlify / Vercel
1. Crear cuenta en netlify.com o vercel.com
2. Arrastrar la carpeta del proyecto o conectar repositorio de GitHub
3. El sitio se publica automáticamente
4. Configurar dominio custom (accountingsl.com) en el panel

### GitHub Pages
1. Crear repositorio en GitHub
2. Subir todos los archivos
3. Activar GitHub Pages desde Settings → Pages → Branch: main → /root
4. El sitio estará en `https://usuario.github.io/repositorio`

### cPanel / Hostinger / GoDaddy
1. Comprimir los archivos de producción
2. Subir via FTP o administrador de archivos al directorio `public_html`
3. Asegurarse de que `index.html` esté en la raíz

---

## Cómo subir a GitHub

```bash
git init
git add .
git commit -m "Initial commit — SL Accounting Services PR v2"
git branch -M main
git remote add origin https://github.com/usuario/sl-accounting-web.git
git push -u origin main
```

---

## Tracking pendiente

Ver `tracking-placeholder.md` para instrucciones sobre:
- Google Analytics 4
- Google Tag Manager
- Meta Pixel
- Google Search Console
- Eventos de conversión (WhatsApp, teléfono, email, formulario)

> **Importante:** No hay IDs de tracking activos. Ver el archivo antes de publicar si desea medir conversiones.

---

## Notas importantes

- **No incluir** en el formulario inicial: SSN, EIN completo, documentos contributivos, contraseñas.
- **Estados financieros personales** preparados no son auditados ni certificados por CPA salvo que se indique expresamente.
- El sitio **no declara** ser firma de CPA a menos que se indique por escrito.
- El contenido es de carácter general y no constituye asesoría profesional específica.
- Cualquier servicio profesional requiere evaluación, aceptación y acuerdo de alcance.

---

## Mantenimiento

Para actualizar cualquier dato recurrente:

| Dato | Buscar y reemplazar en |
|---|---|
| Teléfono | Todos los HTML |
| Email | Todos los HTML |
| Año en footer | Todos los HTML (`© 2026`) |
| URL canónica | Meta `canonical` en cada página |
| Formulario Tally | `data-tally-src` en `contacto.html` |

---

*SL Accounting Services PR · Puerto Rico · 2026*
