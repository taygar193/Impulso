const slides = document.querySelectorAll(".slide");
const categories = document.querySelectorAll(".cat");
let filteredSlides = [...slides];
const dots = document.querySelectorAll(".dot");

const nextBtn = document.querySelector(".right");
const prevBtn = document.querySelector(".left");

let current = 0;

// POSICIONES
function updateSlider() {

  filteredSlides.forEach((slide, i) => {

    const offset = i - current;

    slide.style.zIndex =
      100 - Math.abs(offset);

    if (offset === 0) {

      gsap.to(slide, {
        xPercent: -50,
        yPercent: -50,
        x: 0,
        scale: 1,
        opacity: 1,
        duration: 0.5
      });

    } else if (offset < 0) {

      gsap.to(slide, {
        xPercent: -50,
        yPercent: -50,
        x: -500,
        scale: 0.7,
        opacity: 1,
        duration: 0.5
      });

    } else {

      gsap.to(slide, {
        xPercent: -50,
        yPercent: -50,
        x: 500,
        scale: 0.7,
        opacity: 1,
        duration: 0.5
      });

    }

  });

  dots.forEach((dot, i) => {

    dot.style.display =
      i < filteredSlides.length ?
      "block" :
      "none";

    dot.classList.toggle(
      "active",
      i === current
    );

  });

}

// DOTS
dots.forEach((dot, i) => {

  dot.classList.toggle("active", i === current);

});


// NEXT
nextBtn.addEventListener("click", () => {

  current++;

  if (current >= filteredSlides.length) {
    current = 0;
  }

  updateSlider();

});

// PREV
prevBtn.addEventListener("click", () => {

  current--;

  if (current < 0) {
    current = filteredSlides.length - 1;
  }

  updateSlider();

});

// DOTS
dots.forEach((dot, i) => {

  dot.addEventListener("click", () => {

    current = i;
    updateSlider();

  });

});

categories.forEach(button => {

  button.addEventListener("click", () => {

    categories.forEach(cat => {
      cat.classList.remove("active");
    });

    button.classList.add("active");

    const filter =
      button.dataset.filter;

    slides.forEach(slide => {

      if (
        slide.dataset.category === filter
      ) {

        slide.classList.remove("hidden");

      } else {

        slide.classList.add("hidden");

      }

    });

    filteredSlides = [...slides].filter(slide =>
      slide.dataset.category === filter
    );

    current = 0;

    updateSlider();

  });

});

filteredSlides = [...slides].filter(slide =>
  slide.dataset.category === "3d"
);

slides.forEach(slide => {

  if (
    slide.dataset.category !== "3d"
  ) {

    slide.classList.add("hidden");

  }

});
// INIT
updateSlider();

// =========================
// ELEMENTOS
// =========================

const popup =
  document.querySelector(".popup");

const popupBg =
  document.querySelector(".popup-bg");

const popupContent =
  document.querySelector(".popup-content");

const popupGallery =
  document.querySelector(".popup-gallery");

const popupTitle =
  document.querySelector(".popup-title");

const closePopup =
  document.querySelector(".close-popup");

const galleryScroll =
  document.querySelector(".gallery-scroll");

// =========================
// ABRIR POPUP
// =========================

slides.forEach(slide => {

  slide.addEventListener("click", () => {

    // titulo
    popupTitle.textContent =
      slide.dataset.title;

    // galeria
    const gallery =
      JSON.parse(slide.dataset.gallery);

    // limpiar
    popupGallery.innerHTML = "";
    popupGallery.classList.remove("video-only");

    // crear galeria
    if (
      gallery.length === 1 &&
      gallery[0].type === "video"
    ) {
      popupGallery.classList.add("video-only");
    }
    gallery.forEach(item => {

      if (item.type === "image") {

        const img =
          document.createElement("img");

        img.src = item.src;

        popupGallery.appendChild(img);

      }

      if (item.type === "video") {

        const video =
          document.createElement("video");

        video.src = item.src;

        video.controls = true;
        video.autoplay = true;
        video.loop = true;
        video.muted = true;

        popupGallery.appendChild(video);

      }

    });

    // reset scroll
    popupGallery.scrollLeft = 0;

    galleryScroll.value = 0;

    updateRangeProgress();

    // abrir popup
    popup.classList.add("active");

    // animacion
    gsap.from(popupContent, {
      scale: 0.9,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out"
    });

  });

});

// =========================
// CERRAR
// =========================

function closePopupFunction() {

  popup.classList.remove("active");

}

closePopup.addEventListener(
  "click",
  closePopupFunction
);

popupBg.addEventListener(
  "click",
  closePopupFunction
);

// =========================
// SCROLL → RANGE
// =========================

popupGallery.addEventListener("scroll", () => {

  const maxScroll =
    popupGallery.scrollWidth -
    popupGallery.clientWidth;

  const percent =
    (popupGallery.scrollLeft / maxScroll) * 100;

  galleryScroll.value = percent;

  updateRangeProgress();

});

// =========================
// RANGE → SCROLL
// =========================

galleryScroll.addEventListener("input", () => {

  const maxScroll =
    popupGallery.scrollWidth -
    popupGallery.clientWidth;

  popupGallery.scrollLeft =
    (galleryScroll.value / 100) * maxScroll;

  updateRangeProgress();

});

// =========================
// PROGRESO VISUAL
// =========================

function updateRangeProgress() {

  const value =
    galleryScroll.value;

  galleryScroll.style.background =

    `linear-gradient(
    to right,
    #d73a1e 0%,
    #d73a1e ${value}%,
    black ${value}%,
    black 100%
  )`;
}

// =========================
// CATEGORIA DESDE URL
// =========================

const params = new URLSearchParams(window.location.search);

const categoryFromUrl = params.get("cat");

if(categoryFromUrl){

  const button = document.querySelector(
    `.cat[data-filter="${categoryFromUrl}"]`
  );

  if(button){
    button.click();
  }

}