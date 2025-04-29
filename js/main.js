/**
 * Hills Cab - Main JavaScript File
 * A German Innovation in Wires and Cables
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Mobile Menu Toggle
    initMobileMenu();
    
    // Initialize Tabs
    initTabs();
    
    // Initialize Product Filter
    initProductFilter();
    
    // Initialize FAQ Accordion
    initFaqAccordion();
    
    // Add scroll event listener for header
    window.addEventListener('scroll', function() {
        handleHeaderScroll();
    });
});

/**
 * Initialize Mobile Menu
 */
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('show');
            mobileMenuToggle.classList.toggle('active');
            
            // Toggle menu toggle animation
            const spans = mobileMenuToggle.querySelectorAll('span');
            if (mobileMenuToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close mobile menu when clicking on a menu item
        const mobileMenuItems = mobileMenu.querySelectorAll('.mobile-menu-item a');
        mobileMenuItems.forEach(item => {
            item.addEventListener('click', function() {
                mobileMenu.classList.remove('show');
                mobileMenuToggle.classList.remove('active');
                
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}

/**
 * Handle Header Scroll
 */
function handleHeaderScroll() {
    const header = document.getElementById('header');
    
    if (header) {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.height = '70px';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
            header.style.height = '80px';
        }
    }
}

/**
 * Initialize Tabs
 */
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                tabButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get tab id
                const tabId = this.getAttribute('data-tab');
                
                // Hide all tab panes
                const tabPanes = document.querySelectorAll('.tab-pane');
                tabPanes.forEach(pane => {
                    pane.classList.remove('active');
                });
                
                // Show selected tab pane
                const targetPane = document.getElementById(`${tabId}-tab`);
                if (targetPane) {
                    targetPane.classList.add('active');
                }
            });
        });
    }
}

/**
 * Initialize Product Filter
 */
function initProductFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    if (filterButtons.length > 0 && productCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filter = this.getAttribute('data-filter');
                
                // Filter products
                productCards.forEach(card => {
                    if (filter === 'all') {
                        card.style.display = 'block';
                    } else {
                        const categories = card.getAttribute('data-category').split(' ');
                        if (categories.includes(filter)) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
                
                // Add fade-in animation to visible cards
                const visibleCards = document.querySelectorAll('.product-card[style="display: block;"]');
                visibleCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    }, index * 100);
                });
            });
        });
    }
}

/**
 * Initialize FAQ Accordion
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            if (question) {
                question.addEventListener('click', function() {
                    // Toggle active class on item
                    item.classList.toggle('active');
                    
                    // Toggle plus/minus icon
                    const icon = question.querySelector('.faq-toggle i');
                    if (icon) {
                        if (item.classList.contains('active')) {
                            icon.className = 'fas fa-minus';
                        } else {
                            icon.className = 'fas fa-plus';
                        }
                    }
                });
            }
        });
    }
}

/**
 * Form Validation
 * @param {HTMLFormElement} form - The form to validate
 * @returns {boolean} - Returns true if form is valid, false otherwise
 */
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        // Remove previous error messages
        const errorMessage = field.nextElementSibling;
        if (errorMessage && errorMessage.classList.contains('error-message')) {
            errorMessage.remove();
        }
        
        field.style.borderColor = '';
        
        // Check if field is empty
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = '#e53935';
            
            // Create error message
            const error = document.createElement('div');
            error.className = 'error-message';
            error.style.color = '#e53935';
            error.style.fontSize = '12px';
            error.style.marginTop = '5px';
            error.textContent = 'This field is required';
            
            // Insert error message after field
            field.parentNode.insertBefore(error, field.nextSibling);
        }
        
        // Validate email format
        if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                field.style.borderColor = '#e53935';
                
                // Create error message
                const error = document.createElement('div');
                error.className = 'error-message';
                error.style.color = '#e53935';
                error.style.fontSize = '12px';
                error.style.marginTop = '5px';
                error.textContent = 'Please enter a valid email address';
                
                // Insert error message after field
                field.parentNode.insertBefore(error, field.nextSibling);
            }
        }
    });
    
    return isValid;
}

// Handle form submissions
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            if (validateForm(form)) {
                // For a real implementation, you would send the form data to the server
                // For this demo, we'll just show a success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.style.backgroundColor = '#4caf50';
                successMessage.style.color = '#fff';
                successMessage.style.padding = '15px';
                successMessage.style.borderRadius = '4px';
                successMessage.style.marginTop = '20px';
                successMessage.style.textAlign = 'center';
                successMessage.textContent = 'Thank you! Your message has been sent successfully.';
                
                // Clear form
                form.reset();
                
                // Insert success message after form
                form.parentNode.insertBefore(successMessage, form.nextSibling);
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.opacity = '0';
                    successMessage.style.transition = 'opacity 0.5s ease';
                    
                    setTimeout(() => {
                        successMessage.remove();
                    }, 500);
                }, 5000);
            }
        });
    });
});
