
 // Function to get the ID of clicked product and send it with the URL.
 function goToProductDetails(productId) {
  const params = new URLSearchParams();
  params.append("id", productId);

  const currentURL = window.location.href;
  const newURL = `${currentURL}product-details.html?${params.toString()}`;
  window.location.href = newURL;
}

// Wrap your code in a self-executing anonymous function to prevent polluting the global scope.
(function () {
  // Use 'const' for variables that won't be reassigned.
  const myCart = localStorage.getItem("myCart") ? JSON.parse(localStorage.getItem("myCart")) : [];
  const productContainer = document.getElementById("productsSlider");

  // Use async/await to fetch data.
  async function getAllProducts() {
    try {
      const response = await fetch("http://localhost:3000/products");
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  }

  async function displayProducts() {
    const allProducts = await getAllProducts();
    let container = "";

    allProducts.slice(0, 5).forEach((product) => {
      container += `
        <div>
          <div class="item m-3">
            <div class="itemImg">
              <img value="${product.image}" onclick="goToProductDetails(${product.id})" src="${product.image}" class="img-fluid image" alt="">
            </div>
            <div class="itemDetails">
              <div class="row p-3 justify-content-between">
                <div>
                  <h4 value="${product.name}" class="name h5">${product.name}</h4>
                  <p class="text-dark currentPrice">${product.currentPrice}</p>
                </div>
                <div class="addBtn">
                  <button class="btn btn-dark addToCartBtn" onclick="goToProductDetails(${product.id})"><i class="fa-solid fa-cart-plus"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    productContainer.innerHTML = container;

    // Initialize the slick slider once the content is loaded.
    $(".multiple-items").slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      lazyLoad: "ondemand",
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
      prevArrow: $(".prev"),
      nextArrow: $(".next"),
    });
  }

 
  // Wait for the DOM to be ready before executing the code.
  $(document).ready(function () {
    // Fire the function to display products.
    displayProducts();

    // Hide the loading element.
    $("#load").fadeOut(1000);
  });
})();
