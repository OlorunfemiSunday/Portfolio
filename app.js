document.addEventListener("DOMContentLoaded", function () {
    // --- 1. Selectors ---
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-items a");
    const themeBtn = document.getElementById("theme-btn");
    const slider = document.getElementById("projects-slider"); // Already declared here!
    const prevBtn = document.getElementById("prev-btn");       // Already declared here!
    const nextBtn = document.getElementById("next-btn");       // Already declared here!
    const toast = document.getElementById("custom-toast");

    // --- 2. Dark/Light Mode Toggle ---
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

   // --- 5. Infinite Carousel ---
if (slider && nextBtn && prevBtn) {

    const cards = slider.querySelectorAll(".project-card");

    // Clone first & last cards for infinite illusion
    const firstClone = cards[0].cloneNode(true);
    const lastClone = cards[cards.length - 1].cloneNode(true);

    slider.appendChild(firstClone);
    slider.insertBefore(lastClone, cards[0]);

    const cardWidth = cards[0].offsetWidth + 20; // gap included

    slider.scrollLeft = cardWidth;

    nextBtn.addEventListener("click", () => {
        slider.scrollBy({ left: cardWidth, behavior: "smooth" });
    });

    prevBtn.addEventListener("click", () => {
        slider.scrollBy({ left: -cardWidth, behavior: "smooth" });
    });

    slider.addEventListener("scroll", () => {
        if (slider.scrollLeft <= 0) {
            slider.scrollLeft = slider.scrollWidth - (2 * cardWidth);
        }

        if (slider.scrollLeft >= slider.scrollWidth - slider.offsetWidth) {
            slider.scrollLeft = cardWidth;
        }
    });
}

    // --- 6. Form Submission & Toast ---
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

    const forms = document.querySelectorAll("form");
    forms.forEach(form => {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const btn = form.querySelector("button");
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
