$(document).ready(function () {
  
  $("#portfolio-button-container button").on("click", function () {
    console.log("Button clicked:", $(this).text()); // Debugging step 1
  });

  // Close any open modals before opening a new one
  $(".portfolio-modal").on("show.bs.modal", function () {
    $(".portfolio-modal").not(this).modal("hide");
  });

  // Maintain functionality for closing modals via the close button
  $(document).on("click", ".close-modal", function () {
    $(".portfolio-modal").modal("hide");
  });

  function isMobile() {
    return window.innerWidth <= 768; // Adjust this value for your breakpoint
  }

  $(".portfolio-modal").on("hidden.bs.modal", function () {
    if (isMobile()) {
      $(".close-modal").prop("disabled", false);
      $(".close-modal").css("pointer-events", "auto");
    }
  });

  $(".portfolio-modal").on("shown.bs.modal", function () {
    if (isMobile()) {
      $(".close-modal").show();
    }
  });

  // Portfolio filtering functionality
  var all_portfolio_items = $("#portfolio-items .column");

  $("#portfolio-button-container button").click(function () {
    var category = $(this).data("portfolio-section");
    console.log("Show " + category);

    // Remove 'active' class from all buttons
    $("#portfolio-button-container button").removeClass("active");
    console.log("Removed active from all buttons"); // Debugging

    // Add 'active' class to the clicked button
    $(this).addClass("active");
    console.log("Added active to", $(this).text()); // Debugging

    if (category === "all") {
      all_portfolio_items.addClass("show");
    } else {
      all_portfolio_items.removeClass("show");
      all_portfolio_items.filter("." + category).addClass("show");
    }
  });
});

!function(a) {
  "use strict";
  
  // Smooth scrolling for internal links
  a('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
          var o = a(this.hash);
          if ((o = o.length ? o : a("[name=" + this.hash.slice(1) + "]")).length)
              return a("html, body").animate({
                  scrollTop: o.offset().top - 54
              }, 1e3, "easeInOutExpo"),
              !1;
      }
  });

  // Collapse mobile nav when clicking a link
  a(".js-scroll-trigger").click(function() {
      a(".navbar-collapse").collapse("hide");
  });

  // Activate scrollspy
  a("body").scrollspy({
      target: "#mainNav",
      offset: 56
  });

  // Navbar shrink function
  var o = function() {
      a("#mainNav").offset().top > 100 ? a("#mainNav").addClass("navbar-shrink") : a("#mainNav").removeClass("navbar-shrink");
  };
  o();
  a(window).scroll(o);

  // Handle modals: Hide navbar when modal is open
  a(".portfolio-modal").on("show.bs.modal", function() {
      a(".navbar").addClass("d-none");
      a("body").addClass("modal-open"); // Prevent background scroll
  });

  a(".portfolio-modal").on("hidden.bs.modal", function() {
      a(".navbar").removeClass("d-none");
      a("body").removeClass("modal-open"); // Restore background scroll
  });

  // Enable scrolling inside modal
  a(".portfolio-modal .modal-content").on("touchmove", function(e) {
    e.stopPropagation(); // Keeps scrolling inside the modal
  }).css("overflow-y", "auto"); // Ensure the modal can scroll

}(jQuery);