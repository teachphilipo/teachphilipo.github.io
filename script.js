document.addEventListener('DOMContentLoaded', function () {
    // --- Mobile menu toggle ---
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function () {
            navLinks.classList.toggle('active');
        });
    }

    // --- Smooth scrolling for internal links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const offsetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // --- Contact form handler ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            if (name && email && message) {
                alert(`Thank you, ${name}! Your message has been received.`);
                this.reset();
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // --- Hero slideshow logic ---
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        let currentSlideIndex = 0;
        const slideInterval = 5000;

        function showNextSlide() {
            slides[currentSlideIndex].classList.remove('active');
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            slides[currentSlideIndex].classList.add('active');
        }

        setInterval(showNextSlide, slideInterval);
    }

    // Optional: auto-activate first slide if needed
    if (slides.length > 0) {
        slides[0].classList.add('active');
    }
});

// --- Dynamic content loader ---
function loadContent(page) {
    fetch(page)
        .then(res => res.text())
        .then(data => {
            const container = document.getElementById('dynamic-content');
            if (container) {
                container.innerHTML = data;
                container.scrollIntoView({ behavior: 'smooth' });
            }
        })
        .catch(err => console.error('Failed to load content:', err));
}
