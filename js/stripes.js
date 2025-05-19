
document.addEventListener('DOMContentLoaded', () => {
    initCarouselStripes();
});

function initCarouselStripes() {
    const heroCarousel = document.querySelector('.hero-carousel');

    if (!document.querySelector('.carousel-stripes-overlay')) {
        const stripesOverlay = document.createElement('div');
        stripesOverlay.classList.add('carousel-stripes-overlay');
        heroCarousel.appendChild(stripesOverlay);
        
        for (let i = 0; i < 25; i++) {
            const stripe = document.createElement('div');
            stripe.classList.add('carousel-vertical-stripe');
            stripe.style.left = `${i * 4}%`;
            stripesOverlay.appendChild(stripe);
        }
        
        for (let i = 0; i < 25; i++) {
            const stripe = document.createElement('div');
            stripe.classList.add('carousel-horizontal-stripe');
            stripe.style.top = `${i * 4}%`;
            stripesOverlay.appendChild(stripe);
        }
    }
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const heroHeight = heroCarousel.offsetHeight;

        if (scrollPosition <= heroHeight) {
            const progress = scrollPosition / heroHeight;
            animateStripes(progress);
        }
    });
    
    function animateStripes(progress) {
        const verticalStripes = document.querySelectorAll('.carousel-vertical-stripe');
        const horizontalStripes = document.querySelectorAll('.carousel-horizontal-stripe');
        
        verticalStripes.forEach((stripe, index) => {
            const delay = index * 0.02;
            const translateX = 100 * progress * (1 + delay);
            stripe.style.transform = `translateX(${translateX}%)`;  
            stripe.style.opacity = 1 - (progress * 1.5);
        });
        
        horizontalStripes.forEach((stripe, index) => {
            const delay = index * 0.02;
            const translateY = 100 * progress * (1 + delay);
            stripe.style.transform = `translateY(${translateY}%)`;
            stripe.style.opacity = 1 - (progress * 1.5);
        });
    }
}