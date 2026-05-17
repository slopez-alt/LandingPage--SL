
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
      document.dispatchEvent(new CustomEvent('sl:langchange', { detail: { lang: lang } }));
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

  // -------- NAV DROPDOWN: HERRAMIENTAS --------
  (function(){
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    if (!dropdowns.length) return;

    function closeAll(except){
      dropdowns.forEach(function(drop){
        if (drop === except) return;
        drop.classList.remove('open');
        const btn = drop.querySelector('.nav-drop-toggle');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
    }

    dropdowns.forEach(function(drop){
      const btn = drop.querySelector('.nav-drop-toggle');
      if (!btn) return;
      btn.addEventListener('click', function(e){
        e.preventDefault();
        const open = !drop.classList.contains('open');
        closeAll(drop);
        drop.classList.toggle('open', open);
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      drop.querySelectorAll('a').forEach(function(link){
        link.addEventListener('click', function(){
          drop.classList.remove('open');
          btn.setAttribute('aria-expanded', 'false');
        });
      });
    });

    document.addEventListener('click', function(e){
      if (!e.target.closest('.nav-dropdown')) closeAll();
    });
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape') closeAll();
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

  // -------- 2025 TAX RELIEF CALCULATOR --------
  (function(){
    const form = document.getElementById('reliefCalculator');
    if (!form) return;

    const filingStatusDeductions = {
      single: {
        label: 'Soltero',
        enLabel: 'Single',
        deduction: 3500,
      },
      married: {
        label: 'Casado',
        enLabel: 'Married',
        deduction: 7000,
      },
    };

    const currentRates2025 = [
      { min: 0, max: 9000, baseTax: 0, rate: 0, excessOver: 0 },
      { min: 9001, max: 25000, baseTax: 0, rate: 0.07, excessOver: 9000 },
      { min: 25001, max: 41500, baseTax: 1120, rate: 0.14, excessOver: 25000 },
      { min: 41501, max: 61500, baseTax: 3430, rate: 0.25, excessOver: 41500 },
      { min: 61501, max: Infinity, baseTax: 8430, rate: 0.33, excessOver: 61500 },
    ];

    const proposedRates2025 = [
      { min: 0, max: 12500, baseTax: 0, rate: 0, excessOver: 0 },
      { min: 12501, max: 25000, baseTax: 0, rate: 0.06, excessOver: 12500 },
      { min: 25001, max: 50000, baseTax: 750, rate: 0.12, excessOver: 25000 },
      { min: 50001, max: 100000, baseTax: 3750, rate: 0.24, excessOver: 50000 },
      { min: 100001, max: 150000, baseTax: 15750, rate: 0.29, excessOver: 100000 },
      { min: 150001, max: Infinity, baseTax: 30250, rate: 0.33, excessOver: 150000 },
    ];

    function parseMoney(value){
      const parsed = Number(value);
      return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
    }

    function calculateTax(netIncome, rates){
      const bracket = rates.find(function(rate){
        return netIncome >= rate.min && netIncome <= rate.max;
      }) || rates[rates.length - 1];
      return Math.max(0, bracket.baseTax + ((netIncome - bracket.excessOver) * bracket.rate));
    }

    function getCurrentLang(){
      return document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'es';
    }

    function formatCurrency(value){
      return new Intl.NumberFormat(getCurrentLang() === 'en' ? 'en-US' : 'es-PR', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(value || 0);
    }

    function formatPercent(value){
      return new Intl.NumberFormat(getCurrentLang() === 'en' ? 'en-US' : 'es-PR', {
        style: 'percent',
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }).format(value || 0);
    }

    function calculateReliefEstimate(input){
      const grossIncome = parseMoney(input.grossIncome);
      const status = filingStatusDeductions[input.filingStatus] || filingStatusDeductions.single;
      const dependents = Math.max(0, Math.floor(parseMoney(input.dependents)));
      const otherDeductions = parseMoney(input.otherDeductions);
      const personalDeduction = status.deduction;

      const currentDeductions = personalDeduction + (dependents * 2500) + otherDeductions;
      const proposedDeductions = personalDeduction + (dependents * 5000) + otherDeductions;

      const currentNetIncome = Math.max(0, grossIncome - currentDeductions);
      const proposedNetIncome = Math.max(0, grossIncome - proposedDeductions);

      const currentTaxBeforeDiscount = calculateTax(currentNetIncome, currentRates2025);
      const currentTax = currentTaxBeforeDiscount * 0.92;
      const proposedTax = calculateTax(proposedNetIncome, proposedRates2025);
      const estimatedRelief = Math.max(0, currentTax - proposedTax);

      return {
        grossIncome,
        filingStatusLabel: status.label,
        filingStatusEnLabel: status.enLabel,
        dependents,
        currentNetIncome,
        proposedNetIncome,
        currentTax,
        proposedTax,
        estimatedRelief,
        effectiveRateCurrent: grossIncome > 0 ? currentTax / grossIncome : 0,
        effectiveRateProposed: grossIncome > 0 ? proposedTax / grossIncome : 0,
      };
    }

    const outputIds = [
      'currentNetIncome',
      'proposedNetIncome',
      'currentTax',
      'proposedTax',
      'estimatedRelief',
      'effectiveRateCurrent',
      'effectiveRateProposed',
    ];
    const outputs = outputIds.reduce(function(map, id){
      map[id] = document.getElementById(id);
      return map;
    }, {});
    const results = document.querySelector('.calc-results');
    const whatsappLinks = [
      document.getElementById('reliefWhatsapp'),
      document.getElementById('reliefWhatsappBottom'),
    ].filter(Boolean);

    function updateCalculator(){
      const estimate = calculateReliefEstimate({
        grossIncome: form.grossIncome.value,
        filingStatus: form.filingStatus.value,
        dependents: form.dependents.value,
        otherDeductions: form.otherDeductions.value,
      });

      if (results) {
        results.classList.add('updating');
        window.setTimeout(function(){ results.classList.remove('updating'); }, 160);
      }

      if (outputs.currentNetIncome) outputs.currentNetIncome.textContent = formatCurrency(estimate.currentNetIncome);
      if (outputs.proposedNetIncome) outputs.proposedNetIncome.textContent = formatCurrency(estimate.proposedNetIncome);
      if (outputs.currentTax) outputs.currentTax.textContent = formatCurrency(estimate.currentTax);
      if (outputs.proposedTax) outputs.proposedTax.textContent = formatCurrency(estimate.proposedTax);
      if (outputs.estimatedRelief) outputs.estimatedRelief.textContent = formatCurrency(estimate.estimatedRelief);
      if (outputs.effectiveRateCurrent) outputs.effectiveRateCurrent.textContent = formatPercent(estimate.effectiveRateCurrent);
      if (outputs.effectiveRateProposed) outputs.effectiveRateProposed.textContent = formatPercent(estimate.effectiveRateProposed);

      const lang = getCurrentLang();
      const message = lang === 'en'
        ? 'Hello, I completed the 2025 tax relief calculator. My approximate income is ' +
          formatCurrency(estimate.grossIncome) +
          ', filing status ' + estimate.filingStatusEnLabel +
          ', dependents ' + estimate.dependents +
          ', and the estimated relief was ' + formatCurrency(estimate.estimatedRelief) +
          '. I want to validate whether it applies to my case.'
        : 'Hola, completé la calculadora de alivio contributivo 2025. Mi ingreso aproximado es ' +
          formatCurrency(estimate.grossIncome) +
          ', estado civil ' + estimate.filingStatusLabel +
          ', dependientes ' + estimate.dependents +
          ', y el alivio estimado fue ' + formatCurrency(estimate.estimatedRelief) +
          '. Quiero validar si aplica a mi caso.';
      const href = 'https://wa.me/17879617041?text=' + encodeURIComponent(message);
      whatsappLinks.forEach(function(link){ link.href = href; });
    }

    form.addEventListener('input', updateCalculator);
    form.addEventListener('change', updateCalculator);
    document.addEventListener('sl:langchange', updateCalculator);
    updateCalculator();
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
