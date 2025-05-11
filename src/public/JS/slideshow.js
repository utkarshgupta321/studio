let slideIndex = 0;
let slideTimer;

window.addEventListener("load", () => {
  const slider = document.querySelector(".image-slider");
  const slides = document.querySelectorAll(".image-slider img");
  const slideWidth = slides[0].clientWidth + 20; // width + gap
  const visibleArea = document.querySelector(".image-slider-container").clientWidth;

  // Calculate how many full slides fit inside the visible area
  const maxVisibleSlides = Math.floor(visibleArea / slideWidth);
  const maxIndex = slides.length - maxVisibleSlides;

  function showSlide(index) {
    const boundedIndex = Math.max(0, Math.min(index, maxIndex));
    slider.style.transform = `translateX(-${boundedIndex * slideWidth}px)`;
    slideIndex = boundedIndex;
  }

  function moveSlide(direction) {
    showSlide(slideIndex + direction);
  }

  function startSlider() {
    slideTimer = setInterval(() => {
      if (slideIndex >= maxIndex) {
        slideIndex = 0;
      } else {
        slideIndex++;
      }
      showSlide(slideIndex);
    }, 3000);
  }

  function pauseSlider() {
    clearInterval(slideTimer);
  }

  function resumeSlider() {
    startSlider();
  }

  // Expose to window for inline HTML handlers
  window.moveSlide = moveSlide;
  window.pauseSlider = pauseSlider;
  window.resumeSlider = resumeSlider;

  // Init
  showSlide(slideIndex);
  startSlider();
});
