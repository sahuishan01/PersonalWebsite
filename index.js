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

function submit_message() {
    return alert("Something went wrong, kindly try other methods!")
}
// Function to initialize each carousel
function initializeCarousel(carouselClass) {
    const carousel = document.querySelector(`.${carouselClass}`);
    console.log(carouselClass, carousel)
    const rightButton = carousel.querySelector(`.arrow-right`);
    const leftButton = carousel.querySelector(`.arrow-left`);
    const cards = carousel.querySelector('.cards');
  
    let totalPixels = 0;
    const cardWidth = cards.querySelector(".node-card").getBoundingClientRect().width;
    console.log(cardWidth)
    const visibleCardsCount = Math.floor(carousel.clientWidth / cardWidth);
    const totalCardsCount = cards.children.length;
    const leftArrowSpans = carousel.querySelectorAll(".arrow-left span")
    const rightArrowSpans = carousel.querySelectorAll(".arrow-right span")
  
    rightButton.disabled = false;
  
    function updateButtonStates() {
      if (totalPixels === 0) {
        leftButton.disabled = true;
        leftButton.style.opacity = '0.5';
        leftArrowSpans.forEach(span => {
            span.classList.add('paused');
        });
      } else {
        leftButton.disabled = false;
        leftButton.style.cursor = 'pointer';
        leftButton.style.opacity = '1';
        leftArrowSpans.forEach(span => {
            span.classList.remove('paused');
        });
      }
  
      const maxMove = (totalCardsCount - visibleCardsCount) * cardWidth;
      if (Math.abs(totalPixels) >= maxMove) {
        rightButton.disabled = true;
        rightButton.style.opacity = '0.5';
        rightArrowSpans.forEach(span => {
            span.classList.add('paused');
        });
        
      } else {
        rightButton.disabled = false;
        rightButton.style.cursor = 'pointer';
        rightButton.style.opacity = '1';
        rightArrowSpans.forEach(span => {
            span.classList.remove('paused');
        });
      }
    }
  
    function moveToRight() {
      const maxMove = (totalCardsCount - visibleCardsCount) * cardWidth;
      if (Math.abs(totalPixels) < maxMove) {
        totalPixels -= cardWidth;
        cards.style.transform = `translateX(${totalPixels}px)`;
        updateButtonStates();
      }
    }
  
    function moveToLeft() {
      if (totalPixels < 0) {
        totalPixels += cardWidth;
        cards.style.transform = `translateX(${totalPixels}px)`;
        updateButtonStates();
      }
    }
  
    rightButton.addEventListener('click', moveToRight);
    leftButton.addEventListener('click', moveToLeft);
  
    document.addEventListener('keyup', event => {
      const key = event.key;
  
      if (key === 'ArrowRight') {
        moveToRight();
      }
  
      if (key === 'ArrowLeft') {
        moveToLeft();
      }
    });
  
    // Initial button state update
    updateButtonStates();
  }
  
  // Initialize each carousel
  initializeCarousel('carousel-1');
  initializeCarousel('carousel-2');
  initializeCarousel('carousel-3');
  