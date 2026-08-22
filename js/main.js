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
            const offset = 70; // Fixed nav height
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ===== EMAILJS - CONTACT FORM =====
// Initialize EmailJS with your Public Key
(function() {
    emailjs.init("XG1hdhuY-v6Bw_4yB");
})();

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Show sending state
        const btn = this.querySelector('.btn-primary');
        const originalText = btn.textContent;
        btn.textContent = '⏳ Sending...';
        btn.disabled = true;

        // Send the email using EmailJS
        emailjs.sendForm(
            "service_jjemi7h",    // Your Service ID
            "template_ntjic7c",   // Your Template ID
            this                  // The form element
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