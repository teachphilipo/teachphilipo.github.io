document.addEventListener('DOMContentLoaded', function () {
    
    // Function to attach event listener for mobile menu
    const initializeMobileMenu = () => {
        const mobileMenu = document.querySelector('.mobile-menu');
        const navLinks = document.querySelector('.nav-links');
        if (mobileMenu && navLinks) {
            mobileMenu.addEventListener('click', function () {
                this.classList.toggle('active');
                navLinks.classList.toggle('active');
            });
        }
    };

    // --- Function to load header and footer ---
    const loadHeaderFooter = async () => {
        const headerPlaceholder = document.getElementById('header-placeholder');
        const footerPlaceholder = document.getElementById('footer-placeholder');

        try {
            if (headerPlaceholder) {
                const headerResponse = await fetch('header.html');
                if (headerResponse.ok) {
                    headerPlaceholder.innerHTML = await headerResponse.text();
                    initializeMobileMenu(); // Initialize menu after header is loaded
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

    // --- MODIFIED: Handles closing menu and smooth scrolling ---
    document.addEventListener('click', function(e) {
        // These need to be queried inside because they are loaded dynamically
        const navLinks = document.querySelector('.nav-links');
        const mobileMenu = document.querySelector('.mobile-menu');

        if (!navLinks || !mobileMenu) return;

        const isMenuOpen = navLinks.classList.contains('active');
        const anchor = e.target.closest('a');

        // Logic for closing the menu when clicking a link
        if (anchor && isMenuOpen) {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('active');
        }

        // Logic for smooth scrolling
        if (anchor && (anchor.href.includes('#') || anchor.getAttribute('href').startsWith('#'))) {
            const targetUrl = new URL(anchor.href, window.location.href);
            if (targetUrl.pathname === window.location.pathname) {
                const targetId = anchor.hash.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    e.preventDefault();
                    const headerOffset = 80;
                    const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY - headerOffset;

                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        }

        // --- NEW: Logic to close menu when clicking outside ---
        const isClickOnHamburger = mobileMenu.contains(e.target);
        const isClickInsideMenu = navLinks.contains(e.target);

        if (isMenuOpen && !isClickOnHamburger && !isClickInsideMenu) {
            navLinks.classList.remove('active');
            mobileMenu.classList.remove('active');
        }
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
});