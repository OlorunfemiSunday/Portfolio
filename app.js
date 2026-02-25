document.addEventListener("DOMContentLoaded", function () {
    // --- 1. Selectors ---
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-items a");
    const themeBtn = document.getElementById("theme-btn");
    const themeIcon = themeBtn.querySelector("i");
    const slider = document.getElementById("projects-slider");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const toast = document.getElementById("custom-toast");

    // --- 2. Dark/Light Mode Toggle ---
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        themeIcon.classList.replace("fa-moon", "fa-sun");
    }

    themeBtn.addEventListener("click", () => {
        const isDark = document.documentElement.getAttribute("data-theme") === "dark";
        if (isDark) {
            document.documentElement.setAttribute("data-theme", "light");
            themeIcon.classList.replace("fa-sun", "fa-moon");
            localStorage.setItem("theme", "light");
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
            themeIcon.classList.replace("fa-moon", "fa-sun");
            localStorage.setItem("theme", "dark");
        }
    });

    // --- 3. Mobile Menu & Navigation ---
    const toggleMenu = () => {
        navMenu.classList.toggle("active");
        const icon = hamburger.querySelector("i");
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-times");
    };

    hamburger.addEventListener("click", toggleMenu);

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navMenu.classList.contains("active")) toggleMenu();
        });
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === "#") return;
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- 4. Carousel Logic (Show 2 Cards) ---
    if (slider && nextBtn && prevBtn) {
        const getScrollAmount = () => {
            const card = slider.querySelector(".project-card");
            const gap = 20; // Matches your updated CSS gap
            return card.offsetWidth + gap;
        };

        nextBtn.addEventListener("click", () => {
            slider.scrollLeft += getScrollAmount();
        });

        prevBtn.addEventListener("click", () => {
            slider.scrollLeft -= getScrollAmount();
        });
    }

    // --- 5. Form Submission & Custom Toast ---
    function showToast(message) {
        if (!toast) return; // Guard clause if toast HTML is missing
        const toastMsg = document.getElementById("toast-message");
        toastMsg.innerText = message;
        
        toast.classList.add("show");
        setTimeout(() => {
            toast.classList.remove("show");
        }, 4000);
    }

    const forms = document.querySelectorAll("form");
    forms.forEach(form => {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const btn = form.querySelector("button");
            const originalText = btn.innerText;
            
            btn.innerText = "Sending...";
            btn.disabled = true;

            // Simulate server delay
            setTimeout(() => {
                // Replacement for alert()
                showToast("Message sent successfully! Sunday will get back to you soon.");
                
                btn.innerText = originalText;
                btn.disabled = false;
                form.reset();
            }, 1500);
        });
    });
});
