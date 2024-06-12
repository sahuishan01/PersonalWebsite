let currentSection = 'home';
document.addEventListener('DOMContentLoaded', () => {
    const homeElement = document.getElementById(currentSection);
    const homNav = document.getElementById(currentSection+"-nav");
    homeElement.classList.add('active');
    homNav.classList.add('active');
    const sections = document.querySelectorAll('.content-section');
    const headerSize = getComputedStyle(document.body).getPropertyValue('--headerSize');
    const observerOptions = {
        root: null, // Use the viewport as the container
        rootMargin: headerSize,
        threshold: 0.55 // Trigger when 50% of the section is visible
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                if (sectionId === currentSection) return;
                const currentNav = document.getElementById(currentSection + "-nav")
                currentNav.classList.remove('active')
                const nextNav = document.getElementById(sectionId + "-nav")
                nextNav.classList.add('active');
                currentSection = sectionId;
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
});
