
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

    function closeDropdowns(){
      nav.querySelectorAll('.nav-dropdown.open').forEach(function(drop){
        drop.classList.remove('open');
        const btn = drop.querySelector('.nav-drop-toggle');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
    }

    toggle.addEventListener('click', function(){
      const open = nav.classList.toggle('mob-open');
      toggle.setAttribute('aria-expanded', open);
      if (!open) closeDropdowns();
    });
    // close on link click
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        nav.classList.remove('mob-open');
        closeDropdowns();
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
    // close on outside click
    document.addEventListener('click', function(e){
      if(!e.target.closest('.nav') && nav.classList.contains('mob-open')){
        nav.classList.remove('mob-open');
        closeDropdowns();
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

  // -------- PR TAX CALENDAR RULE ENGINE --------
  (function(){
    const root = document.querySelector('[data-tax-calendar]');
    if (!root) return;

    const calendarData = window.SL_TAX_CALENDAR_PR || {};
    const taxCalendarRules = calendarData.taxCalendarRules || [];
    const sourceObligationChecklist = calendarData.sourceObligationChecklist || [];
    const validateCalendarRulesCompleteness = calendarData.validateCalendarRulesCompleteness || function(){
      return { sourceCount: 0, loadedCount: 0, missingCount: 0, duplicateCount: 0, requiresReviewCount: 0, confirmedSourceCount: 0, pendingSourceCount: 0, missing: [], duplicates: [] };
    };
    const validation = validateCalendarRulesCompleteness(sourceObligationChecklist, taxCalendarRules);
    console.info('Calendar Rules Validation:', validation);

    const els = {
      nextTitle: document.getElementById('calendarNextTitle'),
      nextDate: document.getElementById('calendarNextDate'),
      next7: document.getElementById('calendarNext7'),
      next30: document.getElementById('calendarNext30'),
      thisMonth: document.getElementById('calendarThisMonth'),
      requiresReview: document.getElementById('calendarRequiresReview'),
      pendingSources: document.getElementById('calendarPendingSources'),
      agencySummary: document.getElementById('calendarAgencySummary'),
      monthLabel: document.getElementById('calendarMonthLabel'),
      monthGrid: document.getElementById('calendarMonthGrid'),
      dayDetail: document.getElementById('calendarDayDetail'),
      deadlineList: document.getElementById('deadlineList'),
      reviewList: document.getElementById('calendarReviewList'),
      technicalRows: document.getElementById('calendarTechnicalRows'),
      validationStatus: document.getElementById('calendarValidationStatus'),
      tableSearch: document.getElementById('calendarTableSearch'),
      prevMonth: document.getElementById('calendarPrevMonth'),
      nextMonth: document.getElementById('calendarNextMonth'),
      expandToggle: document.getElementById('calendarExpandToggle'),
      filters: document.querySelectorAll('[data-calendar-filter]'),
      rangeButtons: document.querySelectorAll('[data-agenda-range]'),
    };

    const state = {
      today: startOfDay(new Date()),
      viewDate: startOfDay(new Date()),
      activeFilter: 'all',
      agendaRange: '7',
      tableSearch: '',
      isExpanded: false,
      selectedDayKey: '',
    };

    function getCurrentLang(){
      return document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'es';
    }

    function startOfDay(date) {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    function addDays(date, days) {
      const next = new Date(date);
      next.setDate(next.getDate() + days);
      return startOfDay(next);
    }

    function addBusinessDays(date, businessDays) {
      let current = startOfDay(date);
      let remaining = businessDays;
      while (remaining > 0) {
        current = addDays(current, 1);
        if (current.getDay() !== 0 && current.getDay() !== 6) remaining -= 1;
      }
      return current;
    }

    function adjustDueDate(date, adjustmentRule) {
      const adjusted = startOfDay(date);
      if (adjustmentRule !== 'next_business_day_if_weekend') return adjusted;
      if (adjusted.getDay() === 6) return addDays(adjusted, 2);
      if (adjusted.getDay() === 0) return addDays(adjusted, 1);
      return adjusted;
      // Future phase: apply official Puerto Rico and federal holidays here.
    }

    function buildEvent(rule, year, month, day, options) {
      const rawDate = new Date(year, month - 1, day);
      const dueDate = adjustDueDate(rawDate, rule.adjustmentRule);
      return Object.assign({
        id: rule.id + '-' + year + '-' + month + '-' + day,
        obligationId: rule.id,
        sourceKey: rule.sourceKey,
        title: rule.title,
        agency: rule.agency,
        appliesTo: rule.appliesTo,
        frequency: rule.frequency,
        ruleType: rule.ruleType,
        dueRuleText: rule.dueRuleText,
        adjustmentRule: rule.adjustmentRule,
        sourceConfirmed: rule.sourceConfirmed,
        sourceStatus: rule.sourceStatus,
        notes: rule.notes,
        requiresReview: rule.requiresReview,
        dueDate: dueDate,
      }, options || {});
    }

    function generateEventsForYear(year, rules) {
      return rules.flatMap(function(rule){
        if (rule.ruleType === 'fixed_day_monthly') {
          return Array.from({ length: 12 }, function(_, monthIndex){
            return buildEvent(rule, year, monthIndex + 1, rule.day);
          });
        }
        if (rule.ruleType === 'fixed_annual') {
          return [buildEvent(rule, year, rule.month, rule.day)];
        }
        if (rule.ruleType === 'fixed_quarterly' || rule.ruleType === 'quarterly_specific_dates' || rule.ruleType === 'semiannual_specific_dates') {
          return (rule.dates || []).map(function(date){
            const eventYear = date.month === 1 && rule.frequency === 'quarterly' ? year + 1 : year;
            return buildEvent(rule, eventYear, date.month, date.day);
          });
        }
        if (rule.ruleType === 'date_window') {
          return [buildEvent(rule, year, rule.startMonth, rule.startDay, {
            windowEndDate: adjustDueDate(new Date(year, rule.endMonth - 1, rule.endDay), rule.adjustmentRule),
          })];
        }
        if (rule.ruleType === 'relative_to_date') {
          return [Object.assign(buildEvent(rule, year, rule.baseMonth, rule.baseDay), {
            dueDate: adjustDueDate(addBusinessDays(new Date(year, rule.baseMonth - 1, rule.baseDay), rule.businessDaysAfter || 0), rule.adjustmentRule),
          })];
        }
        if ((rule.ruleType === 'manual_review' || rule.ruleType === 'variable') && rule.approximateMonth) {
          return [buildEvent(rule, year, rule.approximateMonth, 1, { isApproximate: true })];
        }
        return [];
      }).sort(function(a, b){ return a.dueDate - b.dueDate; });
    }

    function getUpcomingDeadlines(events, currentDate) {
      const today = startOfDay(currentDate);
      return events
        .filter(function(event){ return startOfDay(event.dueDate) >= today; })
        .map(function(event){
          const daysRemaining = Math.round((startOfDay(event.dueDate) - today) / 86400000);
          return Object.assign({}, event, {
            daysRemaining: daysRemaining,
            urgency: getUrgency(daysRemaining),
          });
        })
        .sort(function(a, b){ return a.dueDate - b.dueDate; });
    }

    function getUrgency(daysRemaining) {
      if (daysRemaining < 0) return 'overdue';
      if (daysRemaining <= 7) return 'critical';
      if (daysRemaining <= 30) return 'soon';
      return 'normal';
    }

    function ruleMatchesFilter(rule, filter) {
      if (filter === 'all') return true;
      if (filter === 'source_confirmed') return rule.sourceStatus === 'confirmed';
      if (filter === 'pending_review') return rule.sourceStatus !== 'confirmed';
      if (filter === 'requires_review') return !!rule.requiresReview;
      return rule.agency === filter || rule.agency.indexOf(filter) !== -1 || rule.appliesTo.includes(filter);
    }

    function eventMatchesFilter(event, filter) {
      if (filter === 'all') return true;
      if (filter === 'source_confirmed') return event.sourceStatus === 'confirmed';
      if (filter === 'pending_review') return event.sourceStatus !== 'confirmed';
      if (filter === 'requires_review') return !!event.requiresReview;
      return event.agency === filter || event.agency.indexOf(filter) !== -1 || event.appliesTo.includes(filter);
    }

    function formatDate(date, options) {
      return new Intl.DateTimeFormat(getCurrentLang() === 'en' ? 'en-US' : 'es-PR', options || {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }).format(date);
    }

    function labelForEvent(event) { return event.title; }
    function appliesLabel(item) { return item.appliesTo.join(' · '); }

    function shortTitle(title) {
      return title
        .replace(' — ', ' ')
        .replace('Planilla ', '')
        .replace('Depósito ', '')
        .replace('Contribución ', 'Contr. ')
        .replace('Hacienda PR', 'Hacienda')
        .replace('Federal', 'Fed.')
        .replace('Annual ', '')
        .slice(0, 44);
    }

    function reviewMark(item) {
      return item.sourceStatus !== 'confirmed' || item.requiresReview ? '<sup class="calendar-review-mark">*</sup>' : '';
    }

    function frequencyLabel(frequency) {
      const labels = {
        mensual: ['Mensual', 'Monthly'],
        trimestral: ['Trimestral', 'Quarterly'],
        anual: ['Anual', 'Annual'],
        semestral: ['Semestral', 'Semiannual'],
        una_sola_vez: ['Una sola vez', 'One time'],
        por_transacción: ['Por transacción', 'Per transaction'],
        mensual___bisemanal: ['Mensual / Bisemanal', 'Monthly / semiweekly'],
      };
      const value = labels[frequency] || [frequency.replace(/_/g, ' '), frequency.replace(/_/g, ' ')];
      return getCurrentLang() === 'en' ? value[1] : value[0];
    }

    function daysLabel(days) {
      const lang = getCurrentLang();
      if (days === 0) return lang === 'en' ? 'Today' : 'Hoy';
      if (days === 1) return lang === 'en' ? '1 day left' : 'Falta 1 día';
      return lang === 'en' ? days + ' days left' : 'Faltan ' + days + ' días';
    }

    function urgencyLabel(urgency) {
      const labels = { overdue: ['Vencido', 'Overdue'], critical: ['Crítico', 'Critical'], soon: ['Pronto', 'Soon'], normal: ['Normal', 'Normal'] };
      const value = labels[urgency] || labels.normal;
      return getCurrentLang() === 'en' ? value[1] : value[0];
    }

    function sourceStatusLabel(item) {
      if (item.sourceStatus === 'confirmed') return getCurrentLang() === 'en' ? 'Source confirmed' : 'Fuente confirmada';
      return getCurrentLang() === 'en' ? 'Pending review' : 'Pendiente de revisión';
    }

    function automationLabel(item) {
      if (item.requiresReview) return getCurrentLang() === 'en' ? 'Requires review' : 'Requiere revisión';
      return getCurrentLang() === 'en' ? 'Automatic' : 'Automático';
    }

    function getFilteredRules() {
      return taxCalendarRules.filter(function(rule){ return ruleMatchesFilter(rule, state.activeFilter); });
    }

    function getFilteredEvents() {
      const year = state.viewDate.getFullYear();
      const years = [year - 1, year, year + 1];
      return years.flatMap(function(y){ return generateEventsForYear(y, taxCalendarRules); })
        .filter(function(event){ return eventMatchesFilter(event, state.activeFilter); });
    }

    function filterByAgendaRange(events) {
      const upcoming = getUpcomingDeadlines(events, state.today);
      if (state.agendaRange === '7') return upcoming.filter(function(event){ return event.daysRemaining <= 7; }).slice(0, 10);
      if (state.agendaRange === '30') return upcoming.filter(function(event){ return event.daysRemaining <= 30; }).slice(0, 10);
      if (state.agendaRange === 'month') {
        return upcoming.filter(function(event){
          return event.dueDate.getFullYear() === state.today.getFullYear() && event.dueDate.getMonth() === state.today.getMonth();
        }).slice(0, 10);
      }
      return upcoming.filter(function(event){ return event.dueDate.getFullYear() === state.viewDate.getFullYear(); }).slice(0, 10);
    }

    function renderDashboard(events, rules) {
      const upcoming = getUpcomingDeadlines(events, state.today).filter(function(event){ return !event.requiresReview || event.isApproximate; });
      const next = upcoming[0];
      const next7 = upcoming.filter(function(event){ return event.daysRemaining <= 7; }).length;
      const next30 = upcoming.filter(function(event){ return event.daysRemaining <= 30; }).length;
      const thisMonth = events.filter(function(event){ return event.dueDate.getFullYear() === state.today.getFullYear() && event.dueDate.getMonth() === state.today.getMonth(); });
      const agencyCounts = thisMonth.reduce(function(map, event){ map[event.agency] = (map[event.agency] || 0) + 1; return map; }, {});
      const topAgency = Object.keys(agencyCounts).sort(function(a, b){ return agencyCounts[b] - agencyCounts[a]; })[0];

      els.nextTitle.textContent = next ? labelForEvent(next) : (getCurrentLang() === 'en' ? 'No upcoming deadlines' : 'Sin próximos vencimientos');
      els.nextDate.textContent = next ? formatDate(next.dueDate) + ' · ' + daysLabel(next.daysRemaining) : '—';
      els.next7.textContent = next7;
      els.next30.textContent = next30;
      els.thisMonth.textContent = thisMonth.length;
      els.requiresReview.textContent = rules.filter(function(rule){ return rule.requiresReview; }).length;
      els.pendingSources.textContent = rules.filter(function(rule){ return rule.sourceStatus !== 'confirmed'; }).length;
      els.agencySummary.textContent = topAgency || (getCurrentLang() === 'en' ? 'No obligations this month' : 'Sin obligaciones este mes');
    }

    function renderMonth(events) {
      const year = state.viewDate.getFullYear();
      const month = state.viewDate.getMonth();
      els.monthLabel.textContent = new Intl.DateTimeFormat(getCurrentLang() === 'en' ? 'en-US' : 'es-PR', { month: 'long', year: 'numeric' }).format(state.viewDate);
      const firstDay = new Date(year, month, 1);
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const leadingDays = firstDay.getDay();
      const cells = [];
      for (let i = 0; i < leadingDays; i++) cells.push({ muted: true });
      for (let day = 1; day <= daysInMonth; day++) cells.push({ day: day, date: new Date(year, month, day) });
      while (cells.length % 7 !== 0) cells.push({ muted: true });
      els.monthGrid.innerHTML = cells.map(function(cell){
        if (cell.muted) return '<div class="calendar-day is-muted" aria-hidden="true"></div>';
        const dayEvents = events.filter(function(event){ return event.dueDate.getFullYear() === year && event.dueDate.getMonth() === month && event.dueDate.getDate() === cell.day; });
        const isToday = cell.date.getTime() === state.today.getTime();
        const dayKey = year + '-' + (month + 1) + '-' + cell.day;
        const visibleEvents = dayEvents.slice(0, 2);
        const moreCount = Math.max(0, dayEvents.length - visibleEvents.length);
        return '<div class="calendar-day' + (isToday ? ' is-today' : '') + (state.selectedDayKey === dayKey ? ' is-selected' : '') + '" data-calendar-day="' + dayKey + '">' +
          '<div class="calendar-day-num"><span>' + cell.day + '</span></div>' +
          visibleEvents.map(function(event){
            return '<div class="calendar-event-pill"><span>' + shortTitle(labelForEvent(event)) + reviewMark(event) + '</span><span class="agency">' + event.agency + '</span></div>';
          }).join('') +
          (moreCount ? '<button type="button" class="calendar-more-pill" data-calendar-day="' + dayKey + '">+' + moreCount + ' ' + (getCurrentLang() === 'en' ? 'more' : 'más') + '</button>' : '') +
        '</div>';
      }).join('');
      renderDayDetail(events);
    }

    function renderDayDetail(events) {
      if (!els.dayDetail) return;
      if (!state.selectedDayKey) {
        els.dayDetail.hidden = true;
        els.dayDetail.innerHTML = '';
        return;
      }
      const parts = state.selectedDayKey.split('-').map(Number);
      const selectedDate = new Date(parts[0], parts[1] - 1, parts[2]);
      const dayEvents = events.filter(function(event){
        return event.dueDate.getFullYear() === parts[0] && event.dueDate.getMonth() === parts[1] - 1 && event.dueDate.getDate() === parts[2];
      });
      if (!dayEvents.length) {
        els.dayDetail.hidden = true;
        els.dayDetail.innerHTML = '';
        return;
      }
      els.dayDetail.hidden = false;
      els.dayDetail.innerHTML = '<div class="calendar-day-detail-head">' +
        '<div><span class="section-tag">' + (getCurrentLang() === 'en' ? 'Day detail' : 'Detalle del día') + '</span><h3>' + formatDate(selectedDate, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) + '</h3></div>' +
        '<button type="button" id="calendarCloseDayDetail">' + (getCurrentLang() === 'en' ? 'Close' : 'Cerrar') + '</button>' +
      '</div>' +
      '<div class="calendar-day-detail-list">' + dayEvents.map(function(event){
        return '<article class="calendar-day-detail-item">' +
          '<h4>' + labelForEvent(event) + reviewMark(event) + '</h4>' +
          '<div class="deadline-meta"><span>' + event.agency + '</span><span>' + appliesLabel(event) + '</span><span>' + frequencyLabel(event.frequency) + '</span></div>' +
          '<p>' + event.dueRuleText + '</p>' +
        '</article>';
      }).join('') + '</div>';
      const close = document.getElementById('calendarCloseDayDetail');
      if (close) {
        close.addEventListener('click', function(){
          state.selectedDayKey = '';
          renderCalendar();
        });
      }
    }

    function renderAgenda(events) {
      const selected = filterByAgendaRange(events).filter(function(event){ return !event.requiresReview || event.isApproximate; });
      if (!selected.length) {
        els.deadlineList.innerHTML = '<div class="deadline-empty">' + (getCurrentLang() === 'en' ? 'No upcoming deadlines for this range.' : 'No hay próximos vencimientos para este rango.') + '</div>';
        return;
      }
      els.deadlineList.innerHTML = selected.map(function(event){
        return '<article class="deadline-card">' +
          '<div class="deadline-card-head">' +
            '<div><div class="deadline-date">' + formatDate(event.dueDate) + (event.isApproximate ? ' · ' + (getCurrentLang() === 'en' ? 'Approx.' : 'Aprox.') : '') + '</div><h3>' + labelForEvent(event) + reviewMark(event) + '</h3></div>' +
            '<span class="urgency-badge ' + event.urgency + '">' + daysLabel(event.daysRemaining) + '</span>' +
          '</div>' +
          '<div class="deadline-meta">' +
            '<span>' + event.agency + '</span>' +
            '<span>' + appliesLabel(event) + '</span>' +
            '<span>' + frequencyLabel(event.frequency) + '</span>' +
            '<span class="urgency-badge ' + event.urgency + '">' + urgencyLabel(event.urgency) + '</span>' +
            (event.sourceStatus !== 'confirmed' || event.requiresReview ? '<span class="source-badge auto">* ' + (getCurrentLang() === 'en' ? 'Internal review' : 'Revisión interna') + '</span>' : '') +
          '</div>' +
        '</article>';
      }).join('');
    }

    function renderReviewList(rules) {
      const reviewRules = rules.filter(function(rule){ return rule.requiresReview; });
      if (!reviewRules.length) {
        els.reviewList.innerHTML = '<div class="deadline-empty">' + (getCurrentLang() === 'en' ? 'No obligations require review for this filter.' : 'No hay obligaciones que requieran revisión para este filtro.') + '</div>';
        return;
      }
      els.reviewList.innerHTML = reviewRules.map(function(rule){
        return '<article class="review-card">' +
          '<span class="source-badge review">' + automationLabel(rule) + '</span>' +
          '<h3>' + rule.title + '</h3>' +
          '<div class="deadline-meta"><span>' + rule.agency + '</span><span>' + appliesLabel(rule) + '</span><span>' + frequencyLabel(rule.frequency) + '</span><span class="source-badge ' + (rule.sourceStatus === 'confirmed' ? 'confirmed' : 'review') + '">' + sourceStatusLabel(rule) + '</span></div>' +
          '<p>' + rule.dueRuleText + '</p>' +
        '</article>';
      }).join('');
    }

    function renderTechnicalRows(rules) {
      const query = state.tableSearch.trim().toLowerCase();
      const visible = rules.filter(function(item){
        if (!query) return true;
        return [item.title, item.agency, item.dueRuleText, item.notes, item.ruleType].join(' ').toLowerCase().includes(query);
      });
      els.technicalRows.innerHTML = visible.map(function(item){
        return '<tr>' +
          '<td><strong>' + item.title + '</strong></td>' +
          '<td>' + item.appliesTo.join(' · ') + '</td>' +
          '<td>' + item.agency + '</td>' +
          '<td>' + frequencyLabel(item.frequency) + '</td>' +
          '<td>' + item.dueRuleText + '</td>' +
          '<td><span class="source-badge auto">' + item.ruleType + '</span></td>' +
          '<td><span class="source-badge ' + (item.sourceStatus === 'confirmed' ? 'confirmed' : 'review') + '">' + sourceStatusLabel(item) + '</span></td>' +
          '<td><span class="source-badge ' + (item.requiresReview ? 'review' : 'auto') + '">' + automationLabel(item) + '</span></td>' +
          '<td>' + item.notes + '</td>' +
        '</tr>';
      }).join('');
    }

    function renderValidationStatus() {
      const items = [
        ['Total fuente', validation.sourceCount],
        ['Total cargadas', validation.loadedCount],
        ['Faltantes', validation.missingCount],
        ['Duplicadas', validation.duplicateCount],
        ['Requiere revisión', validation.requiresReviewCount],
        ['Fuente confirmada', validation.confirmedSourceCount],
        ['Fuente pendiente', validation.pendingSourceCount],
        ['Sin campos críticos', validation.withoutRuleType.length + validation.withoutAgency.length + validation.withoutFrequency.length + validation.withoutDueRuleText.length],
      ];
      els.validationStatus.innerHTML = items.map(function(item){
        return '<div class="validation-item"><span>' + item[0] + '</span><strong>' + item[1] + '</strong></div>';
      }).join('');
    }

    function renderCalendar() {
      const rules = getFilteredRules();
      const events = getFilteredEvents();
      if (els.expandToggle) {
        els.expandToggle.textContent = state.isExpanded
          ? (getCurrentLang() === 'en' ? 'Restore view' : 'Restaurar vista')
          : (getCurrentLang() === 'en' ? 'Expand calendar' : 'Expandir calendario');
      }
      renderDashboard(events, rules);
      renderMonth(events);
      renderAgenda(events);
      renderReviewList(rules);
      renderTechnicalRows(rules);
      renderValidationStatus();
    }

    els.filters.forEach(function(button){
      button.addEventListener('click', function(){
        state.activeFilter = button.getAttribute('data-calendar-filter');
        els.filters.forEach(function(btn){ btn.classList.toggle('active', btn === button); });
        renderCalendar();
      });
    });

    els.rangeButtons.forEach(function(button){
      button.addEventListener('click', function(){
        state.agendaRange = button.getAttribute('data-agenda-range');
        els.rangeButtons.forEach(function(btn){ btn.classList.toggle('active', btn === button); });
        renderCalendar();
      });
    });

    if (els.tableSearch) {
      els.tableSearch.addEventListener('input', function(){
        state.tableSearch = els.tableSearch.value || '';
        renderCalendar();
      });
    }

    if (els.monthGrid) {
      els.monthGrid.addEventListener('click', function(e){
        const target = e.target.closest('[data-calendar-day]');
        if (!target) return;
        state.selectedDayKey = target.getAttribute('data-calendar-day');
        renderCalendar();
      });
    }

    if (els.expandToggle) {
      els.expandToggle.addEventListener('click', function(){
        state.isExpanded = !state.isExpanded;
        root.classList.toggle('calendar-expanded', state.isExpanded);
        els.expandToggle.setAttribute('aria-expanded', state.isExpanded ? 'true' : 'false');
        els.expandToggle.textContent = state.isExpanded
          ? (getCurrentLang() === 'en' ? 'Restore view' : 'Restaurar vista')
          : (getCurrentLang() === 'en' ? 'Expand calendar' : 'Expandir calendario');
      });
    }

    els.prevMonth.addEventListener('click', function(){
      state.viewDate = startOfDay(new Date(state.viewDate.getFullYear(), state.viewDate.getMonth() - 1, 1));
      renderCalendar();
    });
    els.nextMonth.addEventListener('click', function(){
      state.viewDate = startOfDay(new Date(state.viewDate.getFullYear(), state.viewDate.getMonth() + 1, 1));
      renderCalendar();
    });

    document.addEventListener('sl:langchange', renderCalendar);
    renderCalendar();
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

  // -------- GA4 EVENT TRACKING --------
  // Conecta todos los data-track-event existentes con GA4
  (function(){
    document.querySelectorAll('[data-track-event]').forEach(function(el){
      el.addEventListener('click', function(){
        if (typeof gtag === 'undefined') return;
        gtag('event', el.getAttribute('data-track-event'), {
          event_category: el.getAttribute('data-track-section') || '',
          event_label:    el.getAttribute('data-track-label')   || ''
        });
      });
    });
    // Email clicks
    document.querySelectorAll('a[href^="mailto:"]').forEach(function(el){
      el.addEventListener('click', function(){
        if (typeof gtag !== 'undefined') gtag('event', 'email_click', { event_category: 'contact' });
      });
    });
  })();

  // -------- BLOG: Tabla de contenidos + scroll tracking --------
  (function(){
    var tocList = document.getElementById('toc-list');
    var content = document.getElementById('blog-content');
    if (!tocList || !content) return;

    var headings = content.querySelectorAll('h2');
    if (!headings.length) {
      var tocBox = document.getElementById('blog-toc');
      if (tocBox) tocBox.style.display = 'none';
      return;
    }

    headings.forEach(function(h, i){
      if (!h.id) h.id = 'seccion-' + (i + 1);
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = '#' + h.id;
      a.textContent = h.textContent.replace(/\s+/g, ' ').trim();
      a.addEventListener('click', function(e){
        e.preventDefault();
        h.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      li.appendChild(a);
      tocList.appendChild(li);
    });

    var links = tocList.querySelectorAll('a');
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          var id = entry.target.id;
          links.forEach(function(l){
            l.classList.toggle('toc-active', l.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-10% 0px -80% 0px', threshold: 0 });

    headings.forEach(function(h){ observer.observe(h); });
  })();

  // -------- NEW VISITOR POPUP: TAX RELIEF CALCULATOR --------
  (function(){
    var calculatorPath = '/herramientas/calculadora-alivio-contributivo-2025/';
    if (window.location.pathname.indexOf(calculatorPath) === 0) return;

    var storageKey = 'sl_tax_relief_popup_seen_v1';
    try {
      if (localStorage.getItem(storageKey) === '1') return;
    } catch(e) {}

    var lang = document.documentElement.getAttribute('lang') === 'en' ? 'en' : 'es';
    var copy = {
      es: {
        eyebrow: 'Herramienta gratuita',
        title: 'Calcula tu posible cheque de alivio contributivo 2025',
        body: 'Estima si podrías cualificar y cuánto podrías recibir según tu ingreso y dependientes.',
        cta: 'Usar calculadora',
        secondary: 'Ahora no',
        note: 'Toma menos de 1 minuto.'
      },
      en: {
        eyebrow: 'Free tool',
        title: 'Estimate your possible 2025 tax relief check',
        body: 'Check if you may qualify and estimate the amount based on income and dependents.',
        cta: 'Use calculator',
        secondary: 'Not now',
        note: 'Takes less than 1 minute.'
      }
    };
    var t = copy[lang];

    function markSeen(){
      try { localStorage.setItem(storageKey, '1'); } catch(e) {}
    }

    var activePopup = null;

    function handlePopupEscape(e){
      if (e.key === 'Escape' && activePopup && activePopup.parentNode) {
        closePopup(activePopup);
      }
    }

    function closePopup(popup){
      popup.classList.remove('show');
      popup.setAttribute('aria-hidden', 'true');
      document.removeEventListener('keydown', handlePopupEscape);
      if (activePopup === popup) activePopup = null;
      markSeen();
      window.setTimeout(function(){
        if (popup.parentNode) popup.parentNode.removeChild(popup);
      }, 220);
    }

    function createPopup(){
      if (document.querySelector('.relief-popup')) return;

      var popup = document.createElement('div');
      popup.className = 'relief-popup';
      popup.setAttribute('role', 'dialog');
      popup.setAttribute('aria-modal', 'false');
      popup.setAttribute('aria-hidden', 'true');
      popup.setAttribute('aria-labelledby', 'reliefPopupTitle');
      popup.innerHTML =
        '<div class="relief-popup-card">' +
          '<button class="relief-popup-close" type="button" aria-label="Cerrar">×</button>' +
          '<span class="relief-popup-eyebrow">' + t.eyebrow + '</span>' +
          '<h2 id="reliefPopupTitle">' + t.title + '</h2>' +
          '<p>' + t.body + '</p>' +
          '<div class="relief-popup-actions">' +
            '<a href="' + calculatorPath + '" class="btn btn-gold" data-track-event="cta_click" data-track-section="popup_alivio" data-track-label="abrir_calculadora">' + t.cta + ' <span class="arr"></span></a>' +
            '<button class="relief-popup-secondary" type="button">' + t.secondary + '</button>' +
          '</div>' +
          '<span class="relief-popup-note">' + t.note + '</span>' +
        '</div>';

      document.body.appendChild(popup);
      activePopup = popup;

      var closeBtn = popup.querySelector('.relief-popup-close');
      var secondaryBtn = popup.querySelector('.relief-popup-secondary');
      var cta = popup.querySelector('a');

      closeBtn.addEventListener('click', function(){ closePopup(popup); });
      secondaryBtn.addEventListener('click', function(){ closePopup(popup); });
      cta.addEventListener('click', markSeen);
      popup.addEventListener('click', function(e){
        if (e.target === popup) closePopup(popup);
      });
      document.addEventListener('keydown', handlePopupEscape);

      window.setTimeout(function(){
        popup.setAttribute('aria-hidden', 'false');
        popup.classList.add('show');
      }, 80);
    }

    window.setTimeout(createPopup, 1400);
  })();

  // -------- BLOG: Checklist accionable --------
  (function(){
    document.querySelectorAll('[data-action-checklist]').forEach(function(root){
      var id = root.getAttribute('data-action-checklist');
      if (!id) return;

      var storageKey = 'sl_checklist_' + id;
      var inputs = root.querySelectorAll('input[type="checkbox"][data-check-id]');
      var progressLabel = root.querySelector('.blog-action-checklist-progress-label');
      var progressTrack = root.querySelector('.blog-action-checklist-progress-track');
      var progressFill = root.querySelector('.blog-action-checklist-progress-fill');
      var doneMessage = root.querySelector('.blog-action-checklist-done');
      var resetBtn = root.querySelector('.blog-action-checklist-reset');

      function getStored(){
        try {
          return JSON.parse(localStorage.getItem(storageKey) || '{}');
        } catch(e) {
          return {};
        }
      }

      function saveStored(data){
        try { localStorage.setItem(storageKey, JSON.stringify(data)); } catch(e) {}
      }

      function updateProgress(){
        var total = inputs.length;
        var done = 0;
        inputs.forEach(function(input){
          if (input.checked) done++;
        });
        var pct = total ? Math.round((done / total) * 100) : 0;

        if (progressLabel) {
          progressLabel.textContent = done + ' de ' + total + ' completados';
        }
        if (progressFill) {
          progressFill.style.width = pct + '%';
        }
        if (progressTrack) {
          progressTrack.setAttribute('aria-valuenow', String(pct));
        }
        root.classList.toggle('is-complete', done === total && total > 0);
        if (doneMessage) {
          doneMessage.hidden = !(done === total && total > 0);
        }
      }

      function loadState(){
        var stored = getStored();
        inputs.forEach(function(input){
          var checkId = input.getAttribute('data-check-id');
          input.checked = !!stored[checkId];
        });
        updateProgress();
      }

      inputs.forEach(function(input){
        input.addEventListener('change', function(){
          var stored = getStored();
          stored[input.getAttribute('data-check-id')] = input.checked;
          saveStored(stored);
          updateProgress();
        });
      });

      if (resetBtn) {
        resetBtn.addEventListener('click', function(){
          inputs.forEach(function(input){ input.checked = false; });
          saveStored({});
          updateProgress();
        });
      }

      loadState();
    });
  })();
