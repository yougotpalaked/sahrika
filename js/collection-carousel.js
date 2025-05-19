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
    
    updateCarousel();
    startAutoplay();
    
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
    
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });
    
    carouselContainer.addEventListener('mouseleave', () => {
        startAutoplay();
    });
    
    function updateCarousel() {
        carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        
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
    
    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % slideCount;
            updateCarousel();
        }, 5000);
    }
    
    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }
    
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
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;
        
        if (swipeDistance > swipeThreshold) {
            currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        } else if (swipeDistance < -swipeThreshold) {
            currentIndex = (currentIndex + 1) % slideCount;
        }
        
        updateCarousel();
        resetAutoplay();
    }
}