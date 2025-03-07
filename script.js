document.addEventListener('DOMContentLoaded', () => {
    // Slider functionality
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevButton = document.querySelector('.slider-arrow.prev');
    const nextButton = document.querySelector('.slider-arrow.next');
    let currentSlide = 0;
    let slideInterval;

    const showSlide = (index) => {
        // Reset animations for all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
            const typingElements = slide.querySelectorAll('.typing');
            typingElements.forEach(el => {
                el.style.animation = 'none';
                el.offsetHeight; // Trigger reflow
            });
        });
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Activate new slide
        slides[index].classList.add('active');
        dots[index].classList.add('active');

        // Restart typing animation for active slide
        const activeTypingElements = slides[index].querySelectorAll('.typing');
        activeTypingElements.forEach(el => {
            el.style.animation = 'typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite';
        });
    };

    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    };

    const prevSlide = () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    };

    // Initialize slider controls
    prevButton.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    nextButton.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            resetInterval();
        });
    });

    // Auto-advance slides
    const startInterval = () => {
        slideInterval = setInterval(nextSlide, 5000);
    };

    const resetInterval = () => {
        clearInterval(slideInterval);
        startInterval();
    };

    // Initialize first slide animations
    showSlide(0);
    startInterval();

    // Cart functionality
    let cartCount = 0;
    const cartCountElement = document.querySelector('.cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    // Add to cart functionality
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            cartCount++;
            cartCountElement.textContent = cartCount;
            
            // Animation feedback
            button.textContent = 'Added!';
            button.style.background = 'var(--secondary-green)';
            
            setTimeout(() => {
                button.textContent = 'Add to Cart';
                button.style.background = 'linear-gradient(45deg, var(--primary-pink), var(--primary-green))';
            }, 1000);
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Simple animation for product cards on scroll
    const productCards = document.querySelectorAll('.product-card');
    
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    productCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    // Language handling
    let currentLanguage = 'en';

    function setLanguage(lang) {
        currentLanguage = lang;
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
        
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
    }

    document.getElementById('languageSelect').addEventListener('change', (e) => {
        setLanguage(e.target.value);
    });

    // Initialize with default language
    setLanguage('en');
}); 