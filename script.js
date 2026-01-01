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