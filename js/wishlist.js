document.addEventListener('DOMContentLoaded', () => {
    initWishlistButton();
});

function initWishlistButton() {
    const wishlistButton = document.getElementById('wishlist-button');
    const wishlistCount = document.querySelector('.wishlist-count');
    
    // Initialize wishlist from localStorage or create empty array
    let wishlist = JSON.parse(localStorage.getItem('sahrikaWishlist')) || [];
    
    // Update count display
    function updateWishlistCount() {
        if (wishlist.length > 0) {
            wishlistCount.textContent = wishlist.length;
            wishlistCount.classList.add('show');
        } else {
            wishlistCount.classList.remove('show');
        }
    }
    
    // Initialize count on page load
    updateWishlistCount();
    
    // Add click event to wishlist button
    wishlistButton.addEventListener('click', () => {
        // Add pressed effect
        wishlistButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            wishlistButton.style.transform = '';
        }, 150);
        
        // For demo purposes, toggle heart color and add a demo item
        const heartIcon = wishlistButton.querySelector('i');
        
        if (heartIcon.style.color === 'rgb(255, 107, 107)') {
            // If heart is already red, toggle back
            heartIcon.style.color = '';
            // Clear wishlist for demo
            wishlist = [];
        } else {
            // If heart is not red, make it red
            heartIcon.style.color = '#ff6b6b';
            // Add a demo item to wishlist
            wishlist.push({ id: Date.now(), name: 'Demo Item' });
        }
        
        // Save to localStorage
        localStorage.setItem('sahrikaWishlist', JSON.stringify(wishlist));
        
        // Update count
        updateWishlistCount();
        
        // In a real implementation, you would show a wishlist panel here
        console.log('Wishlist items:', wishlist);
    });
    
    // Add hover effect
    wishlistButton.addEventListener('mouseenter', () => {
        const heartIcon = wishlistButton.querySelector('i');
        heartIcon.classList.add('fa-beat');
    });
    
    wishlistButton.addEventListener('mouseleave', () => {
        const heartIcon = wishlistButton.querySelector('i');
        heartIcon.classList.remove('fa-beat');
    });
}