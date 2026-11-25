/* =========================================================
   Dr.Ology — brand store interactions
   Product data driven: add an object to PRODUCTS and the
   filter, cards, compare table, hero index and footer
   update automatically.
   ========================================================= */
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var stillMode = /(?:^|[?&])still=1(?:&|$)/.test(window.location.search);
  if (stillMode) document.documentElement.classList.add('still');

  /* ---------------- data ---------------- */
  var SHOP = 'https://cestlavie4705.cafe24.com/';

  var PRODUCTS = [
    {
      key: 'collagen',
      en: 'COLLAGEN',
      name: '올인원 저분자 피쉬 콜라겐 펩타이드',
      short: '콜라겐',
      category: 'general',
      foodType: '액상차',
      form: '액상 스틱',
      content: '280 g (20 g × 14포)',
      serving: '1일 1회, 1회 1포(20 g)',
      store: '1포(20 g)당',
      ingredients: '정제수, 블루베리농축액[65Brix/배합함량:블루베리 100%/미국산], 피쉬콜라겐 펩타이드(캐나다산), 비타민C(영국산), 엘라스틴(프랑스산), 히알루론산(미국산), 비오틴(프랑스산)',
      desc: '블루베리농축액에 피쉬콜라겐 펩타이드와 엘라스틴, 히알루론산, 비오틴, 비타민C를 담은 액상 스틱입니다. 스틱 한 포를 그대로 섭취합니다.',
      chips: ['피쉬콜라겐 3,000mg', '엘라스틴 100mg', '히알루론산 120mg', '비오틴 300㎍', '비타민C 200mg'],
      price: 86000,
      accent: '#6FB9DF',
      accentDeep: '#1D6E96',
      img: 'assets/collagen.jpg',
      link: 'https://cestlavie4705.cafe24.com/product/%EB%8B%A5%ED%84%B0%EC%98%AC%EB%A1%9C%EC%A7%80-%EC%98%AC%EC%9D%B8%EC%9B%90-%EC%A0%80%EB%B6%84%EC%9E%90-%ED%94%BC%EC%89%AC-%EC%BD%9C%EB%9D%BC%EA%B2%90-%EB%A7%88%EC%8B%9C%EB%8A%94-%EC%96%B4%EB%A6%B0-300%EB%8B%AC%ED%86%A4-%EC%95%A1%EC%83%81-%EC%97%98%EB%9D%BC%EC%8A%A4%ED%8B%B4-%ED%9E%88%EC%95%8C%EB%A3%A8%EB%A1%A0%EC%82%B0-%EB%B9%84%EC%98%A4%ED%8B%B4-1%EB%B0%95%EC%8A%A4/12/category/1/display/2/'
    },
    {
      key: 'melatonin',
      en: 'MELATONIN',
      name: '식물성 멜라토닌 함유 멜라니크',
      short: '멜라토닌',
      category: 'general',
      foodType: '과채가공품',
      form: '정',
      content: '500 mg × 60정 (30 g)',
      serving: '1일 1회, 1회 1정을 자기 전 충분한 물과 함께',
      store: '1정(500 mg)당',
      ingredients: '타트체리추출분말(미국산/신양벚나무열매분말 100%) 20%, 말토덱스트린, 산화마그네슘, L-트립토판, 테아닌, 옥수수전분[옥수수 100%(외국산: 러시아, 헝가리, 세르비아 등)], 시게풋(잎)추출분말, 레몬분말추출분말, 캐모마일추출분말, 대나무수액추출분말, 루브리102H, 혼합제제(주정, 정제백크라), 비타민B6염산염',
      desc: '타트체리추출분말과 식물성 멜라토닌에 L-트립토판, 테아닌, 마그네슘, 비타민B6를 담은 정제입니다. 자기 전 한 정을 충분한 물과 함께 섭취합니다.',
      chips: ['식물성 멜라토닌 2mg', 'L-트립토판 60mg', '테아닌 50mg', '마그네슘 50mg', '비타민B6 1.5mg'],
      price: 86000,
      accent: '#8187CE',
      accentDeep: '#41468F',
      img: 'assets/melatonin.jpg',
      link: 'https://cestlavie4705.cafe24.com/product/%EB%8B%A5%ED%84%B0%EC%98%AC%EB%A1%9C%EC%A7%80-%EC%8B%9D%EB%AC%BC%EC%84%B1-%EB%A9%9C%EB%9D%BC%ED%86%A0%EB%8B%8C/15/category/1/display/2/'
    },
    {
      key: 'folate',
      en: 'FOLATE',
      name: '올인원 액티브 활성 엽산 800',
      short: '엽산',
      category: 'hff',
      foodType: '건강기능식품',
      form: '정',
      content: '500 mg × 60정 (30 g)',
      serving: '1일 1회, 1일 1정을 충분한 물과 함께',
      store: '1정(500 mg)당',
      ingredients: 'Quatrefolic 활성형 엽산(5-MTHF) 800㎍ DFE, 비타민D, 비타민B1·B2·B6·B12, 비오틴, 아연, 비타민C 함유 (제품 라벨 표기)',
      desc: 'Quatrefolic 활성형 엽산 800㎍ DFE와 비타민D 1,000IU, 비타민B군·비오틴·아연·비타민C를 담은 건강기능식품입니다. 1일 1정을 충분한 물과 함께 섭취합니다.',
      chips: ['활성형 엽산 800㎍ DFE', '비타민D 1,000IU', '비타민B군', '비오틴·아연'],
      price: 86000,
      accent: '#4FA98C',
      accentDeep: '#1F6D59',
      img: 'assets/folate.jpg',
      link: 'https://cestlavie4705.cafe24.com/product/%EB%8B%A5%ED%84%B0%EC%98%AC%EB%A1%9C%EC%A7%80-%EC%97%BD%EC%82%B0/14/category/1/display/2/'
    },
    {
      key: 'glutathione',
      en: 'GLUTATHIONE',
      name: '영국산 글루타치온 비타민C',
      short: '글루타치온',
      category: 'general',
      foodType: '음료베이스',
      form: '정',
      content: '600 mg × 30정 (18 g)',
      serving: '1일 1회, 1회 1정을 충분한 물과 함께',
      store: '1정(600 mg)당',
      ingredients: 'L-글루타치온효모추출물50(영국산), 비타민C(영국산), 대나무수액추출물분말, 가공유지(유채유 100%)',
      desc: '영국산 L-글루타치온 효모추출물과 영국산 비타민C, 대나무수액추출물분말을 담은 정제입니다. 1일 1정을 충분한 물과 함께 섭취합니다.',
      chips: ['글루타치온 효모추출물 500mg', '비타민C 50mg', '영국산 원료'],
      price: 100000,
      accent: '#D2A044',
      accentDeep: '#8A6218',
      img: 'assets/glutathione.jpg',
      link: 'https://cestlavie4705.cafe24.com/product/%EB%8B%A5%ED%84%B0%EC%98%AC%EB%A1%9C%EC%A7%80-%EA%B8%80%EB%A3%A8%ED%83%80%EC%B9%98%EC%98%A8/16/category/1/display/2/'
    }
  ];

  var TYPE = {
    hff: { label: '건강기능식품', en: 'HEALTH FUNCTIONAL FOOD' },
    general: { label: '일반식품', en: 'GENERAL FOOD' }
  };

  function won(n) { return n.toLocaleString('ko-KR') + '원'; }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function typeBadge(p) {
    return '<span class="badge is-' + p.category + '">' + TYPE[p.category].label + '</span>';
  }
  function pad(n) { return String(n).padStart(2, '0'); }
  function subLine(p) {
    var parts = [TYPE[p.category].label];
    if (p.foodType && p.foodType !== TYPE[p.category].label) parts.push(p.foodType);
    if (p.form) parts.push(p.form);
    return parts.join(' · ');
  }
  function metaText(p) {
    return p.foodType && p.foodType !== TYPE[p.category].label ? p.foodType : p.form;
  }

  /* ---------------- header ---------------- */
  var header = document.getElementById('siteHeader');
  var toTop = document.getElementById('toTop');
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav a[data-nav]'));
  var navTargets = ['story', 'collection', 'types', 'compare', 'faq']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      var y = window.scrollY;
      if (header) header.classList.toggle('is-scrolled', y > 12);
      if (toTop) toTop.classList.toggle('is-visible', y > 700);

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
    if (!burger || !mobileNav) return;
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

  /* ---------------- counts / hero ---------------- */
  var counts = { all: PRODUCTS.length, hff: 0, general: 0 };
  PRODUCTS.forEach(function (p) { counts[p.category] += 1; });

  Array.prototype.forEach.call(document.querySelectorAll('[data-count]'), function (el) {
    var k = el.getAttribute('data-count');
    if (counts[k] === undefined) return;
    el.textContent = el.tagName === 'B' ? counts[k] : pad(counts[k]) + '종';
  });
  var mCountAll = document.getElementById('mCountAll');
  if (mCountAll) mCountAll.textContent = pad(counts.all);

  var heroStats = document.getElementById('heroStats');
  if (heroStats) {
    heroStats.innerHTML =
      '<div><dt>전체 제품</dt><dd>' + pad(counts.all) + '<small>종</small></dd></div>' +
      '<div><dt>건강기능식품</dt><dd>' + pad(counts.hff) + '<small>종</small></dd></div>' +
      '<div><dt>일반식품</dt><dd>' + pad(counts.general) + '<small>종</small></dd></div>';
  }

  var ciCount = document.getElementById('ciCount');
  if (ciCount) ciCount.textContent = 'TOTAL ' + pad(counts.all);
  var ciList = document.getElementById('collectionIndex');
  if (ciList) {
    ciList.innerHTML = PRODUCTS.map(function (p, i) {
      return '<li><button class="ci-item" type="button" data-open="' + p.key + '" aria-label="' + esc(p.name) + ' 상세 정보 열기">' +
        '<span class="ci-idx">' + pad(i + 1) + '</span>' +
        '<span class="ci-thumb"><img src="' + p.img + '" width="80" height="80" alt="" loading="lazy"></span>' +
        '<span class="ci-body"><span class="ci-name">' + esc(p.name) + '</span>' +
        '<span class="ci-meta">' + typeBadge(p) + '<span>' + esc(metaText(p)) + '</span></span></span>' +
        '<span class="ci-price">' + won(p.price) + '</span>' +
        '</button></li>';
    }).join('');
  }

  /* ticker */
  var ticker = document.getElementById('tickerTrack');
  if (ticker) {
    var words = ['DR.OLOGY'];
    PRODUCTS.forEach(function (p) { words.push(p.en); });
    words.push('MEDICAL DIRECTOR OWNED', 'HEALTH FUNCTIONAL FOOD', 'GENERAL FOOD');
    var seq = words.map(function (w) { return '<span>' + w + '</span><i></i>'; }).join('');
    ticker.innerHTML = seq + seq;
  }

  /* type cards */
  Array.prototype.forEach.call(document.querySelectorAll('[data-products]'), function (el) {
    var k = el.getAttribute('data-products');
    el.innerHTML = PRODUCTS.filter(function (p) { return p.category === k; })
      .map(function (p) { return '<li>' + esc(p.name) + '</li>'; }).join('');
  });

  /* footer type lines */
  var footerTypes = document.getElementById('footerTypes');
  if (footerTypes) {
    footerTypes.innerHTML = '<span>건강기능식품 ' + pad(counts.hff) + '</span><span>일반식품 ' + pad(counts.general) + '</span><span>전체 ' + pad(counts.all) + '</span>';
  }

  /* ---------------- collection state ---------------- */
  var state = { filter: 'all', query: '', sort: 'default' };
  var grid = document.getElementById('productGrid');
  var emptyBox = document.getElementById('gridEmpty');
  var resultLine = document.getElementById('resultLine');
  var filterBtns = Array.prototype.slice.call(document.querySelectorAll('.filter'));
  var searchInput = document.getElementById('searchInput');
  var searchClear = document.getElementById('searchClear');
  var sortSelect = document.getElementById('sortSelect');
  var emptyReset = document.getElementById('emptyReset');

  function matches(p) {
    if (state.filter !== 'all' && p.category !== state.filter) return false;
    if (!state.query) return true;
    var q = state.query.toLowerCase();
    var hay = [p.name, p.short, p.en, p.foodType, p.form, p.serving, p.ingredients, p.chips.join(' ')].join(' ').toLowerCase();
    return hay.indexOf(q) > -1;
  }

  function sortList(list) {
    var arr = list.slice();
    if (state.sort === 'name') {
      arr.sort(function (a, b) { return a.name.localeCompare(b.name, 'ko'); });
    } else if (state.sort === 'price-asc') {
      arr.sort(function (a, b) { return a.price - b.price; });
    } else if (state.sort === 'price-desc') {
      arr.sort(function (a, b) { return b.price - a.price; });
    }
    return arr;
  }

  function cardHTML(p, i) {
    var num = pad(PRODUCTS.indexOf(p) + 1);
    return '<article class="product-card" data-key="' + p.key + '" id="product-' + p.key + '">' +
      '<button class="card-media" type="button" data-open="' + p.key + '" aria-label="' + esc(p.name) + ' 상세 정보 열기">' +
      '<img src="' + p.img + '" width="500" height="500" alt="' + esc(p.name) + ' 패키지" loading="' + (i < 2 ? 'eager' : 'lazy') + '">' +
      typeBadge(p) +
      '</button>' +
      '<div class="card-body">' +
      '<div class="card-top"><span class="card-num">' + num + '</span><span>' + p.en + '</span></div>' +
      '<h3 class="card-name">' + esc(p.name) + '</h3>' +
      '<p class="card-sub">' + esc(subLine(p)) + '</p>' +
      '<p class="card-desc">' + esc(p.desc) + '</p>' +
      '<ul class="chip-row">' + p.chips.slice(0, 3).map(function (c) { return '<li>' + esc(c) + '</li>'; }).join('') + '</ul>' +
      '<div class="card-foot">' +
      '<p class="price">' + won(p.price) + '</p>' +
      '<div class="card-actions">' +
      '<button class="detail-btn" type="button" data-open="' + p.key + '">상세 스펙</button>' +
      '<a class="buy-btn" href="' + p.link + '" target="_blank" rel="noopener">구매</a>' +
      '</div></div></div></article>';
  }

  function renderGrid(animate) {
    var list = sortList(PRODUCTS.filter(matches));
    if (grid) {
      grid.innerHTML = list.map(cardHTML).join('');
      if (animate) {
        Array.prototype.forEach.call(grid.children, function (el, i) {
          if (!reduceMotion) {
            el.style.animationDelay = (i * 45) + 'ms';
            el.classList.add('is-new');
          }
        });
      }
    }
    if (emptyBox) emptyBox.hidden = list.length > 0;
    if (resultLine) {
      var filterLabel = state.filter === 'all' ? '전체' : TYPE[state.filter].label;
      var parts = [filterLabel];
      if (state.query) parts.push('“' + state.query + '” 검색');
      resultLine.textContent = parts.join(' · ') + ' — ' + list.length + '개 제품';
    }
  }

  filterBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      state.filter = b.getAttribute('data-filter');
      filterBtns.forEach(function (x) {
        var on = x === b;
        x.classList.toggle('is-active', on);
        x.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      renderGrid(true);
    });
  });

  function setFilter(key, scroll) {
    state.filter = key;
    filterBtns.forEach(function (x) {
      var on = x.getAttribute('data-filter') === key;
      x.classList.toggle('is-active', on);
      x.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    renderGrid(true);
    if (scroll) {
      var target = document.getElementById('collection');
      if (target) {
        var h = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h'), 10) || 72;
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - h - 12, behavior: reduceMotion ? 'auto' : 'smooth' });
        history.replaceState(null, '', '#collection');
      }
    }
  }

  Array.prototype.forEach.call(document.querySelectorAll('[data-filter-link]'), function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      setMenu(false);
      setFilter(a.getAttribute('data-filter-link'), true);
    });
  });

  if (searchInput) {
    var debounce;
    searchInput.addEventListener('input', function () {
      clearTimeout(debounce);
      debounce = setTimeout(function () {
        state.query = searchInput.value.trim();
        if (searchClear) searchClear.hidden = !state.query;
        renderGrid(true);
      }, 130);
    });
  }
  if (searchClear) {
    searchClear.addEventListener('click', function () {
      if (searchInput) { searchInput.value = ''; searchInput.focus(); }
      state.query = '';
      searchClear.hidden = true;
      renderGrid(true);
    });
  }
  if (sortSelect) {
    sortSelect.addEventListener('change', function () {
      state.sort = sortSelect.value;
      renderGrid(true);
    });
  }
  if (emptyReset) {
    emptyReset.addEventListener('click', function () {
      state.filter = 'all'; state.query = ''; state.sort = 'default';
      if (searchInput) searchInput.value = '';
      if (searchClear) searchClear.hidden = true;
      if (sortSelect) sortSelect.value = 'default';
      filterBtns.forEach(function (x) {
        var on = x.getAttribute('data-filter') === 'all';
        x.classList.toggle('is-active', on);
        x.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      renderGrid(true);
    });
  }

  /* ---------------- compare table ---------------- */
  var table = document.getElementById('compareTable');
  if (table) {
    var head = table.querySelector('thead');
    var body = table.querySelector('tbody');
    var rows = [
      ['식품유형', function (p) { return p.foodType; }],
      ['성상', function (p) { return p.form; }],
      ['내용량', function (p) { return p.content; }],
      ['섭취 방법', function (p) { return p.serving; }],
      ['주요 원료', function (p) { return p.chips.join('<br>'); }],
      ['가격', function (p) { return '<span class="td-price">' + won(p.price) + '</span>'; }]
    ];
    head.innerHTML = '<tr><th scope="col" class="row-head">구분</th>' + PRODUCTS.map(function (p) {
      return '<th scope="col" data-c="' + p.key + '" style="--th-accent:' + p.accent + '">' +
        '<span class="th-en">' + p.en + '</span>' +
        '<button class="th-name" type="button" data-open="' + p.key + '">' + esc(p.name) + '</button>' +
        '<span class="th-type">' + typeBadge(p) + '</span></th>';
    }).join('') + '</tr>';

    body.innerHTML = rows.map(function (r) {
      var label = r[0], fn = r[1];
      return '<tr><th scope="row">' + label + '</th>' + PRODUCTS.map(function (p) {
        return '<td>' + fn(p) + '</td>';
      }).join('') + '</tr>';
    }).join('') + '<tr><th scope="row">구매</th>' + PRODUCTS.map(function (p) {
      return '<td><a class="table-buy" href="' + p.link + '" target="_blank" rel="noopener">구매하기</a></td>';
    }).join('') + '</tr>';
  }

  /* ---------------- product modal ---------------- */
  var modal = document.getElementById('productModal');
  var modalCard = modal ? modal.querySelector('.modal-card') : null;
  var modalImg = document.getElementById('modalImg');
  var modalEn = document.getElementById('modalEn');
  var modalType = document.getElementById('modalType');
  var modalTag = document.getElementById('modalTag');
  var modalTitle = document.getElementById('modalTitle');
  var modalDesc = document.getElementById('modalDesc');
  var modalSpecs = document.getElementById('modalSpecs');
  var modalChips = document.getElementById('modalChips');
  var modalPrice = document.getElementById('modalPrice');
  var modalBuy = document.getElementById('modalBuy');
  var modalNote = document.getElementById('modalNote');
  var lastFocus = null;

  function byKey(key) {
    for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].key === key) return PRODUCTS[i];
    return null;
  }

  function openModal(key) {
    var p = byKey(key);
    if (!p || !modal) return;
    lastFocus = document.activeElement;
    modalImg.src = p.img;
    modalImg.alt = p.name + ' 패키지';
    modalEn.textContent = p.en;
    modalType.innerHTML = typeBadge(p);
    modalTag.textContent = p.en + ' · ' + p.foodType;
    modalTitle.textContent = p.name;
    modalDesc.textContent = p.desc;
    modalPrice.innerHTML = p.price.toLocaleString('ko-KR') + '<small>원</small>';
    modalBuy.href = p.link;
    modalChips.innerHTML = p.chips.map(function (c) { return '<li>' + esc(c) + '</li>'; }).join('');

    var specs = [
      ['제품 유형', TYPE[p.category].label],
      ['식품유형', p.foodType],
      ['성상', p.form],
      ['내용량', p.content],
      ['섭취 방법', p.serving],
      ['원재료·주요 성분', p.ingredients]
    ];
    modalSpecs.innerHTML = specs.map(function (s) {
      var long = s[1].length > 40 ? ' class="is-long"' : '';
      return '<div><dt>' + s[0] + '</dt><dd' + long + '>' + esc(s[1]) + '</dd></div>';
    }).join('');

    modalNote.textContent = p.category === 'hff'
      ? '건강기능식품 · 기능성 내용과 섭취 시 주의사항은 제품 라벨 표기를 확인하세요. 질병의 예방 및 치료를 위한 의약품이 아닙니다.'
      : '일반식품(' + p.foodType + ') · 기능성·효능을 표시하지 않습니다. 배송비 3,000원 · 60,000원 이상 무료 · 배송 3~7일';

    if (modalCard) {
      modalCard.style.setProperty('--accent', p.accent);
      modalCard.style.setProperty('--accent-deep', p.accentDeep);
    }
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
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in window && !reduceMotion && !stillMode) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------------- initial render ---------------- */
  if (stillMode) {
    document.querySelectorAll('.ticker-track').forEach(function (el) { el.style.animation = 'none'; });
  }
  renderGrid(false);

  /* ---------------- aurora canvas ---------------- */
  var canvas = document.getElementById('aurora');
  var hero = document.querySelector('.hero');
  if (canvas && hero && canvas.getContext && !stillMode) {
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0, raf = null, visible = true, t0 = performance.now();
    var blobs = [
      { x: .12, y: .22, r: .44, c: [111, 185, 223], sp: .00016, ph: 0 },
      { x: .78, y: .12, r: .40, c: [176, 138, 82], sp: .00019, ph: 1.7 },
      { x: .92, y: .62, r: .34, c: [79, 169, 140], sp: .00014, ph: 3.1 },
      { x: .28, y: .82, r: .30, c: [129, 135, 206], sp: .00021, ph: 4.6 }
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
        for (var i = 0; i < 44; i++) {
          dust.push({
            x: Math.random(), y: Math.random(),
            s: .6 + Math.random() * 1.5,
            v: .00003 + Math.random() * .00006,
            a: .12 + Math.random() * .28,
            c: blobs[i % blobs.length].c
          });
        }
      }
      draw(performance.now());
    }
    function draw(now) {
      var t = (now - t0);
      ctx.clearRect(0, 0, W, H);
      blobs.forEach(function (b) {
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

  /* ---------------- smooth anchor offset ---------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    if (a.hasAttribute('data-filter-link')) return;
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
