/* ═══════════════════════════════════════
   THEME.JS — Dark / Light Mode Toggle
   ═══════════════════════════════════════ */

const Theme = {
  DARK:  'dark',
  LIGHT: 'light',

  init() {
    const saved = localStorage.getItem('theme') || this.DARK;
    this.apply(saved, false);
  },

  toggle() {
    const current = document.documentElement.getAttribute('data-theme') || this.DARK;
    const next = current === this.DARK ? this.LIGHT : this.DARK;
    this.apply(next, true);
  },

  apply(mode, save = true) {
    document.documentElement.setAttribute('data-theme', mode);
    if (save) localStorage.setItem('theme', mode);
    this.updateIcon(mode);
  },

  updateIcon(mode) {
    const btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = mode === this.DARK ? '☀️' : '🌙';
  }
};

// Apply theme BEFORE page paint to avoid flash
(function() {
  const saved = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
})();

window.Theme = Theme;
