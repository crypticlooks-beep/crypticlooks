// ============================================================
// Samarth Gupta Portfolio — script.js
// ============================================================

// Year
const yrEl = document.getElementById('yr');
if (yrEl) yrEl.textContent = new Date().getFullYear();

// ---- Mobile menu ----
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
  });

  // Close on nav link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ---- Active nav link on scroll ----
const sections = document.querySelectorAll('section[id]');
const navItems  = document.querySelectorAll('.nl');

function updateActiveLink() {
  let current = '';
  sections.forEach(s => {
    const top = s.getBoundingClientRect().top;
    if (top <= 80) current = s.id;
  });
  navItems.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === '#' + current) a.classList.add('active');
  });
}
window.addEventListener('scroll', updateActiveLink, { passive: true });

// ---- Scroll reveal ----
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

reveals.forEach(el => revealObserver.observe(el));

// ---- Staggered reveal for grid children ----
function staggerChildren(parent, selector, baseDelay = 80) {
  const children = parent.querySelectorAll(selector);
  children.forEach((child, i) => {
    child.style.transitionDelay = `${i * baseDelay}ms`;
  });
}

document.querySelectorAll('.expertise-grid').forEach(g => staggerChildren(g, '.ex-card', 60));
document.querySelectorAll('.ventures-bento').forEach(g => staggerChildren(g, '.vcard', 80));
document.querySelectorAll('.about-right').forEach(g => staggerChildren(g, '.pillar', 100));

// Observe grid children too
document.querySelectorAll('.ex-card, .vcard, .pillar').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ---- Contact form ----
const form     = document.getElementById('contact-form');
const feedback = document.getElementById('form-feedback');

if (form && feedback) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending...';

    setTimeout(() => {
      feedback.textContent = 'Message received. Samarth will respond shortly.';
      feedback.style.color = '#4ade80';
      form.reset();
      btn.disabled = false;
      btn.textContent = 'Send message';
      setTimeout(() => { feedback.textContent = ''; }, 5000);
    }, 1200);
  });
}
