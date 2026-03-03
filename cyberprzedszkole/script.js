/* ===================================================== */
/* ================= GLOBAL VARIABLES ================= */
/* ===================================================== */
const header = document.querySelector('.main-header');
const navLinks = document.querySelectorAll('.nav-list a');
const accordionButtons = document.querySelectorAll('.accordion-btn');
const stats = document.querySelectorAll('.stat-card h3');
const testimonialContainer = document.querySelector('.testimonials-slider');
const auditForm = document.getElementById('auditForm');

let testimonialIndex = 0;
let autoSlideInterval = null;

/* ===================================================== */
/* ================= SMOOTH SCROLL ===================== */
/* ===================================================== */
function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
        window.scrollTo({
            top: section.offsetTop - 80,
            behavior: 'smooth'
        });
    }
}

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = this.getAttribute('href').replace('#', '');
        scrollToSection(target);

        // Jeśli na telefonie, zamknij menu po kliknięciu
        const navList = document.querySelector('.nav-list');
        if (navList.classList.contains('active')) {
            navList.classList.remove('active');
        }
    });
});

/* ===================================================== */
/* ================= MOBILE MENU TOGGLE =============== */
/* ===================================================== */
const menuToggle = document.createElement('span');
menuToggle.classList.add('menu-toggle');
menuToggle.innerHTML = '☰';
document.querySelector('.header-wrapper').appendChild(menuToggle);

menuToggle.addEventListener('click', () => {
    document.querySelector('.nav-list').classList.toggle('active');
});

/* ===================================================== */
/* ================= STICKY HEADER ===================== */
/* ===================================================== */
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.padding = '10px 0';
        header.style.background = 'rgba(15,23,42,0.98)';
    } else {
        header.style.padding = '20px 0';
        header.style.background = 'rgba(15,23,42,0.9)';
    }
});

/* ===================================================== */
/* ================= FAQ ACCORDION ===================== */
/* ===================================================== */
accordionButtons.forEach(button => {
    button.addEventListener('click', function() {
        const content = this.nextElementSibling;

        // Zamknij wszystkie inne FAQ
        accordionButtons.forEach(btn => {
            if (btn !== this) {
                btn.classList.remove('active');
                if (btn.nextElementSibling) {
                    btn.nextElementSibling.style.maxHeight = null;
                }
            }
        });

        // Przełącz bieżący FAQ
        this.classList.toggle('active');

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});

/* ===================================================== */
/* ================= SCROLL ANIMATIONS ================= */
/* ===================================================== */
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.2 });

const hiddenElements = document.querySelectorAll('section, .stat-card, .pillar-card, .case-card, .contact-box');
hiddenElements.forEach(el => {
    el.classList.add('hidden');
    observer.observe(el);
});

/* ===================================================== */
/* ================= COUNT UP STATS ==================== */
/* ===================================================== */
function animateCount(el, target) {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    function update() {
        start += increment;
        if (start < target) {
            el.textContent = Math.floor(start) + (target === 24 ? '/7' : '%');
            requestAnimationFrame(update);
        } else {
            el.textContent = target + (target === 24 ? '/7' : '%');
        }
    }

    update();
}

let statsStarted = false;

window.addEventListener('scroll', () => {
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;

    const rect = statsSection.getBoundingClientRect();

    if (rect.top < window.innerHeight && !statsStarted) {
        statsStarted = true;
        stats.forEach(stat => {
            const value = parseInt(stat.textContent);
            animateCount(stat, value);
        });
    }
});

/* ===================================================== */
/* ================= TESTIMONIAL SLIDER ================ */
/* ===================================================== */
function showTestimonial(index) {
    const testimonials = document.querySelectorAll('.testimonial');
    testimonials.forEach((item, i) => {
        item.style.display = i === index ? 'block' : 'none';
    });
}

function nextTestimonial() {
    const testimonials = document.querySelectorAll('.testimonial');
    testimonialIndex++;
    if (testimonialIndex >= testimonials.length) {
        testimonialIndex = 0;
    }
    showTestimonial(testimonialIndex);
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextTestimonial, 4000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

if (testimonialContainer) {
    showTestimonial(testimonialIndex);
    startAutoSlide();
    testimonialContainer.addEventListener('mouseenter', stopAutoSlide);
    testimonialContainer.addEventListener('mouseleave', startAutoSlide);
}

/* ===================================================== */
/* ================= FORM VALIDATION =================== */
/* ===================================================== */
if (auditForm) {
    auditForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = this.name.value.trim();
        const email = this.email.value.trim();
        const school = this.school.value.trim();
        const message = this.message.value.trim();
        const formMessage = document.getElementById('formMessage');

        if (!name || !email || !school) {
            formMessage.textContent = 'Proszę wypełnić wymagane pola.';
            formMessage.style.color = 'red';
            return;
        }

        if (!validateEmail(email)) {
            formMessage.textContent = 'Niepoprawny adres email.';
            formMessage.style.color = 'red';
            return;
        }

        formMessage.textContent = 'Wysłano pomyślnie! Skontaktujemy się wkrótce.';
        formMessage.style.color = 'lightgreen';

        this.reset();
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/* ===================================================== */
/* ================= BACK TO TOP BUTTON ================ */
/* ===================================================== */
const backToTop = document.createElement('button');
backToTop.textContent = '↑';
backToTop.style.position = 'fixed';
backToTop.style.bottom = '30px';
backToTop.style.right = '30px';
backToTop.style.padding = '12px 18px';
backToTop.style.borderRadius = '50%';
backToTop.style.border = 'none';
backToTop.style.cursor = 'pointer';
backToTop.style.display = 'none';
backToTop.style.background = 'linear-gradient(90deg,#38bdf8,#6366f1)';
backToTop.style.color = '#fff';
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===================================================== */
/* ================= DARK / LIGHT MODE ================= */
/* ===================================================== */
const toggleBtn = document.createElement('button');
toggleBtn.textContent = '☀️';
toggleBtn.style.position = 'fixed';
toggleBtn.style.bottom = '30px';
toggleBtn.style.left = '30px';
toggleBtn.style.padding = '10px 14px';
toggleBtn.style.borderRadius = '20px';
toggleBtn.style.border = 'none';
toggleBtn.style.cursor = 'pointer';
document.body.appendChild(toggleBtn);

let darkMode = true;

toggleBtn.addEventListener('click', () => {
    darkMode = !darkMode;

    if (!darkMode) {
        document.body.style.background = '#f1f5f9';
        document.body.style.color = '#0f172a';
        toggleBtn.textContent = '🌙';
    } else {
        document.body.style.background = '#0f172a';
        document.body.style.color = '#f1f5f9';
        toggleBtn.textContent = '☀️';
    }
});

/* ===================================================== */
/* ================= HERO PARALLAX ===================== */
/* ===================================================== */
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;

    const offset = window.pageYOffset;
    hero.style.backgroundPositionY = offset * 0.5 + 'px';
});

/* ===================================================== */
/* ================= KEYBOARD NAVIGATION =============== */
/* ===================================================== */
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        nextTestimonial();
    }
    if (e.key === 'ArrowLeft') {
        testimonialIndex--;
        if (testimonialIndex < 0) testimonialIndex = 0;
        showTestimonial(testimonialIndex);
    }
});
