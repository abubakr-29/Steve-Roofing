const controller = new ScrollMagic.Controller();
const burger = document.querySelector(".burger");

document.addEventListener("DOMContentLoaded", function () {
  gsap.set([".hero-title", ".hero-subtitle"], { opacity: 0, y: 20 });
  gsap.set("#service-offered .row", { opacity: 0, y: 30 });
  gsap.set("#service-offered img", { opacity: 0 });

  animateHeroSection();

  animateServices();

  animateFooter();

  setupNavigation();
  updateCopyright();
});

function animateHeroSection() {
  new ScrollMagic.Scene({
    triggerElement: "#title",
    triggerHook: 0.8,
    reverse: false,
  })
    .setTween(
      gsap.to(".hero-title", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      })
    )
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: "#title",
    triggerHook: 0.8,
    reverse: false,
  })
    .setTween(
      gsap.to(".hero-subtitle", {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
        ease: "power2.out",
      })
    )
    .addTo(controller);
}

function animateServices() {
  document.querySelectorAll("#service-offered .row").forEach((row, index) => {
    new ScrollMagic.Scene({
      triggerElement: row,
      triggerHook: 0.8,
      offset: 50,
      reverse: false,
    })
      .setTween(
        gsap.to(row, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          delay: index * 0.15,
        })
      )
      .addTo(controller);

    new ScrollMagic.Scene({
      triggerElement: row,
      triggerHook: 0.8,
      offset: 50,
      reverse: false,
    })
      .setTween(
        gsap.to(row.querySelector("img"), {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.3 + index * 0.15,
        })
      )
      .addTo(controller);
  });
}

function animateFooter() {
  gsap.set([".footer-row", ".footer-col", ".copyright"], {
    opacity: 0,
    y: 30,
  });

  const footerTl = gsap.timeline();

  footerTl
    .to(".footer-row", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
    })
    .to(
      ".footer-col",
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "back.out(1.2)",
      },
      "-=0.4"
    )
    .to(
      ".copyright",
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
      },
      "-=0.3"
    );

  new ScrollMagic.Scene({
    triggerElement: "footer",
    triggerHook: 0.8,
    offset: 50,
    reverse: false,
  })
    .setTween(footerTl)
    .addTo(controller);
}

function setupNavigation() {
  if (!burger) return;

  burger.addEventListener("click", function (e) {
    if (!e.target.classList.contains("active")) {
      e.target.classList.add("active");
      gsap.to(".line1", 0.5, { rotate: "45", y: 5 });
      gsap.to(".line2", 0.5, { rotate: "-45", y: -5 });
      gsap.to(".nav-bar", 1, { clipPath: "circle(3000px at 100% -10%" });
      document.body.classList.add("hide");
    } else {
      e.target.classList.remove("active");
      gsap.to(".line1", 0.5, { rotate: "0", y: 0 });
      gsap.to(".line2", 0.5, { rotate: "0", y: 0 });
      gsap.to(".nav-bar", 1, { clipPath: "circle(50px at 100% -10%" });
      document.body.classList.remove("hide");
    }
  });

  window.addEventListener("scroll", () => {
    const navHeader = document.querySelector(".nav-header");
    navHeader?.classList.toggle("scrolled", window.scrollY > 50);
  });
}

function updateCopyright() {
  const copyElement = document.querySelector(".copy");
  if (copyElement) {
    copyElement.textContent = `© ${new Date().getFullYear()} Steve Roofing. All rights reserved.`;
  }
}
