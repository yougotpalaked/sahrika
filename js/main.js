// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the page
    initLoader();
    initNavigation();
    initParallaxEffects();
    initProcessAnimation();
    initCollectionHover();
    initCategorySection();
    initBlessingHearts();
    initScrollIndicator();
});

// Initialize scroll indicator to only show in hero section
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const heroSection = document.querySelector('.hero-carousel-section');
    
    if (scrollIndicator && heroSection) {
        window.addEventListener('scroll', () => {
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
            const scrollPosition = window.scrollY;
            
            // Only show scroll indicator when in hero section
            if (scrollPosition < heroBottom - 100) {
                scrollIndicator.style.opacity = '1';
            } else {
                scrollIndicator.style.opacity = '0';
            }
        });
    }
}

// Initialize the Shop by Category section with animations and interactions
function initCategorySection() {
    const categoryItems = document.querySelectorAll('.category-item');
    
    // Add animation when scrolling to the category section
    if (categoryItems.length > 0) {
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate category items on scroll with a cloth-like unfold effect
        gsap.from(categoryItems, {
            y: 30,
            opacity: 0,
            scale: 0.9,
            rotation: 0.5,
            duration: 1.2,
            stagger: 0.2,
            ease: "elastic.out(0.8, 0.5)",
            scrollTrigger: {
                trigger: ".category-container",
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
        
        // Add click event listeners to category items
        categoryItems.forEach(item => {
            // Add cloth-like hover effect with GSAP
            item.addEventListener('mouseenter', () => {
                // Create a more cloth-like hover effect
                gsap.to(item, {
                    scale: 1.05,
                    y: -10,
                    rotation: 0.5,
                    duration: 0.4,
                    ease: "power2.out",
                    boxShadow: "0 20px 30px rgba(0, 0, 0, 0.2)"
                });
                
                // Enhance the cloth texture on hover
                gsap.to(item, {
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1))`
                });
                
                // Make the category info more visible
                const info = item.querySelector('.category-info');
                gsap.to(info, {
                    y: -5,
                    opacity: 1,
                    duration: 0.3
                });
            });
            
            item.addEventListener('mouseleave', () => {
                gsap.to(item, {
                    scale: 1,
                    y: 0,
                    rotation: 0,
                    duration: 0.4,
                    ease: "power2.out",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)"
                });
                
                // Reset the cloth texture
                gsap.to(item, {
                    backgroundImage: 'none'
                });
                
                // Reset the category info
                const info = item.querySelector('.category-info');
                gsap.to(info, {
                    y: 0,
                    opacity: 0.9,
                    duration: 0.3
                });
            });
            
            // Add click event to navigate to category page with cloth-like folding effect
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const href = item.getAttribute('href');
                
                // Add a cloth-like folding effect before navigating
                gsap.timeline()
                    .to(item, {
                        scale: 0.95,
                        rotation: -1,
                        duration: 0.2,
                        ease: "power2.in"
                    })
                    .to(item, {
                        scale: 1.1,
                        rotation: 1,
                        duration: 0.3,
                        ease: "power2.out",
                        onComplete: () => {
                            
                            window.location.href = href;
                            
                        }
                    });
            });
        });
    }
}

// Enhanced loader with word cycling animation
function initLoader() {
    const loader = document.querySelector('.loader');
    const changingWord = document.getElementById('changing-word');
    const words = ['SAHRI', 'AAP','UN', 'SAB'];
    let currentIndex = 0;
    
    // Function to cycle through words
    function cycleWords() {
        // Fade out current word
        gsap.to(changingWord, {
            opacity: 0,
            y: -10,
            duration: 0.5,
            onComplete: () => {
                // Change word
                currentIndex = (currentIndex + 1) % words.length;
                changingWord.textContent = words[currentIndex];
                
                // Fade in new word
                gsap.to(changingWord, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5
                });
            }
        });
    }
    
    // Start cycling words
    const wordInterval = setInterval(cycleWords, 1000);
    
    // Hide loader after content is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            clearInterval(wordInterval); // Stop the animation
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
        }, 3500); // Extended time to show the animation
    });
}

// Enhanced navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Change navbar style on scroll with enhanced visibility
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Improved mobile menu toggle with animation
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Enhanced smooth scroll to section with better offset calculation
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (event) => {
            // Close mobile menu when clicking on a link
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            
            // Smooth scroll to section with improved offset for fixed header
            if (link.getAttribute('href').startsWith('#')) {
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    event.preventDefault();
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                    const offsetPosition = targetPosition - navbarHeight - 20;
                    
                    // Add active state to current nav item
                    document.querySelectorAll('.nav-links a').forEach(navLink => {
                        navLink.classList.remove('active-link');
                    });
                    link.classList.add('active-link');
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Highlight active section on scroll
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + navbar.offsetHeight + 50;
        
        // Check which section is currently in view
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(navLink => {
                    navLink.classList.remove('active-link');
                    if (navLink.getAttribute('href') === `#${sectionId}`) {
                        navLink.classList.add('active-link');
                    }
                });
            }
        });
    });
    
    // Fix for the logo blocking content - enhanced with animation
    const logo = document.querySelector('.logo');
    logo.addEventListener('click', () => {
        // Remove active class from all nav links when clicking logo
        document.querySelectorAll('.nav-links a').forEach(navLink => {
            navLink.classList.remove('active-link');
        });
        
        // Smooth scroll to top with animation
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Intro animation sequence with interlacing stripes effect
// Function removed as part of removing stripe animation completely

// Enhanced parallax effects for images
function initParallaxEffects() {
    // Advanced parallax for section images with depth effect
    document.querySelectorAll('.parallax-image').forEach((image, index) => {
        // Create a more dynamic parallax effect with varying speeds
        const speed = 0.1 + (index * 0.05);
        const direction = index % 2 === 0 ? 1 : -1; // Alternate directions
        
        // Create a timeline for each image
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: image.parentElement,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
        
        // Add scale effect for depth
        tl.fromTo(image, 
            { y: `-${10 * direction}%`, scale: 1.05 },
            { y: `${15 * direction}%`, scale: 1, ease: 'none' }
        );
        
        // Add subtle rotation for more dynamic feel
        if (index % 3 === 0) {
            gsap.fromTo(image.parentElement, 
                { rotationZ: -0.5 },
                { 
                    rotationZ: 0.5, 
                    scrollTrigger: {
                        trigger: image.parentElement,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 2
                    }
                }
            );
        }
    });
    
    // Enhanced fade in sections with staggered elements
    document.querySelectorAll('.section').forEach(section => {
        // Main section animation
        gsap.from(section, {
            opacity: 0,
            y: 30,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                once: true
            }
        });
        
        // Staggered animation for text elements within sections
        const textElements = section.querySelectorAll('h2, h3, p, .button');
        gsap.from(textElements, {
            opacity: 0,
            y: 20,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power1.out',
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                once: true
            }
        });
    });
}

// Process section step-by-step animation
function initProcessAnimation() {
    document.querySelectorAll('.process-step').forEach((step, index) => {
        gsap.to(step, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: step,
                start: 'top 80%',
                once: true
            },
            delay: index * 0.2
        });
    });
}

// Collection hover effects
function initCollectionHover() {
    // Additional hover effects can be added here if needed
    // The CSS already handles basic hover animations
}

// Enhanced hero section with stripes that animate away on scroll before allowing page scrolling
// Function removed as part of removing stripe animation

// Flower/heart blessing footer animation inspired by "Made in Webflow" flower pile effect
function initBlessingHearts() {
    console.log('Initializing blessing hearts...');
    const footer = document.querySelector('.footer');
    const blessingButton = document.getElementById('blessing-button');
    const blessingHearts = document.querySelector('.blessing-hearts');
    
    // Check if elements exist
    if (!footer) {
        console.error('Footer element not found');
        return;
    }
    
    if (!blessingButton) {
        console.error('Blessing button not found');
        return;
    }
    
    let heartCount = 0;
    const maxHearts = 30; // Increased maximum number of hearts
    
    // Create heart pile container at the bottom of the footer
    const heartPile = document.createElement('div');
    heartPile.classList.add('heart-pile');
    heartPile.style.position = 'absolute';
    heartPile.style.bottom = '0';
    heartPile.style.left = '0';
    heartPile.style.width = '100%';
    heartPile.style.height = '90px'; // Increased height of the pile area
    heartPile.style.zIndex = '10'; // Increased z-index to ensure hearts appear above footer content
    heartPile.style.pointerEvents = 'none'; // Allow clicks to pass through
    heartPile.style.overflow = 'visible'; // Allow hearts to be visible outside container
    footer.appendChild(heartPile);
    
    // Track pile positions to create stacking effect
    const pilePositions = [];
    const footerWidth = footer.offsetWidth;
    const maxPileHearts = Math.floor(footerWidth / 40); // Heart density
    
    // Create heart with dynamic properties
    function createHeart() {
        if (heartCount >= maxHearts) {
            // Remove oldest heart if we reach the maximum
            const oldestHeart = document.querySelector('.pile-heart');
            if (oldestHeart) {
                oldestHeart.style.opacity = '0';
                setTimeout(() => oldestHeart.remove(), 500);
                heartCount--;
            }
            return; // Don't create more hearts if we're at the maximum
        }
        
        // Calculate a random position in the pile
        const size = 70 + Math.random() * 15; // Increased size (40-55px)
        const pileX = Math.random() * (footerWidth - size);
        
        
        const colors = [
            0,      // Red (default)
            30,     // Orange-red
            45,     // Orange
            60,     // Gold
            120,    // Green
            180,    // Turquoise
            210,    // Blue
            270,    // Purple
            330     // Pink
        ];
        const hue = colors[Math.floor(Math.random() * colors.length)];
        
       
        createAnimatedHeart(size, hue, blessingButton, pileX);
        heartCount++;
    }
    
   
    function createAnimatedHeart(size, hue, button, targetX) {
        // Get button position
        const buttonRect = button.getBoundingClientRect();
        const buttonX = buttonRect.left + buttonRect.width / 2;
        const buttonY = buttonRect.top + buttonRect.height / 2;
        
        
        const footerRect = footer.getBoundingClientRect();
        const footerY = footerRect.top + footerRect.height - 60; // Position near bottom of footer
        
       
        const heart = document.createElement('div');
        heart.classList.add('animated-heart');
        
       
        heart.style.position = 'fixed';
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.left = `${buttonX - size/2}px`;
        heart.style.top = `${buttonY - size/2}px`;
        heart.style.zIndex = '9999';
        heart.style.pointerEvents = 'none';
        
       
        heart.style.backgroundImage = "url('../images/handwoven-heart-Copy.svg')";
        heart.style.backgroundSize = 'contain';
        heart.style.backgroundRepeat = 'no-repeat';
        heart.style.backgroundPosition = 'center';
        
        
        const brightness = 100 + Math.floor(Math.random() * 30);
        const saturation = 120 + Math.floor(Math.random() * 30);
        heart.style.filter = `drop-shadow(0 0 5px rgba(255, 255, 255, 0.5)) hue-rotate(${hue}deg) brightness(${brightness}%) saturate(${saturation}%)`;
        
       
        document.body.appendChild(heart);
        
        
      
        let stackPosition = findStackPosition(targetX);
        const randomRotation = Math.random() * 20 - 10; 
        
        
        gsap.timeline()
            
            .from(heart, {
                scale: 0,
                opacity: 0,
                duration: 0.3,
                ease: 'back.out(1.5)'
            })
            
            .to(heart, {
                x: stackPosition.x - buttonX,
                y: footerY - buttonY - stackPosition.y, 
                rotation: randomRotation,
                duration: 1.2,
                ease: 'power2.inOut',
                onComplete: () => {
                    
                    const pileHeart = document.createElement('div');
                    pileHeart.classList.add('pile-heart');
                    
                    
                    pileHeart.style.width = heart.style.width;
                    pileHeart.style.height = heart.style.height;
                    pileHeart.style.backgroundImage = heart.style.backgroundImage;
                    pileHeart.style.backgroundSize = 'contain';
                    pileHeart.style.backgroundRepeat = 'no-repeat';
                    pileHeart.style.backgroundPosition = 'center';
                    pileHeart.style.filter = heart.style.filter;
                    
                   
                    pileHeart.style.position = 'absolute';
                    pileHeart.style.left = `${stackPosition.x}px`;
                    pileHeart.style.bottom = `${stackPosition.y}px`;
                    pileHeart.style.transform = `rotate(${randomRotation}deg)`;
                    pileHeart.style.zIndex = stackPosition.z; 
                    
                   
                    heartPile.appendChild(pileHeart);
                    
                    
                    pilePositions.push(stackPosition);
                    
                   
                    heart.remove();
                    
                    
                    gsap.to(pileHeart, {
                        y: '+=3',
                        duration: 0.2,
                        ease: 'power1.inOut',
                        yoyo: true,
                        repeat: 1
                    });
                    
                   
                    if (pilePositions.length > maxPileHearts * 2) {
                      
                        const heartsToRemove = pilePositions.length - maxPileHearts;
                        pilePositions.splice(0, heartsToRemove);
                        
                        const pileHearts = heartPile.querySelectorAll('.pile-heart');
                        for (let i = 0; i < heartsToRemove && i < pileHearts.length; i++) {
                            gsap.to(pileHearts[i], {
                                opacity: 0,
                                scale: 0.5,
                                duration: 0.3,
                                onComplete: () => pileHearts[i].remove()
                            });
                        }
                    }
                }
            });
    }
    

    function findStackPosition(targetX) {
        const heartWidth = 45; 
        const heartHeight = 45;
        const baseY = 0; 
        let maxZ = 10; 
        
    
        if (pilePositions.length === 0) {
            return { 
                x: targetX, 
                y: baseY, 
                z: maxZ 
            };
        }
        
      
        const nearbyPositions = pilePositions.filter(pos => 
            Math.abs(pos.x - targetX) < heartWidth
        );
        
       
        if (nearbyPositions.length === 0) {
            return { 
                x: targetX, 
                y: baseY, 
                z: maxZ 
            };
        }
        
     
        let highestPos = nearbyPositions.reduce((highest, current) => 
            current.y > highest.y ? current : highest
        , nearbyPositions[0]);
        
      
        return { 
            x: targetX + (Math.random() * 10 - 5), 
            y: highestPos.y + (heartHeight * 0.7), 
            z: highestPos.z + 1 
        };
    }
    
    
    window.addEventListener('resize', () => {
        const newWidth = footer.offsetWidth;
        if (Math.abs(newWidth - footerWidth) > 100) { 
            // Clear the pile and positions
            const hearts = heartPile.querySelectorAll('.pile-heart');
            hearts.forEach(heart => heart.remove());
            pilePositions.length = 0;
            heartCount = 0; 
        }
    });
    
    
    blessingButton.addEventListener('click', () => createHeart());
}

