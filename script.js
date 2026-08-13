/* =========================================================
   PARUL PAL PORTFOLIO - SCRIPT.JS
   ========================================================= */


/* =========================================================
   1. DOM ELEMENTS
   ========================================================= */

const themeBtn = document.getElementById("themeBtn");
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");
const scrollTopBtn = document.getElementById("scrollTop");
const typingText = document.querySelector(".typing-text");


/* =========================================================
   2. MOBILE NAVIGATION
   ========================================================= */

if (menuBtn && navMenu) {

    menuBtn.addEventListener("click", () => {

        navMenu.classList.toggle("active");

        const icon = menuBtn.querySelector("i");

        if (navMenu.classList.contains("active")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

            menuBtn.setAttribute("aria-label", "Close menu");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

            menuBtn.setAttribute("aria-label", "Open menu");
        }
    });


    /* Close mobile menu when clicking a link */

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");

            const icon = menuBtn.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });

    });

}


/* =========================================================
   3. DARK / LIGHT THEME
   ========================================================= */

const savedTheme = localStorage.getItem("portfolio-theme");


if (savedTheme === "light") {

    document.body.classList.add("light-theme");

}


function updateThemeIcon() {

    if (!themeBtn) return;

    const icon = themeBtn.querySelector("i");

    if (!icon) return;


    if (document.body.classList.contains("light-theme")) {

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

        themeBtn.setAttribute("aria-label", "Switch to dark theme");

    } else {

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

        themeBtn.setAttribute("aria-label", "Switch to light theme");

    }

}


updateThemeIcon();


if (themeBtn) {

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("light-theme");


        const isLight =
            document.body.classList.contains("light-theme");


        localStorage.setItem(
            "portfolio-theme",
            isLight ? "light" : "dark"
        );


        updateThemeIcon();

    });

}


/* =========================================================
   4. TYPING ANIMATION
   ========================================================= */

if (typingText) {

    const roles = [
        "Developer",
        "Machine Learning Enthusiast",
        "NLP Developer",
        "AI Builder",
        "Problem Solver"
    ];


    let roleIndex = 0;
    let characterIndex = 0;
    let deleting = false;


    function typeRole() {

        const currentRole = roles[roleIndex];


        if (!deleting) {

            typingText.textContent =
                currentRole.substring(0, characterIndex + 1);

            characterIndex++;


            if (characterIndex === currentRole.length) {

                deleting = true;

                setTimeout(typeRole, 1500);

                return;

            }

        } else {

            typingText.textContent =
                currentRole.substring(0, characterIndex - 1);

            characterIndex--;


            if (characterIndex === 0) {

                deleting = false;

                roleIndex++;

                if (roleIndex >= roles.length) {
                    roleIndex = 0;
                }

            }

        }


        const speed = deleting ? 50 : 100;

        setTimeout(typeRole, speed);

    }


    typeRole();

}


/* =========================================================
   5. ACTIVE NAVIGATION ON SCROLL
   ========================================================= */

const sections = document.querySelectorAll("section[id]");


function updateActiveNav() {

    let currentSection = "";


    sections.forEach(section => {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;


        if (
            window.scrollY >=
            sectionTop - sectionHeight * 0.25
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");


        const href = link.getAttribute("href");


        if (href === `#${currentSection}`) {

            link.classList.add("active");

        }

    });

}


window.addEventListener("scroll", updateActiveNav);


/* =========================================================
   6. SCROLL TO TOP BUTTON
   ========================================================= */

function handleScrollTopButton() {

    if (!scrollTopBtn) return;


    if (window.scrollY > 500) {

        scrollTopBtn.classList.add("show");

    } else {

        scrollTopBtn.classList.remove("show");

    }

}


window.addEventListener(
    "scroll",
    handleScrollTopButton
);


if (scrollTopBtn) {

    scrollTopBtn.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================================================
   7. SMOOTH SCROLLING
   ========================================================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (event) {

        const targetId =
            this.getAttribute("href");


        if (
            !targetId ||
            targetId === "#"
        ) {
            return;
        }


        const target =
            document.querySelector(targetId);


        if (!target) return;


        event.preventDefault();


        const navbar =
            document.querySelector(".navbar");


        const navbarHeight =
            navbar ? navbar.offsetHeight : 0;


        const targetPosition =
            target.offsetTop - navbarHeight;


        window.scrollTo({

            top: targetPosition,

            behavior: "smooth"

        });

    });

});


/* =========================================================
   8. SCROLL REVEAL ANIMATION
   ========================================================= */

const revealElements = document.querySelectorAll(
    ".section, .project-card, .skill-card, .cert-card, .timeline-item, .contact-card"
);


revealElements.forEach(element => {

    element.classList.add("reveal");

});


const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   9. PROJECT CARD HOVER EFFECT
   ========================================================= */

const projectCards =
    document.querySelectorAll(".project-card");


projectCards.forEach(card => {

    card.addEventListener("mousemove", event => {

        const rect =
            card.getBoundingClientRect();


        const x =
            event.clientX - rect.left;


        const y =
            event.clientY - rect.top;


        const centerX =
            rect.width / 2;


        const centerY =
            rect.height / 2;


        const rotateX =
            ((y - centerY) / centerY) * -2;


        const rotateY =
            ((x - centerX) / centerX) * 2;


        card.style.transform =
            `perspective(800px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-5px)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});


/* =========================================================
   10. SKILL TAG INTERACTION
   ========================================================= */

const skillTags =
    document.querySelectorAll(".skill-tags span");


skillTags.forEach(tag => {

    tag.addEventListener("click", () => {

        tag.classList.toggle("selected");

    });

});


/* =========================================================
   11. CERTIFICATION CARD CLICK
   ========================================================= */

const certCards =
    document.querySelectorAll(".cert-card");


certCards.forEach(card => {

    card.addEventListener("click", () => {

        card.classList.toggle("expanded");

    });

});


/* =========================================================
   12. COPY EMAIL FUNCTION
   ========================================================= */

const emailAddress =
    "eng.parul5418@gmail.com";


const emailCards =
    document.querySelectorAll(
        '.contact-card[href^="mailto:"]'
    );


emailCards.forEach(card => {

    card.addEventListener("contextmenu", async event => {

        event.preventDefault();


        try {

            await navigator.clipboard.writeText(
                emailAddress
            );


            showToast(
                "Email copied to clipboard!"
            );

        } catch (error) {

            console.log(
                "Could not copy email."
            );

        }

    });

});


/* =========================================================
   13. TOAST NOTIFICATION
   ========================================================= */

function showToast(message) {

    let toast =
        document.querySelector(".toast");


    if (!toast) {

        toast =
            document.createElement("div");

        toast.className = "toast";

        document.body.appendChild(toast);

    }


    toast.textContent = message;

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


/* =========================================================
   14. CURRENT YEAR
   ========================================================= */

const copyright =
    document.querySelector(".copyright");


if (copyright) {

    copyright.textContent =
        `© ${new Date().getFullYear()} Parul Pal. All rights reserved.`;

}


/* =========================================================
   15. NAVBAR SHADOW ON SCROLL
   ========================================================= */

const navbar =
    document.querySelector(".navbar");


function updateNavbar() {

    if (!navbar) return;


    if (window.scrollY > 30) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    updateNavbar
);


updateNavbar();


/* =========================================================
   16. HERO PARALLAX EFFECT
   ========================================================= */

const heroVisual =
    document.querySelector(".hero-visual");


if (heroVisual) {

    window.addEventListener("mousemove", event => {

        const x =
            (window.innerWidth / 2 - event.clientX) / 40;


        const y =
            (window.innerHeight / 2 - event.clientY) / 40;


        heroVisual.style.transform =
            `translate(${x}px, ${y}px)`;

    });

}


/* =========================================================
   17. ORBIT ANIMATION INTERACTION
   ========================================================= */

const aiCard =
    document.querySelector(".ai-card");


if (aiCard) {

    aiCard.addEventListener("mouseenter", () => {

        aiCard.classList.add("active");

    });


    aiCard.addEventListener("mouseleave", () => {

        aiCard.classList.remove("active");

    });

}


/* =========================================================
   18. CONTACT CARD KEYBOARD ACCESSIBILITY
   ========================================================= */

const interactiveCards =
    document.querySelectorAll(
        ".contact-card, .project-card"
    );


interactiveCards.forEach(card => {

    card.setAttribute("tabindex", "0");


    card.addEventListener("keydown", event => {

        if (
            event.key === "Enter" ||
            event.key === " "
        ) {

            event.preventDefault();

            card.click();

        }

    });

});


/* =========================================================
   19. DISABLE RIGHT CLICK ON AI CARD
   =========================================================
   Optional visual protection only.
   It does NOT provide real security.
   ========================================================= */

// aiCard?.addEventListener("contextmenu", event => {
//     event.preventDefault();
// });


/* =========================================================
   20. PAGE LOAD ANIMATION
   ========================================================= */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});


/* =========================================================
   21. ACTIVE SECTION INITIALIZATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    updateActiveNav();

    handleScrollTopButton();

    updateNavbar();

});


/* =========================================================
   22. CONSOLE MESSAGE
   ========================================================= */

console.log(
    "%c👋 Hi! Welcome to Parul Pal's Portfolio.",
    "font-size:16px;font-weight:bold;"
);

console.log(
    "%cAI/ML Developer | BCA Student | Open Source Contributor",
    "font-size:13px;"
);