/* ===================================================== */
/* ================= GLOBAL VARIABLES ================= */
/* ===================================================== */

const header = document.querySelector('.main-header');
const navList = document.querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-list a');
const menuToggle = document.querySelector('.menu-toggle');
const accordionButtons = document.querySelectorAll('.accordion-btn');
const stats = document.querySelectorAll('.stat-card h3');
const auditForm = document.getElementById('auditForm');
const searchInput = document.getElementById('siteSearch');
const searchResults = document.getElementById('searchResults');

let darkMode = true;

/* ===================================================== */
/* ================= MOBILE MENU TOGGLE ================ */
/* ===================================================== */

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const target = this.getAttribute('href').replace('#', '');
        const section = document.getElementById(target);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        if (navList.classList.contains('active')) navList.classList.remove('active');
        e.preventDefault();
    });
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

/* ===================================================== */
/* ================= SCROLL ANIMATIONS ================= */
/* ===================================================== */

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
    backToTop.style.display = window.scrollY > 400 ? 'block' : 'none';
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
/* ================= SEARCH ENGINE ==================== */
/* ===================================================== */

if (searchInput) {
    const sections = [...document.querySelectorAll('section')].map(sec => ({
        id: sec.id,
        title: sec.querySelector('.section-title')?.innerText || '',
        text: sec.innerText.toLowerCase()
    }));

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        searchResults.innerHTML = '';
        if (!query) return;

        sections.forEach(sec => {
            if (sec.text.includes(query) || sec.title.toLowerCase().includes(query)) {
                const li = document.createElement('li');
                li.textContent = sec.title || sec.id;
                li.style.cursor = 'pointer';
                li.style.padding = '5px 0';
                li.addEventListener('click', () => {
                    const targetSection = document.getElementById(sec.id);
                    if (targetSection) targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    searchResults.innerHTML = '';
                    searchInput.value = '';
                });
                searchResults.appendChild(li);
            }
        });
    });
}

// MOBILE MENU TOGGLE
const menuToggleBtn = document.querySelector('.menu-toggle');
const navListMobile = document.querySelector('.nav-list');

if (menuToggleBtn && navListMobile) {
    menuToggleBtn.addEventListener('click', () => {
        navListMobile.classList.toggle('active');
    });
}

// Zamykanie menu po kliknięciu linku na telefonie
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navListMobile.classList.contains('active')) {
            navListMobile.classList.remove('active');
        }
    });
});
