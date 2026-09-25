
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const categorySelect = document.getElementById("categorySelect");
    const searchBtn = document.getElementById("searchBtn");
    const districtSelect = document.getElementById("districtSelect");
    const sortSelect = document.getElementById("sortSelect");

    const cards = [...document.querySelectorAll(".place-card, .destination-card")];

    function getCardName(card) {
        return (card.dataset.name || card.querySelector("h3")?.textContent || "").toLowerCase();
    }

    function getCardCategory(card) {
        return card.dataset.category || "";
    }

    function getCardDistrict(card) {
        return card.dataset.district || "";
    }

    function filterPlaces() {
        if (!cards.length) return;

        const keyword = (searchInput ? searchInput.value.trim().toLowerCase() : "");
        const category = categorySelect ? categorySelect.value : "all";
        const district = districtSelect ? districtSelect.value : "all";

        cards.forEach((card) => {
            const name = getCardName(card);
            const matchesText = !keyword || name.includes(keyword);
            const matchesCategory = category === "all" || getCardCategory(card) === category;
            const matchesDistrict = district === "all" || getCardDistrict(card) === district;

            card.style.display = matchesText && matchesCategory && matchesDistrict ? "" : "none";
        });

        if (sortSelect && sortSelect.value === "name") {
            const grid = document.getElementById("placesGrid");
            if (grid) {
                const visibleCards = [...grid.querySelectorAll(".destination-card")].filter(card => card.style.display !== "none");
                visibleCards.sort((a, b) => (a.dataset.name || "").localeCompare(b.dataset.name || ""));
                visibleCards.forEach((card) => grid.appendChild(card));
            }
        }
    }

    if (searchBtn) {
        searchBtn.addEventListener("click", filterPlaces);
    }

    if (searchInput) {
        searchInput.addEventListener("keydown", (event) => {
            if (event.key === "Enter") filterPlaces();
        });
    }

    if (categorySelect) {
        categorySelect.addEventListener("change", filterPlaces);
    }

    if (districtSelect) {
        districtSelect.addEventListener("change", filterPlaces);
    }

    if (sortSelect) {
        sortSelect.addEventListener("change", filterPlaces);
    }

    document.querySelectorAll(".category-card, .filter-button").forEach((button) => {
        button.addEventListener("click", () => {
            const selectedCategory = button.dataset.category || "all";

            if (categorySelect) {
                categorySelect.value = selectedCategory;
            }

            document.querySelectorAll(".filter-button").forEach((item) => {
                item.classList.toggle("active", item === button);
            });

            filterPlaces();

            const placesSection = document.getElementById("places");
            if (placesSection) {
                placesSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });

    document.querySelectorAll(".heart, .favorite-button").forEach((button) => {
        button.addEventListener("click", () => {
            const isActive = button.textContent.trim() === "♥";
            button.textContent = isActive ? "♡" : "♥";
            button.style.color = isActive ? "#ffffff" : "#f26a6a";
        });
    });
});
