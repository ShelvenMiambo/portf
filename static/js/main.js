// Main JavaScript for Portfolio Website

// Initialize EmailJS when available
(function() {
    // EmailJS will be initialized when user provides the keys
    if (typeof emailjs !== 'undefined') {
        // Replace with your actual EmailJS public key
        // emailjs.init("YOUR_EMAILJS_PUBLIC_KEY");
        console.log('EmailJS library loaded');
    }
})();

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;
    
    // Load saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
            themeToggle.title = 'Alternar para modo claro';
        } else {
            themeIcon.className = 'fas fa-moon';
            themeToggle.title = 'Alternar para modo escuro';
        }
    }
}

// Modern Enhancements
function initModernEnhancements() {
    // Add loading states to buttons
    const buttons = document.querySelectorAll('button[type="submit"]');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            this.disabled = true;
            
            // Reset after 3 seconds (adjust based on your needs)
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 3000);
        });
    });
    
    // Add hover effects to skill bars
    const skillBars = document.querySelectorAll('.skill-item');
    skillBars.forEach(skill => {
        skill.addEventListener('mouseenter', function() {
            const progress = this.querySelector('.skill-progress');
            if (progress) {
                progress.style.transform = 'scaleY(1.2)';
            }
        });
        
        skill.addEventListener('mouseleave', function() {
            const progress = this.querySelector('.skill-progress');
            if (progress) {
                progress.style.transform = 'scaleY(1)';
            }
        });
    });
    

    
    // Add auto-resize to textarea
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        });
    });
}



// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme toggle
    initThemeToggle();

    // Initialize smooth scrolling
    initSmoothScrolling();

    // Initialize scroll animations
    initScrollAnimations();

    // Initialize skill bar animations
    initSkillBars();

    // Initialize contact form
    initContactForm();
    


    // Initialize navbar scroll effect
    initNavbarScroll();

    // Initialize typing animation
    initTypingAnimation();

    // Initialize modern enhancements
    initModernEnhancements();

    // Initialize active navigation
    updateActiveNavigation();

    // Initialize image loading
    initImageLoading();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.info-card, .skill-category, .project-card, .timeline-item, .education-item, .contact-info');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Skill bar animations
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.style.width;
                skillBar.style.width = '0%';

                setTimeout(() => {
                    skillBar.style.width = width;
                }, 500);

                observer.unobserve(skillBar);
            }
        });
    }, {
        threshold: 0.5
    });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Contact form functionality - Simple and reliable
function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');
    
    // Ensure submit button works correctly
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Only trigger if not already processing
            if (!submitBtn.disabled) {
                const formEvent = new Event('submit', {
                    bubbles: true,
                    cancelable: true
                });
                form.dispatchEvent(formEvent);
            }
        });
    }

    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showToast('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }
            
            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                showToast('Por favor, insira um email válido.', 'error');
                return;
            }
            
            // Set reply-to field
            const hiddenReplyTo = document.getElementById('hiddenReplyTo');
            if (hiddenReplyTo) {
                hiddenReplyTo.value = email;
            }
            
            // Show loading state
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            try {
                // Send form data
                const formData = new FormData(form);
                
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    showToast('✅ Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
                    form.reset();
                } else {
                    // Formspree might return HTML instead of JSON for some responses
                    if (response.status === 200 || response.status === 302) {
                        showToast('✅ Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
                        form.reset();
                    } else {
                        throw new Error('Erro no servidor - Status: ' + response.status);
                    }
                }
                
            } catch (error) {
                showToast('❌ Erro ao enviar mensagem. Tente novamente mais tarde.', 'error');
            } finally {
                // Restore button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    
    function showToast(message, type = 'success') {
        // Remove existing toast if any
        const existingToast = document.querySelector('.toast-notification');
        if (existingToast) {
            existingToast.remove();
        }
        
        // Create toast element
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 99999;
            min-width: 320px;
            max-width: 500px;
            background: ${type === 'success' ? '#28a745' : '#dc3545'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.5);
            font-size: 16px;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 12px;
            transform: translateX(100%);
            transition: transform 0.4s ease;
            opacity: 1;
        `;
        
        // Set icon based on type
        const icon = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
        
        toast.innerHTML = `
            <i class="${icon}"></i>
            <div style="flex: 1; line-height: 1.4;">${message}</div>
            <button style="background: none; border: none; color: white; font-size: 18px; cursor: pointer; padding: 0; width: 24px; height: 24px;" onclick="this.parentElement.remove()">×</button>
        `;
        
        // Add to body
        document.body.appendChild(toast);
        
        // Show toast with animation
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.remove();
                }
            }, 400);
        }, 5000);
    }
}



// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(33, 37, 41, 0.95)';
        } else {
            navbar.style.backgroundColor = 'var(--bg-dark)';
        }
    });
}

// Typing animation for hero section
function initTypingAnimation() {
    const roles = [
        'Técnico de Suporte Informático',
        'Administrador de Sistemas e Redes',
        'Estudante de Engenharia Informática',
        'Desenvolvedor de Sistemas'
    ];

    const heroSubtitle = document.querySelector('.hero-content h2');

    if (heroSubtitle) {
        let currentRole = 0;
        let currentChar = 0;
        let isDeleting = false;

        function type() {
            const currentText = roles[currentRole];
            if (!currentText) return;

            if (isDeleting) {
                heroSubtitle.textContent = currentText.substring(0, currentChar - 1);
                currentChar--;
            } else {
                heroSubtitle.textContent = currentText.substring(0, currentChar + 1);
                currentChar++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && currentChar === currentText.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && currentChar === 0) {
                isDeleting = false;
                currentRole = (currentRole + 1) % roles.length;
                typeSpeed = 500; // Pause before next word
            }

            setTimeout(type, typeSpeed);
        }

        // Start typing animation after page load
        setTimeout(type, 1000);
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Auto remove after 8 seconds (mais tempo para ler)
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 8000);

    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Log para debug
    console.log(`Notification: ${type} - ${message}`);
}

// Active navigation highlighting
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.startsWith('#') && href.length > 1 && href.substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Add loading animation for images
function initImageLoading() {
    const images = document.querySelectorAll('img');

    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });

        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
        }
    });
}

// Add smooth fade-in animation for elements on scroll
function initSmoothAnimations() {
    // Observe elements for fade-in animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Add fade-in animation to sections
    const sections = document.querySelectorAll('section:not(.hero-section)');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Add gentle floating animation to hero image
    const heroImage = document.querySelector('.hero-section img');
    if (heroImage) {
        heroImage.style.animation = 'gentleFloat 3s ease-in-out infinite';
    }
}

// Initialize smooth animations
initSmoothAnimations();

// Add click animation to buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn')) {
        e.target.style.transform = 'scale(0.95)';
        setTimeout(() => {
            e.target.style.transform = 'scale(1)';
        }, 150);
    }
});

// Add hover effect to project cards
function initProjectCardEffects() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'var(--shadow)';
        });
    });
}

// Initialize project card effects
initProjectCardEffects();



// Console welcome message
console.log(`
🚀 Portfolio de Shelven Marlon Naftal Miambo
📧 shelvenmarlonnaftal43@gmail.com
🔗 www.linkedin.com/in/shelven-miambo

Desenvolvido com HTML5, CSS3, JavaScript e muito ☕
`);