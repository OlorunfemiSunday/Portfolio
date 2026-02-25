document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const navItems = document.querySelector(".nav-items");
    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelectorAll(".nav-items a");

    // 1. Toggle Mobile Menu
    hamburger.addEventListener("click", () => {
        navItems.classList.toggle("active");
        // Change icon from bars to 'X' if using FontAwesome
        const icon = hamburger.querySelector("i");
        if (icon) {
            icon.classList.toggle("fa-bars");
            icon.classList.toggle("fa-times");
        }
    });

    // 2. Close Menu when a link is clicked (Mobile Fix)
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navItems.classList.remove("active");
            const icon = hamburger.querySelector("i");
            if (icon) {
                icon.classList.add("fa-bars");
                icon.classList.remove("fa-times");
            }
        });
    });

    // 3. Navbar Scroll Effect
    // Adds a background and shadow when user scrolls down
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.style.background = "rgba(26, 26, 26, 0.95)";
            navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
        } else {
            navbar.style.background = "rgba(26, 26, 26, 0.8)";
            navbar.style.boxShadow = "none";
        }
    });

    // 4. Form Submission Handling (Preventing Page Refresh)
    const forms = document.querySelectorAll("form");
    forms.forEach(form => {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            
            // Basic Feedback Animation
            const button = form.querySelector("button");
            const originalText = button.innerText;
            
            button.innerText = "Sending...";
            button.style.opacity = "0.7";
            button.disabled = true;

            // Simulate an API call
            setTimeout(() => {
                alert("Thank you, Sunday has received your message!");
                button.innerText = originalText;
                button.style.opacity = "1";
                button.disabled = false;
                form.reset();
            }, 1500);
        });
    });

    // 5. Smooth Scroll for all browsers
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
