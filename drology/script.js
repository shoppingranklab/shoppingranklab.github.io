/* =========================================================
   Dr.Ology — interactions
   ========================================================= */
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var stillMode = /(?:^|[?&])still=1(?:&|$)/.test(window.location.search);

  /* ---------------- data ---------------- */
  var SHOP = 'https://cestlavie4705.cafe24.com/';
  var PRODUCTS = {
    collagen: {
      key: 'collagen',
      en: 'COLLAGEN',
      name: '올인원 저분자 피쉬 콜라겐',
      full: '닥터올로지 올인원 저분자 피쉬 콜라겐',
      tag: '피부 탄력 · 보습',
      timing: '저녁 식후',
      img: 'assets/collagen.jpg',
      price: 86000,
      accent: '#6FB9DF',
      accentDeep: '#1D6E96',
      desc: '300달톤 저분자 피쉬콜라겐을 마시는 액상 스틱 한 포에 담았습니다. 엘라스틴·히알루론산·비오틴·비타민C를 함께 설계한 올인원 콜라겐입니다.',
      chips: ['콜라겐 3,000mg', '엘라스틴 100mg', '히알루론산 120mg', '비오틴 300㎍', '비타민C 200mg'],
      specs: [
        ['제형', '액상 스틱 · 20g × 14포'],
        ['1포당', '저분자 피쉬콜라겐 3,000mg (300달톤)'],
        ['함께 담은 성분', '엘라스틴 100mg · 히알루론산 120mg · 비오틴 300㎍ · 비타민C 200mg'],
        ['권장 타이밍', '저녁 식후'],
        ['배송', '택배 · 3,000원 (60,000원 이상 무료) · 3~7일']
      ],
      link: 'https://cestlavie4705.cafe24.com/product/%EB%8B%A5%ED%84%B0%EC%98%AC%EB%A1%9C%EC%A7%80-%EC%98%AC%EC%9D%B8%EC%9B%90-%EC%A0%80%EB%B6%84%EC%9E%90-%ED%94%BC%EC%89%AC-%EC%BD%9C%EB%9D%BC%EA%B2%90-%EB%A7%88%EC%8B%9C%EB%8A%94-%EC%96%B4%EB%A6%B0-300%EB%8B%AC%ED%86%A4-%EC%95%A1%EC%83%81-%EC%97%98%EB%9D%BC%EC%8A%A4%ED%8B%B4-%ED%9E%88%EC%95%8C%EB%A3%A8%EB%A1%A0%EC%82%B0-%EB%B9%84%EC%98%A4%ED%8B%B4-1%EB%B0%95%EC%8A%A4/12/category/1/display/2/'
    },
    melatonin: {
      key: 'melatonin',
      en: 'MELATONIN',
      name: '식물성 멜라토닌 멜라니크',
      full: '닥터올로지 식물성 멜라토닌 함유 멜라니크',
      tag: '숙면 · 수면 리듬',
      timing: '취침 30분 전',
      img: 'assets/melatonin.jpg',
      price: 86000,
      accent: '#8187CE',
      accentDeep: '#41468F',
      desc: '식물성 멜라토닌 2mg에 L-트립토판·테아닌·마그네슘·비타민B6를 더했습니다. 잠들기 전 조용히 마무리하는 한 정입니다.',
      chips: ['멜라토닌 2mg', 'L-트립토판 60mg', '테아닌 50mg', '마그네슘 50mg', '비타민B6 1.5mg'],
      specs: [
        ['제형', '정 · 500mg × 60정 (30g)'],
        ['1정당', '식물성 멜라토닌 2mg'],
        ['함께 담은 성분', 'L-트립토판 60mg · 테아닌 50mg · 마그네슘 50mg · 비타민B6 1.5mg'],
        ['권장 타이밍', '취침 30분 전'],
        ['배송', '택배 · 3,000원 (60,000원 이상 무료) · 3~7일']
      ],
      link: 'https://cestlavie4705.cafe24.com/product/%EB%8B%A5%ED%84%B0%EC%98%AC%EB%A1%9C%EC%A7%80-%EC%8B%9D%EB%AC%BC%EC%84%B1-%EB%A9%9C%EB%9D%BC%ED%86%A0%EB%8B%8C/15/category/1/display/2/'
    },
    folate: {
      key: 'folate',
      en: 'FOLATE',
      name: '올인원 액티브 활성 엽산 800',
      full: '닥터올로지 올인원 액티브 활성 엽산 800 비타민D 1000IU',
      tag: '활력 · 임신 준비',
      timing: '아침 식후',
      img: 'assets/folate.jpg',
      price: 86000,
      accent: '#4FA98C',
      accentDeep: '#1F6D59',
      desc: 'Quatrefolic 활성형 엽산 800㎍ DFE와 비타민D 1000IU, 비타민B군·비오틴·아연·비타민C를 한 정에 담았습니다.',
      chips: ['엽산 800㎍ DFE', '비타민D 1000IU', '비타민B1·B2·B6·B12', '비오틴 · 아연', '비타민C'],
      specs: [
        ['제형', '정 · 500mg × 60정 (30g)'],
        ['1정당', 'Quatrefolic 활성형 엽산 800㎍ DFE'],
        ['함께 담은 성분', '비타민D 1000IU · 비타민B1·B2·B6·B12 · 비오틴 · 아연 · 비타민C'],
        ['권장 타이밍', '아침 식후'],
        ['배송', '택배 · 3,000원 (60,000원 이상 무료) · 3~7일']
      ],
      link: 'https://cestlavie4705.cafe24.com/product/%EB%8B%A5%ED%84%B0%EC%98%AC%EB%A1%9C%EC%A7%80-%EC%97%BD%EC%82%B0/14/category/1/display/2/'
    },
    glutathione: {
      key: 'glutathione',
      en: 'GLUTATHIONE',
      name: '영국산 글루타치온 비타민C',
      full: '닥터올로지 영국산 글루타치온 비타민C',
      tag: '항산화 · 피로 관리',
      timing: '낮 식후',
      img: 'assets/glutathione.jpg',
      price: 100000,
      accent: '#D2A044',
      accentDeep: '#8A6218',
      desc: '영국산 L-글루타치온 효모추출물 500mg과 영국산 비타민C 50mg을 한 정에 담았습니다.',
      chips: ['글루타치온 500mg', '비타민C 50mg', '영국산 원료'],
      specs: [
        ['제형', '정 · 600mg × 30정 (18g)'],
        ['1정당', '영국산 L-글루타치온 효모추출물 500mg (L-글루타치온 50% 함유)'],
        ['함께 담은 성분', '영국산 비타민C 50mg'],
        ['권장 타이밍', '낮 식후'],
        ['배송', '택배 · 3,000원 (60,000원 이상 무료) · 3~7일']
      ],
      link: 'https://cestlavie4705.cafe24.com/product/%EB%8B%A5%ED%84%B0%EC%98%AC%EB%A1%9C%EC%A7%80-%EA%B8%80%EB%A3%A8%ED%83%80%EC%B9%98%EC%98%A8/16/category/1/display/2/'
    }
  };
  var ORDER = ['collagen', 'melatonin', 'folate', 'glutathione'];

  function won(n) { return n.toLocaleString('ko-KR') + '원'; }

  /* ---------------- header ---------------- */
  var header = document.getElementById('siteHeader');
  var toTop = document.getElementById('toTop');
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav a[data-nav]'));
  var navTargets = ['lineup', 'finder', 'philosophy']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  var lastY = window.scrollY;
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      var y = window.scrollY;
      header.classList.toggle('is-scrolled', y > 12);
      if (toTop) toTop.classList.toggle('is-visible', y > 700);
      if (y > lastY + 4 || y < lastY - 4) lastY = y;

      var activeId = null;
      var bestTop = -Infinity;
      var probe = y + window.innerHeight * 0.35;
      navTargets.forEach(function (el) {
        var top = el.getBoundingClientRect().top + y;
        if (top <= probe && top > bestTop) { bestTop = top; activeId = el.id; }
      });
      navLinks.forEach(function (a) {
        a.classList.toggle('is-active', a.getAttribute('data-nav') === activeId);
      });
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* mobile nav */
  var burger = document.getElementById('burger');
  var mobileNav = document.getElementById('mobileNav');
  function setMenu(open) {
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    mobileNav.classList.toggle('is-open', open);
    mobileNav.setAttribute('aria-hidden', open ? 'false' : 'true');
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (burger && mobileNav) {
    burger.addEventListener('click', function () {
      setMenu(!mobileNav.classList.contains('is-open'));
    });
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) setMenu(false);
    });
  }

  /* ---------------- showcase ---------------- */
  var showcase = document.getElementById('showcase');
  var panels = Array.prototype.slice.call(document.querySelectorAll('.panel'));
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab'));
  var tabWrap = document.querySelector('.tabs');
  var indexEl = document.getElementById('panelIndex');
  var current = 0;
  var timer = null;
  var hovering = false;
  var CYCLE = 6500;

  function setActive(i, user) {
    current = (i + panels.length) % panels.length;
    panels.forEach(function (p, n) {
      var on = n === current;
      p.classList.toggle('is-active', on);
      p.setAttribute('aria-selected', on ? 'true' : 'false');
      p.setAttribute('tabindex', on ? '0' : '-1');
    });
    tabs.forEach(function (t, n) {
      var on = n === current;
      t.classList.remove('is-active');
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      if (on) {
        var bar = t.querySelector('.tab-bar');
        if (bar) { bar.style.animation = 'none'; void bar.offsetWidth; bar.style.animation = ''; }
      }
    });
    if (indexEl) indexEl.textContent = String(current + 1).padStart(2, '0');
    schedule(user);
  }
  function schedule() {
    if (timer) clearTimeout(timer);
    if (reduceMotion || stillMode || hovering || document.hidden) return;
    timer = setTimeout(function () { setActive(current + 1, 'auto'); }, CYCLE);
  }
  panels.forEach(function (p, i) {
    p.addEventListener('click', function (e) {
      if (e.target.closest('[data-open]')) return;
      setActive(i, 'user');
    });
    p.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActive(i, 'user'); }
    });
  });
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { setActive(i, 'user'); });
  });
  var prev = document.getElementById('panelPrev');
  var next = document.getElementById('panelNext');
  if (prev) prev.addEventListener('click', function () { setActive(current - 1, 'user'); });
  if (next) next.addEventListener('click', function () { setActive(current + 1, 'user'); });
  if (showcase) {
    showcase.addEventListener('mouseenter', function () { hovering = true; if (timer) clearTimeout(timer); if (tabWrap) tabWrap.classList.add('is-paused'); });
    showcase.addEventListener('mouseleave', function () { hovering = false; schedule(); if (tabWrap) tabWrap.classList.remove('is-paused'); });
    showcase.addEventListener('focusin', function () { hovering = true; if (timer) clearTimeout(timer); if (tabWrap) tabWrap.classList.add('is-paused'); });
    showcase.addEventListener('focusout', function (e) {
      if (!showcase.contains(e.relatedTarget)) { hovering = false; schedule(); if (tabWrap) tabWrap.classList.remove('is-paused'); }
    });
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { if (timer) clearTimeout(timer); }
      else { schedule(); }
    });
    setActive(0, 'init');
  }

  /* ---------------- routine timeline ---------------- */
  var SLOTS = {
    morning: {
      time: '07:30', minutes: 450, period: '아침', label: '아침 · 활성 엽산',
      title: '하루의 시작, 수용성 성분부터',
      desc: '활성형 엽산(Quatrefolic) 800㎍ DFE와 비타민D 1000IU. 아침 식사 후 물과 함께 챙기면 하루 루틴의 기준점이 됩니다.',
      chips: ['엽산 800㎍ DFE', '비타민D 1000IU', '비타민B군'],
      product: 'folate', accent: '#4FA98C'
    },
    noon: {
      time: '12:30', minutes: 750, period: '낮', label: '낮 · 글루타치온',
      title: '낮의 항산화 라인',
      desc: '영국산 L-글루타치온 효모추출물 500mg과 영국산 비타민C 50mg. 점심 식후에 함께 챙기는 항산화 조합입니다.',
      chips: ['글루타치온 500mg', '비타민C 50mg'],
      product: 'glutathione', accent: '#D2A044'
    },
    evening: {
      time: '20:00', minutes: 1200, period: '저녁', label: '저녁 · 콜라겐',
      title: '저녁, 피부의 시간',
      desc: '300달톤 저분자 피쉬콜라겐 3,000mg에 엘라스틴·히알루론산·비오틴. 저녁 식후 한 포로 하루를 마무리합니다.',
      chips: ['콜라겐 3,000mg', '엘라스틴 100mg', '히알루론산 120mg'],
      product: 'collagen', accent: '#6FB9DF'
    },
    night: {
      time: '22:30', minutes: 1350, period: '취침 전', label: '취침 전 · 멜라토닌',
      title: '취침 30분 전, 수면 리듬',
      desc: '식물성 멜라토닌 2mg과 L-트립토판·테아닌·마그네슘. 잠들기 전 조용히 마무리하는 한 정입니다.',
      chips: ['멜라토닌 2mg', 'L-트립토판 60mg', '테아닌 50mg'],
      product: 'melatonin', accent: '#8187CE'
    }
  };
  var SLOT_ORDER = ['morning', 'noon', 'evening', 'night'];
  var stops = Array.prototype.slice.call(document.querySelectorAll('.stop'));
  var detail = document.getElementById('routineDetail');
  var clockHand = document.getElementById('clockHand');
  var clockArc = document.getElementById('clockArc');
  var clockTicks = document.getElementById('clockTicks');
  var routineTime = document.getElementById('routineTime');
  var routinePeriod = document.getElementById('routinePeriod');
  var routineThumb = document.getElementById('routineThumb');
  var routineSlotLabel = document.getElementById('routineSlotLabel');
  var routineTitle = document.getElementById('routineTitle');
  var routineDesc = document.getElementById('routineDesc');
  var routineChips = document.getElementById('routineChips');
  var routineOpen = document.getElementById('routineOpen');
  var routineBuy = document.getElementById('routineBuy');
  var timelineProgress = document.getElementById('timelineProgress');

  if (clockTicks) {
    var ns = 'http://www.w3.org/2000/svg';
    for (var t = 0; t < 24; t++) {
      var line = document.createElementNS(ns, 'line');
      var major = t % 6 === 0;
      var r1 = major ? 72 : 78;
      var ang = (t / 24) * Math.PI * 2 - Math.PI / 2;
      line.setAttribute('x1', (100 + Math.cos(ang) * r1).toFixed(2));
      line.setAttribute('y1', (100 + Math.sin(ang) * r1).toFixed(2));
      line.setAttribute('x2', (100 + Math.cos(ang) * 86).toFixed(2));
      line.setAttribute('y2', (100 + Math.sin(ang) * 86).toFixed(2));
      if (major) { line.style.stroke = 'var(--muted)'; line.style.opacity = '.55'; }
      clockTicks.appendChild(line);
    }
  }

  function setSlot(key) {
    var s = SLOTS[key];
    if (!s) return;
    stops.forEach(function (b) { 
      var on = b.getAttribute('data-slot') === key;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    if (detail) detail.style.setProperty('--accent', s.accent);
    var frac = s.minutes / 1440;
    if (clockArc) {
      var C = 2 * Math.PI * 88;
      clockArc.style.strokeDasharray = C.toFixed(1);
      clockArc.style.strokeDashoffset = (C * (1 - frac)).toFixed(1);
    }
    if (clockHand) clockHand.style.transform = 'rotate(' + (frac * 360).toFixed(1) + 'deg)';
    if (routineTime) routineTime.textContent = s.time;
    if (routinePeriod) routinePeriod.textContent = s.period;
    if (routineSlotLabel) routineSlotLabel.textContent = s.label;
    if (routineTitle) routineTitle.textContent = s.title;
    if (routineDesc) routineDesc.textContent = s.desc;
    if (routineChips) {
      routineChips.innerHTML = s.chips.map(function (c) { return '<li>' + c + '</li>'; }).join('');
    }
    if (routineThumb) {
      routineThumb.src = PRODUCTS[s.product].img;
      routineThumb.alt = PRODUCTS[s.product].name;
    }
    if (routineOpen) routineOpen.setAttribute('data-open', s.product);
    if (routineBuy) routineBuy.href = PRODUCTS[s.product].link;
    var i = SLOT_ORDER.indexOf(key);
    if (timelineProgress) timelineProgress.style.width = (i / (SLOT_ORDER.length - 1)) * 100 + '%';
  }
  stops.forEach(function (b) {
    b.addEventListener('click', function () { setSlot(b.getAttribute('data-slot')); });
  });
  setSlot('morning');

  /* ---------------- finder ---------------- */
  var WEIGHTS = {
    skin:  { collagen: 96, melatonin: 24, folate: 32, glutathione: 46 },
    sleep: { collagen: 28, melatonin: 97, folate: 22, glutathione: 24 },
    vital: { collagen: 40, melatonin: 18, folate: 95, glutathione: 38 },
    anti:  { collagen: 34, melatonin: 26, folate: 48, glutathione: 94 }
  };
  var CONCERN_NAMES = { skin: '피부 탄력·보습', sleep: '숙면·수면 리듬', vital: '활력·임신 준비', anti: '항산화·피로 관리' };
  var selected = [];
  var concernBtns = Array.prototype.slice.call(document.querySelectorAll('.concern'));
  var gaugeEls = {};
  Array.prototype.forEach.call(document.querySelectorAll('.gauge'), function (g) { gaugeEls[g.getAttribute('data-key')] = g; });
  var resultEmpty = document.getElementById('resultEmpty');
  var resultContent = document.getElementById('resultContent');
  var resultCount = document.getElementById('resultCount');
  var resultSummary = document.getElementById('resultSummary');
  var resultList = document.getElementById('resultList');
  var resultTotal = document.getElementById('resultTotal');
  var resultShop = document.getElementById('resultShop');
  var finderHint = document.getElementById('finderHint');
  var finderReset = document.getElementById('finderReset');

  function compute() {
    var scores = { collagen: 0, melatonin: 0, folate: 0, glutathione: 0 };
    if (!selected.length) return scores;
    ORDER.forEach(function (k) {
      var sum = 0;
      selected.forEach(function (c) { sum += WEIGHTS[c][k]; });
      scores[k] = Math.round(sum / selected.length);
    });
    function has(a, b) { return selected.indexOf(a) > -1 && selected.indexOf(b) > -1; }
    if (has('skin', 'anti')) { scores.collagen += 4; scores.glutathione += 4; }
    if (has('sleep', 'vital')) { scores.folate += 3; scores.melatonin += 3; }
    if (has('skin', 'sleep')) { scores.collagen += 2; scores.melatonin += 2; }
    if (has('vital', 'anti')) { scores.folate += 2; scores.glutathione += 2; }
    ORDER.forEach(function (k) { scores[k] = Math.min(99, scores[k]); });
    return scores;
  }

  var gaugeTimers = {};
  function animateGauge(el, to) {
    var valEl = el.querySelector('.gauge-val');
    var start = parseInt(valEl.getAttribute('data-v') || '0', 10);
    if (reduceMotion) { valEl.innerHTML = to + '<small>%</small>'; valEl.setAttribute('data-v', to); return; }
    if (gaugeTimers[el.getAttribute('data-key')]) cancelAnimationFrame(gaugeTimers[el.getAttribute('data-key')]);
    var t0 = performance.now();
    var dur = 700;
    function step(now) {
      var p = Math.min(1, (now - t0) / dur);
      var e = 1 - Math.pow(1 - p, 3);
      var v = Math.round(start + (to - start) * e);
      valEl.innerHTML = v + '<small>%</small>';
      valEl.setAttribute('data-v', v);
      if (p < 1) gaugeTimers[el.getAttribute('data-key')] = requestAnimationFrame(step);
    }
    gaugeTimers[el.getAttribute('data-key')] = requestAnimationFrame(step);
  }

  function render() {
    var scores = compute();
    var ranked = ORDER.slice().sort(function (a, b) { return scores[b] - scores[a]; });
    var top = ranked[0];
    ORDER.forEach(function (k) {
      var g = gaugeEls[k];
      if (!g) return;
      g.querySelector('.gauge-bar').style.width = (scores[k] || 0) + '%';
      animateGauge(g, scores[k] || 0);
      g.classList.toggle('is-top', selected.length > 0 && k === top);
    });

    if (!selected.length) {
      resultEmpty.hidden = false;
      resultContent.hidden = true;
      finderHint.textContent = '고민을 선택하면 결과가 계산됩니다.';
      return;
    }
    resultEmpty.hidden = true;
    resultContent.hidden = false;

    var picks = ranked.filter(function (k) { return scores[k] >= 60; }).slice(0, 3);
    if (!picks.length) picks = [top];

    var labelMap = { collagen: '콜라겐', melatonin: '멜라토닌', folate: '엽산', glutathione: '글루타치온' };
    var names = picks.map(function (k) { return labelMap[k]; });
    resultCount.textContent = picks.length + '종';
    var joined = names.length > 1 ? names.slice(0, -1).join(', ') + ' · ' + names[names.length - 1] : names[0];
    resultSummary.textContent = '선택하신 고민에는 ' + joined + ' 라인업이 가장 잘 맞습니다.';

    var total = 0;
    resultList.innerHTML = picks.map(function (k) {
      var p = PRODUCTS[k];
      total += p.price;
      return '<li>' +
        '<img src="' + p.img + '" width="48" height="48" alt="" loading="lazy">' +
        '<div><p class="r-name">' + p.name + '</p><p class="r-tag">' + p.tag + ' · ' + p.timing + '</p></div>' +
        '<span class="r-price">' + p.price.toLocaleString('ko-KR') + '원</span>' +
        '</li>';
    }).join('');
    resultTotal.textContent = won(total);
    resultShop.href = picks.length === 1 ? PRODUCTS[picks[0]].link : SHOP;
    resultShop.textContent = '';
    resultShop.insertAdjacentHTML('beforeend', '공식몰에서 구매<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>');
    finderHint.textContent = selected.length + '개의 고민을 기준으로 계산했습니다.';
  }

  concernBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      var key = b.getAttribute('data-concern');
      var i = selected.indexOf(key);
      if (i > -1) selected.splice(i, 1); else selected.push(key);
      b.setAttribute('aria-pressed', i > -1 ? 'false' : 'true');
      render();
    });
  });
  if (finderReset) {
    finderReset.addEventListener('click', function () {
      selected = [];
      concernBtns.forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
      render();
    });
  }
  render();

  /* ---------------- product modal ---------------- */
  var modal = document.getElementById('productModal');
  var modalCard = modal ? modal.querySelector('.modal-card') : null;
  var modalImg = document.getElementById('modalImg');
  var modalEn = document.getElementById('modalEn');
  var modalTag = document.getElementById('modalTag');
  var modalTitle = document.getElementById('modalTitle');
  var modalDesc = document.getElementById('modalDesc');
  var modalSpecs = document.getElementById('modalSpecs');
  var modalChips = document.getElementById('modalChips');
  var modalPrice = document.getElementById('modalPrice');
  var modalBuy = document.getElementById('modalBuy');
  var lastFocus = null;

  function openModal(key) {
    var p = PRODUCTS[key];
    if (!p || !modal) return;
    lastFocus = document.activeElement;
    modalImg.src = p.img;
    modalImg.alt = p.full + ' 패키지';
    modalEn.textContent = p.en;
    modalTag.textContent = p.tag;
    modalTitle.textContent = p.name;
    modalDesc.textContent = p.desc;
    modalPrice.innerHTML = p.price.toLocaleString('ko-KR') + '<small>원</small>';
    modalBuy.href = p.link;
    modalChips.innerHTML = p.chips.map(function (c) { return '<li>' + c + '</li>'; }).join('');
    modalSpecs.innerHTML = p.specs.map(function (s) {
      return '<div><dt>' + s[0] + '</dt><dd>' + s[1] + '</dd></div>';
    }).join('');
    modalCard.style.setProperty('--accent', p.accent);
    modalCard.style.setProperty('--accent-deep', p.accentDeep);
    modal.hidden = false;
    document.body.classList.add('modal-open');
    requestAnimationFrame(function () { modal.classList.add('is-open'); });
    var closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus();
  }
  function closeModal() {
    if (!modal || modal.hidden) return;
    modal.classList.remove('is-open');
    document.body.classList.remove('modal-open');
    setTimeout(function () {
      modal.hidden = true;
      if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
    }, 260);
  }
  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('[data-open]');
    if (trigger) {
      e.preventDefault();
      openModal(trigger.getAttribute('data-open'));
      return;
    }
    if (e.target.closest('[data-close]')) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (!modal || modal.hidden) return;
    if (e.key === 'Escape') { closeModal(); return; }
    if (e.key === 'Tab') {
      var f = modal.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])');
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ---------------- reveal ---------------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------------- aurora canvas ---------------- */
  var canvas = document.getElementById('aurora');
  var hero = document.querySelector('.hero');
  if (canvas && hero && canvas.getContext) {
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0, raf = null, visible = true, t0 = performance.now();
    var blobs = [
      { x: .12, y: .22, r: .42, c: [111, 185, 223], sp: .00016, ph: 0 },
      { x: .78, y: .12, r: .38, c: [129, 135, 206], sp: .00019, ph: 1.7 },
      { x: .92, y: .62, r: .34, c: [79, 169, 140], sp: .00014, ph: 3.1 },
      { x: .28, y: .82, r: .30, c: [210, 160, 68], sp: .00021, ph: 4.6 }
    ];
    var dust = [];
    function resize() {
      var rect = hero.getBoundingClientRect();
      W = Math.max(1, Math.round(rect.width));
      H = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!dust.length) {
        for (var i = 0; i < 46; i++) {
          dust.push({
            x: Math.random(), y: Math.random(),
            s: .6 + Math.random() * 1.5,
            v: .00003 + Math.random() * .00006,
            a: .12 + Math.random() * .3,
            c: blobs[i % blobs.length].c
          });
        }
      }
      draw(performance.now());
    }
    function draw(now) {
      var t = (now - t0);
      ctx.clearRect(0, 0, W, H);
      blobs.forEach(function (b, i) {
        var bx = (b.x + Math.sin(t * b.sp + b.ph) * .045) * W;
        var by = (b.y + Math.cos(t * b.sp * 1.3 + b.ph) * .05) * H;
        var r = b.r * Math.max(W, H) * (.9 + Math.sin(t * b.sp * 2 + b.ph) * .06);
        var g = ctx.createRadialGradient(bx, by, 0, bx, by, r);
        g.addColorStop(0, 'rgba(' + b.c[0] + ',' + b.c[1] + ',' + b.c[2] + ',.30)');
        g.addColorStop(.55, 'rgba(' + b.c[0] + ',' + b.c[1] + ',' + b.c[2] + ',.10)');
        g.addColorStop(1, 'rgba(' + b.c[0] + ',' + b.c[1] + ',' + b.c[2] + ',0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(bx, by, r, 0, Math.PI * 2); ctx.fill();
      });
      dust.forEach(function (d) {
        d.y -= d.v * 16;
        if (d.y < -.02) { d.y = 1.02; d.x = Math.random(); }
        var dx = (d.x + Math.sin(t * .0003 + d.y * 6) * .008) * W;
        var dy = d.y * H;
        ctx.beginPath();
        ctx.fillStyle = 'rgba(' + d.c[0] + ',' + d.c[1] + ',' + d.c[2] + ',' + d.a + ')';
        ctx.arc(dx, dy, d.s, 0, Math.PI * 2);
        ctx.fill();
      });
      if (visible && !reduceMotion && !document.hidden) raf = requestAnimationFrame(draw);
    }
    resize();
    window.addEventListener('resize', function () {
      clearTimeout(resize._t);
      resize._t = setTimeout(resize, 180);
    });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          visible = e.isIntersecting;
          if (visible && !raf && !reduceMotion) { t0 = performance.now(); raf = requestAnimationFrame(draw); }
          if (!visible && raf) { cancelAnimationFrame(raf); raf = null; }
        });
      }, { threshold: 0 }).observe(hero);
    }
    if (reduceMotion) { draw(performance.now()); }
  }

  /* ---------------- smooth anchor offset for mobile ---------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h'), 10) || 72) - 12;
      window.scrollTo({ top: top, behavior: reduceMotion ? 'auto' : 'smooth' });
      history.replaceState(null, '', id);
    });
  });
})();
