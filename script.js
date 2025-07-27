// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Update active navigation link on scroll
const sections = document.querySelectorAll('section[id]');
const navbarLinks = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navbarLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Navbar background on scroll
const navbar = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.borderBottom = '1px solid rgba(226, 232, 240, 0.8)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.borderBottom = '1px solid var(--gray-200)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
const animateOnScroll = document.querySelectorAll('.work-item, .skill-item, .stat');
animateOnScroll.forEach(el => {
    observer.observe(el);
});

// Form submission
const contactForm = document.querySelector('.form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all fields.');
            return;
        }
        
        // Show success message
        const button = this.querySelector('button[type="submit"]');
        const originalText = button.textContent;
        
        button.textContent = 'Sending...';
        button.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            button.textContent = 'Message Sent!';
            button.style.background = '#10b981';
            
            // Reset form
            this.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                button.style.background = '';
            }, 3000);
        }, 1000);
    });
}

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Add a subtle cursor blink effect to the last line
        const titleLines = heroTitle.querySelectorAll('.title-line');
        if (titleLines.length > 0) {
            const lastLine = titleLines[titleLines.length - 1];
            setTimeout(() => {
                lastLine.style.borderRight = '3px solid var(--primary-color)';
                lastLine.style.animation = 'blink 1s infinite';
                
                // Remove cursor after 3 seconds
                setTimeout(() => {
                    lastLine.style.borderRight = 'none';
                    lastLine.style.animation = 'none';
                }, 3000);
            }, 2000);
        }
    }
});

// Add CSS for blink animation
const style = document.createElement('style');
style.textContent = `
    @keyframes blink {
        0%, 50% { border-color: var(--primary-color); }
        51%, 100% { border-color: transparent; }
    }
    
    .animate {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    .work-item, .skill-item, .stat {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }
    
    .work-item.animate, .skill-item.animate, .stat.animate {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Smooth reveal animation for stats
function animateStats() {
    const stats = document.querySelectorAll('.stat h3');
    
    stats.forEach((stat, index) => {
        const finalValue = parseInt(stat.textContent);
        const duration = 2000; // 2 seconds
        const increment = finalValue / (duration / 16); // 60fps
        let currentValue = 0;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                stat.textContent = finalValue + (stat.textContent.includes('+') ? '+' : '');
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(currentValue) + (stat.textContent.includes('+') ? '+' : '');
            }
        }, 16);
    });
}

// Trigger stats animation when about section is visible
const aboutSection = document.querySelector('.about');
if (aboutSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(aboutSection);
}

// Add hover effects for work items
const workItems = document.querySelectorAll('.work-item');
workItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-12px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Contact method click tracking
const contactMethods = document.querySelectorAll('.contact-method');
contactMethods.forEach(method => {
    method.addEventListener('click', function(e) {
        // Add a subtle animation
        this.style.transform = 'translateX(12px) scale(1.05)';
        
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
    });
});