/* ═══════════════════════════════════════
   MAIN.JS — Shared Functionality
   No translation needed — separate HTML pages per language
   ═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── THEME INIT ─── */
  Theme.init();

  /* ─── CUSTOM CURSOR ─── */
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursorRing');
  if (cursor && ring) {
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    (function anim() {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
      ring.style.left   = rx + 'px'; ring.style.top   = ry + 'px';
      requestAnimationFrame(anim);
    })();
    document.querySelectorAll('a, button, .card, .pillar, .service-card, .project-card, .edu-card, .lang-card, .contact-channel').forEach(el => {
      el.addEventListener('mouseenter', () => { cursor.classList.add('hover'); ring.classList.add('hover'); });
      el.addEventListener('mouseleave', () => { cursor.classList.remove('hover'); ring.classList.remove('hover'); });
    });
  }

  /* ─── MOBILE MENU ─── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose= document.getElementById('mobileClose');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  }
  if (mobileClose && mobileMenu) {
    mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
  }
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  /* ─── THEME TOGGLE ─── */
  const themeBtn = document.getElementById('themeToggle');
  if (themeBtn) themeBtn.addEventListener('click', () => Theme.toggle());

  /* ─── REVEAL ON SCROLL ─── */
  const revEls = document.querySelectorAll('.reveal, .reveal-l');
  const revObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  revEls.forEach(el => revObs.observe(el));

  /* ─── SKILL BARS & LANG BARS ─── */
  const bars = document.querySelectorAll('.skill-fill, .lang-bar.skill-fill');
  const barObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const w = e.target.dataset.width;
        if (w) { e.target.style.width = w + '%'; barObs.unobserve(e.target); }
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(b => barObs.observe(b));

  /* ─── COUNTERS ─── */
  const counters = document.querySelectorAll('.counter');
  const cntObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const target = +e.target.dataset.target;
        let cur = 0;
        const step = Math.max(1, Math.ceil(target / 60));
        const t = setInterval(() => {
          cur = Math.min(cur + step, target);
          e.target.textContent = cur;
          if (cur >= target) clearInterval(t);
        }, 25);
        cntObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.6 });
  counters.forEach(c => cntObs.observe(c));

  /* ─── CONTACT FORM ─── */
  const formBtn = document.getElementById('formSubmit');
  if (formBtn) {
    const orig = formBtn.textContent;
    const sent = formBtn.dataset.sent || '✓ Sent!';
    formBtn.addEventListener('click', e => {
      e.preventDefault();
      formBtn.textContent = sent;
      formBtn.style.cssText = 'background:rgba(74,222,128,.15);border-color:var(--success);color:var(--success)';
      setTimeout(() => {
        formBtn.textContent = orig;
        formBtn.style.cssText = '';
      }, 3000);
    });
  }

  /* ─── NAV SCROLL EFFECT ─── */
  const nav = document.getElementById('mainNav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.boxShadow = window.scrollY > 40 ? '0 2px 20px rgba(0,0,0,.3)' : 'none';
    }, { passive: true });
  }

  /* ─── SMOOTH SCROLL ─── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

});
