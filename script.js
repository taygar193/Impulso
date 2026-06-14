window.addEventListener("DOMContentLoaded", () => {

  gsap.registerPlugin(ScrollTrigger);

  // Nav oculto al inicio
gsap.set(".topbar", {
  y: -10,
  opacity: 0
});

ScrollTrigger.create({
  start: "top top",
  trigger: "#Reel",

  onEnter: () => {
    gsap.to(".topbar", { y: -0, opacity: 1 });
  },

  onLeaveBack: () => {
    gsap.to(".topbar", { y: -10, opacity: 0 });
  }
});

  const intro = document.querySelector(".intro");

  intro.addEventListener("click", () => {

    gsap.to(".p1", {
      x: "-120vw",
      duration: 3,
      ease: "power3.inOut"
    });

    gsap.to(".p2", {
      x: "120vw",
      duration: 3,
      ease: "power3.inOut"
    });

    gsap.to(".intro", {
      opacity: 0,
      duration: 0.5,
      delay: 1.5,
      onComplete: () => {
        document.querySelector(".intro").remove();
      }
    });
    document.body.style.overflow = "auto";
  });

  // 🔥 función reutilizable (clave)
  function createTunnel(sceneSelector) {

    const scene = document.querySelector(sceneSelector);
    const images = scene.querySelectorAll(".img");
    const steps = scene.querySelectorAll(".step");

    images.forEach((img, i) => {

      const direction = (i % 2 === 0) ? 1 : -1;

      // 👉 control manual (podés editar esto)
      const x = (1150 + i * 80) * direction;
      const y = (i % 2 === 0) ? -80 : 80;
      const scale = 1.2 + (i * 0.05);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: steps[i],
          start: "top 90%",
          end: "bottom 10%",
          scrub: true
        }
      });

      // 🔥 animación fluida
      tl.fromTo(img,

        {
          opacity: 1,
          scale: 0,
          x: 0,
          y: 0
        },

        {
          scale: scale,
          x: x,
          y: y,
          ease: "none"
        }

      );

      // 🔥 fade rápido
      tl.to(img, {

        opacity: 1,
        duration: 0.10

      }, 0);

      // 🔥 fade out lento
      tl.to(img, {

        opacity: 1,
        duration: 0.5

      }, 0.2);

    });
  }

  // 🔥 inicializar ambas escenas
  createTunnel("#scene1");
  createTunnel("#Laburos");

const slider = document.getElementById("slider");

document.getElementById("next").addEventListener("click", () => {
  slider.classList.add("move");
});

document.getElementById("back").addEventListener("click", () => {
  slider.classList.remove("move");
});

const toggle = document.getElementById("toggle");
const Hb1 = document.getElementById("b1");
const Hb2 = document.getElementById("b2");
const Hb3 = document.getElementById("b3");
const Hb4 = document.getElementById("b4");

toggle.addEventListener("click", () => {
  Hb1.classList.toggle("show");
  Hb2.classList.toggle("show");
  Hb3.classList.toggle("show");
  Hb4.classList.toggle("show");

  toggle.src = toggle.src.includes("icon-mas.png")
    ? "img/icon-menos.png"
    : "img/icon-mas.png";
});

// 🔥 IMPORTANTE: recalcular todo cuando carga
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });

});
