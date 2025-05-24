// Footer Hearts Initialization
document.addEventListener('DOMContentLoaded', function() {
    initFooterHearts();
});

function initFooterHearts() {
    console.log('Initializing footer hearts...');
    const footer = document.querySelector('.footer');
    const blessingButton = document.getElementById('blessing-button');
    const blessingHearts = document.querySelector('.blessing-hearts');
    
    // Check if elements exist
    if (!footer || !blessingButton || !blessingHearts) {
        console.error('Footer heart elements not found');
        return;
    }
    
    let heartCount = 0;
    const maxHearts = 30; // Maximum number of hearts
    
    // Use footer-bottom as the heart pile container
    const heartPile = document.querySelector('.footer-bottom');
    // Ensure the heartPile has the necessary styles
    if (heartPile) {
        heartPile.style.position = 'relative';
        heartPile.style.width = '100%';
        heartPile.style.zIndex = '10';
        heartPile.style.pointerEvents = 'none';
        heartPile.style.overflow = 'visible';
    }
    
    // Track pile positions to create stacking effect
    const pilePositions = [];
    const footerWidth = footer.offsetWidth;
    const maxPileHearts = Math.floor(footerWidth / 40); // Heart density
    
    // Add three default hearts to start
    addDefaultHearts();
    
    // Create heart with dynamic properties
    function createHeart() {
        if (heartCount >= maxHearts) {
            // Remove oldest heart if we reach the maximum
            const oldestHeart = document.querySelector('.pile-heart');
            if (oldestHeart) {
                oldestHeart.style.opacity = '1';
                heartCount--;
            }
            return; // Don't create more hearts if we're at the maximum
        }
        
        // Calculate a random position in the pile
        const size = 70 + Math.random() * 15; // Size (70-85px)
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
        
        heart.style.backgroundImage = "url('images/heart1.png')";
        heart.style.backgroundSize = 'contain';
        heart.style.backgroundRepeat = 'no-repeat';
        heart.style.backgroundPosition = 'center';
        
        const brightness = 100 + Math.floor(Math.random() * 30);
        const saturation = 120 + Math.floor(Math.random() * 30);
        
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
    
    // Function to add three default hearts to the pile
    function addDefaultHearts() {
        // Add three hearts with different positions
        for (let i = 0; i < 3; i++) {
            const size = 70 + Math.random() * 15;
            const pileX = (footerWidth / 4) + (i * footerWidth / 4);
            const randomRotation = Math.random() * 20 - 10;
            
            const pileHeart = document.createElement('div');
            pileHeart.classList.add('pile-heart');
            
            pileHeart.style.width = `${size}px`;
            pileHeart.style.height = `${size}px`;
            pileHeart.style.backgroundImage = "url('images/heart1.png')";
            pileHeart.style.backgroundSize = 'contain';
            pileHeart.style.backgroundRepeat = 'no-repeat';
            pileHeart.style.backgroundPosition = 'center';
            
            const stackPosition = {
                x: pileX,
                y: i * 10, // Stagger the heights slightly
                z: 10 + i
            };
            
            pileHeart.style.position = 'absolute';
            pileHeart.style.left = `${stackPosition.x}px`;
            pileHeart.style.bottom = `${stackPosition.y}px`;
            pileHeart.style.transform = `rotate(${randomRotation}deg)`;
            pileHeart.style.zIndex = stackPosition.z;
            
            heartPile.appendChild(pileHeart);
            pilePositions.push(stackPosition);
            heartCount++;
        }
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const newWidth = footer.offsetWidth;
        if (Math.abs(newWidth - footerWidth) > 100) { 
            // Clear the pile and positions
            const hearts = heartPile.querySelectorAll('.pile-heart');
            hearts.forEach(heart => heart.remove());
            pilePositions.length = 0;
            heartCount = 0;
            
            // Re-add the default hearts
            addDefaultHearts();
        }
    });
    
    // Add click event listener to the blessing button with cooldown to prevent multiple hearts
    let isButtonCooldown = false;
    blessingButton.addEventListener('click', () => {
        if (!isButtonCooldown) {
            isButtonCooldown = true;
            createHeart();
            
            // Set cooldown period to prevent multiple hearts appearing at once
            setTimeout(() => {
                isButtonCooldown = false;
            }, 800); // 800ms cooldown between heart creations
        }
    });
}