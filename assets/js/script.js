// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.querySelector('.theme-icon');
    
    // Initialize theme
    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        document.body.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }
    
    // Update theme icon based on current theme
    function updateThemeIcon(theme) {
        if (themeIcon) {
            themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }
    
    // Toggle theme function
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add a subtle animation feedback
        if (themeToggle) {
            themeToggle.style.transform = 'scale(0.9)';
            setTimeout(() => {
                themeToggle.style.transform = 'scale(1)';
            }, 150);
        }
    }
    
    // Add event listener to theme toggle button
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
        
        // Keyboard support for theme toggle
        themeToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleTheme();
            }
        });
    }
    
    // Initialize theme on page load
    initializeTheme();
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Navbar background on scroll - theme aware
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        function updateNavbarOnScroll() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const isDark = currentTheme === 'dark';
            
            if (window.scrollY > 100) {
                if (isDark) {
                    navbar.style.background = 'rgba(21, 20, 25, 0.98)';
                } else {
                    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                }
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.background = '';
                navbar.style.backdropFilter = 'none';
            }
        }
        
        window.addEventListener('scroll', updateNavbarOnScroll);
        
        // Update navbar when theme changes
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                    updateNavbarOnScroll();
                }
            });
        });
        
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {};
            
            // Convert FormData to regular object
            for (let [key, value] of formData.entries()) {
                if (data[key]) {
                    // Handle multiple values (like checkboxes)
                    if (Array.isArray(data[key])) {
                        data[key].push(value);
                    } else {
                        data[key] = [data[key], value];
                    }
                } else {
                    data[key] = value;
                }
            }
            
            // Handle checkboxes for services
            const services = [];
            document.querySelectorAll('input[name="services"]:checked').forEach(checkbox => {
                services.push(checkbox.value);
            });
            data.services = services;
            
            // Basic form validation
            if (validateForm(data)) {
                // Show success message (in a real implementation, you'd send this to a server)
                showFormMessage('Thank you for your inquiry! We\'ll get back to you within 24 hours.', 'success');
                
                // In a real implementation, you would send the data to your server here
                console.log('Form data:', data);
                
                // Reset form after successful submission
                contactForm.reset();
            }
        });
    }
    
    // Form validation function
    function validateForm(data) {
        const requiredFields = ['name', 'email', 'phone', 'eventType', 'eventDate', 'startTime', 'guests', 'indoorOutdoor', 'power'];
        const errors = [];
        
        // Check required fields
        requiredFields.forEach(field => {
            if (!data[field] || data[field].trim() === '') {
                errors.push(`${getFieldLabel(field)} is required.`);
            }
        });
        
        // Validate email format
        if (data.email && !isValidEmail(data.email)) {
            errors.push('Please enter a valid email address.');
        }
        
        // Validate phone format (basic validation)
        if (data.phone && !isValidPhone(data.phone)) {
            errors.push('Please enter a valid phone number.');
        }
        
        // Validate guest count
        if (data.guests && (isNaN(data.guests) || parseInt(data.guests) < 1)) {
            errors.push('Please enter a valid number of guests.');
        }
        
        // Validate event date (should be in the future)
        if (data.eventDate && new Date(data.eventDate) < new Date()) {
            errors.push('Event date must be in the future.');
        }
        
        if (errors.length > 0) {
            showFormMessage(errors.join('\\n'), 'error');
            return false;
        }
        
        return true;
    }
    
    // Helper function to get field labels for error messages
    function getFieldLabel(fieldName) {
        const labels = {
            'name': 'Name',
            'email': 'Email',
            'phone': 'Phone',
            'eventType': 'Event Type',
            'eventDate': 'Event Date',
            'startTime': 'Start Time',
            'guests': 'Estimated Guests',
            'indoorOutdoor': 'Indoor/Outdoor',
            'power': 'Power Availability'
        };
        return labels[fieldName] || fieldName;
    }
    
    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Phone validation (basic)
    function isValidPhone(phone) {
        const phoneRegex = /^[\d\s\-\(\)\+\.]{10,}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }
    
    // Show form message
    function showFormMessage(message, type) {
        // Remove existing message if any
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message form-message-${type}`;
        messageDiv.innerHTML = message.replace(/\\n/g, '<br>');
        
        // Style the message
        messageDiv.style.cssText = `
            padding: 1rem;
            margin: 1rem 0;
            border-radius: 8px;
            font-weight: 500;
            ${type === 'success' 
                ? 'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;' 
                : 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
            }
        `;
        
        // Insert message before the form submit button
        const submitButton = document.querySelector('.form-submit');
        if (submitButton) {
            submitButton.parentNode.insertBefore(messageDiv, submitButton);
        }
        
        // Auto-remove success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 5000);
        }
        
        // Scroll to message
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Add animation to elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.benefit, .service-card, .feature-card, .contact-item').forEach(el => {
        observer.observe(el);
    });
    
    // Handle pricing table responsiveness
    function handlePricingTable() {
        const pricingTable = document.querySelector('.pricing-table');
        if (pricingTable && window.innerWidth < 768) {
            // Add scroll hint for mobile
            if (!pricingTable.querySelector('.scroll-hint')) {
                const scrollHint = document.createElement('div');
                scrollHint.className = 'scroll-hint';
                scrollHint.textContent = '← Scroll to see more →';
                scrollHint.style.cssText = `
                    text-align: center;
                    padding: 0.5rem;
                    font-size: 0.9rem;
                    color: var(--text-light);
                    font-style: italic;
                `;
                pricingTable.appendChild(scrollHint);
            }
        }
    }
    
    // Call on load and resize
    handlePricingTable();
    window.addEventListener('resize', handlePricingTable);
    
    // Add loading states to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.type === 'submit') {
                const originalText = this.textContent;
                this.textContent = 'Sending...';
                this.disabled = true;
                
                // Re-enable after a delay (in real implementation, this would be handled by the form submission response)
                setTimeout(() => {
                    this.textContent = originalText;
                    this.disabled = false;
                }, 3000);
            }
        });
    });
    
    // Improve accessibility - keyboard navigation for mobile menu
    hamburger?.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
    
    // Close mobile menu when pressing Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu?.classList.contains('active')) {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        }
    });
    
    // Add focus management for mobile menu
    navMenu?.addEventListener('keydown', function(e) {
        const focusableElements = this.querySelectorAll('a[href]');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });
    
    // Update copyright year automatically
    function updateCopyrightYear() {
        const copyrightElement = document.getElementById('copyright-year');
        if (copyrightElement) {
            const currentYear = new Date().getFullYear();
            copyrightElement.textContent = currentYear;
        }
    }
    
    // Update copyright year on page load
    updateCopyrightYear();
    
    // Lightbox Gallery Functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    const lightboxCurrent = document.getElementById('lightbox-current');
    const lightboxTotal = document.getElementById('lightbox-total');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    const lightboxBackdrop = document.querySelector('.lightbox-backdrop');
    
    // Get all gallery items with lightbox data
    const galleryItems = document.querySelectorAll('[data-lightbox="gallery"]');
    let currentImageIndex = 0;
    
    // Create gallery data array
    const galleryData = Array.from(galleryItems).map(item => ({
        src: item.dataset.src,
        title: item.dataset.title,
        description: item.dataset.description,
        element: item
    }));
    
    // Update lightbox total count
    if (lightboxTotal) {
        lightboxTotal.textContent = galleryData.length;
    }
    
    // Open lightbox function
    function openLightbox(index) {
        if (index < 0 || index >= galleryData.length) return;
        
        currentImageIndex = index;
        const imageData = galleryData[index];
        
        // Update lightbox content
        lightboxImage.src = imageData.src;
        lightboxImage.alt = imageData.title;
        lightboxTitle.textContent = imageData.title;
        lightboxDescription.textContent = imageData.description;
        lightboxCurrent.textContent = index + 1;
        
        // Show lightbox
        lightbox.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        
        // Focus on close button for accessibility
        lightboxClose.focus();
        
        // Preload next and previous images
        preloadImages(index);
    }
    
    // Close lightbox function
    function closeLightbox() {
        lightbox.classList.add('hidden');
        document.body.style.overflow = '';
        
        // Return focus to the gallery item that was clicked
        if (galleryData[currentImageIndex] && galleryData[currentImageIndex].element) {
            galleryData[currentImageIndex].element.focus();
        }
    }
    
    // Navigate to previous image
    function previousImage() {
        const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : galleryData.length - 1;
        openLightbox(newIndex);
    }
    
    // Navigate to next image
    function nextImage() {
        const newIndex = currentImageIndex < galleryData.length - 1 ? currentImageIndex + 1 : 0;
        openLightbox(newIndex);
    }
    
    // Preload adjacent images for better performance
    function preloadImages(currentIndex) {
        const indicesToPreload = [
            currentIndex - 1 >= 0 ? currentIndex - 1 : galleryData.length - 1,
            currentIndex + 1 < galleryData.length ? currentIndex + 1 : 0
        ];
        
        indicesToPreload.forEach(index => {
            if (index !== currentIndex) {
                const img = new Image();
                img.src = galleryData[index].src;
            }
        });
    }
    
    // Add click event listeners to gallery items
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            openLightbox(index);
        });
        
        // Add keyboard support
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(index);
            }
        });
        
        // Make gallery items focusable
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', `View ${item.dataset.title} in full size`);
    });
    
    // Add event listeners for lightbox controls
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', previousImage);
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', nextImage);
    }
    
    if (lightboxBackdrop) {
        lightboxBackdrop.addEventListener('click', closeLightbox);
    }
    
    // Keyboard navigation for lightbox
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('hidden')) {
            switch (e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    previousImage();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    nextImage();
                    break;
            }
        }
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (lightbox) {
        lightbox.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        lightbox.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swiped left - show next image
                nextImage();
            } else {
                // Swiped right - show previous image
                previousImage();
            }
        }
    }
    
    // Handle image loading errors
    if (lightboxImage) {
        lightboxImage.addEventListener('error', () => {
            lightboxTitle.textContent = 'Image not found';
            lightboxDescription.textContent = 'Sorry, this image could not be loaded.';
        });
    }
    
    // Add loading state to lightbox image
    if (lightboxImage) {
        lightboxImage.addEventListener('load', () => {
            lightboxImage.style.opacity = '1';
        });
        
        lightboxImage.addEventListener('loadstart', () => {
            lightboxImage.style.opacity = '0.5';
        });
    }
    
    console.log('Hudson Valley Sound website loaded successfully!');
});
