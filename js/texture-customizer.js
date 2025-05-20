/**
 * Real-time Textile Pattern Customizer
 * Allows users to customize textile patterns with live preview
 */

document.addEventListener('DOMContentLoaded', () => {
    initTextureCustomizer();
});

function initTextureCustomizer() {
    // Create customizer container if it doesn't exist
    if (!document.querySelector('.texture-customizer')) {
        createCustomizerInterface();
    }
    
    // Initialize event listeners for all controls
    initializeControlEvents();
    
    // Apply initial texture settings
    updateTexturePreview();
}

function createCustomizerInterface() {
    // Create main container
    const customizer = document.createElement('div');
    customizer.classList.add('texture-customizer');
    
    // Create controls section
    const controlsSection = document.createElement('div');
    controlsSection.classList.add('texture-controls');
    
    // Add color controls
    controlsSection.innerHTML += `
        <div class="control-group">
            <h3>Horizontal Stripe Colors</h3>
            <div class="color-controls">
                <div class="color-control">
                    <label for="h-color-1">Color 1</label>
                    <input type="color" id="h-color-1" value="#E4E8A4" data-css-var="--h-stripe-color-1">
                </div>
                <div class="color-control">
                    <label for="h-color-2">Color 2</label>
                    <input type="color" id="h-color-2" value="#C5D99C" data-css-var="--h-stripe-color-2">
                </div>
                <div class="color-control">
                    <label for="h-color-3">Color 3</label>
                    <input type="color" id="h-color-3" value="#CDF194" data-css-var="--h-stripe-color-3">
                </div>
                <div class="color-control">
                    <label for="h-color-4">Color 4</label>
                    <input type="color" id="h-color-4" value="#D5E8A0" data-css-var="--h-stripe-color-4">
                </div>
            </div>
        </div>
        
        <div class="control-group">
            <h3>Vertical Stripe Colors</h3>
            <div class="color-controls">
                <div class="color-control">
                    <label for="v-color-1">Color 1</label>
                    <input type="color" id="v-color-1" value="#FFFFFF" data-css-var="--v-stripe-color-1">
                </div>
                <div class="color-control">
                    <label for="v-color-2">Color 2</label>
                    <input type="color" id="v-color-2" value="#F5F5F5" data-css-var="--v-stripe-color-2">
                </div>
                <div class="color-control">
                    <label for="v-color-3">Color 3</label>
                    <input type="color" id="v-color-3" value="#FAFAFA" data-css-var="--v-stripe-color-3">
                </div>
                <div class="color-control">
                    <label for="v-color-4">Color 4</label>
                    <input type="color" id="v-color-4" value="#F0F0F0" data-css-var="--v-stripe-color-4">
                </div>
            </div>
        </div>
        
        <div class="control-group">
            <h3>Pattern Settings</h3>
            <div class="range-controls">
                <div class="range-control">
                    <label for="stripe-width">Stripe Width</label>
                    <input type="range" id="stripe-width" min="1" max="10" value="4" data-unit="vh">
                    <span class="value-display">4vh</span>
                </div>
                <div class="range-control">
                    <label for="stripe-density">Stripe Density</label>
                    <input type="range" id="stripe-density" min="10" max="40" value="25">
                    <span class="value-display">25</span>
                </div>
                <div class="range-control">
                    <label for="stripe-opacity">Opacity</label>
                    <input type="range" id="stripe-opacity" min="0.1" max="1" value="0.9" step="0.1">
                    <span class="value-display">0.9</span>
                </div>
            </div>
        </div>
        
        <div class="control-group">
            <h3>Pattern Type</h3>
            <div class="pattern-controls">
                <div class="pattern-control">
                    <input type="radio" id="pattern-stripes" name="pattern-type" value="stripes" checked>
                    <label for="pattern-stripes">Stripes</label>
                </div>
                <div class="pattern-control">
                    <input type="radio" id="pattern-checks" name="pattern-type" value="checks">
                    <label for="pattern-checks">Checks</label>
                </div>
                <div class="pattern-control">
                    <input type="radio" id="pattern-dots" name="pattern-type" value="dots">
                    <label for="pattern-dots">Dots</label>
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

function initializeControlEvents() {
    // Color inputs
    document.querySelectorAll('.color-control input[type="color"]').forEach(input => {
        input.addEventListener('input', () => {
            updateCSSVariable(input.dataset.cssVar, input.value);
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
            }
            
            valueDisplay.textContent = displayValue;
            updateTexturePreview();
        });
    });
    
    // Pattern type radios
    document.querySelectorAll('input[name="pattern-type"]').forEach(input => {
        input.addEventListener('change', () => {
            updateTexturePreview();
        });
    });
    
    // Reset button
    const resetButton = document.getElementById('reset-texture');
    if (resetButton) {
        resetButton.addEventListener('click', resetToDefaults);
    }
}

function updateCSSVariable(variable, value) {
    document.documentElement.style.setProperty(variable, value);
}

function updateTexturePreview() {
    const previewOverlay = document.querySelector('.preview-overlay');
    if (!previewOverlay) return;
    
    // Clear existing stripes
    previewOverlay.innerHTML = '';
    
    // Get current settings
    const stripeWidth = document.getElementById('stripe-width').value;
    const stripeDensity = parseInt(document.getElementById('stripe-density').value);
    const stripeOpacity = document.getElementById('stripe-opacity').value;
    const patternType = document.querySelector('input[name="pattern-type"]:checked').value;
    
    // Create stripes based on pattern type
    if (patternType === 'stripes' || patternType === 'checks') {
        // Create vertical stripes
        for (let i = 0; i < stripeDensity; i++) {
            const stripe = document.createElement('div');
            stripe.classList.add('v-stripe');
            stripe.style.left = `${i * (100 / stripeDensity)}%`;
            stripe.style.width = `${stripeWidth}vh`;
            stripe.style.opacity = stripeOpacity;
            previewOverlay.appendChild(stripe);
        }
        
        // Create horizontal stripes
        for (let i = 0; i < stripeDensity; i++) {
            const stripe = document.createElement('div');
            stripe.classList.add('h-stripe');
            stripe.style.top = `${i * (100 / stripeDensity)}%`;
            stripe.style.height = `${stripeWidth}vh`;
            stripe.style.opacity = stripeOpacity;
            previewOverlay.appendChild(stripe);
        }
    } else if (patternType === 'dots') {
        // Create dot pattern
        for (let i = 0; i < stripeDensity; i++) {
            for (let j = 0; j < stripeDensity; j++) {
                const dot = document.createElement('div');
                dot.classList.add('texture-dot');
                dot.style.left = `${j * (100 / stripeDensity)}%`;
                dot.style.top = `${i * (100 / stripeDensity)}%`;
                dot.style.width = `${stripeWidth}vh`;
                dot.style.height = `${stripeWidth}vh`;
                dot.style.opacity = stripeOpacity;
                
                // Alternate colors
                if ((i + j) % 2 === 0) {
                    dot.style.backgroundColor = 'var(--h-stripe-color-1)';
                } else {
                    dot.style.backgroundColor = 'var(--v-stripe-color-1)';
                }
                
                previewOverlay.appendChild(dot);
            }
        }
    }
    
    // Apply pattern-specific styles
    previewOverlay.setAttribute('data-pattern', patternType);
}

function resetToDefaults() {
    // Reset horizontal stripe colors
    updateCSSVariable('--h-stripe-color-1', '#E4E8A4');
    updateCSSVariable('--h-stripe-color-2', '#C5D99C');
    updateCSSVariable('--h-stripe-color-3', '#CDF194');
    updateCSSVariable('--h-stripe-color-4', '#D5E8A0');
    
    // Reset vertical stripe colors
    updateCSSVariable('--v-stripe-color-1', '#FFFFFF');
    updateCSSVariable('--v-stripe-color-2', '#F5F5F5');
    updateCSSVariable('--v-stripe-color-3', '#FAFAFA');
    updateCSSVariable('--v-stripe-color-4', '#F0F0F0');
    
    // Reset color inputs
    document.getElementById('h-color-1').value = '#E4E8A4';
    document.getElementById('h-color-2').value = '#C5D99C';
    document.getElementById('h-color-3').value = '#CDF194';
    document.getElementById('h-color-4').value = '#D5E8A0';
    document.getElementById('v-color-1').value = '#FFFFFF';
    document.getElementById('v-color-2').value = '#F5F5F5';
    document.getElementById('v-color-3').value = '#FAFAFA';
    document.getElementById('v-color-4').value = '#F0F0F0';
    
    // Reset range inputs
    const stripeWidth = document.getElementById('stripe-width');
    stripeWidth.value = 4;
    stripeWidth.nextElementSibling.textContent = '4vh';
    
    const stripeDensity = document.getElementById('stripe-density');
    stripeDensity.value = 25;
    stripeDensity.nextElementSibling.textContent = '25';
    
    const stripeOpacity = document.getElementById('stripe-opacity');
    stripeOpacity.value = 0.9;
    stripeOpacity.nextElementSibling.textContent = '0.9';
    
    // Reset pattern type
    document.getElementById('pattern-stripes').checked = true;
    
    // Update preview
    updateTexturePreview();
}