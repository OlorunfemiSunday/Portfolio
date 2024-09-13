document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navItems = document.querySelector(".nav-items");
  const socialIcons = document.querySelector(".social-icons");

  hamburger.addEventListener("click", function () {
    navItems.classList.toggle("active");
    socialIcons.classList.toggle("active");
  });
});
