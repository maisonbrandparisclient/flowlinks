/* ============================================================
   flowlinks — script
   ============================================================ */

// 1) Nav transparente → fond crème quand on scrolle hors du hero
const nav = document.getElementById('nav');
const heroHeight = () => {
  const h = document.querySelector('.hero');
  return h ? h.offsetHeight - 80 : 600;
};
let ticking = false;
const onScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      if (window.scrollY > heroHeight()) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
      ticking = false;
    });
    ticking = true;
  }
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// 2) Reveal au scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// 3) Hero animations on load (entrance)
window.addEventListener('load', () => {
  document.querySelectorAll('.hero .reveal').forEach(el => el.classList.add('in'));
});

// 4) Smooth scroll pour les ancres internes
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.length > 1) {
      const t = document.querySelector(id);
      if (t) {
        e.preventDefault();
        const top = t.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  });
});
