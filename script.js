// Preloader Logic
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0';
    preloader.style.visibility = 'hidden';
});

// Intersection Observer for Animations
const observers = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1 // Trigger when 10% of the element is visible
});

const fadeElements = document.querySelectorAll('.fade-in');
fadeElements.forEach((el) => observers.observe(el));

const slideLeftElements = document.querySelectorAll('.slide-in-left');
slideLeftElements.forEach((el) => observers.observe(el));

const slideRightElements = document.querySelectorAll('.slide-in-right');
slideRightElements.forEach((el) => observers.observe(el));

// Scroll Progress Bar Logic
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (progressBar) progressBar.style.width = scrolled + "%";
});

// Back to Top Button Logic
const backToTopButton = document.getElementById("back-to-top");
if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTopButton.classList.add("show");
        } else {
            backToTopButton.classList.remove("show");
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Theme Toggle Logic
const toggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

if (toggleBtn) {
    const toggleIcon = toggleBtn.querySelector('i');
    
    // Check for saved user preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'dark') toggleIcon.classList.replace('fa-moon', 'fa-sun');
    }

    toggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Toggle Icon
        if (newTheme === 'dark') {
            toggleIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            toggleIcon.classList.replace('fa-sun', 'fa-moon');
        }
    });
}

// Project Filtering Logic
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            const category = card.querySelector('.project-category-tag').textContent.toLowerCase();
            if (filterValue === 'all' || category.includes(filterValue)) {
                card.style.display = 'block';
                setTimeout(() => card.classList.add('visible'), 10);
            } else {
                card.style.display = 'none';
                card.classList.remove('visible');
            }
        });
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        // Offset of 200px to trigger highlight slightly before reaching the exact top
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(li => {
        li.classList.remove('active');
        if (li.getAttribute('href').includes(current)) {
            li.classList.add('active');
        }
    });
});

// Animate Skill Bars when visible
const skillSection = document.querySelector('#skills');
if (skillSection) {
    const skillObserver = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting) {
            document.querySelectorAll('.progress-line span').forEach(bar => {
                bar.classList.add('animate');
            });
        }
    });
    skillObserver.observe(skillSection);
}

// Typing Animation for Tagline
const taglineElement = document.querySelector('.tagline');
const phrases = [
    "Undergraduate Biomedical Technology Student", 
    "Innovating Healthcare through Technology", 
    "Passionate about Medical Diagnostics",
    "Bridging Engineering & Medicine"
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        taglineElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        taglineElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end of phrase
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500; // Pause before typing next
    }

    setTimeout(typeEffect, typeSpeed);
}

// Start typing if element exists
if (taglineElement) typeEffect();

// Navbar Scroll Effect
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Contact Form Interaction (Simulation)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent actual submission for demo
        const btn = contactForm.querySelector('button');
        const originalText = btn.textContent;
        
        btn.textContent = 'Sending...';
        btn.style.opacity = '0.7';
        
        setTimeout(() => {
            btn.textContent = 'Message Sent Successfully!';
            btn.style.backgroundColor = '#2ecc71'; // Success Green
            btn.style.opacity = '1';
            contactForm.reset();
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = '';
            }, 3000);
        }, 1500);
    });
}

// 1. Dynamic Greeting based on Time
const greetingElement = document.querySelector('header h1');
if (greetingElement) {
    const hour = new Date().getHours();
    let greeting = "Hi";
    
    if (hour >= 5 && hour < 12) greeting = "Good Morning";
    else if (hour >= 12 && hour < 18) greeting = "Good Afternoon";
    else if (hour >= 18 || hour < 5) greeting = "Good Evening";
    
    const originalText = greetingElement.textContent;
    if (originalText.includes("Hi,")) {
        greetingElement.textContent = originalText.replace("Hi,", `${greeting},`);
    }
}

// 2. Custom Interactive Cursor
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button, .project-card, .skill-category, .testimonial-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
});

// 3. 3D Tilt Effect for Cards
const tiltElements = document.querySelectorAll('.project-card, .skill-category, .testimonial-card, .reference-card');

tiltElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        // Remove transition for instant response to mouse movement
        el.style.transition = 'none'; 
    });

    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate rotation (max 10 degrees)
        const rotateX = ((y - centerY) / centerY) * -10; 
        const rotateY = ((x - centerX) / centerX) * 10;
        
        // Apply 3D transform
        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    el.addEventListener('mouseleave', () => {
        // Add smooth transition back to normal
        el.style.transition = 'transform 0.5s ease, box-shadow 0.3s ease'; 
        el.style.transform = ''; // Reset to CSS default
    });
});

// 4. Smooth Read More / Show Less Logic for Projects
document.querySelectorAll('.read-more-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Prevent the click from triggering the card tilt reset or other effects if necessary
        e.stopPropagation();
        
        const cardInfo = btn.parentElement;
        const details = cardInfo.querySelector('.more-details');
        
        if (details.style.maxHeight && details.style.maxHeight !== '0px') {
            // Close
            details.style.maxHeight = '0px';
            details.style.opacity = '0';
            details.style.marginTop = '0';
            btn.textContent = 'Read More';
        } else {
            // Open
            details.style.maxHeight = details.scrollHeight + 'px';
            details.style.opacity = '1';
            details.style.marginTop = '15px';
            btn.textContent = 'Read Less';
        }
    });
});

// 5. Dynamic Footer Year
const yearSpan = document.getElementById('year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}