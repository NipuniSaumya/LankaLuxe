
const searchInput =
    document.getElementById("searchInput");

const categorySelect =
    document.getElementById("categorySelect");

const searchBtn =
    document.getElementById("searchBtn");

const cards =
    [...document.querySelectorAll(".place-card")];


function filterPlaces() {

    const keyword =
        searchInput.value.trim().toLowerCase();

    const category =
        categorySelect.value;


    cards.forEach(card => {

        const name =
            card.dataset.name.toLowerCase();

        const cardCategory =
            card.dataset.category;


        const matchesText =
            !keyword || name.includes(keyword);


        const matchesCategory =
            category === "all" ||
            cardCategory === category;


        if (
            matchesText &&
            matchesCategory
        ) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

}


/* Search button */

searchBtn.addEventListener(
    "click",
    filterPlaces
);


/* Enter key */

searchInput.addEventListener(
    "keyup",
    function(event) {

        if (event.key === "Enter") {

            filterPlaces();

        }

    }
);


/* Category dropdown */

categorySelect.addEventListener(
    "change",
    filterPlaces
);


/* =========================
   CATEGORY BUTTONS
========================= */

document
    .querySelectorAll(".category-card")
    .forEach(button => {

        button.addEventListener(
            "click",
            function() {

                const category =
                    this.dataset.category;


                categorySelect.value =
                    category;


                filterPlaces();


                document
                    .getElementById("places")
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );

    });


/* =========================
   FAVOURITES
========================= */

document
    .querySelectorAll(".heart")
    .forEach(button => {

        button.addEventListener(
            "click",
            function() {

                if (this.textContent.trim() === "♡") {

                    this.textContent = "♥";

                    this.style.color = "#ff6b6b";

                } else {

                    this.textContent = "♡";

                    this.style.color = "white";

                }

            }
        );

    });