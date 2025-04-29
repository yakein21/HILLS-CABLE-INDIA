/**
 * Hills Cab - Product Slider
 * A German Innovation in Wires and Cables
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Product Slider
    initProductSlider();
});

/**
 * Initialize Product Slider
 */
function initProductSlider() {
    const sliderTrack = document.getElementById('slider-track');
    const sliderContainer = document.querySelector('.slider-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const sliderDots = document.getElementById('slider-dots');
    
    if (!sliderTrack || !prevBtn || !nextBtn || !sliderDots) {
        return;
    }
    
    const slides = sliderTrack.querySelectorAll('.slide');
    if (slides.length === 0) {
        return;
    }
    
    // Set slider track width
    sliderTrack.style.width = `${slides.length * 100}%`;
    
    // Create slider dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'slider-dot';
        if (index === 0) {
            dot.classList.add('active');
        }
        
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
        
        sliderDots.appendChild(dot);
    });
    
    // Variables
    let currentSlide = 0;
    let startX, endX;
    let isSwiping = false;
    const dots = sliderDots.querySelectorAll('.slider-dot');
    const slideWidth = 100; // percentage
    
    // Set initial position
    updateSliderPosition();
    
    // Add event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Add touch swipe functionality
    sliderContainer.addEventListener('touchstart', handleTouchStart, false);
    sliderContainer.addEventListener('touchmove', handleTouchMove, false);
    sliderContainer.addEventListener('touchend', handleTouchEnd, false);
    
    // Add mouse swipe functionality
    sliderContainer.addEventListener('mousedown', handleMouseDown, false);
    sliderContainer.addEventListener('mousemove', handleMouseMove, false);
    sliderContainer.addEventListener('mouseup', handleMouseUp, false);
    sliderContainer.addEventListener('mouseleave', handleMouseUp, false);
    
    // Auto play slider
    let autoPlayInterval = setInterval(nextSlide, 5000);
    
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(nextSlide, 5000);
    });
    
    // Functions
    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
        } else {
            currentSlide = slides.length - 1;
        }
        
        updateSliderPosition();
    }
    
    function nextSlide() {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
        } else {
            currentSlide = 0;
        }
        
        updateSliderPosition();
    }
    
    function goToSlide(index) {
        currentSlide = index;
        updateSliderPosition();
    }
    
    function updateSliderPosition() {
        sliderTrack.style.transform = `translateX(-${currentSlide * slideWidth / slides.length}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Touch event handlers
    function handleTouchStart(e) {
        startX = e.touches[0].clientX;
        isSwiping = true;
    }
    
    function handleTouchMove(e) {
        if (!isSwiping) return;
        
        endX = e.touches[0].clientX;
        const diffX = startX - endX;
        
        // Add resistance when swiping at edges
        if ((currentSlide === 0 && diffX < 0) || (currentSlide === slides.length - 1 && diffX > 0)) {
            diffX = diffX / 3; // Reduce the swipe effect
        }
        
        const translateX = -currentSlide * (slideWidth / slides.length) - (diffX / sliderContainer.offsetWidth) * 100;
        sliderTrack.style.transform = `translateX(${translateX}%)`;
    }
    
    function handleTouchEnd() {
        if (!isSwiping) return;
        
        isSwiping = false;
        
        if (startX - endX > 50) { // Swipe left
            nextSlide();
        } else if (startX - endX < -50) { // Swipe right
            prevSlide();
        } else { // No significant swipe, revert to current slide
            updateSliderPosition();
        }
    }
    
    // Mouse event handlers
    function handleMouseDown(e) {
        e.preventDefault();
        startX = e.clientX;
        isSwiping = true;
        sliderTrack.style.transition = 'none';
    }
    
    function handleMouseMove(e) {
        if (!isSwiping) return;
        
        e.preventDefault();
        endX = e.clientX;
        const diffX = startX - endX;
        
        // Add resistance when swiping at edges
        let adjustedDiffX = diffX;
        if ((currentSlide === 0 && diffX < 0) || (currentSlide === slides.length - 1 && diffX > 0)) {
            adjustedDiffX = diffX / 3; // Reduce the swipe effect
        }
        
        const translateX = -currentSlide * (slideWidth / slides.length) - (adjustedDiffX / sliderContainer.offsetWidth) * 100;
        sliderTrack.style.transform = `translateX(${translateX}%)`;
    }
    
    function handleMouseUp(e) {
        if (!isSwiping) return;
        
        isSwiping = false;
        sliderTrack.style.transition = 'transform 0.5s ease';
        
        if (startX - endX > 50) { // Swipe left
            nextSlide();
        } else if (startX - endX < -50) { // Swipe right
            prevSlide();
        } else { // No significant swipe, revert to current slide
            updateSliderPosition();
        }
    }
}
