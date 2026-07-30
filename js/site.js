/* ==========================================================================
   Tabber — site behaviour
   No dependencies, no network calls. Everything here is progressive
   enhancement: the pages are complete and readable with JavaScript off.
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------
     1. App Store link
     ------------------------------------------------------------------
     Tabber isn't on the App Store yet, so every "Get it on the App Store"
     button renders as a non-clickable "Coming to the App Store" chip.

     >>> TO GO LIVE: put the App Store URL in the line below. <<<
     Example: 'https://apps.apple.com/app/tabber/id1234567890'
     Every CTA on every page turns into a real link. Nothing else to change.
  */
  var APP_STORE_URL = null;

  function wireAppStoreLinks() {
    if (!APP_STORE_URL) return;

    var ctas = document.querySelectorAll('[data-appstore]');
    for (var i = 0; i < ctas.length; i++) {
      var el = ctas[i];
      el.setAttribute('href', APP_STORE_URL);
      el.setAttribute('rel', 'noopener');
      el.classList.remove('is-pending');

      var label = el.querySelector('[data-appstore-label]');
      if (label) label.textContent = el.dataset.appstore || 'Download on the App Store';
    }
  }

  /* ------------------------------------------------------------------
     2. Contact address
     ------------------------------------------------------------------
     Assembled at runtime rather than sitting in the HTML source. This is a
     speed bump for naive scrapers, not real protection — it is readable to
     anyone who looks. The <noscript> fallback in the markup shows the same
     address so the page still works without JavaScript, which App Review
     and any human visitor both need.
  */
  var MAIL_USER = ['tabber', 'app', 'support'].join('');
  var MAIL_HOST = ['gmail', 'com'].join('.');

  function wireEmail() {
    var address = MAIL_USER + '@' + MAIL_HOST;
    var slots = document.querySelectorAll('[data-email]');

    for (var i = 0; i < slots.length; i++) {
      var slot = slots[i];
      var link = document.createElement('a');
      var subject = slot.dataset.email || 'Tabber';

      link.href = 'mailto:' + address + '?subject=' + encodeURIComponent(subject);
      link.textContent = address;
      link.className = slot.dataset.emailClass || '';

      slot.textContent = '';
      slot.appendChild(link);
    }
  }

  /* ------------------------------------------------------------------
     3. Reveal on scroll
     ------------------------------------------------------------------
     Guarded by the .js class, so with JavaScript off nothing is ever hidden.
     Reduced-motion users get the content with no transition (see styles.css).
  */
  function wireReveals() {
    var targets = document.querySelectorAll('.reveal');
    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) {
      for (var i = 0; i < targets.length; i++) targets[i].classList.add('in');
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.06 }
    );

    for (var j = 0; j < targets.length; j++) observer.observe(targets[j]);
  }

  /* ------------------------------------------------------------------
     4. Current year in the footer
  */
  function wireYear() {
    var slots = document.querySelectorAll('[data-year]');
    var year = String(new Date().getFullYear());
    for (var i = 0; i < slots.length; i++) slots[i].textContent = year;
  }

  /* ------------------------------------------------------------------
     5. Boot
     ------------------------------------------------------------------
     The .js class on <html> is what arms `.reveal { opacity: 0 }`, so
     everything below the hero on the landing page is invisible until
     something adds .in. If this file never runs — a 404, a content
     blocker, a parse error — nothing ever would. The inline <head>
     script therefore disarms itself unless we mark the document ready,
     and a throw in here disarms it immediately. Failing to a fully
     visible page is the only acceptable failure mode.
  */
  function disarmReveals() {
    var el = document.documentElement;
    el.className = el.className.replace(/(^|\s)js(\s|$)/, ' ');
  }

  function init() {
    try {
      wireAppStoreLinks();
      wireEmail();
      wireReveals();
      wireYear();
      document.documentElement.setAttribute('data-site-ready', '');
    } catch (e) {
      disarmReveals();
      throw e;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
