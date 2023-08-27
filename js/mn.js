// btn up fade in or out
window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      $("#btnUp").fadeIn(1000);
    } else {
      $("#btnUp").fadeOut(1000);
    }
  });
  
  // to up page
  $("#btnUp").on("click", () => {
    $("html,body").animate({ scrollTop: "0px" }, 1000);
  });
  