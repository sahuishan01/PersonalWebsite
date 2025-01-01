var currentSection = "home";

var current_gap: number = 0;

class Carousel {
    private carousel: Element;
    private coverdPixels = 0;
    private totalCardsCount = 0;
    private totalWidth = 0;
    private current_card_width = 0;
    constructor(
        carouselClass: string,
    ) {
        this.carousel = document.querySelector(`.${carouselClass}`)!;
        let cards = document.querySelector(`.${carouselClass}`)!.querySelector('.cards')!;
        this.totalWidth = cards.scrollWidth - window.innerWidth * 0.8;
        const rightButton: HTMLButtonElement = this.carousel!.querySelector(`.arrow-right`)!;
        const leftButton: HTMLButtonElement = this.carousel!.querySelector(`.arrow-left`)!;
        this.totalCardsCount = this.carousel!.querySelector('.cards')!.children.length;
        this.current_card_width = (this.carousel!.querySelectorAll('.node-card')![0] as HTMLDivElement).clientWidth;
        // this.totalWidth = (this.totalCardsCount - 2) * (this.current_card_width +  current_gap);
        leftButton.addEventListener('click', () => this.moveToLeft());
        rightButton.addEventListener('click', () => this.moveToRight());
        this.updateButtonStates();
        rightButton.disabled = false;
    }

    resizeCards(){
        this.current_card_width = (this.carousel!.querySelectorAll('.node-card')![0] as HTMLDivElement).clientWidth;
        let cards : HTMLDivElement = this.carousel.querySelector('.cards')!;
        this.totalWidth = cards.scrollWidth - window.innerWidth * 0.8;
        this.coverdPixels = Math.max(Math.min(this.totalWidth, this.coverdPixels), 0);
        cards.style.transform = `translateX(${-this.coverdPixels}px)`;
        this.updateButtonStates();
    }
    
    updateButtonStates() {
        const leftArrowSpans = this.carousel.querySelectorAll(".arrow-left span");
        const rightArrowSpans = this.carousel.querySelectorAll(".arrow-right span");
        const rightButton: HTMLButtonElement = this.carousel!.querySelector(`.arrow-right`)!;
        const leftButton: HTMLButtonElement = this.carousel!.querySelector(`.arrow-left`)!;
        if (this.coverdPixels <= 0) {
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

        if (Math.abs(this.coverdPixels) >= this.totalWidth) {
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

    moveToRight() {
        if (this.coverdPixels < this.totalWidth){
            const cards : HTMLDivElement = this.carousel!.querySelector('.cards')!;
            this.coverdPixels += this.current_card_width + current_gap;
            this.coverdPixels = Math.min(this.totalWidth, this.coverdPixels);
            cards.style.transform = `translateX(${-this.coverdPixels}px)`;
            this.updateButtonStates();
        }
    }

    moveToLeft() {
        if (this.coverdPixels > 0) {
            const cards : HTMLDivElement = this.carousel!.querySelector('.cards')!;
            this.coverdPixels -= this.current_card_width + current_gap;
            this.coverdPixels = Math.max(0., this.coverdPixels);
            cards.style.transform = `translateX(${-this.coverdPixels}px)`;
            this.updateButtonStates();
        }
    }  
}

let carousel1: Carousel;
let carousel2: Carousel;
let carousel3: Carousel;

document.addEventListener('DOMContentLoaded', () => {
    const homeElement = document.getElementById(currentSection);
    const homNav = document.getElementById(currentSection + "-nav");
    homeElement!.classList.add('active');
    homNav!.classList.add('active');
    const sections = document.querySelectorAll('.content-section');
    const headerSize = getComputedStyle(document.body).getPropertyValue('--headerSize');
    const observerOptions = {
        root: null, // Use the viewport as the container
        rootMargin: headerSize,
        threshold: 0.55 // Trigger when 50% of the section is visible
    };

    current_gap = Math.max(window.innerWidth * 0.1, 250);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                if (sectionId === currentSection) return;
                const currentNav = document.getElementById(currentSection + "-nav")
                currentNav!.classList.remove('active')
                const nextNav = document.getElementById(sectionId + "-nav")
                nextNav!.classList.add('active');
                currentSection = sectionId;
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    carousel1 = new Carousel('carousel-1');
    carousel2 = new Carousel('carousel-2');
    carousel3 = new Carousel('carousel-3');
});


window.addEventListener("resize", () => {
    // Recalculate card width and margins on window resize
    carousel1.resizeCards();
    carousel2.resizeCards();
    carousel3.resizeCards();
});

function submit_message() {
    return alert("Something went wrong, kindly try other methods!")
}
