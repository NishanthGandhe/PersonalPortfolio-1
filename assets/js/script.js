document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('section');
    const themeToggle = document.getElementById('dn');
    const body = document.body;
    const toggle = document.querySelector('.toggle');
    const transitionBackground = document.querySelector('.transition-selection');
    const loadingPage = document.querySelector('.bar');
    const mainContent = document.getElementById('main-content');
    const customCursor = document.querySelector('.custom-cursor');

    // Dynamically add preloader stylesheet
    const preloaderStylesheet = document.createElement('link');
    preloaderStylesheet.rel = 'stylesheet';
    preloaderStylesheet.href = 'assets/css/preloader.css';
    preloaderStylesheet.id = 'preloader-stylesheet';
    document.head.appendChild(preloaderStylesheet);

    // Hide loading page and show main content after 3 seconds
    setTimeout(() => {
        loadingPage.style.display = 'none';
        mainContent.style.display = 'block';
        // Remove preloader stylesheet
        const preloaderStylesheet = document.getElementById('preloader-stylesheet');
        if (preloaderStylesheet) {
            document.head.removeChild(preloaderStylesheet);
        }
    }, 3000); // 3000 milliseconds = 3 seconds

    // Smooth scrolling with offset
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            const headerOffset = 70; // Adjust this value based on your header height
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Add active class to the current section link
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(section => {
        observer.observe(section);
    });

    const observerOptions = {
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    };

    const observers = new IntersectionObserver(observerCallback, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.big-title, .project-entry, .resume-item');
    elementsToAnimate.forEach(element => {
        observers.observe(element);
    });

    // Theme toggle
    themeToggle.addEventListener('change', () => {
        body.classList.toggle('dark-mode');
        header.classList.toggle('dark-mode');
        homeSection.classList.toggle('dark-mode');
        toggle.classList.toggle('dark-mode');
        transitionBackground.classList.toggle('dark-mode')
        navLinks.forEach(link => {
            link.classList.toggle('dark-mode');
        });
    });

    // Custom cursor
    if (customCursor) {
        document.addEventListener('mousemove', (e) => {
            customCursor.style.left = `${e.clientX}px`;
            customCursor.style.top = `${e.clientY}px`;
        });

        document.addEventListener('mousedown', () => {
            customCursor.style.width = '20px';
            customCursor.style.height = '20px';
            customCursor.style.border = '2px solid #3498db'; // Reset border color
            customCursor.style.backgroundColor = 'transparent';
            customCursor.style.borderRadius = '50%'; // Reset to circular shape
        });

        document.addEventListener('mouseup', () => {
            customCursor.style.transform = 'translate(-50%, -50%) scale(1)';
            customCursor.style.backgroundColor = 'transparent';
        });

        const elements = document.querySelectorAll('a, button, .hover-target, p, h1, h2, h3, h4, h5, h6, img, .subheading');

        elements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                const range = document.createRange();
                range.selectNodeContents(element);
                const rect = range.getBoundingClientRect();
                customCursor.style.width = `${rect.width}px`;
                customCursor.style.height = `${rect.height}px`;
                customCursor.style.left = `${rect.left + rect.width / 2}px`;
                customCursor.style.top = `${rect.top + rect.height / 2}px`;
                customCursor.style.transform = 'translate(-50%, -50%) scale(1)';
                customCursor.style.border = '2px solid #3498db'; // Adjust border color as needed
                customCursor.style.backgroundColor = 'transparent';
                customCursor.style.borderRadius = '0'; // Make the border rectangular
            });

            element.addEventListener('mouseleave', () => {
                customCursor.style.width = '20px';
                customCursor.style.height = '20px';
                customCursor.style.border = '2px solid #3498db'; // Reset border color
                customCursor.style.backgroundColor = 'transparent';
                customCursor.style.borderRadius = '50%'; // Reset to circular shape
            });
        });

        document.addEventListener('mousemove', (e) => {
            let isHovering = false;
            elements.forEach(element => {
                const rect = element.getBoundingClientRect();
                if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
                    isHovering = true;
                }
            });
            if (!isHovering) {
                customCursor.style.width = '20px';
                customCursor.style.height = '20px';
                customCursor.style.border = '2px solid #3498db'; // Reset border color
                customCursor.style.backgroundColor = 'transparent';
                customCursor.style.borderRadius = '50%'; // Reset to circular shape
            }
        });
    } else {
        console.error('Custom cursor element not found.');
    }

    // New code for word span animation
    const spans = document.querySelectorAll('.word span');

    spans.forEach((span, idx) => {
        span.addEventListener('click', (e) => {
            e.target.classList.add('active');
        });
        span.addEventListener('animationend', (e) => {
            e.target.classList.remove('active');
        });

        // Initial animation
        setTimeout(() => {
            span.classList.add('active');
        }, 750 * (idx + 1));
    });
});