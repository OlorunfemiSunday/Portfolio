document.addEventListener("DOMContentLoaded", function () {
    // Selectors
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-items a");
    const themeBtn = document.getElementById("theme-btn");
    const themeIcon = themeBtn.querySelector("i");

    // --- 1. Dark/Light Mode Toggle ---
    
    // Check for saved theme in localStorage
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        themeIcon.classList.replace("fa-moon", "fa-sun");
    }

    themeBtn.addEventListener("click", () => {
        const isDark = document.documentElement.getAttribute("data-theme") === "dark";
        
        if (isDark) {
            // Switch to Light Mode
            document.documentElement.setAttribute("data-theme", "light");
            themeIcon.classList.replace("fa-sun", "fa-moon");
            localStorage.setItem("theme", "light");
        } else {
            // Switch to Dark Mode
            document.documentElement.setAttribute("data-theme", "dark");
            themeIcon.classList.replace("fa-moon", "fa-sun");
            localStorage.setItem("theme", "dark");
        }
    });

    // --- 2. Mobile Menu Toggle ---
    hamburger.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        const icon = hamburger.querySelector("i");
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-times");
    });

    // --- 3. Navigation Management ---
    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
            const icon = hamburger.querySelector("i");
            icon.classList.add("fa-bars");
            icon.classList.remove("fa-times");
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
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
document.addEventListener("DOMContentLoaded", function () {
    // ... (Keep your theme and menu toggle code)

    // --- Carousel Logic ---
    const slider = document.getElementById("projects-slider");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    if (slider && nextBtn && prevBtn) {
        const getScrollAmount = () => {
            const card = slider.querySelector(".project-card");
            // Calculates card width + the gap
            return card.offsetWidth + parseFloat(getComputedStyle(slider).gap);
        };

        nextBtn.addEventListener("click", () => {
            slider.scrollLeft += getScrollAmount();
        });

        prevBtn.addEventListener("click", () => {
            slider.scrollLeft -= getScrollAmount();
        });
    }

    // ... (Keep your form submission code)
});
    
    // --- 4. Form Submission Simulation ---
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
                alert("Message sent successfully! Sunday will get back to you soon.");
                btn.innerText = originalText;
                btn.disabled = false;
                form.reset();
            }, 1500);
        });
    });
});
