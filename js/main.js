/*----------------------------------------*/


if(localStorage.getItem("myCart")){
  var myCart = JSON.parse(localStorage.getItem('myCart'));
}else{
  var myCart = [];
}

// Fetch all products

let allProducts = [];

// Get All Product
async function getAllProducts() {
  try {
    const response = await fetch("http://localhost:3000/products");
    allProducts = await response.json();
    console.log(allProducts);
  } catch (error) {
    console.log("error", error);
  }
}

// Display Products
function displayProducts() {
  let container = ``;

  for (let i = 0; i < 5; i++) {
    container += `
    <div>
      <div class="item m-3">
        <div class="itemImg">
          <img value="${allProducts[i].image}" onclick="goToProductDetails(${allProducts[i].id})" src="${allProducts[i].image}" class="img-fluid image" alt="">
        </div>
        <div class="itemDetails">
          <div class="row p-3 justify-content-between ">
            <div>
              <h4 value="${allProducts[i].name}" class="name h5">${allProducts[i].name}</h4>
              <p  class="text-dark currentPrice">${allProducts[i].currentPrice}</p>
            </div>
            <div class="addBtn">
              <button id="addToCartBtn" class="btn btn-dark addToCartBtn" onclick="goToProductDetails(${allProducts[i].id})"><i class="fa-solid fa-cart-plus"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
  }
  document.getElementById("productsSlider").innerHTML = container;

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


// Handle Products 
async function handleProod() {
  await getAllProducts();
  displayProducts();
}

handleProod();

function goToProductDetails(pr)
{
  // Create a new URLSearchParams object
const params = new URLSearchParams();
params.append('id', pr);

// Get the current URL and append the parameters
const currentURL = window.location.href;
const newURL = `${currentURL}product-details.html?${params.toString()}`;

// Redirect to the new URL with parameters
window.location.href = newURL;

}



