// Remove loading overlay and initialize layout
window.addEventListener('load', () => {
    const loader = document.getElementById('loading-overlay');

    // Add a small delay to make the transition look smoother and allow Spline viewer to begin rendering
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 800);
    }, 800);
});

// Smooth scroll functionality for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for scroll animations (fade up elements)
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const fadeUpObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Initialize elements ready to be animated
document.querySelectorAll('.glass-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.1}s`;

    fadeUpObserver.observe(card);
});

// Handle Navigation Bar styling on scroll
const nav = document.querySelector('.glass-nav');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Changing Nav background on scroll
    if (currentScrollY > 50) {
        nav.style.background = 'rgba(255, 255, 255, 0.05)';
        nav.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.8)';
        nav.style.borderColor = 'rgba(255, 255, 255, 0.15)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.03)';
        nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        nav.style.borderColor = 'rgba(255, 255, 255, 0.08)';
    }

    lastScrollY = currentScrollY;
});

// Admin Panel Integration: Dynamic Rendering from Local Storage
document.addEventListener('DOMContentLoaded', () => {
    // initialize localStorage with defaults if empty
    if (!localStorage.getItem('vk_social_links')) {
        localStorage.setItem('vk_social_links', JSON.stringify([
            { name: 'GitHub', url: '#' },
            { name: 'LinkedIn', url: '#' },
            { name: 'Twitter', url: '#' }
        ]));
    }
    if (!localStorage.getItem('vk_projects')) {
        localStorage.setItem('vk_projects', JSON.stringify([
            { category: '3D Web App', title: 'Immersive Metaverse Portal', description: 'A web-based 3D exploration tool using Three.js and React.', link: '#', imageClass: 'placeholder-1' },
            { category: 'E-Commerce', title: 'NexShop Premium', description: 'A high-performance modern store built with Next.js and Tailwind.', link: '#', imageClass: 'placeholder-2' },
            { category: 'Portfolio Site', title: 'Creative Agency V2', description: 'Award-winning agency site featuring advanced GSAP scroll animations.', link: '#', imageClass: 'placeholder-3' }
        ]));
    }

    renderDynamicContent();
});

function renderDynamicContent() {
    const socialLinks = JSON.parse(localStorage.getItem('vk_social_links') || '[]');
    const projects = JSON.parse(localStorage.getItem('vk_projects') || '[]');

    const socialContainer = document.querySelector('.social-links');
    if (socialContainer) {
        socialContainer.innerHTML = '';
        socialLinks.forEach(link => {
            const a = document.createElement('a');
            a.href = link.url;
            a.className = 'social-btn';
            a.textContent = link.name;
            a.target = '_blank';
            socialContainer.appendChild(a);
        });
    }

    const projectsContainer = document.querySelector('.projects-grid');
    if (projectsContainer) {
        projectsContainer.innerHTML = '';
        projects.forEach((proj, index) => {
            const card = document.createElement('div');
            card.className = 'project-card glass-card';

            let styleAttr = '';
            if (proj.imageUrl) {
                styleAttr = `style="background-image: url('${proj.imageUrl}')"`;
            }

            card.innerHTML = `
                <div class="project-img ${proj.imageClass || ''}" ${styleAttr}></div>
                <div class="project-content">
                    <span class="project-category">${proj.category}</span>
                    <h3>${proj.title}</h3>
                    <p>${proj.description}</p>
                    <a href="${proj.link}" class="project-link" target="_blank">View Project →</a>
                </div>
            `;
            projectsContainer.appendChild(card);

            // Re-apply animations for dynamically created cards
            card.style.opacity = '0';
            card.style.transform = 'translateY(40px)';
            card.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.1}s`;

            if (typeof fadeUpObserver !== 'undefined') {
                fadeUpObserver.observe(card);
            }
        });
    }
}
