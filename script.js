<script>
document.addEventListener('DOMContentLoaded', function () {
    // --- Mobile Menu ---
    const initializeMobileMenu = () => {
        const mobileMenu = document.querySelector('.mobile-menu');
        const navLinks = document.querySelector('.nav-links');
        if (mobileMenu && navLinks) {
            mobileMenu.addEventListener('click', function () {
                navLinks.classList.toggle('active');
            });
        }
    };

    // --- Load Header and Footer ---
    const loadHeaderFooter = async () => {
        const headerPlaceholder = document.getElementById('header-placeholder');
        const footerPlaceholder = document.getElementById('footer-placeholder');

        try {
            if (headerPlaceholder) {
                const headerResponse = await fetch('header.html');
                if (headerResponse.ok) {
                    headerPlaceholder.innerHTML = await headerResponse.text();
                    initializeMobileMenu();
                } else {
                    throw new Error('Header not found');
                }
            }

            if (footerPlaceholder) {
                const footerResponse = await fetch('footer.html');
                if (footerResponse.ok) {
                    footerPlaceholder.innerHTML = await footerResponse.text();
                } else {
                    throw new Error('Footer not found');
                }
            }
        } catch (error) {
            console.error('Error loading header or footer:', error);
        }
    };

    loadHeaderFooter();

    // --- Smooth Scroll ---
    document.addEventListener('click', function(e) {
        if (e.target.matches('a[href^="#"]') || e.target.closest('a[href^="index.html#"]')) {
            const navLinks = document.querySelector('.nav-links');
            const href = e.target.closest('a').getAttribute('href');

            if (!window.location.pathname.endsWith('index.html') && !window.location.pathname.endsWith('/')) {
                return;
            }

            const targetId = href.split('#')[1];
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        }
    });

    // --- Contact Form ---
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

    // --- Hero Slideshow with Buttons ---
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlideIndex = 0;
    const slideIntervalTime = 5000;
    let slideTimer;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        showSlide(currentSlideIndex);
    }

    function prevSlide() {
        currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        showSlide(currentSlideIndex);
    }

    function startAutoSlide() {
        slideTimer = setInterval(nextSlide, slideIntervalTime);
    }

    function stopAutoSlide() {
        clearInterval(slideTimer);
    }

    if (slides.length > 0) {
        showSlide(currentSlideIndex);
        startAutoSlide();
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        });

        nextBtn.addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });
    }
});
</script>
