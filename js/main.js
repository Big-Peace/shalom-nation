// ===== HAMBURGER MENU TOGGLE =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close nav when a link is clicked (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ===== SMOOTH SCROLL WITH OFFSET =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = 70;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ===== EMAILJS - CONTACT FORM =====
(function() {
    emailjs.init("XG1hdhuY-v6Bw_4yB");
})();

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const btn = this.querySelector('.btn-primary');
        const originalText = btn.textContent;
        btn.textContent = '⏳ Sending...';
        btn.disabled = true;

        emailjs.sendForm(
            "service_jjemi7h",
            "template_ntjic7c",
            this
        )
        .then(function(response) {
            alert('✅ Thank you for your message! We\'ll get back to you soon. 🙏');
            contactForm.reset();
            btn.textContent = originalText;
            btn.disabled = false;
        })
        .catch(function(error) {
            alert('❌ Oops! Something went wrong. Please try again later.');
            console.error('EmailJS error:', error);
            btn.textContent = originalText;
            btn.disabled = false;
        });
    });
}

// ===== HERO BACKGROUND ROTATION =====
const heroImages = [
    'public/ps1.jpeg',
    'public/ps3.jpeg',
    'public/ps4.jpeg',
    'public/ps5.jpeg'
];

let currentImageIndex = 0;
const heroSection = document.querySelector('.hero');

if (heroSection) {
    heroSection.style.background = `linear-gradient(135deg, rgba(111, 45, 168, 0.4), rgba(58, 54, 80, 0.5)), url('${heroImages[0]}') center/cover no-repeat`;

    setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % heroImages.length;
        heroSection.style.background = `linear-gradient(135deg, rgba(111, 45, 168, 0.4), rgba(58, 54, 80, 0.5)), url('${heroImages[currentImageIndex]}') center/cover no-repeat`;
        heroSection.style.transition = 'background 1.2s ease-in-out';
    }, 6000);
}

// ===== EVENT MODAL =====
function openEventModal(image, title, location, date, description) {
    const modal = document.getElementById('eventModal');
    document.getElementById('modalImage').src = image;
    document.getElementById('modalImage').alt = title;
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalLocation').textContent = location;
    document.getElementById('modalDate').textContent = date;
    document.getElementById('modalDescription').textContent = description;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeEventModal(e) {
    if (e) e.stopPropagation();
    const modal = document.getElementById('eventModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeEventModal();
    }
});

// ===== SCROLL REVEAL ANIMATION =====
const revealEls = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealEls.forEach(el => observer.observe(el));
} else {
    revealEls.forEach(el => el.classList.add('visible'));
}