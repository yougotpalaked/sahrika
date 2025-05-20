/**
 * Enhanced Textile Pattern Customizer
 * Allows users to customize textile patterns with a more logical flow
 * Starting with cloth type, then pattern, material, colors, and finally checkout
 */

document.addEventListener('DOMContentLoaded', () => {
    initEnhancedTextureCustomizer();
});

function initEnhancedTextureCustomizer() {
    // Create customizer container if it doesn't exist
    if (!document.querySelector('.texture-customizer')) {
        createEnhancedCustomizerInterface();
    }
    
    // Initialize event listeners for all controls
    initializeEnhancedControlEvents();
    
    // Apply initial texture settings
    updateTexturePreview();
}

function createEnhancedCustomizerInterface() {
    // Create main container
    const customizer = document.createElement('div');
    customizer.classList.add('texture-customizer');
    
    // Create controls section
    const controlsSection = document.createElement('div');
    controlsSection.classList.add('texture-controls');
    
    // Add cloth type controls (FIRST)
    controlsSection.innerHTML += `
        <div class="control-group">
            <h3>Cloth Type</h3>
            <div class="cloth-type-controls">
                <div class="cloth-type-control">
                    <input type="radio" id="cloth-dupatta" name="cloth-type" value="dupatta" checked>
                    <label for="cloth-dupatta">Dupatta</label>
                </div>
                <div class="cloth-type-control">
                    <input type="radio" id="cloth-saree" name="cloth-type" value="saree">
                    <label for="cloth-saree">Saree</label>
                </div>
                <div class="cloth-type-control">
                    <input type="radio" id="cloth-stole" name="cloth-type" value="stole">
                    <label for="cloth-stole">Stole</label>
                </div>
                <div class="cloth-type-control">
                    <input type="radio" id="cloth-gamcha" name="cloth-type" value="gamcha">
                    <label for="cloth-gamcha">Gamcha</label>
                </div>
                <div class="cloth-type-control">
                    <input type="radio" id="cloth-duster" name="cloth-type" value="duster">
                    <label for="cloth-duster">Duster</label>
                </div>
                <div class="cloth-type-control">
                    <input type="radio" id="cloth-custom" name="cloth-type" value="custom">
                    <label for="cloth-custom">Custom Size</label>
                </div>
            </div>
        </div>
        
        <div class="control-group custom-size-controls" style="display: none;">
            <h3>Custom Size</h3>
            <div class="range-controls">
                <div class="range-control">
                    <label for="custom-width">Width (cm)</label>
                    <input type="range" id="custom-width" min="50" max="300" value="100">
                    <span class="value-display">100 cm</span>
                </div>
                <div class="range-control">
                    <label for="custom-length">Length (cm)</label>
                    <input type="range" id="custom-length" min="50" max="600" value="200">
                    <span class="value-display">200 cm</span>
                </div>
            </div>
        </div>
    `;
    
    // Add pattern type controls (SECOND)
    controlsSection.innerHTML += `
        <div class="control-group">
            <h3>Pattern Type</h3>
            <div class="pattern-controls">
                <div class="pattern-control">
                    <input type="radio" id="pattern-checks" name="pattern-type" value="checks" checked>
                    <label for="pattern-checks">Checks</label>
                </div>
                <div class="pattern-control">
                    <input type="radio" id="pattern-stripes" name="pattern-type" value="stripes">
                    <label for="pattern-stripes">Stripes</label>
                </div>
                <div class="pattern-control">
                    <input type="radio" id="pattern-plain" name="pattern-type" value="plain">
                    <label for="pattern-plain">Plain</label>
                </div>
                <div class="pattern-control">
                    <input type="radio" id="pattern-diagonal" name="pattern-type" value="diagonal">
                    <label for="pattern-diagonal">Diagonal Lines</label>
                </div>
                <div class="pattern-control">
                    <input type="radio" id="pattern-zigzag" name="pattern-type" value="zigzag">
                    <label for="pattern-zigzag">Zigzag</label>
                </div>
                <div class="pattern-control">
                    <input type="radio" id="pattern-herringbone" name="pattern-type" value="herringbone">
                    <label for="pattern-herringbone">Herringbone</label>
                </div>
            </div>
        </div>
    `;
    
    // Add material controls (THIRD)
    controlsSection.innerHTML += `
        <div class="control-group">
            <h3>Material</h3>
            <div class="material-controls">
                <div class="material-control">
                    <input type="radio" id="material-cotton" name="material-type" value="cotton" checked>
                    <label for="material-cotton">Cotton</label>
                </div>
                <div class="material-control">
                    <input type="radio" id="material-silk" name="material-type" value="silk">
                    <label for="material-silk">Silk</label>
                </div>
                <div class="material-control">
                    <input type="radio" id="material-linen" name="material-type" value="linen">
                    <label for="material-linen">Linen</label>
                </div>
                <div class="material-control">
                    <input type="radio" id="material-wool" name="material-type" value="wool">
                    <label for="material-wool">Wool</label>
                </div>
                <div class="material-control">
                    <input type="radio" id="material-blend" name="material-type" value="blend">
                    <label for="material-blend">Cotton-Silk Blend</label>
                </div>
            </div>
        </div>
    `;
    
    // Add color controls (FOURTH)
    controlsSection.innerHTML += `
        <div class="control-group">
            <h3>Primary Colors</h3>
            <div class="color-controls">
                <div class="color-control">
                    <label for="primary-color-1">Base Color</label>
                    <input type="color" id="primary-color-1" value="#E4E8A4" data-css-var="--primary-color-1">
                </div>
                <div class="color-control">
                    <label for="primary-color-2">Accent Color 1</label>
                    <input type="color" id="primary-color-2" value="#C5D99C" data-css-var="--primary-color-2">
                </div>
                <div class="color-control">
                    <label for="primary-color-3">Accent Color 2</label>
                    <input type="color" id="primary-color-3" value="#CDF194" data-css-var="--primary-color-3">
                </div>
            </div>
        </div>
        
        <div class="control-group">
            <h3>Secondary Colors</h3>
            <div class="color-controls">
                <div class="color-control">
                    <label for="secondary-color-1">Highlight Color</label>
                    <input type="color" id="secondary-color-1" value="#FFFFFF" data-css-var="--secondary-color-1">
                </div>
                <div class="color-control">
                    <label for="secondary-color-2">Border Color</label>
                    <input type="color" id="secondary-color-2" value="#F5F5F5" data-css-var="--secondary-color-2">
                </div>
            </div>
        </div>
        
        <div class="control-group">
            <h3>Pattern Settings</h3>
            <div class="range-controls">
                <div class="range-control">
                    <label for="pattern-size">Pattern Size</label>
                    <input type="range" id="pattern-size" min="1" max="10" value="4" data-unit="vh">
                    <span class="value-display">4vh</span>
                </div>
                <div class="range-control">
                    <label for="pattern-density">Pattern Density</label>
                    <input type="range" id="pattern-density" min="10" max="40" value="25">
                    <span class="value-display">25</span>
                </div>
            </div>
        </div>
        
        <button id="reset-texture" class="reset-button">Reset to Default</button>
    `;
    
    // Create preview section
    const previewSection = document.createElement('div');
    previewSection.classList.add('texture-preview');
    previewSection.innerHTML = `
        <h3>Live Preview</h3>
        <div class="preview-container">
            <div class="cloth-preview"></div>
        </div>
        <div class="price-container">
            <div class="price-breakdown">
                <div class="price-item">
                    <span>Base Price:</span>
                    <span id="base-price">₹1,200</span>
                </div>
                <div class="price-item">
                    <span>Material:</span>
                    <span id="material-price">₹0</span>
                </div>
                <div class="price-item">
                    <span>Customization:</span>
                    <span id="customization-price">₹600</span>
                </div>
                <div class="price-total">
                    <span>Total:</span>
                    <span id="total-price">₹1,800</span>
                </div>
            </div>
            <button id="add-to-cart" class="add-to-cart-button">Add to Cart</button>
        </div>
    `;
    
    // Append sections to customizer
    customizer.appendChild(controlsSection);
    customizer.appendChild(previewSection);
    
    // Add customizer to the page
    const customizationInterface = document.querySelector('.customization-interface');
    if (customizationInterface) {
        customizationInterface.appendChild(customizer);
    } else {
        // Fallback if the expected container doesn't exist
        const container = document.querySelector('.customization-container') || document.body;
        container.appendChild(customizer);
    }
    
    // Create cloth preview in the preview container
    const clothPreview = document.querySelector('.cloth-preview');
    createClothPreview(clothPreview);
}

function createClothPreview(container) {
    // Create cloth overlay for preview
    const clothOverlay = document.createElement('div');
    clothOverlay.classList.add('cloth-overlay', 'preview-overlay');
    container.appendChild(clothOverlay);
    
    // Initial stripe creation will be handled by updateTexturePreview
    updateTexturePreview();
}

function initializeEnhancedControlEvents() {
    // Cloth type radios
    document.querySelectorAll('input[name="cloth-type"]').forEach(input => {
        input.addEventListener('change', () => {
            // Show/hide custom size controls if custom is selected
            const customSizeControls = document.querySelector('.custom-size-controls');
            if (customSizeControls) {
                customSizeControls.style.display = 
                    document.getElementById('cloth-custom').checked ? 'block' : 'none';
            }
            
            // Update the selected cloth type in the summary
            const selectedClothType = document.getElementById('selected-cloth-type');
            if (selectedClothType) {
                selectedClothType.textContent = input.value.charAt(0).toUpperCase() + input.value.slice(1);
            }
            
            updatePricing();
            updateTexturePreview();
        });
    });
    
    // Pattern type radios
    document.querySelectorAll('input[name="pattern-type"]').forEach(input => {
        input.addEventListener('change', () => {
            // Update the selected pattern in the summary
            const selectedPattern = document.getElementById('selected-pattern');
            if (selectedPattern) {
                selectedPattern.textContent = input.value.charAt(0).toUpperCase() + input.value.slice(1);
            }
            
            updatePricing();
            updateTexturePreview();
        });
    });
    
    // Material type radios
    document.querySelectorAll('input[name="material-type"]').forEach(input => {
        input.addEventListener('change', () => {
            // Update the selected material in the summary
            const selectedMaterial = document.getElementById('selected-material');
            if (selectedMaterial) {
                selectedMaterial.textContent = input.value.charAt(0).toUpperCase() + input.value.slice(1);
            }
            
            updatePricing();
            updateTexturePreview();
        });
    });
    
    // Color inputs
    document.querySelectorAll('.color-control input[type="color"]').forEach(input => {
        input.addEventListener('input', () => {
            updateCSSVariable(input.dataset.cssVar, input.value);
            
            // Update the selected colors in the summary
            const selectedColors = document.getElementById('selected-colors');
            if (selectedColors) {
                selectedColors.textContent = 'Custom Selection';
            }
            
            updateTexturePreview();
        });
    });
    
    // Range inputs
    document.querySelectorAll('.range-control input[type="range"]').forEach(input => {
        input.addEventListener('input', () => {
            const valueDisplay = input.nextElementSibling;
            let displayValue = input.value;
            
            // Add unit if specified
            if (input.dataset.unit) {
                displayValue += input.dataset.unit;
            } else if (input.id === 'custom-width' || input.id === 'custom-length') {
                displayValue += ' cm';
            }
            
            valueDisplay.textContent = displayValue;
            updatePricing();
            updateTexturePreview();
        });
    });
    
    // Reset button
    const resetButton = document.getElementById('reset-texture');
    if (resetButton) {
        resetButton.addEventListener('click', resetToDefaults);
    }
    
    // Add to cart button
    const addToCartButton = document.getElementById('add-to-cart');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', () => {
            // Get all selected options
            const clothType = document.querySelector('input[name="cloth-type"]:checked').value;
            const patternType = document.querySelector('input[name="pattern-type"]:checked').value;
            const materialType = document.querySelector('input[name="material-type"]:checked').value;
            
            // Create a custom product object
            const customProduct = {
                type: clothType,
                pattern: patternType,
                material: materialType,
                colors: {
                    primary: document.getElementById('primary-color-1').value,
                    accent1: document.getElementById('primary-color-2').value,
                    accent2: document.getElementById('primary-color-3').value
                },
                price: calculateTotalPrice()
            };
            
            // Add custom size if selected
            if (clothType === 'custom') {
                customProduct.size = {
                    width: document.getElementById('custom-width').value,
                    length: document.getElementById('custom-length').value
                };
            }
            
            // In a real application, you would add this to the cart
            console.log('Added to cart:', customProduct);
            
            // Show confirmation to user
            alert('Your custom handloom has been added to cart!');
            
            // Update the cart count in the wishlist button
            const wishlistCount = document.querySelector('.wishlist-count');
            if (wishlistCount) {
                const currentCount = parseInt(wishlistCount.textContent) || 0;
                wishlistCount.textContent = currentCount + 1;
            }
        });
    }
}

function updateCSSVariable(variable, value) {
    document.documentElement.style.setProperty(variable, value);
}

function updateTexturePreview() {
    const clothType = document.querySelector('input[name="cloth-type"]:checked').value;
    const patternType = document.querySelector('input[name="pattern-type"]:checked').value;
    
    // Get the preview container
    const previewContainer = document.querySelector('.cloth-preview');
    if (!previewContainer) return;
    
    // Clear existing preview
    previewContainer.innerHTML = '';
    
    // Create cloth overlay
    const clothOverlay = document.createElement('div');
    clothOverlay.classList.add('cloth-overlay', 'preview-overlay');
    previewContainer.appendChild(clothOverlay);
    
    // Apply different styles based on pattern type
    previewContainer.className = 'cloth-preview';
    previewContainer.classList.add(`pattern-${patternType}`);
    
    // Apply different styles based on cloth type
    previewContainer.classList.add(`cloth-${clothType}`);
    
    // Create pattern elements based on pattern type
    if (patternType === 'checks') {
        createChecksPattern(clothOverlay);
    } else if (patternType === 'stripes') {
        createStripesPattern(clothOverlay);
    } else if (patternType === 'plain') {
        // Plain pattern just uses the base color
        clothOverlay.style.backgroundColor = document.getElementById('primary-color-1').value;
    } else if (patternType === 'diagonal') {
        createDiagonalPattern(clothOverlay);
    } else if (patternType === 'zigzag') {
        createZigzagPattern(clothOverlay);
    } else if (patternType === 'herringbone') {
        createHerringbonePattern(clothOverlay);
    }
}

function createChecksPattern(container) {
    const size = document.getElementById('pattern-size').value;
    const density = document.getElementById('pattern-density').value;
    
    container.style.backgroundImage = `
        linear-gradient(45deg, 
            ${document.getElementById('primary-color-1').value} 25%, 
            ${document.getElementById('primary-color-2').value} 25%, 
            ${document.getElementById('primary-color-2').value} 50%, 
            ${document.getElementById('primary-color-1').value} 50%, 
            ${document.getElementById('primary-color-1').value} 75%, 
            ${document.getElementById('primary-color-2').value} 75%, 
            ${document.getElementById('primary-color-2').value})
    `;
    container.style.backgroundSize = `${size * 2}vh ${size * 2}vh`;
}

function createStripesPattern(container) {
    const size = document.getElementById('pattern-size').value;
    
    container.style.backgroundImage = `
        linear-gradient(90deg, 
            ${document.getElementById('primary-color-1').value} 25%, 
            ${document.getElementById('primary-color-2').value} 25%, 
            ${document.getElementById('primary-color-2').value} 50%, 
            ${document.getElementById('primary-color-3').value} 50%, 
            ${document.getElementById('primary-color-3').value} 75%, 
            ${document.getElementById('secondary-color-1').value} 75%, 
            ${document.getElementById('secondary-color-1').value})
    `;
    container.style.backgroundSize = `${size * 4}vh 100%`;
}

function createDiagonalPattern(container) {
    const size = document.getElementById('pattern-size').value;
    
    container.style.backgroundImage = `
        linear-gradient(45deg, 
            ${document.getElementById('primary-color-1').value} 25%, 
            ${document.getElementById('primary-color-2').value} 25%, 
            ${document.getElementById('primary-color-2').value} 50%, 
            ${document.getElementById('primary-color-3').value} 50%, 
            ${document.getElementById('primary-color-3').value} 75%, 
            ${document.getElementById('secondary-color-1').value} 75%, 
            ${document.getElementById('secondary-color-1').value})
    `;
    container.style.backgroundSize = `${size * 4}vh ${size * 4}vh`;
}

function createZigzagPattern(container) {
    const size = document.getElementById('pattern-size').value;
    
    container.style.backgroundImage = `
        linear-gradient(135deg, ${document.getElementById('primary-color-1').value} 25%, transparent 25%) -${size}vh 0,
        linear-gradient(225deg, ${document.getElementById('primary-color-1').value} 25%, transparent 25%) -${size}vh 0,
        linear-gradient(315deg, ${document.getElementById('primary-color-1').value} 25%, transparent 25%),
        linear-gradient(45deg, ${document.getElementById('primary-color-1').value} 25%, ${document.getElementById('primary-color-2').value} 25%)
    `;
    container.style.backgroundSize = `${size * 2}vh ${size}vh`;
}

function createHerringbonePattern(container) {
    const size = document.getElementById('pattern-size').value;
    
    container.style.backgroundImage = `
        linear-gradient(45deg, ${document.getElementById('primary-color-2').value} 12%, transparent 0, transparent 88%, ${document.getElementById('primary-color-2').value} 0),
        linear-gradient(135deg, transparent 37%, ${document.getElementById('primary-color-1').value} 0, ${document.getElementById('primary-color-1').value} 63%, transparent 0),
        linear-gradient(45deg, transparent 37%, ${document.getElementById('primary-color-3').value} 0, ${document.getElementById('primary-color-3').value} 63%, transparent 0)
    `;
    container.style.backgroundSize = `${size * 2}vh ${size * 2}vh`;
}

function resetToDefaults() {
    // Reset cloth type
    document.getElementById('cloth-dupatta').checked = true;
    document.querySelector('.custom-size-controls').style.display = 'none';
    
    // Reset pattern type
    document.getElementById('pattern-checks').checked = true;
    
    // Reset material
    document.getElementById('material-cotton').checked = true;
    
    // Reset colors
    document.getElementById('primary-color-1').value = '#E4E8A4';
    document.getElementById('primary-color-2').value = '#C5D99C';
    document.getElementById('primary-color-3').value = '#CDF194';
    document.getElementById('secondary-color-1').value = '#FFFFFF';
    document.getElementById('secondary-color-2').value = '#F5F5F5';
    
    // Reset range inputs
    document.getElementById('pattern-size').value = 4;
    document.getElementById('pattern-density').value = 25;
    document.querySelectorAll('.range-control .value-display').forEach((display, index) => {
        if (index === 0) {
            display.textContent = '4vh';
        } else {
            display.textContent = '25';
        }
    });
    
    // Reset custom size if it exists
    if (document.getElementById('custom-width')) {
        document.getElementById('custom-width').value = 100;
        document.getElementById('custom-length').value = 200;
        document.querySelectorAll('.custom-size-controls .value-display').forEach((display, index) => {
            if (index === 0) {
                display.textContent = '100 cm';
            } else {
                display.textContent = '200 cm';
            }
        });
    }
    
    // Update summary
    if (document.getElementById('selected-cloth-type')) {
        document.getElementById('selected-cloth-type').textContent = 'Dupatta';
    }
    if (document.getElementById('selected-pattern')) {
        document.getElementById('selected-pattern').textContent = 'Checks';
    }
    if (document.getElementById('selected-material')) {
        document.getElementById('selected-material').textContent = 'Cotton';
    }
    if (document.getElementById('selected-colors')) {
        document.getElementById('selected-colors').textContent = 'Custom Selection';
    }
    
    // Update CSS variables
    updateCSSVariable('--primary-color-1', '#E4E8A4');
    updateCSSVariable('--primary-color-2', '#C5D99C');
    updateCSSVariable('--primary-color-3', '#CDF194');
    updateCSSVariable('--secondary-color-1', '#FFFFFF');
    updateCSSVariable('--secondary-color-2', '#F5F5F5');
    
    // Update pricing
    updatePricing();
    
    // Update preview
    updateTexturePreview();
}

function updatePricing() {
    // Base prices for different cloth types
    const basePrices = {
        'dupatta': 1200,
        'saree': 4500,
        'stole': 850,
        'gamcha': 600,
        'duster': 300,
        'custom': 1000
    };
    
    // Additional cost for materials
    const materialPrices = {
        'cotton': 0,
        'silk': 1500,
        'linen': 800,
        'wool': 1200,
        'blend': 1000
    };
    
    // Additional cost for patterns
    const patternPrices = {
        'checks': 0,
        'stripes': 0,
        'plain': -200,  // Discount for plain pattern
        'diagonal': 200,
        'zigzag': 300,
        'herringbone': 400
    };
    
    // Get selected options
    const clothType = document.querySelector('input[name="cloth-type"]:checked').value;
    const patternType = document.querySelector('input[name="pattern-type"]:checked').value;
    const materialType = document.querySelector('input[name="material-type"]:checked').value;
    
    // Calculate base price
    let basePrice = basePrices[clothType];
    
    // Adjust for custom size if selected
    if (clothType === 'custom') {
        const width = parseInt(document.getElementById('custom-width').value);
        const length = parseInt(document.getElementById('custom-length').value);
        basePrice = Math.round((width * length) / 100) * 10;  // Rough calculation based on area
    }
    
    // Calculate material price
    const materialPrice = materialPrices[materialType];
    
    // Calculate customization price (pattern + any other customizations)
    const patternPrice = patternPrices[patternType];
    const customizationPrice = patternPrice + 600;  // Base customization fee
    
    // Calculate total
    const totalPrice = basePrice + materialPrice + customizationPrice;
    
    // Update price display
    if (document.getElementById('base-price')) {
        document.getElementById('base-price').textContent = `₹${basePrice.toLocaleString()}`;
    }
    if (document.getElementById('material-price')) {
        document.getElementById('material-price').textContent = `₹${materialPrice.toLocaleString()}`;
    }
    if (document.getElementById('customization-price')) {
        document.getElementById('customization-price').textContent = `₹${customizationPrice.toLocaleString()}`;
    }
    if (document.getElementById('total-price')) {
        document.getElementById('total-price').textContent = `₹${totalPrice.toLocaleString()}`;
    }
    
    return totalPrice;
}

function calculateTotalPrice() {
    // This function is used when adding to cart
    return updatePricing();
}