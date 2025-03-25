document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded ✅");

    document.querySelectorAll(".main-link[data-modal-id]").forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            
            let modalId = this.getAttribute("data-modal-id");

            console.log(`Button Clicked: ${this.textContent}`);
            console.log(`Modal ID: ${modalId}`);
            
            // Check if modal already exists in the DOM
            let existingModal = document.getElementById(modalId);
            if (existingModal) {
                console.log(`Modal ${modalId} already exists. Showing existing modal.`);
                let existingModalInstance = new bootstrap.Modal(existingModal);
                existingModalInstance.show();
                return; // Stop fetching again
            }

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

                        // Append the modal directly to the <body>
                        document.body.insertAdjacentHTML("beforeend", modalContent.outerHTML);
                        
                        let newModal = document.getElementById(modalId);
                        let modalInstance = new bootstrap.Modal(newModal);
                        modalInstance.show();
                        console.log("Modal Displayed ✅");

                        // 🔥 Ensure modal is removed after closing
                        newModal.addEventListener("hidden.bs.modal", function () {
                            console.log(`Removing modal ${modalId} from DOM...`);
                            setTimeout(() => {
                                newModal.remove();
                                console.log(`Modal ${modalId} successfully removed ✅`);
                            }, 300);
                        }, { once: true });

                    } else {
                        console.error("❌ Modal not found in portfolio page.");
                    }
                })
                .catch(error => console.error("❌ Error fetching modal:", error));
        });
    });
});