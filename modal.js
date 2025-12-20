const cardContents = {
    "content-1": `<h2>The Ozzuno Doctrine</h2>...`,
    "content-2": `<h2>The Apex Council</h2>...`,
    "content-3": `<h2>Chronology of Hegemony</h2>...`,
    "content-4": `<h2>Strategic Operating Grid</h2>...`
};

export function initModal() {
    const modal = document.getElementById("modal");
    const modalBody = document.getElementById("modal-body");
    const closeModal = document.querySelector(".modal-close");

    document.querySelectorAll(".card").forEach(card => {
        card.addEventListener("click", () => {
            const contentKey = card.getAttribute("data-content");
            if (cardContents[contentKey]) {
                modalBody.innerHTML = cardContents[contentKey];
                modal.style.display = "flex";
                document.body.classList.add("modal-open");
            }
        });
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
        document.body.classList.remove("modal-open");
    });
}