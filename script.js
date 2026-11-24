/* 쇼핑순위연구소 — interactions
   v13: canvas network, interactive diagnosis lab, before/after slider,
   solution accordions, consult modal, copy toast, back-to-top, parallax */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  var raf = window.requestAnimationFrame || function (f) { return setTimeout(function () { f(Date.now()); }, 16); };

  var header = $('.site-header');
  var progress = $('#scrollProgress');
  var nav = $('#nav');
  var navToggle = $('#navToggle');
  var mobileBar = $('#mobileBar');
  var toTop = $('#toTop');

  /* ======================================================================
     header / scroll progress / mobile bar / to-top
     ====================================================================== */
  var ticking = false;

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;

    if (header) header.classList.toggle('scrolled', y > 24);
    if (progress) progress.style.width = (max > 0 ? Math.min(100, (y / max) * 100) : 0) + '%';
    if (mobileBar) mobileBar.classList.toggle('show', y > window.innerHeight * 0.7);
    if (toTop) toTop.classList.toggle('show', y > 620);

    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; raf(onScroll); }
  }, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });
  }

  /* ======================================================================
     mobile navigation
     ====================================================================== */
  function setNav(open) {
    if (!nav || !navToggle) return;
    nav.classList.toggle('open', open);
    document.body.classList.toggle('nav-open', open);
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    navToggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    document.body.style.overflow = open ? 'hidden' : '';
  }

  if (navToggle) {
    navToggle.addEventListener('click', function () { setNav(!nav.classList.contains('open')); });
  }

  if (nav) {
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a') || e.target.closest('button')) {
        var isModalBtn = e.target.closest('[data-open-consult]');
        setNav(false);
        if (isModalBtn) openModal();
      }
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav && nav.classList.contains('open')) setNav(false);
  });

  document.addEventListener('click', function (e) {
    if (!nav || !nav.classList.contains('open')) return;
    if (e.target.closest('#nav') || e.target.closest('#navToggle')) return;
    setNav(false);
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 960 && nav && nav.classList.contains('open')) setNav(false);
  });

  /* ======================================================================
     reveal on scroll
     ====================================================================== */
  var revealItems = $$('.reveal');

  if (reduce || !('IntersectionObserver' in window)) {
    revealItems.forEach(function (el) { el.classList.add('in'); });
    runCounters();
  } else {
    revealItems.forEach(function (el) {
      var delay = parseInt(el.getAttribute('data-delay') || '0', 10);
      el.style.transitionDelay = delay + 'ms';
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    revealItems.forEach(function (el) { io.observe(el); });
  }

  /* ======================================================================
     count up
     ====================================================================== */
  var counters = $$('.count');
  var counted = false;

  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-target')) || 0;
    var duration = parseInt(el.getAttribute('data-duration') || '1400', 10);
    var start = null;

    if (reduce) { el.textContent = String(target); return; }

    function step(now) {
      if (start === null) start = now;
      var p = Math.min(1, (now - start) / duration);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(target * eased));
      if (p < 1) raf(step);
      else el.textContent = String(target);
    }
    raf(step);
  }

  function runCounters() {
    if (counted || !counters.length) return;
    counted = true;
    counters.forEach(animateCount);
  }

  var statsBlock = $('.stats');
  if (statsBlock && 'IntersectionObserver' in window && !reduce) {
    var statsIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        runCounters();
        statsIO.disconnect();
      });
    }, { threshold: 0.3 });
    statsIO.observe(statsBlock);
  }

  /* ======================================================================
     hero canvas — data node network
     ====================================================================== */
  (function heroCanvas() {
    var cv = $('#heroCanvas');
    if (!cv || !cv.getContext) return;
    var ctx = cv.getContext('2d');
    if (!ctx) return;

    var hero = cv.parentElement;
    var W = 0, H = 0, nodes = [], running = false, frameId = 0, inView = true;

    function rnd(a, b) { return a + Math.random() * (b - a); }

    function build() {
      var small = W < 780;
      var count = small ? 16 : clamp(Math.round((W * H) / 26000), 26, 54);
      nodes = [];
      for (var i = 0; i < count; i++) {
        nodes.push({
          x: rnd(0, W),
          y: rnd(0, H),
          vx: rnd(-0.16, 0.16),
          vy: rnd(-0.16, 0.16),
          r: rnd(1, 2.5),
          ph: rnd(0.5, 1.5),
          seed: rnd(0, Math.PI * 2)
        });
      }
    }

    function paint(t) {
      ctx.clearRect(0, 0, W, H);
      var link = W < 780 ? 118 : 152;
      var i, j, a, b, dx, dy, d, alpha, n, pulse;

      for (i = 0; i < nodes.length; i++) {
        a = nodes[i];
        if (!reduce) {
          a.x += a.vx; a.y += a.vy;
          if (a.x < -24) a.x = W + 24; else if (a.x > W + 24) a.x = -24;
          if (a.y < -24) a.y = H + 24; else if (a.y > H + 24) a.y = -24;
        }
        for (j = i + 1; j < nodes.length; j++) {
          b = nodes[j];
          dx = a.x - b.x; dy = a.y - b.y;
          d = Math.sqrt(dx * dx + dy * dy);
          if (d < link) {
            alpha = (1 - d / link) * 0.3;
            ctx.strokeStyle = 'rgba(118,158,255,' + alpha.toFixed(3) + ')';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (i = 0; i < nodes.length; i++) {
        n = nodes[i];
        pulse = reduce ? 1 : (0.6 + 0.4 * Math.sin((t / 1000) * n.ph + n.seed));
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * (0.85 + 0.4 * pulse), 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(150,205,255,' + (0.26 + 0.34 * pulse).toFixed(3) + ')';
        ctx.fill();
        if (n.r > 1.9) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r * 5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(56,214,255,0.05)';
          ctx.fill();
        }
      }
    }

    function loop(t) {
      paint(t);
      frameId = raf(loop);
    }

    function start() {
      if (reduce || running || !inView || document.hidden) return;
      running = true;
      frameId = raf(loop);
    }

    function stop() {
      running = false;
      if (frameId) { cancelAnimationFrame(frameId); frameId = 0; }
    }

    function resize() {
      var dpr = Math.min(2, window.devicePixelRatio || 1);
      var rect = hero.getBoundingClientRect();
      W = Math.max(1, Math.round(rect.width));
      H = Math.max(1, Math.round(rect.height));
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      cv.style.width = W + 'px';
      cv.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
      paint(0);
    }

    resize();

    var rz;
    window.addEventListener('resize', function () {
      clearTimeout(rz);
      rz = setTimeout(resize, 180);
    });

    if (reduce) {
      paint(0);
      return;
    }

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        inView = entries[0].isIntersecting;
        if (inView) start(); else stop();
      }, { threshold: 0.02 }).observe(hero);
    } else {
      start();
    }

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop(); else start();
    });
  })();

  /* ======================================================================
     diagnosis lab — interactive simulator
     ====================================================================== */
  var CATS = {
    fashion: {
      label: '패션·의류',
      sample: '원피스',
      base: { fit: 80, pop: 63, trust: 51 },
      checks: [
        function (k) { return '‘' + k + '’ 검색 상위 상품명에 공통으로 쓰인 단어를 뽑아 상품명 앞쪽부터 맞춥니다.'; },
        function () { return '카테고리·속성(소재·핏·계절) 태그를 12개 이상 채웁니다.'; },
        function () { return '상세 첫 화면에서 사이즈·모델 정보를 3초 안에 보여줍니다.'; },
        function () { return '리뷰 수와 최근 30일 리뷰 증가 속도를 함께 확인합니다.'; }
      ]
    },
    living: {
      label: '리빙·생활',
      sample: '캠핑의자',
      base: { fit: 73, pop: 70, trust: 58 },
      checks: [
        function (k) { return '‘' + k + '’의 사용 상황(실내·야외, 인원, 계절)을 상품명과 속성에 함께 적습니다.'; },
        function () { return '규격·재질·무게를 표 형태로 정리해 비교 검색에 대응합니다.'; },
        function () { return '배송·설치 조건과 A/S 안내를 상세 상단에 배치합니다.'; },
        function () { return '묶음·세트 옵션으로 객단가와 리뷰 수를 함께 올립니다.'; }
      ]
    },
    beauty: {
      label: '뷰티·소품',
      sample: '수분크림',
      base: { fit: 84, pop: 72, trust: 46 },
      checks: [
        function (k) { return '‘' + k + '’의 효능·피부 타입·용량을 상품명 뒤쪽에 명확히 붙입니다.'; },
        function () { return '전성분·사용법을 텍스트로 충분히 적습니다(이미지 속 글자는 검색되지 않습니다).'; },
        function () { return '샘플·체험 흐름을 설계해 초기 리뷰를 확보합니다.'; },
        function () { return '정기배송·재구매 옵션과 필수 인증 표기를 확인합니다.'; }
      ]
    }
  };

  var simForm = $('#simForm');
  var simInput = $('#simKeyword');
  var lab = $('#lab');
  var labResult = $('.lab-result');
  var labKw = $('#labKw');
  var labTime = $('#labTime');
  var labTotal = $('#labTotal');
  var labGrade = $('#labGrade');
  var labChecks = $('#labChecks');
  var labSparkLine = $('#labSparkLine');
  var labSparkArea = $('#labSparkArea');
  var labSparkDot = $('#labSparkDot');
  var labRadarPoly = $('#labRadarPoly');
  var dataRadarPoly = $('#dataRadarPoly');

  var catKey = 'fashion';
  var labVals = [82, 64, 47];
  var dataVals = [0, 0, 0];
  var heroSparkVals = [58, 52, 55, 43, 38, 26, 12];

  function hashStr(s) {
    var h = 2166136261;
    for (var i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul ? Math.imul(h, 16777619) : (h * 16777619);
    }
    return h >>> 0;
  }

  function seeded(seed) {
    var t = seed >>> 0;
    return function () {
      t += 0x6D2B79F5;
      var r = Math.imul(t ^ (t >>> 15), t | 1);
      r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
      return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
  }

  function computeMetrics(keyword, key) {
    var cat = CATS[key];
    var rand = seeded(hashStr(keyword + '|' + key));
    var jitter = function (base, span) { return Math.round(clamp(base + (rand() * 2 - 1) * span, 24, 96)); };
    return {
      fit: jitter(cat.base.fit, 9),
      pop: jitter(cat.base.pop, 13),
      trust: jitter(cat.base.trust, 12)
    };
  }

  function totalOf(m) { return Math.round(m.fit * 0.4 + m.pop * 0.32 + m.trust * 0.28); }

  function gradeOf(total) {
    if (total >= 80) return { text: '양호', cls: '' };
    if (total >= 66) return { text: '보완 필요', cls: 'is-mid' };
    return { text: '우선 개선', cls: 'is-low' };
  }

  function stateOf(v) {
    if (v >= 75) return { text: '좋음', cls: '' };
    if (v >= 60) return { text: '보통', cls: 'is-mid' };
    return { text: '낮음', cls: 'is-low' };
  }

  function tweenNum(el, to, dur) {
    if (!el) return;
    var from = parseFloat(String(el.textContent).replace(/[^\d.-]/g, '')) || 0;
    if (reduce || Math.abs(from - to) < 0.5 || !dur) { el.textContent = String(to); return; }
    var t0 = null;
    function step(now) {
      if (t0 === null) t0 = now;
      var p = Math.min(1, (now - t0) / dur);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(from + (to - from) * e));
      if (p < 1) raf(step);
    }
    raf(step);
  }

  function triPoints(vals, cx, cy, r) {
    var pts = [];
    for (var i = 0; i < 3; i++) {
      var a = (-90 + i * 120) * Math.PI / 180;
      var d = r * Math.max(0.16, vals[i] / 100);
      pts.push((cx + d * Math.cos(a)).toFixed(1) + ',' + (cy + d * Math.sin(a)).toFixed(1));
    }
    return pts.join(' ');
  }

  function setPolyInstant(el, vals, cx, cy, r) {
    if (el) el.setAttribute('points', triPoints(vals, cx, cy, r));
  }

  function tweenPoly(el, from, to, cx, cy, r, dur) {
    if (!el) return;
    if (reduce || !dur) { setPolyInstant(el, to, cx, cy, r); return; }
    var t0 = null;
    function step(now) {
      if (t0 === null) t0 = now;
      var p = Math.min(1, (now - t0) / (dur || 720));
      var e = 1 - Math.pow(1 - p, 3);
      var cur = [];
      for (var i = 0; i < 3; i++) cur.push(from[i] + (to[i] - from[i]) * e);
      el.setAttribute('points', triPoints(cur, cx, cy, r));
      if (p < 1) raf(step);
    }
    raf(step);
  }

  function sparkD(vals, x0, y0, w, h) {
    var n = vals.length, pts = [], i;
    for (i = 0; i < n; i++) pts.push([x0 + (w * i) / (n - 1), y0 + h - (clamp(vals[i], 2, 100) / 100) * h]);
    var d = 'M' + pts[0][0].toFixed(1) + ' ' + pts[0][1].toFixed(1);
    for (i = 1; i < n; i++) {
      var p0 = pts[i - 1], p1 = pts[i], mx = ((p0[0] + p1[0]) / 2).toFixed(1);
      d += ' C' + mx + ' ' + p0[1].toFixed(1) + ' ' + mx + ' ' + p1[1].toFixed(1) + ' ' + p1[0].toFixed(1) + ' ' + p1[1].toFixed(1);
    }
    return { d: d, last: pts[n - 1] };
  }

  function sparkVals(m, rand) {
    var out = [], start = clamp(m.trust * 0.55 + 12, 14, 58), end = clamp(m.fit * 0.98, 32, 96);
    for (var i = 0; i < 7; i++) {
      var t = i / 6, e = Math.pow(t, 0.85);
      out.push(clamp(start + (end - start) * e + (rand() * 2 - 1) * 5, 8, 98));
    }
    return out;
  }

  function drawSpark(lineEl, areaEl, dotEl, vals, box) {
    if (!lineEl) return;
    var res = sparkD(vals, box.x, box.y, box.w, box.h);
    lineEl.setAttribute('d', res.d);
    if (areaEl) areaEl.setAttribute('d', res.d + ' L' + (box.x + box.w).toFixed(1) + ' ' + (box.y + box.h + 8) + ' L' + box.x + ' ' + (box.y + box.h + 8) + ' Z');
    if (dotEl) {
      dotEl.setAttribute('cx', res.last[0].toFixed(1));
      dotEl.setAttribute('cy', res.last[1].toFixed(1));
    }
    if (!reduce) {
      var len = 460;
      lineEl.style.transition = 'none';
      lineEl.style.strokeDasharray = len;
      lineEl.style.strokeDashoffset = len;
      void lineEl.getBoundingClientRect();
      lineEl.style.transition = 'stroke-dashoffset 1.1s cubic-bezier(.16,1,.3,1)';
      lineEl.style.strokeDashoffset = '0';
    }
  }

  function renderChecks(keyword, key, animate) {
    if (!labChecks) return;
    var cat = CATS[key];
    labChecks.innerHTML = '';
    cat.checks.forEach(function (fn, i) {
      var li = document.createElement('li');
      li.textContent = fn(keyword);
      if (!animate || reduce) li.style.animation = 'none';
      else li.style.animationDelay = (i * 70) + 'ms';
      labChecks.appendChild(li);
    });
  }

  function updateHero(m, spark) {
    var map = { fit: m.fit, pop: m.pop, trust: m.trust };
    Object.keys(map).forEach(function (k) {
      var bar = $('[data-hero-bar="' + k + '"]');
      var val = $('[data-hero-val="' + k + '"]');
      if (bar) bar.style.setProperty('--w', map[k] + '%');
      if (val) tweenNum(val, map[k], 700);
    });
    var dash = $('#heroDash');
    if (dash) dash.classList.add('is-live');
    drawSpark($('#heroSparkLine'), $('#heroSparkArea'), $('#heroSparkDot'), spark, { x: 4, y: 6, w: 264, h: 52 });
    var sub = $('#heroDashSub');
    if (sub) sub.textContent = '스마트스토어 · ' + (simInput && simInput.value.trim() ? simInput.value.trim() : CATS.fashion.sample) + ' 진단';
  }

  function runSim(opts) {
    opts = opts || {};
    if (!simInput || !CATS[catKey]) return;

    var keyword = (simInput.value || '').trim();
    if (!keyword) {
      keyword = CATS[catKey].sample;
      simInput.value = keyword;
    }

    var m = computeMetrics(keyword, catKey);
    var total = totalOf(m);
    var grade = gradeOf(total);
    var rand = seeded(hashStr(keyword + '#spark'));
    var spark = sparkVals(m, rand);

    // hero card
    updateHero(m, spark);

    // lab bars + numbers + states
    var prevLab = labVals.slice();
    ['fit', 'pop', 'trust'].forEach(function (k, i) {
      var bar = $('[data-lab-bar="' + k + '"]');
      var val = $('[data-lab-val="' + k + '"]');
      var state = $('[data-lab-state="' + k + '"]');
      var v = m[k];
      if (bar) bar.style.setProperty('--w', v + '%');
      if (val) tweenNum(val, v, 700);
      if (state) {
        var st = stateOf(v);
        state.textContent = st.text;
        state.className = 'lg-state' + (st.cls ? ' ' + st.cls : '');
      }
      labVals[i] = v;
    });

    // radial + totals
    if (labTotal) tweenNum(labTotal, total, 750);
    if (labGrade) {
      labGrade.textContent = grade.text;
      labGrade.className = 'lab-score-chip' + (grade.cls ? ' ' + grade.cls : '');
    }
    if (labKw) labKw.textContent = keyword + ' · ' + CATS[catKey].label;
    if (labTime) labTime.textContent = '방금 실행';

    // charts
    drawSpark(labSparkLine, labSparkArea, labSparkDot, spark, { x: 4, y: 6, w: 232, h: 58 });
    tweenPoly(labRadarPoly, prevLab, [m.fit, m.pop, m.trust], 110, 104, 72, 780);

    if (dataRadarPoly) {
      var prev = dataVals.slice();
      var next = [m.fit, m.pop, m.trust];
      tweenPoly(dataRadarPoly, prev, next, 130, 110, 78, 820);
      dataVals = next;
    }

    renderChecks(keyword, catKey, !opts.silent);

    // scan flash
    if (labResult && !reduce) {
      labResult.classList.remove('is-running');
      void labResult.offsetWidth;
      labResult.classList.add('is-running');
      setTimeout(function () { labResult.classList.remove('is-running'); }, 900);
    }
  }

  // category buttons
  $$('.lab-cat').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var key = btn.getAttribute('data-cat');
      if (!CATS[key]) return;
      catKey = key;
      $$('.lab-cat').forEach(function (b) {
        var active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
      var cur = (simInput.value || '').trim();
      var isSample = Object.keys(CATS).some(function (k) { return CATS[k].sample === cur; });
      if (!cur || isSample) simInput.value = CATS[key].sample;
      runSim();
    });
  });

  if (simForm) {
    simForm.addEventListener('submit', function (e) {
      e.preventDefault();
      runSim();
    });
  }

  // marquee keyword badges
  $$('.kw-pill').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var kw = btn.getAttribute('data-kw') || '';
      if (!simInput) return;
      simInput.value = kw;
      var target = $('#sim');
      if (target) {
        var y = target.getBoundingClientRect().top + (window.scrollY || window.pageYOffset) - 84;
        window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' });
      }
      runSim();
      if (lab) {
        lab.classList.remove('is-flash');
        void lab.offsetWidth;
        lab.classList.add('is-flash');
        setTimeout(function () { lab.classList.remove('is-flash'); }, 1200);
      }
    });
  });

  // initial paint
  setPolyInstant(dataRadarPoly, [63, 73, 58], 130, 110, 78);
  dataVals = [63, 73, 58];
  setPolyInstant(labRadarPoly, labVals, 110, 104, 72);
  runSim({ silent: true });

  /* ======================================================================
     before / after comparison slider
     ====================================================================== */
  (function compareWidget() {
    var stage = $('#cmpStage');
    var range = $('#cmpRange');
    var toggle = $('#cmpToggle');
    if (!stage || !range || !toggle) return;

    var touched = false;

    function apply(p) {
      p = clamp(Math.round(p), 0, 100);
      stage.style.setProperty('--p', p + '%');
      if (String(range.value) !== String(p)) range.value = p;
      range.setAttribute('aria-valuetext', p + '퍼센트');
      var showAfter = p >= 50;
      toggle.setAttribute('aria-pressed', showAfter ? 'true' : 'false');
      toggle.textContent = showAfter ? '정비 전 화면 전체 보기' : '정비 후 화면 전체 보기';
    }

    range.addEventListener('input', function () {
      touched = true;
      apply(parseFloat(range.value));
    });

    toggle.addEventListener('click', function () {
      touched = true;
      apply(parseFloat(range.value) >= 50 ? 6 : 96);
    });

    apply(parseFloat(range.value) || 52);

    if (reduce || !('IntersectionObserver' in window)) return;

    var demoIO = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      demoIO.disconnect();
      if (touched) return;
      var start = null, dur = 1500;
      function step(now) {
        if (touched) return;
        if (start === null) start = now;
        var p = Math.min(1, (now - start) / dur);
        var v = 52 + Math.sin(p * Math.PI) * 22;
        apply(v);
        if (p < 1) raf(step);
        else apply(52);
      }
      setTimeout(function () { if (!touched) raf(step); }, 420);
    }, { threshold: 0.55 });
    demoIO.observe(stage);
  })();

  /* ======================================================================
     solution cards — expandable detail
     ====================================================================== */
  $$('.sol-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var card = btn.closest('.sol-card');
      if (!card) return;
      var open = !card.classList.contains('is-open');
      card.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      var label = btn.querySelector('span');
      if (label) label.textContent = open ? '적용 포인트 접기' : '적용 포인트 보기';
    });
  });

  /* ======================================================================
     consult modal + copy toast
     ====================================================================== */
  var modal = $('#consultModal');
  var lastFocus = null;
  var toastEl = $('#toast');
  var toastTimer = 0;

  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 2600);
  }

  function openModal() {
    if (!modal) return;
    lastFocus = document.activeElement;
    modal.removeAttribute('hidden');
    raf(function () { modal.classList.add('is-open'); });
    document.body.classList.add('modal-open');
    var first = modal.querySelector('.modal-close');
    if (first) setTimeout(function () { first.focus({ preventScroll: true }); }, 60);
  }

  function closeModal() {
    if (!modal || !modal.classList.contains('is-open')) return;
    modal.classList.remove('is-open');
    document.body.classList.remove('modal-open');
    setTimeout(function () {
      if (!modal.classList.contains('is-open')) modal.setAttribute('hidden', '');
    }, 220);
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }

  $$('[data-open-consult]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      openModal();
    });
  });

  $$('[data-close-modal]').forEach(function (el) {
    el.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', function (e) {
    if (!modal || !modal.classList.contains('is-open')) return;
    if (e.key === 'Escape') { closeModal(); return; }
    if (e.key !== 'Tab') return;
    var focusables = $$('a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])', modal)
      .filter(function (el) { return el.offsetParent !== null; });
    if (!focusables.length) return;
    var first = focusables[0], last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  function legacyCopy(text) {
    try {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.top = '-1000px';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      ta.setSelectionRange(0, text.length);
      var ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch (err) { return false; }
  }

  function copyPhone(btn) {
    var text = '010-7612-9292';
    var finish = function (ok) {
      if (ok) {
        showToast('상담번호가 복사되었습니다');
        if (btn) {
          btn.classList.add('copied');
          setTimeout(function () { btn.classList.remove('copied'); }, 1800);
        }
      } else {
        showToast('복사가 안 되면 010 7612 9292 로 전화 주세요');
      }
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { finish(true); }, function () { finish(legacyCopy(text)); });
    } else {
      finish(legacyCopy(text));
    }
  }

  $$('[data-copy-phone]').forEach(function (btn) {
    btn.addEventListener('click', function () { copyPhone(btn); });
  });

  /* ======================================================================
     diagnosis tabs
     ====================================================================== */
  var tabs = $$('.sim-tab');
  var panels = $$('.sim-panel');

  function selectTab(id) {
    tabs.forEach(function (tab) {
      var active = tab.getAttribute('data-tab') === id;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
      tab.setAttribute('tabindex', active ? '0' : '-1');
    });
    panels.forEach(function (panel) {
      var active = panel.id === 'panel' + id;
      panel.classList.toggle('is-active', active);
      if (active) {
        panel.style.animation = 'none';
        void panel.offsetWidth;
        panel.style.animation = '';
      }
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () { selectTab(tab.getAttribute('data-tab')); });

    tab.addEventListener('keydown', function (e) {
      var i = tabs.indexOf(tab);
      var next = null;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
      if (!next) return;
      e.preventDefault();
      selectTab(next.getAttribute('data-tab'));
      next.focus();
    });
  });

  /* ======================================================================
     3d tilt + spotlight glow
     ====================================================================== */
  if (canHover && !reduce) {
    $$('.tilt').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        card.style.setProperty('--mx', (e.clientX - r.left).toFixed(0) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top).toFixed(0) + 'px');
        card.style.transition = 'transform .18s ease-out, box-shadow .4s ease, border-color .4s';
        card.style.transform =
          'perspective(900px) rotateX(' + (-py * 4).toFixed(2) + 'deg) rotateY(' +
          (px * 4).toFixed(2) + 'deg) translateY(-5px)';
      });

      card.addEventListener('mouseleave', function () {
        card.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1), box-shadow .4s ease, border-color .4s';
        card.style.transform = '';
      });
    });
  }

  /* ======================================================================
     hero art pointer parallax + scroll parallax
     ====================================================================== */
  var heroArt = $('.hero-art-wrap');
  if (heroArt && canHover && !reduce) {
    var heroVisual = heroArt.closest('.hero-visual');
    heroVisual.addEventListener('mousemove', function (e) {
      var r = heroVisual.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5;
      var py = (e.clientY - r.top) / r.height - 0.5;
      heroArt.style.transform = 'translate3d(' + (px * -10).toFixed(1) + 'px,' + (py * -8).toFixed(1) + 'px,0)';
    });
    heroVisual.addEventListener('mouseleave', function () { heroArt.style.transform = ''; });
  }

  var pxItems = $$('[data-parallax]');
  if (pxItems.length && !reduce) {
    var pxTicking = false;
    var updatePx = function () {
      pxItems.forEach(function (el) {
        var sp = parseFloat(el.getAttribute('data-parallax')) || 0.05;
        var r = el.getBoundingClientRect();
        var mid = r.top + r.height / 2 - window.innerHeight / 2;
        el.style.transform = 'translate3d(0,' + (-mid * sp).toFixed(1) + 'px,0)';
      });
      pxTicking = false;
    };
    window.addEventListener('scroll', function () {
      if (!pxTicking) { pxTicking = true; raf(updatePx); }
    }, { passive: true });
    updatePx();
  }
})();
