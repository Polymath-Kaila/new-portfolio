/* ─────────────────────────────────────────
   NAVBAR SCROLL
───────────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ─────────────────────────────────────────
   MOBILE MENU
───────────────────────────────────────── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* ─────────────────────────────────────────
   TERMINAL TYPING EFFECT
───────────────────────────────────────── */
const roles = [
  'Backend Developer',
  'Lead Engineer @ Casini',
  'API Architect',
  'Co-Founder @ Komfot',
  'Mobile App Builder',
  'Full Stack Engineer',
];

let roleIdx = 0;
let charIdx = 0;
let isDeleting = false;
const typedEl = document.getElementById('typed-role');

function typeRole() {
  if (!typedEl) return;

  const current = roles[roleIdx];

  if (!isDeleting) {
    typedEl.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      isDeleting = true;
      setTimeout(typeRole, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
    }
  }

  setTimeout(typeRole, isDeleting ? 45 : 85);
}

setTimeout(typeRole, 1200);

/* ─────────────────────────────────────────
   FLOATING PARTICLES
───────────────────────────────────────── */
function spawnParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  for (let i = 0; i < 28; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left  = Math.random() * 100 + '%';
    p.style.width = p.style.height = (Math.random() * 2 + 1) + 'px';

    const dur = Math.random() * 15 + 10;
    const del = Math.random() * 12;
    p.style.animation = `float-particle ${dur}s ${del}s linear infinite`;

    if (Math.random() > 0.6) {
      p.style.background = '#7c3aed';
    }

    container.appendChild(p);
  }
}

spawnParticles();

/* ─────────────────────────────────────────
   SCROLL REVEAL
───────────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings in same parent
      const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal:not(.visible)'));
      const delay = siblings.indexOf(entry.target) * 80;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* ─────────────────────────────────────────
   COUNTER ANIMATION
───────────────────────────────────────── */
function animateCounter(el, target, duration = 1200) {
  const start = performance.now();
  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const statNums = document.querySelectorAll('.stat-num[data-target]');
let countersStarted = false;

const heroObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !countersStarted) {
    countersStarted = true;
    statNums.forEach(el => {
      animateCounter(el, parseInt(el.dataset.target));
    });
  }
}, { threshold: 0.5 });

const heroSection = document.getElementById('hero');
if (heroSection) heroObserver.observe(heroSection);

/* ─────────────────────────────────────────
   TIMELINE DOT ACTIVATION ON SCROLL
───────────────────────────────────────── */
const timelineDots = document.querySelectorAll('.timeline-dot:not(.active)');

const dotObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.borderColor = 'var(--accent)';
      entry.target.style.boxShadow = '0 0 12px rgba(0, 212, 255, 0.25)';
    }
  });
}, { threshold: 0.5 });

timelineDots.forEach(dot => dotObserver.observe(dot));

/* ─────────────────────────────────────────
   ACTIVE NAV LINK HIGHLIGHT
───────────────────────────────────────── */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.style.color = 'var(--accent)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ─────────────────────────────────────────
   CONTACT FORM (CLIENT SIDE ONLY)
───────────────────────────────────────── */
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.innerHTML;

    btn.innerHTML = '<span class="btn-icon">✓</span> message sent!';
    btn.style.background = 'var(--green)';
    btn.style.color = 'var(--bg)';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = '';
      btn.style.color = '';
      btn.disabled = false;
      form.reset();
    }, 3500);
  });
}

/* ─────────────────────────────────────────
   SMOOTH SCROLL FOR NAV LINKS
───────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
