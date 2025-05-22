// Bestsellers Horizontal Scroll Functionality
document.addEventListener('DOMContentLoaded', function() {
    initBestsellersScroll();
});

function initBestsellersScroll() {
    const scrollContainer = document.querySelector('.bestsellers-wrapper');
    const prevBtn = document.querySelector('.bestsellers-arrow.prev');
    const nextBtn = document.querySelector('.bestsellers-arrow.next');
    
    if (!scrollContainer || !prevBtn || !nextBtn) return;
    
    // Scroll to the left when prev button is clicked
    prevBtn.addEventListener('click', () => {
        const scrollAmount = scrollContainer.offsetWidth * 0.8;
        scrollContainer.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
    
    // Scroll to the right when next button is clicked
    nextBtn.addEventListener('click', () => {
        const scrollAmount = scrollContainer.offsetWidth * 0.8;
        scrollContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
    
    // Show/hide arrows based on scroll position
    scrollContainer.addEventListener('scroll', () => {
        const isAtStart = scrollContainer.scrollLeft <= 10;
        const isAtEnd = scrollContainer.scrollLeft + scrollContainer.offsetWidth >= scrollContainer.scrollWidth - 10;
        
        prevBtn.style.opacity = isAtStart ? '0.5' : '1';
        nextBtn.style.opacity = isAtEnd ? '0.5' : '1';
    });
    
    // Initialize arrow visibility
    prevBtn.style.opacity = '0.5';
}