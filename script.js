// JavaScript for TuNong Restaurant Website

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
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

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
    }

    // Auto-play carousel with pause on hover
    const carousel = document.querySelector('#reviewsCarousel');
    const bootstrap = window.bootstrap; // Declare the bootstrap variable
    if (carousel && bootstrap) {
        const bsCarousel = new bootstrap.Carousel(carousel, {
            interval: 5000,
            wrap: true
        });

        carousel.addEventListener('mouseenter', function() {
            bsCarousel.pause();
        });

        carousel.addEventListener('mouseleave', function() {
            bsCarousel.cycle();
        });
    }

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe cards and gallery items
    const animateElements = document.querySelectorAll('.card, .gallery-item, .contact-card, .feature-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Phone number click tracking
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Phone number clicked:', this.href);
        });
    });

    // Image lazy loading fallback
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Form validation enhancement
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });

    // Mobile menu close on link click
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992 && navbarCollapse) {
                if (bootstrap) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                        toggle: false
                    });
                    bsCollapse.hide();
                }
            }
        });
    });

    // External links loading animation
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.add('fa-spin');
                setTimeout(() => {
                    icon.classList.remove('fa-spin');
                }, 2000);
            }
        });
    });

    // Gallery lightbox functionality
    const galleryImages = document.querySelectorAll('.gallery-item img, .menu-card img, .sushi-card img');
    galleryImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            createLightbox(this.src, this.alt || 'Image');
        });
    });

    // Lightbox creation function
    function createLightbox(src, alt) {
        // Remove existing lightbox if any
        const existingLightbox = document.querySelector('.lightbox');
        if (existingLightbox) {
            existingLightbox.remove();
        }

        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img src="${src}" alt="${alt}" class="lightbox-image">
                <div class="lightbox-caption">${alt}</div>
            </div>
        `;
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';

        // Close lightbox function
        function closeLightbox() {
            if (document.body.contains(lightbox)) {
                document.body.removeChild(lightbox);
                document.body.style.overflow = 'auto';
            }
        }

        // Close button event
        const closeBtn = lightbox.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', closeLightbox);

        // Click outside to close
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // ESC key to close
        const escapeHandler = function(e) {
            if (e.key === 'Escape') {
                closeLightbox();
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);

        // Fade in animation
        setTimeout(() => {
            lightbox.style.opacity = '1';
        }, 10);
    }

    // Add loading states to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.type === 'submit' || this.classList.contains('loading-btn')) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 2000);
            }
        });
    });

    // Scroll to top functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top btn btn-primary p-0';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        display: none;
        opacity: 0;
        transition: all 0.3s ease;
    `;
    document.body.appendChild(scrollToTopBtn);

    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = 'block';
            setTimeout(() => {
                scrollToTopBtn.style.opacity = '1';
            }, 10);
        } else {
            scrollToTopBtn.style.opacity = '0';
            setTimeout(() => {
                scrollToTopBtn.style.display = 'none';
            }, 300);
        }
    });

    // Scroll to top click event
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.card, .feature-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }

    // Add typing effect to hero text
    const heroTitle = document.querySelector('.hero-section .display-4');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing effect after a delay
        setTimeout(typeWriter, 1000);
    }

    // Add counter animation for statistics
    const counters = document.querySelectorAll('[data-count]');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        let current = 0;
        const increment = target / 100;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start counter when element is visible
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    counterObserver.unobserve(entry.target);
                }
            });
        });
        
        counterObserver.observe(counter);
    });

    // Add search functionality (if search input exists)
    const searchInput = document.querySelector('#searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const menuItems = document.querySelectorAll('.menu-card, .sushi-card');
            
            menuItems.forEach(item => {
                const title = item.querySelector('h5, h4');
                const description = item.querySelector('p');
                
                if (title && description) {
                    const titleText = title.textContent.toLowerCase();
                    const descText = description.textContent.toLowerCase();
                    
                    if (titleText.includes(searchTerm) || descText.includes(searchTerm)) {
                        item.style.display = 'block';
                        item.style.opacity = '1';
                    } else {
                        item.style.display = 'none';
                        item.style.opacity = '0';
                    }
                }
            });
        });
    }

    // Add price formatting
    const prices = document.querySelectorAll('.price');
    prices.forEach(price => {
        const value = parseFloat(price.textContent.replace(/[^\d.,]/g, ''));
        if (!isNaN(value)) {
            price.textContent = `€${value.toFixed(2)}`;
        }
    });

});

// Add dynamic CSS for lightbox and animations
const dynamicCSS = `
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
        text-align: center;
    }
    
    .lightbox-image {
        max-width: 100%;
        max-height: 80vh;
        object-fit: contain;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    }
    
    .lightbox-close {
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 30px;
        cursor: pointer;
        z-index: 10000;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background-color: rgba(0,0,0,0.5);
        transition: all 0.3s ease;
    }
    
    .lightbox-close:hover {
        color: #D4AF37;
        background-color: rgba(0,0,0,0.8);
        transform: scale(1.1);
    }
    
    .lightbox-caption {
        color: white;
        margin-top: 15px;
        font-size: 1.1rem;
        font-weight: 500;
    }
    
    .navbar-scrolled {
        background-color: rgba(44, 85, 48, 0.95) !important;
        backdrop-filter: blur(10px);
        box-shadow: 0 2px 20px rgba(0,0,0,0.2) !important;
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out;
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .lazy.loaded {
        opacity: 1;
    }
    
    .loading {
        position: relative;
        pointer-events: none;
        opacity: 0.7;
    }
    
    .loading::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        margin: -10px 0 0 -10px;
        border: 2px solid transparent;
        border-top: 2px solid currentColor;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .scroll-to-top:hover {
        transform: translateY(-3px);
        box-shadow: 0 5px 15px rgba(44, 85, 48, 0.4);
    }
    
    @media (max-width: 768px) {
        .lightbox-content {
            max-width: 95%;
            max-height: 95%;
        }
        
        .lightbox-close {
            top: -35px;
            right: -5px;
            font-size: 25px;
            width: 35px;
            height: 35px;
        }
        
        .scroll-to-top {
            bottom: 15px;
            right: 15px;
            width: 45px;
            height: 45px;
        }
    }
`;

// Simple Menu Carousel Script
document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('menuCarouselTrack');
    const prevBtn = document.getElementById('menuCarouselPrev');
    const nextBtn = document.getElementById('menuCarouselNext');
    const indicators = document.getElementById('menuCarouselIndicators');
    
    if (!track || !prevBtn || !nextBtn) return;
    
    const slides = track.querySelectorAll('.menu-slide');
    let currentIndex = 0;
    let itemsPerView = getItemsPerView();
    let totalPages = Math.ceil(slides.length / itemsPerView);
    
    // Get items per view based on screen size
    function getItemsPerView() {
        return window.innerWidth >= 992 ? 3 : 1; // 3 on desktop, 1 on mobile
    }
    
    // Create indicators
    function createIndicators() {
        indicators.innerHTML = '';
        for (let i = 0; i < totalPages; i++) {
            const indicator = document.createElement('button');
            indicator.className = 'btn btn-sm btn-outline-primary rounded-circle p-2';
            indicator.style.width = '12px';
            indicator.style.height = '12px';
            indicator.style.padding = '0';
            indicator.addEventListener('click', () => goToPage(i));
            indicators.appendChild(indicator);
        }
        updateIndicators();
    }
    
    // Update active indicator
    function updateIndicators() {
        const indicatorBtns = indicators.querySelectorAll('button');
        indicatorBtns.forEach((btn, index) => {
            if (index === currentIndex) {
                btn.classList.remove('btn-outline-primary');
                btn.classList.add('btn-primary');
            } else {
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-outline-primary');
            }
        });
    }
    
    // Update carousel position
    function updateCarousel() {
        const slideWidth = 100 / itemsPerView;
        const translateX = -(currentIndex * slideWidth * itemsPerView);
        track.style.transform = `translateX(${translateX}%)`;
        
        // Update button states
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= totalPages - 1;
        
        updateIndicators();
    }
    
    // Go to specific page
    function goToPage(pageIndex) {
        currentIndex = Math.max(0, Math.min(pageIndex, totalPages - 1));
        updateCarousel();
    }
    
    // Previous slide
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    }
    
    // Next slide
    function nextSlide() {
        if (currentIndex < totalPages - 1) {
            currentIndex++;
            updateCarousel();
        }
    }
    
    // Handle window resize
    function handleResize() {
        const newItemsPerView = getItemsPerView();
        if (newItemsPerView !== itemsPerView) {
            itemsPerView = newItemsPerView;
            totalPages = Math.ceil(slides.length / itemsPerView);
            currentIndex = Math.min(currentIndex, totalPages - 1);
            createIndicators();
            updateCarousel();
        }
    }
    
    // Touch/Swipe support for mobile
    let startX = 0;
    let isDragging = false;
    
    track.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        isDragging = true;
    });
    
    track.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        e.preventDefault();
    });
    
    track.addEventListener('touchend', function(e) {
        if (!isDragging) return;
        isDragging = false;
        
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;
        
        // Swipe threshold
        if (Math.abs(diffX) > 50) {
            if (diffX > 0) {
                nextSlide(); // Swipe left - next
            } else {
                prevSlide(); // Swipe right - previous
            }
        }
    });
    
    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    window.addEventListener('resize', handleResize);
    
    // Initialize
    createIndicators();
    updateCarousel();
    
    // Set initial flex layout for slides
    slides.forEach(slide => {
        slide.style.flex = `0 0 ${100 / itemsPerView}%`;
        slide.style.maxWidth = `${100 / itemsPerView}%`;
    });
    
    // Update flex on resize
    window.addEventListener('resize', function() {
        setTimeout(() => {
            const currentItemsPerView = getItemsPerView();
            slides.forEach(slide => {
                slide.style.flex = `0 0 ${100 / currentItemsPerView}%`;
                slide.style.maxWidth = `${100 / currentItemsPerView}%`;
            });
        }, 100);
    });
});

// Inject the CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicCSS;
document.head.appendChild(styleSheet);