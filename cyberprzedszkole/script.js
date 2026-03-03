/* ===================================================== */
/* ================== GLOBAL VARIABLES ================= */
const header = document.querySelector('.main-header');
const navLinks = document.querySelectorAll('.nav-list a');
const accordionButtons = document.querySelectorAll('.accordion-btn');
const stats = document.querySelectorAll('.stat-card h3');
const auditForm = document.getElementById('auditForm');
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');
let testimonialIndex = 0;
let autoSlideInterval = null;
let darkMode = true;

/* ===================================================== */
/* ==================== SMOOTH SCROLL ================== */
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
        if(navList.classList.contains('open')) {
            navList.classList.remove('open');
        }
    });
});

/* ===================================================== */
/* =================== STICKY HEADER =================== */
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
/* ==================== FAQ ACCORDION ================== */
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
/* ================== COUNT-UP STATS ================== */
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
/* ================== TESTIMONIAL SLIDER ============== */
function showTestimonial(index) {
    const testimonials = document.querySelectorAll('.testimonial');
    testimonials.forEach((item, i) => {
        item.style.display = i === index ? 'block' : 'none';
    });
}

function nextTestimonial() {
    const testimonials = document.querySelectorAll('.testimonial');
    testimonialIndex++;
    if (testimonialIndex >= testimonials.length) testimonialIndex = 0;
    showTestimonial(testimonialIndex);
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextTestimonial, 4000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

document.addEventListener('DOMContentLoaded', () => {
    const testimonialContainer = document.querySelector('.testimonials-slider');
    if (testimonialContainer) {
        showTestimonial(testimonialIndex);
        startAutoSlide();
        testimonialContainer.addEventListener('mouseenter', stopAutoSlide);
        testimonialContainer.addEventListener('mouseleave', startAutoSlide);
    }
});

/* ===================================================== */
/* ==================== FORM VALIDATION =============== */
if(auditForm) {
    auditForm.addEventListener('submit', function(e){
        e.preventDefault();
        const name = this.name.value.trim();
        const email = this.email.value.trim();
        const school = this.school.value.trim();
        const message = this.message.value.trim();
        const formMessage = document.getElementById('formMessage');

        if(!name || !email || !school){
            formMessage.textContent = 'Proszę wypełnić wymagane pola.';
            formMessage.style.color = 'red';
            return;
        }

        if(!validateEmail(email)){
            formMessage.textContent = 'Niepoprawny adres email.';
            formMessage.style.color = 'red';
            return;
        }

        formMessage.textContent = 'Wysłano pomyślnie! Skontaktujemy się wkrótce.';
        formMessage.style.color = 'lightgreen';
        this.reset();
    });
}

function validateEmail(email){
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/* ===================================================== */
/* ==================== BACK TO TOP =================== */
const backToTop = document.createElement('button');
backToTop.textContent = '↑';
backToTop.classList.add('back-to-top');
Object.assign(backToTop.style,{
    position:'fixed', bottom:'30px', right:'30px', padding:'12px 18px', borderRadius:'50%',
    border:'none', cursor:'pointer', display:'none', background:'linear-gradient(90deg,#38bdf8,#6366f1)', color:'#fff', zIndex:100
});
document.body.appendChild(backToTop);

window.addEventListener('scroll',()=>{
    backToTop.style.display = window.scrollY > 400 ? 'block':'none';
});

backToTop.addEventListener('click', ()=> window.scrollTo({top:0,behavior:'smooth'}));

/* ===================================================== */
/* ==================== DARK/LIGHT MODE ================= */
const toggleBtn = document.createElement('button');
toggleBtn.textContent = '☀️';
Object.assign(toggleBtn.style,{
    position:'fixed', bottom:'30px', left:'30px', padding:'10px 14px', borderRadius:'20px',
    border:'none', cursor:'pointer', zIndex:100
});
document.body.appendChild(toggleBtn);

toggleBtn.addEventListener('click',()=>{
    darkMode = !darkMode;
    if(!darkMode){
        document.body.style.background='#f1f5f9';
        document.body.style.color='#0f172a';
        toggleBtn.textContent='🌙';
    } else {
        document.body.style.background='#0f172a';
        document.body.style.color='#f1f5f9';
        toggleBtn.textContent='☀️';
    }
});

/* ===================================================== */
/* ==================== HERO PARALLAX ================= */
window.addEventListener('scroll', ()=>{
    const hero = document.querySelector('.hero-section');
    if(!hero) return;
    const offset = window.pageYOffset;
    hero.style.backgroundPositionY = offset*0.5+'px';
});

/* ===================================================== */
/* ==================== HAMBURGER MENU ================= */
if(hamburger){
    hamburger.addEventListener('click', ()=>{
        navList.classList.toggle('open');
        hamburger.classList.toggle('active');
    });
}

/* ===================================================== */
/* ==================== KEYBOARD NAVIGATION ============ */
window.addEventListener('keydown',(e)=>{
    if(e.key==='ArrowRight') nextTestimonial();
    if(e.key==='ArrowLeft'){
        testimonialIndex--;
        if(testimonialIndex<0) testimonialIndex=0;
        showTestimonial(testimonialIndex);
    }
});
