document.addEventListener('DOMContentLoaded', () => {
    initWishlistButton();
    initProductWishlistButtons();
});

// Global wishlist variable
let wishlist = [];

// Initialize wishlist functionality
function initWishlistButton() {
    const wishlistButton = document.getElementById('wishlist-button');
    const wishlistCount = document.querySelector('.wishlist-count');
    
    // Initialize wishlist from localStorage or create empty array
    wishlist = JSON.parse(localStorage.getItem('sahrikaWishlist')) || [];
    
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
    
    // Add click event to wishlist button - navigate to wishlist page
    if (wishlistButton) {
        wishlistButton.addEventListener('click', () => {
            // Add pressed effect
            wishlistButton.style.transform = 'scale(0.95)';
            setTimeout(() => {
                wishlistButton.style.transform = '';
            }, 150);
            
            // Navigate to wishlist page
            window.location.href = 'wishlist.html';
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
}

// Initialize wishlist buttons on product cards and product detail page
function initProductWishlistButtons() {
    // Product detail page wishlist button
    const productWishlistBtn = document.querySelector('.wishlist-btn');
    if (productWishlistBtn) {
        const productId = productWishlistBtn.getAttribute('data-product-id') || 'product-' + Date.now();
        const productName = document.querySelector('.product-title')?.textContent || 'Product';
        const productPrice = document.querySelector('.product-price')?.textContent.replace('₹', '') || '850';
        const productImage = document.getElementById('mainImage')?.src || 'images/category (1).jpeg';
        
        // Check if product is already in wishlist
        const isInWishlist = wishlist.some(item => item.id == productId);
        if (isInWishlist) {
            productWishlistBtn.innerHTML = '<i class="fas fa-heart"></i> Remove from Wishlist';
            productWishlistBtn.classList.add('in-wishlist');
        }
        
        productWishlistBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const isNowInWishlist = wishlist.some(item => item.id == productId);
            
            if (isNowInWishlist) {
                // Remove from wishlist
                wishlist = wishlist.filter(item => item.id != productId);
                productWishlistBtn.innerHTML = '<i class="far fa-heart"></i> Add to Wishlist';
                productWishlistBtn.classList.remove('in-wishlist');
            } else {
                // Add to wishlist
                const product = {
                    id: productId,
                    name: productName,
                    price: productPrice,
                    image: productImage
                };
                
                wishlist.push(product);
                productWishlistBtn.innerHTML = '<i class="fas fa-heart"></i> Remove from Wishlist';
                productWishlistBtn.classList.add('in-wishlist');
            }
            
            // Save to localStorage
            localStorage.setItem('sahrikaWishlist', JSON.stringify(wishlist));
            
            // Update wishlist count
            updateWishlistCount();
        });
    }
    
    // Product card wishlist buttons (for product listing pages)
    const productCardWishlistBtns = document.querySelectorAll('.product-card-wishlist');
    productCardWishlistBtns.forEach(btn => {
        const productId = btn.getAttribute('data-product-id');
        const productCard = btn.closest('.product-card');
        const productName = productCard.querySelector('.product-card-title')?.textContent || 'Product';
        const productPrice = productCard.querySelector('.product-card-price')?.textContent.replace('₹', '') || '850';
        const productImage = productCard.querySelector('img')?.src || 'images/category (1).jpeg';
        
        // Check if product is already in wishlist
        const isInWishlist = wishlist.some(item => item.id == productId);
        if (isInWishlist) {
            btn.classList.add('in-wishlist');
            btn.innerHTML = '<i class="fas fa-heart"></i>';
        }
        
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isNowInWishlist = wishlist.some(item => item.id == productId);
            
            if (isNowInWishlist) {
                // Remove from wishlist
                wishlist = wishlist.filter(item => item.id != productId);
                btn.classList.remove('in-wishlist');
                btn.innerHTML = '<i class="far fa-heart"></i>';
            } else {
                // Add to wishlist
                const product = {
                    id: productId,
                    name: productName,
                    price: productPrice,
                    image: productImage
                };
                
                wishlist.push(product);
                btn.classList.add('in-wishlist');
                btn.innerHTML = '<i class="fas fa-heart"></i>';
            }
            
            // Save to localStorage
            localStorage.setItem('sahrikaWishlist', JSON.stringify(wishlist));
            
            // Update wishlist count
            updateWishlistCount();
        });
    });
}

// Update wishlist count in the floating button
function updateWishlistCount() {
    const wishlistCount = document.querySelector('.wishlist-count');
    if (!wishlistCount) return;
    
    if (wishlist.length > 0) {
        wishlistCount.textContent = wishlist.length;
        wishlistCount.classList.add('show');
    } else {
        wishlistCount.classList.remove('show');
    }
}