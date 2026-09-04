/** Vanilla JS shipped as assets/site.js in the export — mobile nav toggle only; FAQ accordions use native <details>. */
export const SITE_JS = `
document.querySelectorAll('[data-nav-toggle]').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var menu = btn.closest('header').querySelector('[data-nav-menu]');
    if (menu) menu.hidden = !menu.hidden;
  });
});
`.trim();
