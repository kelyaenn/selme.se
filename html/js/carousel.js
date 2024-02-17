function initCarousel(){

    const slides = document.querySelectorAll('.slide');
    console.log(slides);
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${index * 120}%)`;
    });
    
    const nextSlide = document.querySelector(".btn-next");
    
    let curSlide = 0;
    let maxSlide = slides.length - 1;
    
    nextSlide.addEventListener("click", function () {
        if (curSlide === maxSlide) {
            curSlide = 0;
        } else {
            curSlide++;
        }
    
        slides.forEach((slide, indx) => {
            slide.style.transform = `translateX(${120 * (indx - curSlide)}%)`;
        });
    });
    
    const prevSlide = document.querySelector(".btn-prev");
    
    prevSlide.addEventListener("click", function () {
        if (curSlide === 0) {
            curSlide = maxSlide;
        } else {
            curSlide--;
        }
    
        slides.forEach((slide, indx) => {
            slide.style.transform = `translateX(${120 * (indx - curSlide)}%)`;
        });
    });
    
}


function carouselSpot() {
    let htmlContent = `
    <div class="slide">
    <img src="img/reals/lespot/v1.png" />
</div>
<div class="slide">
    <img src="img/reals/lespot/v2.png" />
</div>

<button class="btn btn-next"> > </button>
<button class="btn btn-prev">
    < </button>`;
    let carousel = document.querySelector(".carouselWrapper");
    carousel.style.display = "flex";
    carousel.innerHTML = htmlContent;
    initCarousel();
}

function hideCarousel(){
    let carousel = document.querySelector(".carouselWrapper");
    carousel.style.display = "none";
}