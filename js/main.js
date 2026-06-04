/**
 * main.js — Portfolio Site
 *
 * 1. IntersectionObserver: .card に .is-visible を付与してフェードインアニメーションを発火
 * 2. スムーススクロール: data-scroll-to 属性を持つリンクに対応
 */

/* ============================================================
   1. IntersectionObserver — Card Fade-In Animation
   ============================================================ */
(function initCardObserver() {
  'use strict';

  /** 監視対象のカード要素をすべて取得 */
  var cards = document.querySelectorAll('.card');

  if (!cards.length) return;

  /** IntersectionObserver 非対応ブラウザへのフォールバック */
  if (!('IntersectionObserver' in window)) {
    cards.forEach(function (card) {
      card.classList.add('is-visible');
    });
    return;
  }

  /**
   * コールバック: 交差したカードに .is-visible を付与し、
   * 付与後は監視を解除してパフォーマンスを確保する
   *
   * @param {IntersectionObserverEntry[]} entries
   * @param {IntersectionObserver} observer
   */
  function onIntersect(entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }

  /** オブザーバーの設定 */
  var observerOptions = {
    root: null,          // ビューポートを基準
    rootMargin: '0px 0px -48px 0px', // 下方向に48px手前でトリガー
    threshold: 0.12      // 12% 見えたら発火
  };

  var observer = new IntersectionObserver(onIntersect, observerOptions);

  /** 各カードを監視登録 */
  cards.forEach(function (card) {
    observer.observe(card);
  });
}());

/* ============================================================
   2. Smooth Scroll — data-scroll-to 属性対応
   ============================================================ */
(function initSmoothScroll() {
  'use strict';

  /**
   * ページ内リンク（href が "#" から始まるもの）をすべて取得し、
   * クリック時にネイティブスクロールアニメーションで遷移する。
   * （CSS に scroll-behavior: smooth を設定している場合は不要だが、
   *   Safari 旧バージョン向けの JS フォールバックとして保持する）
   */
  var anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      var href = link.getAttribute('href');

      /* "#" 単体（トップへ戻る）はブラウザデフォルトに任せる */
      if (href === '#') return;

      var target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();

      var targetTop = target.getBoundingClientRect().top + window.pageYOffset;

      /* window.scrollTo with behavior:'smooth' が使えない場合はフォールバック */
      if ('scrollBehavior' in document.documentElement.style) {
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      } else {
        window.scrollTo(0, targetTop);
      }
    });
  });
}());
