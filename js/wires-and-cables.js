/**
 * Hills Cab - Wires and Cables JavaScript
 * A German Innovation in Wires and Cables
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize product filter functionality
    initProductFilter();
    
    // Initialize tabs in technical specifications section
    initTechSpecsTabs();
    
    // Initialize accordion functionality for FAQs if present
    if (document.querySelector('.faq-accordion')) {
        initFaqAccordion();
    }
});

/**
 * Initialize Product Filter
 * Handles filtering of products by category
 */
function initProductFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    if (filterButtons.length && productCards.length) {
        // Add click event for each filter button
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter products
                productCards.forEach(card => {
                    // If 'all' is selected or card has the selected category, show it
                    if (filterValue === 'all' || card.getAttribute('data-category').includes(filterValue)) {
                        card.style.display = 'flex';
                        // Add animation class for smooth transition
                        setTimeout(() => {
                            card.classList.add('show');
                        }, 50);
                    } else {
                        // Hide cards that don't match the filter
                        card.classList.remove('show');
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
        
        // Initially show all products
        productCards.forEach(card => {
            card.classList.add('show');
        });
    }
}

/**
 * Initialize Technical Specification Tabs
 * Handles tab switching in the specifications section
 */
function initTechSpecsTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (tabButtons.length && tabPanes.length) {
        // Add click event for each tab button
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons and panes
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get tab ID and activate corresponding pane
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
}

/**
 * Initialize FAQ Accordion
 * Handles expand/collapse functionality for FAQ items
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length) {
        faqItems.forEach(item => {
            const header = item.querySelector('.faq-question');
            
            header.addEventListener('click', function() {
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        const otherContent = otherItem.querySelector('.faq-answer');
                        otherContent.style.maxHeight = null;
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
                
                // Toggle content height for smooth animation
                const content = item.querySelector('.faq-answer');
                if (item.classList.contains('active')) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                } else {
                    content.style.maxHeight = null;
                }
            });
        });
    }
}