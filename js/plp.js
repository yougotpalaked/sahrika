document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initFilterToggle();
    initPriceRange();
    initViewToggle();
    initSorting();
    initFilters();
    initProductActions();
});

// Mobile menu dropdown functionality
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Mobile dropdown toggle
    if (window.innerWidth < 992) {
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                const dropdown = toggle.closest('.dropdown');
                dropdown.classList.toggle('active');
            });
        });
    }
}

// Mobile filter toggle
function initFilterToggle() {
    const filterSidebar = document.querySelector('.filter-sidebar');
    
    if (window.innerWidth < 992 && filterSidebar) {
        // Create mobile filter toggle button if it doesn't exist
        if (!document.querySelector('.mobile-filter-toggle')) {
            const mobileFilterToggle = document.createElement('button');
            mobileFilterToggle.className = 'mobile-filter-toggle';
            mobileFilterToggle.innerHTML = '<i class="fas fa-filter"></i> Show Filters';
            
            const productGridContainer = document.querySelector('.product-grid-container');
            if (productGridContainer) {
                productGridContainer.insertBefore(mobileFilterToggle, productGridContainer.firstChild);
                
                mobileFilterToggle.addEventListener('click', () => {
                    filterSidebar.classList.toggle('active');
                    mobileFilterToggle.innerHTML = filterSidebar.classList.contains('active') 
                        ? '<i class="fas fa-times"></i> Hide Filters' 
                        : '<i class="fas fa-filter"></i> Show Filters';
                });
            }
        }
    }
    
    // Filter group toggle
    const filterTitles = document.querySelectorAll('.filter-title');
    filterTitles.forEach(title => {
        title.addEventListener('click', () => {
            title.classList.toggle('collapsed');
            const filterGroup = title.nextElementSibling;
            filterGroup.style.display = title.classList.contains('collapsed') ? 'none' : 'block';
        });
    });
    
    // Clear all filters
    const clearFiltersBtn = document.querySelector('.clear-filters');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', () => {
            // Reset all checkboxes
            document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = false;
            });
            
            // Reset price range
            const priceRange = document.getElementById('priceRange');
            if (priceRange) {
                priceRange.value = priceRange.max / 2;
                updatePriceValue(priceRange.value);
            }
            
            // Trigger filter update
            updateProductDisplay();
        });
    }
}

// Price range slider
function initPriceRange() {
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    
    if (priceRange && priceValue) {
        priceRange.addEventListener('input', () => {
            updatePriceValue(priceRange.value);
        });
        
        priceRange.addEventListener('change', () => {
            updateProductDisplay();
        });
    }
}

function updatePriceValue(value) {
    const priceValue = document.getElementById('priceValue');
    if (priceValue) {
        priceValue.textContent = `₹${value}`;
    }
}

// Grid/List view toggle
function initViewToggle() {
    const gridViewBtn = document.querySelector('.grid-view');
    const listViewBtn = document.querySelector('.list-view');
    const productGrid = document.querySelector('.product-grid');
    
    if (gridViewBtn && listViewBtn && productGrid) {
        gridViewBtn.addEventListener('click', () => {
            productGrid.classList.remove('list-view');
            gridViewBtn.classList.add('active');
            listViewBtn.classList.remove('active');
            localStorage.setItem('viewMode', 'grid');
        });
        
        listViewBtn.addEventListener('click', () => {
            productGrid.classList.add('list-view');
            listViewBtn.classList.add('active');
            gridViewBtn.classList.remove('active');
            localStorage.setItem('viewMode', 'list');
        });
        
        // Check for saved preference
        const savedViewMode = localStorage.getItem('viewMode');
        if (savedViewMode === 'list') {
            productGrid.classList.add('list-view');
            listViewBtn.classList.add('active');
            gridViewBtn.classList.remove('active');
        }
    }
}

// Product sorting
function initSorting() {
    const sortSelect = document.getElementById('sortSelect');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            updateProductDisplay();
        });
    }
}

// Filter functionality
function initFilters() {
    const filterInputs = document.querySelectorAll('.filter-sidebar input[type="checkbox"]');
    
    filterInputs.forEach(input => {
        input.addEventListener('change', () => {
            updateProductDisplay();
        });
    });
}

// Update product display based on filters and sorting
function updateProductDisplay() {
    // This is a placeholder for actual filtering and sorting logic
    // In a real implementation, this would filter and sort the products based on selected criteria
    
    // For demonstration, we'll just show a message
    console.log('Updating product display with filters and sorting...');
    
    // Get selected filters
    const selectedColors = Array.from(document.querySelectorAll('input[name="color"]:checked')).map(input => input.value);
    const selectedMaterials = Array.from(document.querySelectorAll('input[name="material"]:checked')).map(input => input.value);
    const selectedPatterns = Array.from(document.querySelectorAll('input[name="pattern"]:checked')).map(input => input.value);
    const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(input => input.value);
    
    // Get price range
    const priceRange = document.getElementById('priceRange');
    const maxPrice = priceRange ? priceRange.value : 5000;
    
    // Get sort option
    const sortSelect = document.getElementById('sortSelect');
    const sortOption = sortSelect ? sortSelect.value : 'featured';
    
    console.log('Filters:', {
        colors: selectedColors,
        materials: selectedMaterials,
        patterns: selectedPatterns,
        categories: selectedCategories,
        maxPrice: maxPrice,
        sortBy: sortOption
    });
    
    // In a real implementation, you would filter the products here
    // and then update the product count
    document.getElementById('productCount').textContent = '6';
}

// Product actions (quick view, wishlist, add to cart)
function initProductActions() {
    // Quick view buttons
    const quickViewBtns = document.querySelectorAll('.quick-view');
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const productItem = btn.closest('.product-item');
            const productTitle = productItem.querySelector('.product-title').textContent;
            alert(`Quick view for ${productTitle}`);
        });
    });
    
    // Wishlist buttons
    const wishlistBtns = document.querySelectorAll('.add-to-wishlist');
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const heartIcon = btn.querySelector('i');
            heartIcon.classList.toggle('far');
            heartIcon.classList.toggle('fas');
            
            const productItem = btn.closest('.product-item');
            const productTitle = productItem.querySelector('.product-title').textContent;
            
            if (heartIcon.classList.contains('fas')) {
                console.log(`Added ${productTitle} to wishlist`);
            } else {
                console.log(`Removed ${productTitle} from wishlist`);
            }
        });
    });
    
    // Add to cart buttons
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const productItem = btn.closest('.product-item');
            const productTitle = productItem.querySelector('.product-title').textContent;
            console.log(`Added ${productTitle} to cart`);
            
            // Show confirmation animation
            btn.textContent = 'Added!';
            btn.style.backgroundColor = '#388E3C';
            btn.style.color = '#fff';
            
            setTimeout(() => {
                btn.textContent = 'Add to Cart';
                btn.style.backgroundColor = '';
                btn.style.color = '';
            }, 2000);
        });
    });
}

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth >= 992) {
        const filterSidebar = document.querySelector('.filter-sidebar');
        if (filterSidebar) {
            filterSidebar.style.display = 'block';
        }
    }
});