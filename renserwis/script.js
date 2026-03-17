// Menu mobilne
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
navToggle?.addEventListener('click', () => {
  const isOpen = mainNav?.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

// Smooth scroll dla linków wewnętrznych
const internalLinks = document.querySelectorAll('a[href^="#"]');
internalLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const targetEl = document.querySelector(targetId);
    if (!targetEl) return;
    event.preventDefault();
    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Zamknij menu mobilne po kliknięciu
    if (mainNav?.classList.contains('open')) {
      mainNav.classList.remove('open');
      navToggle?.setAttribute('aria-expanded', 'false');
    }
  });
});

// Animacja pojawiania elementów przy przewijaniu
const revealElements = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window && revealElements.length) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  revealElements.forEach((el) => revealObserver.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add('is-visible'));
}

// Ustaw bieżący rok w stopce
const yearEl = document.getElementById('currentYear');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Obsługa wysyłania formularza (symulacja)
const form = document.getElementById('appointmentForm');
const formMessage = document.getElementById('formMessage');
function showMessage(message, type = 'success') {
  if (!formMessage) return;
  formMessage.className = `form-message is-visible ${type}`;
  formMessage.textContent = message;
}
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const phone = formData.get('phone')?.toString().trim();
    const service = formData.get('service')?.toString();
    const date = formData.get('date')?.toString();
    if (!name || !email || !phone || !service || !date) {
      showMessage('Proszę wypełnić wszystkie wymagane pola.', 'error');
      return;
    }
    showMessage('Dziękujemy! Twoje zgłoszenie zostało wysłane. Skontaktujemy się niebawem.', 'success');
    form.reset();
  });
}
