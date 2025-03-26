document.addEventListener("DOMContentLoaded", function () {
  const controller = new ScrollMagic.Controller();
  const burger = document.querySelector(".burger");
  const navHeader = document.querySelector(".nav-header");

  gsap.set([".hero-title", ".hero-subtitle"], { opacity: 0, y: 20 });
  gsap.set(".quote-form", { opacity: 0, y: 50 });
  gsap.set(".form-group", { opacity: 0, y: 20 });

  animateHeroSection(controller);

  animateQuoteForm(controller);

  animateFooter(controller);

  setupNavigation(burger, navHeader);

  updateCopyright();
});

function animateHeroSection(controller) {
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

function animateQuoteForm(controller) {
  new ScrollMagic.Scene({
    triggerElement: ".quote-form-section",
    triggerHook: 0.8,
    reverse: false,
  })
    .setTween(
      gsap.to(".quote-form", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      })
    )
    .addTo(controller);

  gsap.to(".form-group", {
    opacity: 1,
    y: 0,
    duration: 0.5,
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".quote-form",
      start: "top 70%",
    },
  });
}

function animateFooter(controller) {
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

function setupNavigation(burger, navHeader) {
  if (!burger) return;

  burger.addEventListener("click", function (e) {
    const isActive = e.target.classList.contains("active");

    e.target.classList.toggle("active", !isActive);
    document.body.classList.toggle("hide", !isActive);

    gsap.to(".line1", 0.5, {
      rotate: isActive ? "0" : "45",
      y: isActive ? 0 : 5,
    });

    gsap.to(".line2", 0.5, {
      rotate: isActive ? "0" : "-45",
      y: isActive ? 0 : -5,
    });

    gsap.to(".nav-bar", 1, {
      clipPath: isActive
        ? "circle(50px at 100% -10%)"
        : "circle(3000px at 100% -10%)",
    });
  });

  window.addEventListener("scroll", () => {
    navHeader?.classList.toggle("scrolled", window.scrollY > 50);
  });
}

function updateCopyright() {
  const copyElement = document.querySelector(".copy");
  if (copyElement) {
    copyElement.textContent = `© ${new Date().getFullYear()} Steve Roofing. All rights reserved.`;
  }
}
