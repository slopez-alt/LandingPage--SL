
  // Reveal-on-scroll
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}
    });
  },{threshold:.05, rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('[data-anim]').forEach(el=>io.observe(el));


  // Single-open FAQ
  document.querySelectorAll('details.q').forEach(d=>{
    d.addEventListener('toggle',()=>{
      if(d.open){
        document.querySelectorAll('details.q').forEach(o=>{ if(o!==d) o.removeAttribute('open'); });
      }
    });
  });


  // -------- LANGUAGE TOGGLE (ES / EN) --------
  (function(){
    const TOGGLE = document.getElementById('langToggle');
    if (!TOGGLE) return;

    const targets = document.querySelectorAll('[data-en], [data-en-html]');
    targets.forEach(el => {
      if (el.hasAttribute('data-en-html')) {
        el.setAttribute('data-es-html', el.innerHTML);
      } else {
        el.setAttribute('data-es', el.textContent);
      }
    });

    // Placeholders on inputs
    const phTargets = document.querySelectorAll('[data-en-placeholder]');

    function setLang(lang){
      document.documentElement.setAttribute('lang', lang);
      targets.forEach(el => {
        if (el.hasAttribute('data-en-html')) {
          el.innerHTML = el.getAttribute(lang === 'en' ? 'data-en-html' : 'data-es-html');
        } else {
          el.textContent = el.getAttribute(lang === 'en' ? 'data-en' : 'data-es');
        }
      });
      phTargets.forEach(el => {
        el.placeholder = el.getAttribute(lang === 'en' ? 'data-en-placeholder' : 'data-es-placeholder') || '';
      });
      document.querySelectorAll('.lang span[data-l]').forEach(s => {
        s.classList.toggle('on', s.getAttribute('data-l') === lang);
      });
      try { localStorage.setItem('sl_lang', lang); } catch(e) {}
    }

    let current = 'es';
    try {
      const stored = localStorage.getItem('sl_lang');
      if (stored === 'en' || stored === 'es') current = stored;
    } catch(e) {}
    if (current === 'en') setLang('en');

    TOGGLE.addEventListener('click', () => {
      current = (current === 'es') ? 'en' : 'es';
      setLang(current);
    });
  })();

  // -------- MOBILE MENU --------
  (function(){
    const toggle = document.querySelector('.menu-toggle');
    const nav    = document.querySelector('.nav-links');
    if(!toggle || !nav) return;
    toggle.addEventListener('click', function(){
      const open = nav.classList.toggle('mob-open');
      toggle.setAttribute('aria-expanded', open);
    });
    // close on link click
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        nav.classList.remove('mob-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
    // close on outside click
    document.addEventListener('click', function(e){
      if(!e.target.closest('.nav') && nav.classList.contains('mob-open')){
        nav.classList.remove('mob-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  })();

  // -------- HEADER SCROLL STATE --------
  // Adds .scrolled class when user has scrolled past 10px —
  // triggers stronger background + subtle shadow via CSS.
  (function(){
    var header = document.querySelector('header.site');
    if (!header) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // On reduced-motion, just always show the solid state
      header.classList.add('scrolled');
      return;
    }
    var scrolled = false;
    var raf = null;
    function update() {
      var should = window.scrollY > 10;
      if (should !== scrolled) {
        scrolled = should;
        header.classList.toggle('scrolled', scrolled);
      }
      raf = null;
    }
    window.addEventListener('scroll', function() {
      if (!raf) raf = requestAnimationFrame(update);
    }, { passive: true });
    update();
  })();

  // -------- HOVER LIGHT TRACKING — Solo elementos clickeables (desktop) --------
  // Fase 1: eliminado de .pq-item y .proc (elementos informativos, no clickeables).
  // Mantenido únicamente en .ct y .case que son tarjetas de clientes/casos.
  (function(){
    if (!window.matchMedia('(hover: hover)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var GOLD_GRADIENT = 'rgba(200,169,106,.07)';
    var selectors = '.ct, .case';

    document.querySelectorAll(selectors).forEach(function(card) {
      card.addEventListener('mousemove', function(e) {
        var rect = card.getBoundingClientRect();
        var x = ((e.clientX - rect.left) / rect.width) * 100;
        var y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.background = 'radial-gradient(circle at ' + x + '% ' + y + '%, ' + GOLD_GRADIENT + ', transparent 65%)';
      });
      card.addEventListener('mouseleave', function() {
        card.style.background = '';
      });
    });
  })();

  // -------- DATA-REVEAL OBSERVER (complementa data-anim para nuevos elementos) --------
  (function(){
    var reveals = document.querySelectorAll('[data-reveal]');
    if (!reveals.length) return;
    var revealObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          revealObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    reveals.forEach(function(el) { revealObserver.observe(el); });
  })();
