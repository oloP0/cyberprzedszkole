/* ================= GLOBAL VARIABLES ================= */
const header = document.querySelector('.main-header');
const navLinks = document.querySelectorAll('.nav-list a');
const accordionButtons = document.querySelectorAll('.accordion-btn');
const stats = document.querySelectorAll('.stat-card h3');
const auditForm = document.getElementById('auditForm');

// HAMBURGER MENU
const hamburger = document.createElement('div');
hamburger.classList.add('hamburger');
hamburger.innerHTML = '<span></span><span></span><span></span>';
document.querySelector('.header-wrapper').appendChild(hamburger);
const navList = document.querySelector('.nav-list');

// ================= SMOOTH SCROLL =================
function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
        window.scrollTo({ top: section.offsetTop - 80, behavior: 'smooth' });
    }
}

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = this.getAttribute('href').replace('#', '');
        scrollToSection(target);
        if (navList.classList.contains('show')) navList.classList.remove('show');
    });
});

// ================= HAMBURGER MENU MOBILE =================
hamburger.addEventListener('click', () => {
    navList.classList.toggle('show');
});

// ================= STICKY HEADER =================
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.padding = '10px 0';
        header.style.background = 'rgba(15,23,42,0.98)';
    } else {
        header.style.padding = '20px 0';
        header.style.background = 'rgba(15,23,42,0.9)';
    }
});

// ================= FAQ ACCORDION =================
accordionButtons.forEach(button => {
    button.addEventListener('click', function() {
        const content = this.nextElementSibling;
        accordionButtons.forEach(btn => {
            if (btn !== this) {
                btn.classList.remove('active');
                if (btn.nextElementSibling) btn.nextElementSibling.style.maxHeight = null;
            }
        });
        this.classList.toggle('active');
        if (content.style.maxHeight) content.style.maxHeight = null;
        else content.style.maxHeight = content.scrollHeight + "px";
    });
});

// ================= SCROLL ANIMATIONS =================
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('show');
    });
}, { threshold: 0.2 });

const hiddenElements = document.querySelectorAll('section, .stat-card, .pillar-card, .case-card, .contact-box');
hiddenElements.forEach(el => {
    el.classList.add('hidden');
    observer.observe(el);
});

// ================= COUNT UP STATS =================
function animateCount(el, target) {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    function update() {
        start += increment;
        if (start < target) el.textContent = Math.floor(start) + (target === 24 ? '/7' : '%');
        else el.textContent = target + (target === 24 ? '/7' : '%');
        if (start < target) requestAnimationFrame(update);
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
        stats.forEach(stat => animateCount(stat, parseInt(stat.textContent)));
    }
});

// ================= FORM VALIDATION =================
if (auditForm) {
    auditForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = this.name.value.trim();
        const email = this.email.value.trim();
        const school = this.school.value.trim();
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

// ================= BACK TO TOP BUTTON =================
const backToTop = document.createElement('button');
backToTop.textContent = '↑';
backToTop.classList.add('back-to-top');
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    backToTop.style.display = window.scrollY > 400 ? 'block' : 'none';
});

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ================= DARK / LIGHT MODE =================
const toggleBtn = document.createElement('button');
toggleBtn.textContent = '☀️';
toggleBtn.classList.add('dark-light-toggle');
document.body.appendChild(toggleBtn);

let darkMode = true;
toggleBtn.addEventListener('click', () => {
    darkMode = !darkMode;
    if (darkMode) {
        document.body.style.background = '#0f172a';
        document.body.style.color = '#f1f5f9';
        toggleBtn.textContent = '☀️';
    } else {
        document.body.style.background = '#f1f5f9';
        document.body.style.color = '#0f172a';
        toggleBtn.textContent = '🌙';
    }
});

// ================= HERO PARALLAX =================
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;
    const offset = window.pageYOffset;
    hero.style.backgroundPositionY = offset * 0.5 + 'px';
});
