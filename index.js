var currentSection = "home";
var current_gap = 0;
var Carousel = /** @class */ (function () {
    function Carousel(carouselClass) {
        var _this = this;
        this.coverdPixels = 0;
        this.totalCardsCount = 0;
        this.totalWidth = 0;
        this.current_card_width = 0;
        this.carousel = document.querySelector(".".concat(carouselClass));
        var rightButton = this.carousel.querySelector(".arrow-right");
        var leftButton = this.carousel.querySelector(".arrow-left");
        this.totalCardsCount = this.carousel.querySelector('.cards').children.length;
        this.current_card_width = this.carousel.querySelector('.cards').querySelectorAll('.node-card')[0].clientWidth;
        this.totalWidth = (this.totalCardsCount - 2) * (this.current_card_width + current_gap);
        leftButton.addEventListener('click', function () { return _this.moveToLeft(); });
        rightButton.addEventListener('click', function () { return _this.moveToRight(); });
        this.updateButtonStates();
        rightButton.disabled = false;
    }
    Carousel.prototype.resizeCards = function () {
        this.current_card_width = this.carousel.querySelector('.cards').querySelectorAll('.node-card')[0].clientWidth;
        this.totalWidth = (this.totalCardsCount - 2) * (this.current_card_width + current_gap);
    };
    Carousel.prototype.updateButtonStates = function () {
        var leftArrowSpans = this.carousel.querySelectorAll(".arrow-left span");
        var rightArrowSpans = this.carousel.querySelectorAll(".arrow-right span");
        var rightButton = this.carousel.querySelector(".arrow-right");
        var leftButton = this.carousel.querySelector(".arrow-left");
        if (this.coverdPixels <= 0) {
            leftButton.disabled = true;
            leftButton.style.opacity = '0.5';
            leftArrowSpans.forEach(function (span) {
                span.classList.add('paused');
            });
        }
        else {
            leftButton.disabled = false;
            leftButton.style.cursor = 'pointer';
            leftButton.style.opacity = '1';
            leftArrowSpans.forEach(function (span) {
                span.classList.remove('paused');
            });
        }
        if (Math.abs(this.coverdPixels) >= this.totalWidth) {
            rightButton.disabled = true;
            rightButton.style.opacity = '0.5';
            rightArrowSpans.forEach(function (span) {
                span.classList.add('paused');
            });
        }
        else {
            rightButton.disabled = false;
            rightButton.style.cursor = 'pointer';
            rightButton.style.opacity = '1';
            rightArrowSpans.forEach(function (span) {
                span.classList.remove('paused');
            });
        }
    };
    Carousel.prototype.moveToRight = function () {
        if (this.coverdPixels < this.totalWidth) {
            var cards = this.carousel.querySelector('.cards');
            this.coverdPixels += this.current_card_width + current_gap / 2;
            this.coverdPixels = Math.min(this.totalWidth, this.coverdPixels);
            cards.style.transform = "translateX(".concat(-this.coverdPixels, "px)");
            this.updateButtonStates();
        }
    };
    Carousel.prototype.moveToLeft = function () {
        if (this.coverdPixels > 0) {
            var cards = this.carousel.querySelector('.cards');
            this.coverdPixels -= this.current_card_width + current_gap / 2;
            this.coverdPixels = Math.max(0., this.coverdPixels);
            cards.style.transform = "translateX(".concat(-this.coverdPixels, "px)");
            this.updateButtonStates();
        }
    };
    return Carousel;
}());
var carousel1;
var carousel2;
var carousel3;
document.addEventListener('DOMContentLoaded', function () {
    var homeElement = document.getElementById(currentSection);
    var homNav = document.getElementById(currentSection + "-nav");
    homeElement.classList.add('active');
    homNav.classList.add('active');
    var sections = document.querySelectorAll('.content-section');
    var headerSize = getComputedStyle(document.body).getPropertyValue('--headerSize');
    var observerOptions = {
        root: null, // Use the viewport as the container
        rootMargin: headerSize,
        threshold: 0.55 // Trigger when 50% of the section is visible
    };
    current_gap = Math.max(window.innerWidth * 0.3, 250);
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var sectionId = entry.target.id;
                if (sectionId === currentSection)
                    return;
                var currentNav = document.getElementById(currentSection + "-nav");
                currentNav.classList.remove('active');
                var nextNav = document.getElementById(sectionId + "-nav");
                nextNav.classList.add('active');
                currentSection = sectionId;
            }
        });
    }, observerOptions);
    sections.forEach(function (section) { return observer.observe(section); });
    carousel1 = new Carousel('carousel-1');
    carousel2 = new Carousel('carousel-2');
    carousel3 = new Carousel('carousel-3');
});
window.addEventListener("resize", function () {
    // Recalculate card width and margins on window resize
    carousel1.resizeCards();
    carousel2.resizeCards();
    carousel3.resizeCards();
});
function submit_message() {
    return alert("Something went wrong, kindly try other methods!");
}
