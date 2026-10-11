document.addEventListener("DOMContentLoaded", () => {

    /* ================================
       THEME TOGGLE
    ================================= */

    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = themeToggle ? themeToggle.querySelector("i") : null;

    // Saved theme check
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }

    // Set correct icon
    function updateThemeIcon() {
        if (!themeIcon) return;

        if (document.body.classList.contains("dark-mode")) {
            themeIcon.className = "fas fa-sun";
        } else {
            themeIcon.className = "fas fa-moon";
        }
    }

    updateThemeIcon();

    // Theme button
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {

            document.body.classList.toggle("dark-mode");

            const isDark =
                document.body.classList.contains("dark-mode");

            localStorage.setItem(
                "theme",
                isDark ? "dark" : "light"
            );

            updateThemeIcon();
        });
    }


    /* ================================
       MOBILE MENU
    ================================= */

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            navMenu.classList.toggle("active");

            const menuIcon = menuToggle.querySelector("i");

            if (navMenu.classList.contains("active")) {
                menuIcon.className = "fas fa-xmark";
            } else {
                menuIcon.className = "fas fa-bars";
            }

        });


        // Close menu after clicking a link
        const navLinks = navMenu.querySelectorAll(".nav-link");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("active");

                const menuIcon = menuToggle.querySelector("i");

                if (menuIcon) {
                    menuIcon.className = "fas fa-bars";
                }

            });

        });
    }


    /* ================================
       ACTIVE NAV LINK
    ================================= */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    function updateActiveLink() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                "#" + currentSection
            ) {
                link.classList.add("active");
            }

        });
    }

    window.addEventListener("scroll", updateActiveLink);

    updateActiveLink();


    /* ================================
       SCROLL TO TOP
    ================================= */

    const scrollTop = document.getElementById("scrollTop");

    if (scrollTop) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 400) {
                scrollTop.classList.add("show");
            } else {
                scrollTop.classList.remove("show");
            }

        });

        scrollTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* ================================
       CERTIFICATE LINKS
    ================================= */

    const certificateCards =
        document.querySelectorAll("a.cert-card");

    certificateCards.forEach(card => {

        card.addEventListener("click", () => {

            const url = card.getAttribute("href");

            if (!url) return;

            // External links open normally because of target="_blank"

        });

    });


    /* ================================
       PROJECT GITHUB LINKS
    ================================= */

    const projectLinks =
        document.querySelectorAll(".project-link");

    projectLinks.forEach(link => {

        link.addEventListener("click", (event) => {

            const url = link.getAttribute("href");

            if (!url || url === "#") {
                event.preventDefault();
            }

        });

    });

});