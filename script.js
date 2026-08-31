/* ============================================
   MISWAK DENTAL CARE — JAVASCRIPT
   Smooth scroll, parallax, animations, counter
   ============================================ */

'use strict';

/* ---- SMOOTH SCROLL (Lenis-style native approach) ---- */
document.documentElement.style.scrollBehavior = 'smooth';

/* ---- NAVBAR SCROLL HANDLER ---- */
const navbar = document.getElementById('navbar');

function handleNavbarScroll() {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll();

/* ---- HAMBURGER MENU ---- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

function closeMobileMenu() {
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.contains('open');
  if (isOpen) {
    closeMobileMenu();
  } else {
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
});

document.querySelectorAll('.mobile-nav-link, .mobile-book').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

/* ---- PARALLAX HERO ---- */
const heroParallax = document.getElementById('hero-parallax');

function handleParallax() {
  const scrollY = window.scrollY;
  if (heroParallax && scrollY < window.innerHeight * 1.5) {
    const yShift = scrollY * 0.4;
    heroParallax.style.transform = `translateY(${yShift}px)`;
  }
}
window.addEventListener('scroll', handleParallax, { passive: true });

/* ---- REVEAL ON SCROLL (IntersectionObserver) ---- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal-up').forEach((el) => {
  revealObserver.observe(el);
});

/* ---- STAGGERED SERVICE CARDS OBSERVER ---- */
const cardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        cardObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
);
document.querySelectorAll('.card-stagger').forEach((card) => {
  cardObserver.observe(card);
});

/* ---- COUNTER ANIMATION ---- */
function animateCounter(el, target, duration = 1800) {
  let startTime = null;
  const startValue = 0;

  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const current = Math.round(easeOutQuart(progress) * target);

    el.textContent = current >= 1000
      ? (current / 1000).toFixed(1).replace('.0', '') + 'k'
      : current;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = target >= 1000
        ? (target / 1000).toFixed(1).replace('.0', '') + 'k'
        : target;
    }
  }
  requestAnimationFrame(step);
}

const counterEls = document.querySelectorAll('[data-target]');
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10);
        animateCounter(el, target);
        counterObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.5 }
);
counterEls.forEach((el) => counterObserver.observe(el));

/* ---- SMOOTH ANCHOR SCROLLING ---- */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 76;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ---- ACTIVE NAV LINK HIGHLIGHT ---- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${id}`
          );
        });
      }
    });
  },
  { rootMargin: '-50% 0px -50% 0px' }
);
sections.forEach((s) => sectionObserver.observe(s));

/* ---- CONTACT FORM → WHATSAPP ---- */
const WA_NUMBER = '917288947192';

function buildWhatsAppURL(name, service) {
  const greeting = name ? `Hello, my name is ${name}.` : 'Hello,';
  const svcPart  = service ? ` I am interested in ${service}.` : '';
  const msg = `${greeting}${svcPart} I would like to book an appointment at Miswak Multi Speciality Dental Care. Please confirm my slot. Thank you!`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

const form        = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = (form.querySelector('#f-name')?.value    || '').trim();
    const service = (form.querySelector('#f-service')?.value || '').trim();
    const btn     = form.querySelector('[type="submit"]');

    btn.disabled    = true;
    btn.textContent = 'Opening WhatsApp…';

    // Show confirmation flash, then open WhatsApp
    setTimeout(() => {
      formSuccess.style.display = 'flex';

      // Open WhatsApp in new tab
      window.open(buildWhatsAppURL(name, service), '_blank', 'noopener,noreferrer');

      setTimeout(() => {
        form.reset();
        btn.textContent = 'Confirm Appointment Request';
        btn.disabled    = false;
        formSuccess.style.display = 'none';
      }, 4000);
    }, 600);
  });
}

/* ---- SERVICE CARD KEYBOARD A11Y ---- */
document.querySelectorAll('.service-card').forEach((card) => {
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const link = card.querySelector('.service-link');
      if (link) link.click();
    }
  });
});
