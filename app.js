document.addEventListener("DOMContentLoaded", function () {

    // ===============================
    // 1. SELECTORS
    // ===============================
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-items a");
    const themeBtn = document.getElementById("theme-btn");
    const slider = document.getElementById("projects-slider");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const toast = document.getElementById("custom-toast");

    // ===============================
    // 2. DARK / LIGHT MODE
    // ===============================
    const currentTheme = localStorage.getItem("theme");

    if (currentTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        updateThemeIcon(true);
    }

    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            const isDark = document.documentElement.getAttribute("data-theme") === "dark";
            const newTheme = isDark ? "light" : "dark";

            document.documentElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme);
            updateThemeIcon(!isDark);
        });
    }

    function updateThemeIcon(isDark) {
        const themeIcon = themeBtn?.querySelector("i");
        if (!themeIcon) return;

        themeIcon.classList.toggle("fa-moon", !isDark);
        themeIcon.classList.toggle("fa-sun", isDark);
    }

    // ===============================
    // 3. MOBILE MENU
    // ===============================
    function toggleMenu() {
        if (!navMenu || !hamburger) return;

        navMenu.classList.toggle("active");

        const icon = hamburger.querySelector("i");
        if (icon) {
            icon.classList.toggle("fa-bars");
            icon.classList.toggle("fa-times");
        }
    }

    hamburger?.addEventListener("click", toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navMenu?.classList.contains("active")) toggleMenu();
        });
    });

    // ===============================
    // 4. SMOOTH SCROLL
    // ===============================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        });
    });

    // ===============================
    // 5. IMPROVED INFINITE CAROUSEL
    // ===============================
    if (slider && nextBtn && prevBtn) {

        let cards = slider.querySelectorAll(".project-card");
        if (cards.length < 2) return; // Not enough cards for infinite

        let cardWidth;
        let isTransitioning = false;

        function setupCarousel() {
            cards = slider.querySelectorAll(".project-card");

            // Remove old clones (if resize triggered setup again)
            slider.querySelectorAll(".clone").forEach(el => el.remove());

            const firstClone = cards[0].cloneNode(true);
            const lastClone = cards[cards.length - 1].cloneNode(true);

            firstClone.classList.add("clone");
            lastClone.classList.add("clone");

            slider.appendChild(firstClone);
            slider.insertBefore(lastClone, cards[0]);

            cardWidth = cards[0].offsetWidth + 20; // 20 = CSS gap

            slider.scrollLeft = cardWidth;
        }

        setupCarousel();

        // Recalculate on resize
        window.addEventListener("resize", () => {
            setupCarousel();
        });

        nextBtn.addEventListener("click", () => {
            if (isTransitioning) return;
            isTransitioning = true;
            slider.scrollBy({ left: cardWidth, behavior: "smooth" });
            setTimeout(() => isTransitioning = false, 400);
        });

        prevBtn.addEventListener("click", () => {
            if (isTransitioning) return;
            isTransitioning = true;
            slider.scrollBy({ left: -cardWidth, behavior: "smooth" });
            setTimeout(() => isTransitioning = false, 400);
        });

        slider.addEventListener("scroll", () => {

            if (slider.scrollLeft <= 0) {
                slider.style.scrollBehavior = "auto";
                slider.scrollLeft = slider.scrollWidth - (2 * cardWidth);
                slider.style.scrollBehavior = "smooth";
            }

            if (slider.scrollLeft >= slider.scrollWidth - slider.offsetWidth) {
                slider.style.scrollBehavior = "auto";
                slider.scrollLeft = cardWidth;
                slider.style.scrollBehavior = "smooth";
            }
        });
    }

    // ===============================
    // 6. FORM + TOAST
    // ===============================
    function showToast(message) {
        const toastMsg = document.getElementById("toast-message");

        if (!toast || !toastMsg) {
            alert(message);
            return;
        }

        toastMsg.innerText = message;
        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 4000);
    }

    document.querySelectorAll("form").forEach(form => {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const btn = form.querySelector("button");
            if (!btn) return;

            const originalText = btn.innerText;

            btn.innerText = "Sending...";
            btn.disabled = true;

            setTimeout(() => {
                showToast("Message sent successfully! Sunday will get back to you soon.");
                btn.innerText = originalText;
                btn.disabled = false;
                form.reset();
            }, 1500);
        });
    });

});
