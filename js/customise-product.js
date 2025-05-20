document.addEventListener('DOMContentLoaded', function() {
    initCustomizationInterface();
    updateProductPreview();
    calculatePrice();
});

function initCustomizationInterface() {
    // Product Type Selection
    const productTypeOptions = document.querySelectorAll('.product-type-option');
    productTypeOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            productTypeOptions.forEach(opt => opt.classList.remove('active'));
            // Add active class to clicked option
            this.classList.add('active');
            // Update preview
            updateProductPreview();
            // Update price
            calculatePrice();
        });
    });

    // Color Selection
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            colorOptions.forEach(opt => opt.classList.remove('active'));
            // Add active class to clicked option
            this.classList.add('active');
            // Update preview
            updateProductPreview();
            // Update price
            calculatePrice();
        });
    });

    // Pattern Selection
    const patternOptions = document.querySelectorAll('.pattern-option');
    patternOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            patternOptions.forEach(opt => opt.classList.remove('active'));
            // Add active class to clicked option
            this.classList.add('active');
            // Update preview
            updateProductPreview();
            // Update price
            calculatePrice();
        });
    });

    // Size Selection
    const sizeOptions = document.querySelectorAll('.size-option');
    const customDimensions = document.getElementById('custom-dimensions');
    
    sizeOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            sizeOptions.forEach(opt => opt.classList.remove('active'));
            // Add active class to clicked option
            this.classList.add('active');
            
            // Show/hide custom dimensions based on selection
            if (this.dataset.size === 'custom') {
                customDimensions.style.display = 'grid';
            } else {
                customDimensions.style.display = 'none';
            }
            
            // Update preview
            updateProductPreview();
            // Update price
            calculatePrice();
        });
    });

    // Custom Dimensions Inputs
    const widthInput = document.getElementById('width');
    const lengthInput = document.getElementById('length');
    
    [widthInput, lengthInput].forEach(input => {
        input.addEventListener('change', function() {
            // Update preview
            updateProductPreview();
            // Update price
            calculatePrice();
        });
    });

    // Border Selection
    const borderOptions = document.querySelectorAll('.border-option');
    borderOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            borderOptions.forEach(opt => opt.classList.remove('active'));
            // Add active class to clicked option
            this.classList.add('active');
            // Update preview
            updateProductPreview();
            // Update price
            calculatePrice();
        });
    });

    // Additional Options
    const additionalOptions = document.querySelectorAll('.option-checkbox input');
    additionalOptions.forEach(option => {
        option.addEventListener('change', function() {
            // Update preview
            updateProductPreview();
            // Update price
            calculatePrice();
        });
    });

    // Action Buttons
    const addToCartButton = document.querySelector('.add-to-cart');
    const saveDesignButton = document.querySelector('.save-design');
    
    addToCartButton.addEventListener('click', function() {
        // Get all selected options
        const selectedOptions = getSelectedOptions();
        // Add to cart logic
        addToCart(selectedOptions);
    });
    
    saveDesignButton.addEventListener('click', function() {
        // Get all selected options
        const selectedOptions = getSelectedOptions();
        // Save design logic
        saveDesign(selectedOptions);
    });
}

function updateProductPreview() {
    // Get selected options
    const selectedProduct = document.querySelector('.product-type-option.active').dataset.product;
    const selectedColor = document.querySelector('.color-option.active').dataset.color;
    const selectedPattern = document.querySelector('.pattern-option.active').dataset.pattern;
    const selectedSize = document.querySelector('.size-option.active').dataset.size;
    const selectedBorder = document.querySelector('.border-option.active').dataset.border;
    
    // Get additional options
    const hasTassels = document.getElementById('tassels').checked;
    const hasEmbroidery = document.getElementById('embroidery').checked;
    
    // Update preview image based on product type
    const previewImage = document.getElementById('preview-image');
    previewImage.src = `images/category (${getProductImageIndex(selectedProduct)}).jpeg`;
    
    // Apply color filter to the image
    previewImage.style.filter = `sepia(50%) hue-rotate(${getHueRotation(selectedColor)}deg) saturate(150%)`;
    
    // Update pattern overlay
    const patternOverlay = document.getElementById('pattern-overlay');
    patternOverlay.style.backgroundImage = `url('images/${selectedPattern}')`;
    
    // Apply additional visual effects based on options
    if (hasTassels) {
        // Add tassels visual effect
        previewImage.classList.add('with-tassels');
    } else {
        previewImage.classList.remove('with-tassels');
    }
    
    if (hasEmbroidery) {
        // Add embroidery visual effect
        previewImage.classList.add('with-embroidery');
    } else {
        previewImage.classList.remove('with-embroidery');
    }
}

function calculatePrice() {
    // Base prices for different products
    const basePrices = {
        'saree': 3500,
        'dupatta': 1800,
        'stole': 1200,
        'gamcha': 800,
        'lungi': 1000,
        'yardage': 1500
    };
    
    // Additional costs
    const patternCosts = {
        'cloth-texture.svg': 300,
        'stripes.png': 400,
        'checks.png': 500,
        'dots.png': 450,
        'floral.png': 600,
        'geometric.png': 550
    };
    
    const borderCosts = {
        'border1.png': 200,
        'border2.png': 300,
        'border3.png': 400,
        'border4.png': 500
    };
    
    // Get selected options
    const selectedProduct = document.querySelector('.product-type-option.active').dataset.product;
    const selectedPattern = document.querySelector('.pattern-option.active').dataset.pattern;
    const selectedBorder = document.querySelector('.border-option.active').dataset.border;
    const selectedSize = document.querySelector('.size-option.active').dataset.size;
    
    // Calculate base price
    let basePrice = basePrices[selectedProduct] || 2500;
    
    // Adjust for size
    if (selectedSize === 'medium') {
        basePrice *= 1.2;
    } else if (selectedSize === 'large') {
        basePrice *= 1.5;
    } else if (selectedSize === 'custom') {
        // Calculate price based on dimensions
        const width = parseInt(document.getElementById('width').value) || 100;
        const length = parseInt(document.getElementById('length').value) || 200;
        const standardArea = 100 * 200; // Standard size in sq cm
        const customArea = width * length;
        const sizeFactor = customArea / standardArea;
        basePrice *= Math.max(1, sizeFactor);
    }
    
    // Add pattern cost
    const patternPrice = patternCosts[selectedPattern] || 300;
    
    // Add border cost
    const borderPrice = borderCosts[selectedBorder] || 200;
    
    // Calculate additional options cost
    let optionsPrice = 0;
    if (document.getElementById('tassels').checked) {
        optionsPrice += 200;
    }
    if (document.getElementById('embroidery').checked) {
        optionsPrice += 500;
    }
    if (document.getElementById('gift-wrap').checked) {
        optionsPrice += 100;
    }
    
    // Update price display
    document.getElementById('base-price').textContent = `₹${Math.round(basePrice).toLocaleString()}`;
    document.getElementById('pattern-price').textContent = `₹${patternPrice.toLocaleString()}`;
    document.getElementById('border-price').textContent = `₹${borderPrice.toLocaleString()}`;
    document.getElementById('options-price').textContent = `₹${optionsPrice.toLocaleString()}`;
    
    // Calculate and update total price
    const totalPrice = basePrice + patternPrice + borderPrice + optionsPrice;
    document.getElementById('total-price').textContent = `₹${Math.round(totalPrice).toLocaleString()}`;
}

function getSelectedOptions() {
    // Collect all selected options to return as an object
    return {
        product: document.querySelector('.product-type-option.active').dataset.product,
        color: document.querySelector('.color-option.active').dataset.color,
        pattern: document.querySelector('.pattern-option.active').dataset.pattern,
        size: document.querySelector('.size-option.active').dataset.size,
        width: document.getElementById('width').value,
        length: document.getElementById('length').value,
        border: document.querySelector('.border-option.active').dataset.border,
        tassels: document.getElementById('tassels').checked,
        embroidery: document.getElementById('embroidery').checked,
        giftWrap: document.getElementById('gift-wrap').checked,
        price: document.getElementById('total-price').textContent
    };
}

function addToCart(options) {
    // Simulate adding to cart
    alert(`Your custom ${options.product} has been added to cart!\n\nTotal: ${options.price}`);
    console.log('Added to cart:', options);
    // In a real implementation, this would send the data to a cart API
}

function saveDesign(options) {
    // Simulate saving design
    const designId = 'D' + Math.floor(Math.random() * 10000);
    alert(`Your design has been saved!\n\nDesign ID: ${designId}\nYou can access this design later from your account.`);
    console.log('Saved design:', options);
    // In a real implementation, this would save to a database
}

function getProductImageIndex(product) {
    // Map product types to their corresponding image indices
    const productIndices = {
        'saree': 1,
        'dupatta': 2,
        'stole': 3,
        'gamcha': 4,
        'lungi': 5,
        'yardage': 6
    };
    
    return productIndices[product] || 5;
}

function getHueRotation(color) {
    // Convert hex color to hue rotation value
    // This is a simplified approach - in a real implementation,
    // you would use a more sophisticated color transformation
    
    // Remove the # if present
    color = color.replace('#', '');
    
    // Convert to RGB
    const r = parseInt(color.substr(0, 2), 16) / 255;
    const g = parseInt(color.substr(2, 2), 16) / 255;
    const b = parseInt(color.substr(4, 2), 16) / 255;
    
    // Find the max and min values
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    
    // Calculate hue
    let h = 0;
    if (max === min) {
        h = 0; // achromatic
    } else {
        const d = max - min;
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    
    // Convert to degrees and return
    return Math.round(h * 360);
}