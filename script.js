/* 쇼핑순위연구소 — interactions */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var header = document.querySelector('.site-header');
  var progress = document.getElementById('scrollProgress');
  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('navToggle');
  var mobileBar = document.getElementById('mobileBar');

  /* ---------- header / progress / mobile bar ---------- */
  var ticking = false;

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;

    if (header) header.classList.toggle('scrolled', y > 24);
    if (progress) progress.style.width = (max > 0 ? Math.min(100, (y / max) * 100) : 0) + '%';
    if (mobileBar) mobileBar.classList.toggle('show', y > window.innerHeight * 0.7);

    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(onScroll);
    }
  }, { passive: true });

  onScroll();

  /* ---------- mobile navigation ---------- */
  function setNav(open) {
    if (!nav || !navToggle) return;
    nav.classList.toggle('open', open);
    document.body.classList.toggle('nav-open', open);
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    navToggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    document.body.style.overflow = open ? 'hidden' : '';
  }

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      setNav(!nav.classList.contains('open'));
    });
  }

  if (nav) {
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setNav(false);
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

  /* ---------- reveal on scroll ---------- */
  var revealItems = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

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
    }, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });

    revealItems.forEach(function (el) { io.observe(el); });
  }

  /* ---------- count up ---------- */
  var counters = Array.prototype.slice.call(document.querySelectorAll('.count'));
  var counted = false;

  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-target')) || 0;
    var duration = parseInt(el.getAttribute('data-duration') || '1400', 10);
    var start = null;

    if (reduce) {
      el.textContent = String(target);
      return;
    }

    function step(now) {
      if (start === null) start = now;
      var p = Math.min(1, (now - start) / duration);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(target * eased));
      if (p < 1) window.requestAnimationFrame(step);
      else el.textContent = String(target);
    }
    window.requestAnimationFrame(step);
  }

  function runCounters() {
    if (counted || !counters.length) return;
    counted = true;
    counters.forEach(animateCount);
  }

  var statsBlock = document.querySelector('.stats');
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

  /* ---------- diagnosis tabs ---------- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.sim-tab'));
  var panels = Array.prototype.slice.call(document.querySelectorAll('.sim-panel'));

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
        // restart the mock animations
        panel.style.animation = 'none';
        void panel.offsetWidth;
        panel.style.animation = '';
      }
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      selectTab(tab.getAttribute('data-tab'));
    });

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

  /* ---------- 3d tilt ---------- */
  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (canHover && !reduce) {
    document.querySelectorAll('.tilt').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
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

  /* ---------- soft parallax on hero art ---------- */
  var heroArt = document.querySelector('.hero-art-wrap');
  if (heroArt && canHover && !reduce) {
    var heroVisual = heroArt.closest('.hero-visual');
    heroVisual.addEventListener('mousemove', function (e) {
      var r = heroVisual.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5;
      var py = (e.clientY - r.top) / r.height - 0.5;
      heroArt.style.transform = 'translate3d(' + (px * -10).toFixed(1) + 'px,' + (py * -8).toFixed(1) + 'px,0)';
    });
    heroVisual.addEventListener('mouseleave', function () {
      heroArt.style.transform = '';
    });
  }
})();
