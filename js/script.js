document.addEventListener('DOMContentLoaded', () => {
    // ---- Hero Carousel ----
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-indicators .dot');
    let currentSlide = 0;
    let slideInterval;

    const nextSlide = () => {
        if (slides.length === 0) return;

        // Remove previous 'prev' classes
        slides.forEach(s => s.classList.remove('prev'));

        // Current slide becomes 'prev' (moves left)
        slides[currentSlide].classList.remove('active');
        slides[currentSlide].classList.add('prev');
        dots[currentSlide].classList.remove('active');

        // Next slide becomes 'active' (comes from right)
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    };

    const goToSlide = (index) => {
        if (slides.length === 0 || index === currentSlide) return;

        slides.forEach(s => s.classList.remove('prev'));

        // If clicking a dot that is *before* the current one, standard logic applies but reverse could be done. 
        // For simplicity, always animate outgoing to 'prev'
        slides[currentSlide].classList.remove('active');
        slides[currentSlide].classList.add('prev');
        dots[currentSlide].classList.remove('active');

        currentSlide = index;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        resetInterval();
    };

    const resetInterval = () => {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    };

    if (slides.length > 0) {
        slideInterval = setInterval(nextSlide, 5000);

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
        });
    }

    // ---- Navbar Scroll Effect ----
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ---- Mobile Menu Toggle (Basic) ----
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    // Implement mobile menu class toggling if needed later

    // ---- Scroll Animation Observer ----
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once faded in
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-up, .fade-right, .fade-left');
    animatedElements.forEach(el => observer.observe(el));

    // ---- Active Navigation Link updating ----
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-list a[href*=${sectionId}]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    });
});
