document.addEventListener("DOMContentLoaded", function () {
  const controller = new ScrollMagic.Controller();
  const burger = document.querySelector(".burger");

  animateHeroSection(controller);

  animateWhyChooseSection(controller);

  animateServicesSection(controller);

  setupGalleryLightbox(controller);

  animateFooterSection(controller);

  setupNavigation(burger);
  updateCopyrightYear();
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
      gsap.to(".hero-text-container", {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.3,
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
      gsap.to(".call-button, .service-button", {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.6,
        ease: "power2.out",
        stagger: 0.2,
      })
    )
    .addTo(controller);
}

function animateWhyChooseSection(controller) {
  new ScrollMagic.Scene({
    triggerElement: "#why-choose",
    triggerHook: 0.8,
    reverse: false,
  })
    .setTween(
      gsap.to(
        ".heading.animate, .feature-box.animate, .why-choose-button.animate",
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
        }
      )
    )
    .addTo(controller);
}

function animateServicesSection(controller) {
  new ScrollMagic.Scene({
    triggerElement: "#services-overview",
    triggerHook: 0.8,
    reverse: false,
  })
    .setTween(
      gsap.to("#services-overview .animate", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
      })
    )
    .addTo(controller);
}

function animateFooterSection(controller) {
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

function setupGalleryLightbox(controller) {
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.querySelector(".lightbox");
  const lightboxImg = document.getElementById("lightbox-image");
  const lightboxCaption = document.querySelector(".lightbox-caption");
  const closeBtn = document.querySelector(".close-btn");

  galleryItems.forEach((item, index) => {
    gsap.set(item, { opacity: 0, y: 50 });

    new ScrollMagic.Scene({
      triggerElement: item,
      triggerHook: 0.8,
      offset: 50,
      reverse: false,
    })
      .setTween(
        gsap.to(item, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay: index * 0.1,
        })
      )
      .addTo(controller);

    item.addEventListener("click", function () {
      const imgSrc = this.querySelector("img").src;
      const imgAlt = this.querySelector("img").alt;
      openLightbox(imgSrc, imgAlt);
    });
  });

  function openLightbox(imgSrc, imgAlt) {
    gsap.set(lightboxImg, { scale: 0.8, opacity: 0 });
    lightboxImg.src = imgSrc;
    lightboxCaption.textContent = imgAlt;
    lightbox.style.display = "block";
    document.body.style.overflow = "hidden";

    gsap.to(lightbox, { opacity: 1, duration: 0.3 });
    gsap.to(lightboxImg, {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: "back.out(1.2)",
    });
  }

  function closeLightbox() {
    gsap.to(lightboxImg, { scale: 0.8, opacity: 0, duration: 0.3 });
    gsap.to(lightbox, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        lightbox.style.display = "none";
        document.body.style.overflow = "auto";
      },
    });
  }

  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lightbox.style.display === "block") {
      closeLightbox();
    }
  });
}

function setupNavigation(burger) {
  if (!burger) return;

  burger.addEventListener("click", navToggle);

  window.addEventListener("scroll", () => {
    const navHeader = document.querySelector(".nav-header");
    if (window.scrollY > 50) {
      navHeader.classList.add("scrolled");
    } else {
      navHeader.classList.remove("scrolled");
    }
  });

  function navToggle(e) {
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
  }
}

function updateCopyrightYear() {
  const copyElement = document.querySelector(".copy");
  if (copyElement) {
    copyElement.textContent = `© ${new Date().getFullYear()} Steve Roofing. All rights reserved.`;
  }
}
