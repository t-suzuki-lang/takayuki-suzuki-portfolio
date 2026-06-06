/* main.js — Suzuki Takayuki Portfolio */

/* ── カードのフェードイン (IntersectionObserver) ── */
(function initCardObserver() {
  'use strict';

  const cards = document.querySelectorAll('.card');
  if (!cards.length) return;

  /* IntersectionObserver 非対応ブラウザはすべて即表示 */
  if (!('IntersectionObserver' in window)) {
    cards.forEach(function (card) { card.classList.add('is-visible'); });
    return;
  }

  function onIntersect(entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -48px 0px',
    threshold: 0.12,
  };
  const observer = new IntersectionObserver(onIntersect, observerOptions);
  cards.forEach(function (card) { observer.observe(card); });
}());

/* ── ハンバーガーメニュー（モバイル） ── */
(function initNavToggle() {
  'use strict';

  const toggleBtn = document.querySelector('.nav__toggle');
  const navLinks  = document.querySelector('.nav__links');
  if (!toggleBtn || !navLinks) return;

  /* ボタンクリック → メニュー開閉 */
  toggleBtn.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('is-open');
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
    toggleBtn.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
  });

  /* ナビリンククリック時にメニューを閉じる */
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.setAttribute('aria-label', 'メニューを開く');
    });
  });
}());
