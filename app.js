document.addEventListener("DOMContentLoaded", function () {
    // --- 1. Selectors ---
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-items a");
    const themeBtn = document.getElementById("theme-btn");
    const slider = document.getElementById("projects-slider");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const toast = document.getElementById("custom-toast");

    // --- 2. Dark/Light Mode Toggle ---
    const currentTheme = localStorage.getItem("theme");
    
    // Apply theme on load
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
        
        if (isDark) {
            themeIcon.classList.replace("fa-moon", "fa-sun");
        } else {
            themeIcon.classList.replace("fa-sun", "fa-moon");
        }
    }

    // --- 3. Mobile Menu Logic ---
    const toggleMenu = () => {
        if (!navMenu || !hamburger) return;
        navMenu.classList.toggle("active");
        const icon = hamburger.querySelector("i");
        if (icon) {
            icon.classList.toggle("fa-bars");
            icon.classList.toggle("fa-times");
        }
    };

    if (hamburger) {
        hamburger.addEventListener("click", toggleMenu);
    }

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navMenu?.classList.contains("active")) toggleMenu();
        });
    });

    // --- 4. Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === "#" || !targetId.startsWith("#")) return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // --- 5. Carousel Logic ---
    if (slider && nextBtn && prevBtn) {
        const getScrollAmount = () => {
            const card = slider.querySelector(".project-card");
            if (!card) return 300; // Fallback value
            const style = window.getComputedStyle(slider);
            const gap = parseInt(style.columnGap) || 20;
            return card.offsetWidth + gap;
        };

        nextBtn.addEventListener("click", () => {
            slider.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        });

        prevBtn.addEventListener("click", () => {
            slider.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        });
    }

    // --- 6. Form Submission & Toast ---
    function showToast(message) {
        const toastMsg = document.getElementById("toast-message");
        if (!toast || !toastMsg) {
            // Fallback if you forgot to add the toast HTML
            alert(message);
            return;
        }
        
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

            // Simulated API Call
            setTimeout(() => {
                showToast("Message sent successfully! Sunday will get back to you soon.");
                btn.innerText = originalText;
                btn.disabled = false;
                form.reset();
            }, 1500);
        });
    });
});
