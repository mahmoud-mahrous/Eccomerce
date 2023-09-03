$(async function() {
  const mainImgDiv = document.querySelector("#mainImgDiv");
  const sliderImgDivs = document.querySelectorAll(".sliderImgDiv");

  // Product images slider
  sliderImgDivs.forEach(element => {
    element.addEventListener("click", () => {
      const currentUrl = window.getComputedStyle(element).getPropertyValue("background-image");
      mainImgDiv.style.backgroundImage = currentUrl;
      console.log(currentUrl);
    });
  });

  // Turn off the default behavior of the up and down btns
  document.querySelectorAll(".defult").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
    });
  });

  // Get the query string part of the URL
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const productId = params.get("id");
  console.log(productId);

  // Get Product details
  let productDetails = {};
  try {
    const response = await fetch(`http://localhost:3000/products/${productId}`);
    productDetails = await response.json();
    displayProduct(productDetails);
  } catch (error) {
    console.error("Error:", error);
  }

  // Display product
  function displayProduct(product) {
    mainImgDiv.style.backgroundImage = `url(${product.image})`;
    document.getElementById("productName").innerHTML = product.name;
    document.getElementById("productPrice").innerHTML = product.currentPrice;

    const colorsList = product.colors.map((color, index) => {
      const checked = index === 0 ? 'checked' : '';
      return `
        <li>
          <label>
            <input type="radio" name="color" ${checked} value="${color}">
            <span class="swatch" style="background-color:${color}"></span>
          </label>
        </li>
      `;
    }).join('');

    document.getElementById("colorsUl").innerHTML = colorsList;
  }

  // Add to cart function
  function addToCart() {
    const selectedColor = document.querySelector('[name="color"]:checked').value;
    const selectedSize = document.querySelector('[name="size"]:checked').value;

    const productS = {
      id: productDetails.id,
      name: productDetails.name,
      currentPrice: productDetails.currentPrice,
      sale: productDetails.sale,
      oldPrice: productDetails.oldPrice,
      image: productDetails.image,
      number: document.querySelector(".quantity").value,
      color: selectedColor,
      size: selectedSize,
      category: productDetails.category,
    };

    console.log(productS);

    // Handle Local Storage
    const myCart = localStorage.getItem("myCart") ? JSON.parse(localStorage.getItem("myCart")) : [];
    myCart.push(productS);
    localStorage.setItem("myCart", JSON.stringify(myCart));
  }

  // Turn off the default behavior of the form
  document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    addToCart();
  });

  // Get Color Value
  function getColor() {
    const swatches = document.querySelectorAll(".swatch");
    const colorBtns = document.querySelectorAll('[name="color"]');

    swatches.forEach((swatch, index) => {
      swatch.addEventListener("click", () => {
        colorBtns.forEach(btn => btn.removeAttribute("checked"));
        colorBtns[index].setAttribute("checked", "");
      });
    });
  }
  // Fire the function
  getColor();

  // Get Size value
  function getSize() {
    const sizeBtns = document.querySelectorAll(".size");
    const sizeSpan = document.querySelectorAll('[name="size"]');

    sizeBtns.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        sizeSpan.forEach(span => span.removeAttribute("checked"));
        sizeSpan[index].setAttribute("checked", "");
      });
    });
  }
  // Fire the function
  getSize();

  $("#load").fadeOut(1000);
});
