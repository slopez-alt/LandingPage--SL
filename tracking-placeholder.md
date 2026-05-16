# Tracking & Conversions — Placeholder

> Este archivo documenta los placeholders de tracking pendientes de activar.
> No incluye IDs reales ni claves privadas.

---

## Google Analytics 4 (GA4)

Añadir antes del cierre de `</head>` en todas las páginas:

```html
<!-- Google Analytics 4 — activar con ID real -->
<!--
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
-->
```

Reemplazar `G-XXXXXXXXXX` con el Measurement ID de GA4.

---

## Google Tag Manager (GTM)

Alternativa preferida: usar GTM para centralizar todos los eventos.

```html
<!-- Google Tag Manager — activar con container ID -->
<!--
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
-->
```

Reemplazar `GTM-XXXXXXX` con el Container ID de GTM.

---

## Meta Pixel (Facebook / Instagram Ads)

```html
<!-- Meta Pixel — activar con Pixel ID real -->
<!--
<script>
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'XXXXXXXXXXXXXXXXX');
fbq('track', 'PageView');
</script>
-->
```

Reemplazar `XXXXXXXXXXXXXXXXX` con el Pixel ID real.

---

## Google Search Console

- Verificar dominio via DNS o HTML tag.
- No requiere código en el sitio si se verifica via DNS.
- Si se verifica via HTML meta tag:

```html
<!-- Google Search Console verification -->
<!--
<meta name="google-site-verification" content="XXXXXXXXXXXXXXXXXXX" />
-->
```

---

## Eventos de conversión recomendados

Una vez activado GA4 o GTM, implementar los siguientes eventos:

### Clic en WhatsApp
```javascript
// Agregar al link de WhatsApp (data attribute o listener)
document.querySelectorAll('a[href*="wa.me"]').forEach(el => {
  el.addEventListener('click', () => {
    gtag('event', 'whatsapp_click', { event_category: 'contact', event_label: 'floating_button' });
  });
});
```

### Clic en teléfono
```javascript
document.querySelectorAll('a[href^="tel:"]').forEach(el => {
  el.addEventListener('click', () => {
    gtag('event', 'phone_click', { event_category: 'contact' });
  });
});
```

### Clic en email
```javascript
document.querySelectorAll('a[href^="mailto:"]').forEach(el => {
  el.addEventListener('click', () => {
    gtag('event', 'email_click', { event_category: 'contact' });
  });
});
```

### Submit de formulario Tally
Tally tiene integración nativa con GA4 y GTM desde el dashboard de Tally.
No requiere código adicional si se configura desde el panel de Tally.

---

## Notas

- Todos los bloques de tracking están **desactivados** (comentados) hasta que se inserten IDs reales.
- No insertar IDs de prueba ni IDs de cuentas de terceros.
- Al activar, verificar que el sitio esté publicado en el dominio final antes de iniciar medición.
- Para clientes en Puerto Rico bajo HIPAA o privacidad, revisar términos antes de activar remarketing.

---

*Última actualización: 2026 · SL Accounting Services PR*
