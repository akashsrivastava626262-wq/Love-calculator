/**
 * BuildCraft Landing Page — Interactive Features
 */

const OWNER_EMAIL = 'akashsrivastava626262@gmail.com';
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${OWNER_EMAIL}`;

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initAuthModal();
  initCounters();
  initPortfolioFilter();
  initTestimonialSlider();
  initContactForm();
  initSmoothScroll();
});

/* Send form data to owner email via FormSubmit */
async function submitToEmail(data, subject) {
  const response = await fetch(FORMSUBMIT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      _subject: subject,
      _template: 'table',
      _captcha: 'false',
      ...data,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to send message');
  }

  return response.json();
}

function formDataToObject(form) {
  return Object.fromEntries(new FormData(form).entries());
}

/* Header scroll effect */
function initHeader() {
  const header = document.getElementById('header');
  const toggleScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', toggleScroll, { passive: true });
  toggleScroll();
}

/* Mobile navigation */
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  const actions = document.querySelector('.nav__actions');

  toggle.addEventListener('click', () => {
    menu.classList.toggle('active');
    actions.classList.toggle('mobile-visible');
    toggle.classList.toggle('active');
  });

  menu.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
      actions.classList.remove('mobile-visible');
      toggle.classList.remove('active');
    });
  });
}

/* Auth modal (Login / Sign Up) */
function initAuthModal() {
  const modal = document.getElementById('authModal');
  const closeBtn = document.getElementById('modalClose');
  const backdrop = modal.querySelector('.modal__backdrop');
  const tabs = modal.querySelectorAll('.modal__tab');
  const switchBtns = modal.querySelectorAll('.modal__switch');
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');

  const openModal = (tab = 'login') => {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    switchTab(tab);
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  const switchTab = (tab) => {
    tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
    loginForm.classList.toggle('hidden', tab !== 'login');
    signupForm.classList.toggle('hidden', tab !== 'signup');
  };

  document.querySelectorAll('[data-modal]').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.dataset.modal));
  });

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);

  tabs.forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });

  switchBtns.forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = loginForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Signing in...';

    try {
      await submitToEmail(formDataToObject(loginForm), 'BuildCraft — New Login Attempt');
      showToast('Details sent! We will contact you shortly.');
      loginForm.reset();
      closeModal();
    } catch {
      showToast('Could not send details. Please call +91 8416835773.');
    } finally {
      btn.disabled = false;
      btn.textContent = 'Log In';
    }
  });

  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = signupForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Creating account...';

    try {
      await submitToEmail(formDataToObject(signupForm), 'BuildCraft — New Sign Up');
      showToast('Account details sent! Welcome to BuildCraft.');
      signupForm.reset();
      closeModal();
    } catch {
      showToast('Could not send details. Please call +91 8416835773.');
    } finally {
      btn.disabled = false;
      btn.textContent = 'Create Account';
    }
  });
}

/* Animated counters */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  const duration = 2000;

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.count, 10);
    if (target === 0) {
      el.textContent = '0';
      return;
    }
    const start = performance.now();

    const update = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(counter => observer.observe(counter));
}

/* Portfolio filter */
function initPortfolioFilter() {
  const filters = document.querySelectorAll('.portfolio__filter');
  const items = document.querySelectorAll('.portfolio__item');

  filters.forEach(filter => {
    filter.addEventListener('click', () => {
      filters.forEach(f => f.classList.remove('active'));
      filter.classList.add('active');

      const category = filter.dataset.filter;

      items.forEach(item => {
        const match = category === 'all' || item.dataset.category === category;
        item.classList.toggle('hidden', !match);
      });
    });
  });
}

/* Testimonial slider */
function initTestimonialSlider() {
  const track = document.getElementById('testimonialTrack');
  const cards = track.querySelectorAll('.testimonial-card');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');
  const dotsContainer = document.getElementById('testimonialDots');
  let current = 0;

  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = `testimonials__dot${i === 0 ? ' active' : ''}`;
    dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.testimonials__dot');

  const goTo = (index) => {
    current = (index + cards.length) % cards.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
  };

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  let autoplay = setInterval(() => goTo(current + 1), 6000);

  track.closest('.testimonials__slider').addEventListener('mouseenter', () => {
    clearInterval(autoplay);
  });

  track.closest('.testimonials__slider').addEventListener('mouseleave', () => {
    autoplay = setInterval(() => goTo(current + 1), 6000);
  });
}

/* Contact form */
function initContactForm() {
  const form = document.getElementById('contactForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending...';

    try {
      await submitToEmail(formDataToObject(form), 'BuildCraft — New Contact Form Inquiry');
      showToast('Thank you! We will contact you within 24 hours.');
      form.reset();
    } catch {
      showToast('Could not send message. Please call +91 8416835773.');
    } finally {
      btn.disabled = false;
      btn.textContent = 'Send Message';
    }
  });
}

/* Smooth scroll for anchor links */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* Toast notification */
function showToast(message) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%) translateY(100px);
    background: #0f1419;
    color: #fff;
    padding: 16px 28px;
    border-radius: 12px;
    font-size: 0.9375rem;
    font-weight: 500;
    box-shadow: 0 16px 48px rgba(15, 20, 25, 0.25);
    z-index: 3000;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  `;

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  setTimeout(() => {
    toast.style.transform = 'translateX(-50%) translateY(100px)';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}
