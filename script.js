document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenu.addEventListener('click', () => {
        // This will toggle a class 'active' on the nav-links list
        navLinks.classList.toggle('active');

        // Optional: Change the hamburger icon to an 'X' when the menu is open
        if (navLinks.classList.contains('active')) {
            mobileMenu.textContent = '✕';
        } else {
            mobileMenu.textContent = '☰';
        }
    });

    // Optional: Close the mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenu.textContent = '☰';
            }
        });
    });
});
