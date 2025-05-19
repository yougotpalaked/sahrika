document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
});

function initCarousel() {
    const carouselContainer = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.querySelector('.carousel-arrow.prev');
    const nextBtn = document.querySelector('.carousel-arrow.next');
    
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
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
            resetAutoplay();
        });
    });
    
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });
    
    carouselContainer.addEventListener('mouseleave', () => {
        startAutoplay();
    });
    
    function updateCarousel() {
        carouselContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
        
        slides.forEach((slide, index) => {
            const content = slide.querySelector('.carousel-content');
            if (index === currentIndex) {
                content.style.animation = 'fadeIn 1s ease';
            } else {
                content.style.animation = 'none';
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