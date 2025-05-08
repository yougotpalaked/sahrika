// Interlaced Cloth Texture Animation
document.addEventListener('DOMContentLoaded', () => {
    initClothOverlay();
});

function initClothOverlay() {
    const heroCarousel = document.querySelector('.hero-carousel');
    let scrollEnabled = false;
    let animationProgress = 0;
    let lastScrollTime = 0;
    const scrollThreshold = 50; // Minimum scroll amount to trigger next animation step
    
    // Create cloth overlay if it doesn't exist
    if (!document.querySelector('.cloth-overlay')) {
        const clothOverlay = document.createElement('div');
        clothOverlay.classList.add('cloth-overlay');
        heroCarousel.appendChild(clothOverlay);
        
        // Create vertical stripes (warp threads)
        for (let i = 0; i < 25; i++) {
            const stripe = document.createElement('div');
            stripe.classList.add('v-stripe');
            stripe.style.left = `${i * 4}%`;
            // Remove transition delay to allow manual control
            stripe.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
            clothOverlay.appendChild(stripe);
        }
        
        // Create horizontal stripes (weft threads)
        for (let i = 0; i < 25; i++) {
            const stripe = document.createElement('div');
            stripe.classList.add('h-stripe');
            stripe.style.top = `${i * 4}%`;
            // Remove transition delay to allow manual control
            stripe.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
            clothOverlay.appendChild(stripe);
        }
        
        // Check if we have saved hearts from previous session
        loadSavedHearts(clothOverlay);
    }
    
    // Create interlacing effect by adjusting z-indices
    createInterlacingEffect();
    
    // Prevent default scroll until animation completes
    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('touchmove', handleScroll, { passive: false });
    
    function handleScroll(e) {
        if (!scrollEnabled) {
            e.preventDefault();
            
            // Throttle scroll events for smoother animation
            const now = Date.now();
            if (now - lastScrollTime > 50) { // 50ms throttle
                lastScrollTime = now;
                
                // Get scroll delta
                const delta = e.deltaY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
                
                // Increment animation progress based on scroll direction
                if (delta > 0) {
                    animationProgress += 0.05; // Slower progress increment for smoother animation
                } else if (delta < 0) {
                    animationProgress = Math.max(0, animationProgress - 0.02); // Allow some reverse scrolling
                }
                
                // Cap progress at 1
                animationProgress = Math.min(1, animationProgress);
                
                // Apply animation based on progress
                animateClothByProgress(animationProgress);
                
                // If animation is complete, enable scrolling
                if (animationProgress >= 1) {
                    setTimeout(() => {
                        scrollEnabled = true;
                        window.removeEventListener('wheel', handleScroll);
                        window.removeEventListener('touchmove', handleScroll);
                        
                        // Create some hearts that stay behind
                        createPersistentHearts();
                    }, 500);
                }
            }
        }
    }
    
    // Add a manual trigger for the first scroll
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            if (!scrollEnabled) {
                animateClothOut();
            }
        });
    }
    
    // Function to animate the cloth overlay based on scroll progress
    function animateClothByProgress(progress) {
        const clothOverlay = document.querySelector('.cloth-overlay');
        const hStripes = document.querySelectorAll('.h-stripe');
        const vStripes = document.querySelectorAll('.v-stripe');
        
        // Calculate how many stripes should be animated based on progress
        const totalHStripes = hStripes.length;
        const totalVStripes = vStripes.length;
        
        const hStripesToAnimate = Math.floor(progress * totalHStripes);
        const vStripesToAnimate = Math.floor(progress * totalVStripes);
        
        // Animate horizontal stripes based on progress
        hStripes.forEach((stripe, index) => {
            if (index < hStripesToAnimate) {
                stripe.style.transform = 'translateX(-100%)';
                stripe.style.opacity = '0';
            }
        });
        
        // Animate vertical stripes based on progress (with slight delay)
        vStripes.forEach((stripe, index) => {
            // Start vertical stripes after horizontal stripes are 20% done
            const vProgress = Math.max(0, (progress - 0.2) * 1.25);
            const vStripesToAnimate = Math.floor(vProgress * totalVStripes);
            
            if (index < vStripesToAnimate) {
                stripe.style.transform = 'translateY(-100%)';
                stripe.style.opacity = '0';
            }
        });
        
        // If animation is complete, prepare to hide overlay
        if (progress >= 1) {
            setTimeout(() => {
                clothOverlay.style.display = 'none';
            }, 800);
        }
    }
    
    // Function to create hearts that persist after refresh - completely removed as requested
    function createPersistentHearts() {
        // Hearts have been completely removed from the carousel as requested
        // Do nothing - no hearts should be created
        return;
    }
    
    // Function to load saved hearts from previous sessions - completely removed as requested
    function loadSavedHearts(overlay) {
        // Hearts have been completely removed from the carousel as requested
        // Do nothing - no hearts should be loaded
        return;
    }
    
    // Create interlacing effect by adjusting z-indices
    function createInterlacingEffect() {
        const vStripes = document.querySelectorAll('.v-stripe');
        const hStripes = document.querySelectorAll('.h-stripe');
        
        // Set initial z-indices for interlacing effect
        vStripes.forEach((stripe, index) => {
            // Alternate z-index to create over-under pattern
            if (index % 2 === 0) {
                stripe.style.zIndex = 5;
            } else {
                stripe.style.zIndex = 7;
            }
        });
        
        hStripes.forEach((stripe, index) => {
            // Alternate z-index to create over-under pattern
            if (index % 2 === 0) {
                stripe.style.zIndex = 6;
            } else {
                stripe.style.zIndex = 8;
            }
        });
    }
}