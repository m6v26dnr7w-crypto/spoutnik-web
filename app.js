document.addEventListener("DOMContentLoaded", () => {

  /* 01. Embla 無限フリックスライダー */
  const viewport = document.querySelector(".embla__viewport");
  const dotArea = document.querySelector(".ls-slider-dots");

  if (viewport && dotArea && window.EmblaCarousel) {
    const embla = EmblaCarousel(viewport, {
      loop: true,
      align: "center",
      dragFree: false,
      containScroll: false
    });

    const slideCount = embla.slideNodes().length;

    dotArea.innerHTML = "";

    for (let i = 0; i < slideCount; i++) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", `${i + 1}枚目へ`);
      dot.addEventListener("click", () => embla.scrollTo(i));
      dotArea.appendChild(dot);
    }

    const dots = Array.from(dotArea.querySelectorAll("button"));

    function updateDots() {
      const index = embla.selectedScrollSnap();

      dots.forEach(dot => dot.classList.remove("active"));

      if (dots[index]) {
        dots[index].classList.add("active");
      }
    }

    embla.on("select", updateDots);
    embla.on("reInit", updateDots);

    updateDots();
  }

  /* 02. ハンバーガーメニュー */
  const menuBtn = document.querySelector(".ls-menu-btn");
  const closeBtn = document.querySelector(".ls-close-menu");
  const sideMenu = document.querySelector(".ls-side-menu");

  if (menuBtn && sideMenu) {
    menuBtn.addEventListener("click", () => {
      sideMenu.classList.add("open");
    });
  }

  if (closeBtn && sideMenu) {
    closeBtn.addEventListener("click", () => {
      sideMenu.classList.remove("open");
    });
  }

  /* 03. TOPへ戻る */
  const topBtn = document.querySelector(".ls-top-btn");

  if (topBtn) {
    topBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
/* ==================================================
   04. Image Modal
================================================== */

const slides = document.querySelectorAll(".embla__slide img");
const modal = document.querySelector(".ls-modal");
const modalImage = document.querySelector(".ls-modal-image");
const modalClose = document.querySelector(".ls-modal-close");

slides.forEach(slide => {

  slide.addEventListener("click", () => {

    modalImage.src = slide.src;
    modalImage.alt = slide.alt;

    modal.classList.add("open");

  });

});

if (modalClose) {

  modalClose.addEventListener("click", () => {

    modal.classList.remove("open");

  });

}

if (modal) {

  modal.addEventListener("click", (e) => {

    if (e.target === modal) {
      modal.classList.remove("open");
    }

  });

}
});