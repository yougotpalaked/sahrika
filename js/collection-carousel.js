// Collection Carousel Functionality
document.addEventListener('DOMContentLoaded', () => {
    initCollectionCarousel();
});

function initCollectionCarousel() {
    const carouselContainer = document.querySelector('.collection-carousel-container');
    if (!carouselContainer) return;
    
    const slides = document.querySelectorAll('.collection-carousel-slide');
    const prevBtn = document.querySelector('.collection-carousel .prev');
    const nextBtn = document.querySelector('.collection-carousel .next');
    
    let currentIndex = 0;
    const slideCount = slides.length;
    let autoplayInterval;
    
    // Initialize the carousel
    updateCarousel();
    startAutoplay();
    
    // Event listeners for navigation
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateCarousel();
        resetAutoplay();
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slideCount;
        updateCarousel();
        resetAutoplay();
    });
    
    // Pause autoplay on hover
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });
    
    carouselContainer.addEventListener('mouseleave', () => {
        startAutoplay();
    });
    
    // Update carousel position
    function updateCarousel() {
        // Update slide position
        carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Add animation to current slide content
        slides.forEach((slide, index) => {
            const item = slide.querySelector('.collection-item');
            if (index === currentIndex) {
                item.style.transform = 'scale(1)';
                item.style.opacity = '1';
            } else {
                item.style.transform = 'scale(0.95)';
                item.style.opacity = '0.8';
            }
        });
    }
    
    // Start autoplay
    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % slideCount;
            updateCarousel();
        }, 5000); // Change slide every 5 seconds
    }
    
    // Reset autoplay timer
    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }
    
    // Add touch support for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;
    
    carouselContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    carouselContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});
    
    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance required for a swipe
        const swipeDistance = touchEndX - touchStartX;
        
        if (swipeDistance > swipeThreshold) {
            // Swiped right, go to previous slide
            currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        } else if (swipeDistance < -swipeThreshold) {
            // Swiped left, go to next slide
            currentIndex = (currentIndex + 1) % slideCount;
        }
        
        updateCarousel();
        resetAutoplay();
    }
}