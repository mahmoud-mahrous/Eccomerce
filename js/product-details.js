let mainImgDiv = document.getElementById("mainImgDiv");
let sliderImgDivs = document.querySelectorAll(".sliderImgDiv");
const imgsArr = [];

// product images slider
sliderImgDivs.forEach((element) => {
  element.addEventListener("click", () => {
    let currentUrl = window
      .getComputedStyle(element)
      .getPropertyValue("background-image");
    mainImgDiv.style.backgroundImage = `${currentUrl}`;
    console.log(currentUrl);
  });
});

// Turn off the default behavior of the up and down btns
document.getElementsByClassName("defult")[0].addEventListener("click", (e) => {
  e.preventDefault();
});
document.getElementsByClassName("defult")[1].addEventListener("click", (e) => {
  e.preventDefault();
});

// Get the query string part of the URL
const queryString = window.location.search;

// Create a new URLSearchParams object with the query string
const params = new URLSearchParams(queryString);

// Get parameter values using the get() method
const param1Value = params.get("id");

console.log(param1Value); // Output: value1

// Get Product details
let productDetails = {};
try {
  const response = await fetch(`http://localhost:3000/products/${param1Value}`);
  productDetails = await response.json();
  displayProduct(productDetails);
} catch (error) {
  console.log("error", error);
}

// display product
function displayProduct(product) {
  mainImgDiv.style.backgroundImage = `url(${product.image})`;
  document.getElementById("productName").innerHTML = product.name;
  document.getElementById("productPrice").innerHTML = product.currentPrice;
  let colorsList = ``;
  for (let i = 0; i < product.colors.length; i++) {
    if (i === 0) {
      colorsList += ` <li>
        <label>
          <input type="radio" name="color" checked value="${product.colors[i]}">
          <span class="swatch" style="background-color:${product.colors[i]}"></span>
        </label>
      </li>`;
    } else {
      colorsList += ` <li>
        <label>
          <input type="radio" name="color" value="${product.colors[i]}">
          <span class="swatch" style="background-color:${product.colors[i]}"></span>
        </label>
      </li>`;
    }
  }

  document.getElementById("colorsUl").innerHTML = colorsList;
}

// add to card function
function addToCard() {
  // create product object
  let productS = {
    id: productDetails.id,
    name: productDetails.name,
    currentPrice: productDetails.currentPrice,
    sale: productDetails.sale,
    oldPrice: productDetails.oldPrice,
    image: productDetails.image,
    number: document.getElementsByClassName("quantity")[0].value,
    color: document.querySelector('[name="color"][checked=""]').value,
    size: document.querySelector('[name="size"][checked=""]').value,
    category: productDetails.category,
  };
  console.log(productS);
  //   Handle Local Storege
  if (localStorage.getItem("myCart")) {
    let myCart = JSON.parse(localStorage.getItem("myCart"));
    myCart.push(productS);
    localStorage.setItem("myCart", JSON.stringify(myCart));
  } else {
    let myCart = [];
    myCart.push(productS);
    localStorage.setItem("myCart", JSON.stringify(myCart));
  }
}

// Turn off the default behavior of the form
document.getElementsByTagName("form")[0].addEventListener("submit", (e) => {
  e.preventDefault();
  addToCard();
});

// Get Color Value
function getColor() {
  let color = ``;
  let swatches = document.getElementsByClassName("swatch");

  let colorBtn = document.getElementsByName("color");
  console.log(colorBtn);
  for (let i = 0; i < swatches.length; i++) {
    swatches[i].addEventListener("click", (e) => {
      console.log(e);
      for (let j = 0; j < colorBtn.length; j++) {
        colorBtn[j].removeAttribute("checked");
      }
      console.log(
        swatches[i].previousElementSibling.setAttribute("checked", "")
      );
    });
  }
}
getColor();

//Get Size value
function getSize() {
  let sizeBtn = document.getElementsByClassName("size");

  let sizeSpan = document.getElementsByName("size");
  console.log(sizeSpan);
  for (let i = 0; i < sizeBtn.length; i++) {
    sizeBtn[i].addEventListener("click", (e) => {
      console.log(e);
      for (let j = 0; j < sizeSpan.length; j++) {
        sizeSpan[j].removeAttribute("checked");
      }
      console.log(
        sizeBtn[i].previousElementSibling.setAttribute("checked", "")
      );
    });
  }
}
getSize();
