document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded ✅");

    document.querySelectorAll(".main-link[data-modal-id]").forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            
            let modalId = this.getAttribute("data-modal-id");

            console.log(`Button Clicked: ${this.textContent}`);
            console.log(`Modal ID: ${modalId}`);
            
            // Fetch the portfolio page where the modal exists
            fetch("../portfolio/index.html")
                .then(response => {
                    console.log(`Fetch Status: ${response.status}`);
                    return response.text();
                })
                .then(html => {
                    console.log("Portfolio Page Loaded Successfully");
                    
                    let parser = new DOMParser();
                    let doc = parser.parseFromString(html, "text/html");
                    let modalContent = doc.getElementById(modalId);

                    if (modalContent) {
                        console.log("Modal Found ✅");

                        // Remove any existing modal to prevent duplicates
                        let existingModal = document.getElementById(modalId);
                        if (existingModal) {
                            existingModal.remove();
                        }

                        // Append the modal directly to the <body>
                        document.body.insertAdjacentHTML("beforeend", modalContent.outerHTML);
                        
                        // Initialize Bootstrap Modal
                        let newModal = document.getElementById(modalId);
                        let modal = new bootstrap.Modal(newModal);
                        modal.show();
                        console.log("Modal Displayed ✅");

                        // 🔥 Apply Portfolio Modal Behaviors (From Portfolio.js)
                        syncPortfolioModalBehavior(newModal);

                    } else {
                        console.error("❌ Modal not found in portfolio page.");
                    }
                })
                .catch(error => console.error("❌ Error fetching modal:", error));
        });
    });
});

/**
 * ✅ Syncs behaviors from Portfolio.js to dynamically added modals
 */
function syncPortfolioModalBehavior(modal) {
    console.log("Syncing Portfolio Modal Behaviors...");

    // Handle navbar hiding when modal opens
    modal.addEventListener("show.bs.modal", function () {
        document.querySelector(".navbar").classList.add("d-none");
        document.body.classList.add("modal-open");
    });

    modal.addEventListener("hidden.bs.modal", function () {
        document.querySelector(".navbar").classList.remove("d-none");
        document.body.classList.remove("modal-open");
    });

    // Handle close button click
    modal.querySelector(".close-modal").addEventListener("click", function () {
        let bsModal = bootstrap.Modal.getInstance(modal);
        bsModal.hide();
    });

    // Handle mobile close button styling
    modal.addEventListener("shown.bs.modal", function () {
        if (window.innerWidth <= 768) {
            document.querySelectorAll(".close-modal").forEach(button => button.style.display = "block");
        }
    });

    modal.addEventListener("hidden.bs.modal", function () {
        if (window.innerWidth <= 768) {
            document.querySelectorAll(".close-modal").forEach(button => {
                button.disabled = false;
                button.style.pointerEvents = "auto";
            });
        }
    });

    // Enable scrolling inside modal
    let modalContent = modal.querySelector(".modal-content");
    if (modalContent) {
        modalContent.addEventListener("touchmove", function (e) {
            e.stopPropagation(); // Keeps scrolling inside the modal
        });
        modalContent.style.overflowY = "auto"; // Ensure modal can scroll
    }
}