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

const navBarBtns = $("#navBarBtns");

if (localStorage.getItem("userInfo")) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (userInfo.rule === "admin") {
    navBarBtns.html(`
<a class="btn btn-outline-dark my-2 my-sm-0" href="dashboard.html" >Dashboard</a>
`);
  } else {
    navBarBtns.html(`  <a href="cart.html" class="btn btn-outline-dark mx-2 my-2 my-sm-0" type="submit"><i
    class="fa-solid fa-cart-shopping"></i></a>
<a class="btn btn-outline-dark my-2 my-sm-0" ><i class="fa-solid fa-user"></i></a>
`);
  }
} else {
  console.log("no user info");
  navBarBtns.html(` <a class="btn btn-outline-dark my-2 my-sm-0" href="login.html">Login</a>
    <a class="btn btn-outline-dark my-2 my-sm-0" href="register.html" >Register</a>`);
}
