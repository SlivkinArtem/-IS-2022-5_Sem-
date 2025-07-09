(function() {
    document.addEventListener("DOMContentLoaded", () => {
        const loadTime = Math.round(performance.now());
        const footer = document.querySelector(".footer");
        const loadTimeElem = document.createElement("p");
        loadTimeElem.className = "load-time";
        loadTimeElem.textContent = `Время загрузки страницы: ${loadTime} мс`;

        footer.appendChild(loadTimeElem);
    });
})();

(function() {
    document.addEventListener("DOMContentLoaded", () => {
        const navLinks = document.querySelectorAll(".nav__link");
        const sections = document.querySelectorAll("section"); 

        function setActiveMenuBySection(id) {
            navLinks.forEach(link => {
                if (link.getAttribute("href") === `#${id}`) {
                    link.classList.add("active");
                } else {
                    link.classList.remove("active");
                }
            });
        }

        // Intersection Observer
        const observerOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0.5 
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveMenuBySection(entry.target.id);
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    });
})();

