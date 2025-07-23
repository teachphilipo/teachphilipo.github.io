// --- Function to load header and footer ---
const loadHeaderFooter = async () => {
    const headerPlaceholder = document.getElementById('header-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    try {
        // Fetch and load header
        if (headerPlaceholder) {
            const headerResponse = await fetch('header.html');
            if (headerResponse.ok) {
                headerPlaceholder.innerHTML = await headerResponse.text();
                initializeMobileMenu(); // Initialize menu after header is loaded

                // SCROLL TRANSPARENCY LOGIC (moved inside here)
                let lastScroll = 0;
                const header = document.querySelector('header');

                window.addEventListener('scroll', () => {
                    const currentScroll = window.pageYOffset;

                    if (currentScroll < lastScroll && currentScroll > 50) {
                        header.classList.add('scrolled-up');
                    } else if (currentScroll <= 50) {
                        header.classList.remove('scrolled-up');
                    }

                    lastScroll = currentScroll;
                });
            } else {
                throw new Error('Header not found');
            }
        }

        // Fetch and load footer
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
