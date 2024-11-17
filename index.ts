var currentSection = "home";

var current_gap: number = 0;
var current_card_width: number = 0;
var current_card_side_margin: number = 0;



class Carousel {
    private carousel: Element;
    private coverdPixels = 0;
    private totalCardsCount = 0;
    private totalWidth = 0;
    constructor(
        carouselClass: string,
    ) {
        this.carousel = document.querySelector(`.${carouselClass}`)!;
        const rightButton: HTMLButtonElement = this.carousel!.querySelector(`.arrow-right`)!;
        const leftButton: HTMLButtonElement = this.carousel!.querySelector(`.arrow-left`)!;
        this.totalCardsCount = this.carousel!.querySelector('.cards')!.children.length;
        rightButton.addEventListener('click', () => this.moveToRight());
        this.totalWidth = (this.totalCardsCount * (current_card_width +  current_gap)) - current_gap + (current_card_side_margin);
        console.log("total width: " + this.totalWidth, window.innerWidth);
        leftButton.addEventListener('click', () => this.moveToLeft());
        this.updateButtonStates();
        rightButton.disabled = false;
    }

    updateButtonStates() {
        const leftArrowSpans = this.carousel.querySelectorAll(".arrow-left span");
        const rightArrowSpans = this.carousel.querySelectorAll(".arrow-right span");
        const rightButton: HTMLButtonElement = this.carousel!.querySelector(`.arrow-right`)!;
        const leftButton: HTMLButtonElement = this.carousel!.querySelector(`.arrow-left`)!;
        console.log("covered pixels: " + this.coverdPixels);
        if (this.coverdPixels <= window.innerWidth / 2) {
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

        if (Math.abs(this.coverdPixels) >= this.totalWidth - current_gap) {
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
            this.coverdPixels += current_card_width + current_gap;
            cards.style.transform = `translateX(${-this.coverdPixels}px)`;
            this.updateButtonStates();
        }
    }

    moveToLeft() {
        if (this.coverdPixels > 0) {
            const cards : HTMLDivElement = this.carousel!.querySelector('.cards')!;
            this.coverdPixels -= current_card_width + current_gap;
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

    current_gap = Math.max(window.innerWidth * 0.3, 250);

    // Ensure the node-card exists before accessing its width
    const nodeCard = document.getElementsByClassName("node-card")[0];
    if (nodeCard) {
        current_card_width = nodeCard.getBoundingClientRect().width;
    } else {
        console.warn("No elements with class 'node-card' found.");
    }

    current_card_side_margin = window.innerWidth * 0.4;

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
    const nodeCard = document.getElementsByClassName("node-card")[0];
    if (nodeCard) {
        current_card_width = nodeCard.getBoundingClientRect().width;
    }
    current_card_side_margin = window.innerWidth * 0.4;
    current_gap = Math.max(window.innerWidth * 0.3, 250);
});

function submit_message() {
    return alert("Something went wrong, kindly try other methods!")
}
