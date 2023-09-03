if (localStorage.getItem("myCart")) {
  var allCartitems = JSON.parse(localStorage.getItem("myCart"));
} else {
  var allCartitems = [];
}

// display cart items
function displayCartItems() {
  let container = ``;

  for (let i = 0; i < allCartitems.length; i++) {
    container += `
      <div class="row">
          <div class="col-lg-3 col-md-12 mb-4 mb-lg-0">
              <div class="bg-image hover-overlay hover-zoom ripple rounded"
                  data-mdb-ripple-color="light">
                  <img class="cartimg img-fluid" src="${allCartitems[i].image}"
                      class="w-100 " alt="${allCartitems[i].name}" />
                  <a href="#!">
                      <div class="mask" style="background-color: rgba(251, 251, 251, 0.2)"></div>
                  </a>
              </div>
          </div>

          <div class="col-lg-5 col-md-6 mb-4 mb-lg-0">
              <p class="cartName"><strong>${allCartitems[i].name}</strong></p>
              <p>Color: ${allCartitems[i].color}</p>
              <p>Size: M</p>
              <button type="button" class="btn btn-dark btn-sm me-1 mb-2 remove"
                  data-mdb-toggle="tooltip" data-index="${i}" title="Remove item">
                  <i class="fas fa-trash"></i>
              </button>
              <button type="button" class="btn btn-danger btn-sm mb-2" data-mdb-toggle="tooltip"
                  title="Move to the wish list">
                  <i class="fas fa-heart"></i>
              </button>
              
          </div>

          <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
              <div class="d-flex mb-4" style="max-width: 300px">
                  <button class="btn btn-dark px-3 me-2"
                      onclick="this.parentNode.querySelector('input[type=number]').stepDown()">
                      <i class="fas fa-minus"></i>
                  </button>

                  <div class="form-outline mx-2">
                      <input id="form1" min="1" name="quantity" value="${allCartitems[i].number}" type="number"
                          class="form-control quantity text-center" />
                  </div>

                  <button class="btn btn-dark px-3 ms-2"
                      onclick="this.parentNode.querySelector('input[type=number]').stepUp()">
                      <i class="fas fa-plus"></i>
                  </button>
              </div>

              <p class="text-start text-md-center">
                  <strong class="currentPrice">${allCartitems[i].currentPrice}</strong>
              </p>
          </div>
      </div>

      <hr class="my-4" />
      
`;
  }
  document.getElementById("cardBody").innerHTML = container;
  //   check if cart is empty or not to show btn or no item H5
  if (allCartitems.length > 0) {
    let btnToCheck = document.createElement("button");
    btnToCheck.innerHTML = "click me";
    btnToCheck.classList = "btn btn-dark w-100 p-2 ";
    btnToCheck.setAttribute("id", "btnToCheck");
    document.getElementById("cardBody").appendChild(btnToCheck);
    btnToCheck.addEventListener("click", () => {

      var productS = [];
      for (let i = 0; i < allCartitems.length; i++) {
        let cartItem = {
          name: document.getElementsByClassName("cartName")[i].textContent,
          currentPrice:
            document.getElementsByClassName("currentPrice")[i].textContent,
          image: document
            .getElementsByClassName("cartimg")
            [i].getAttribute("src"),
          number: document.getElementsByClassName("quantity")[i].value,
        };
        productS.push(cartItem);
        localStorage.setItem("myCart", JSON.stringify(productS));
      }
      postToChekOut(productS)
      // window.location.href = `http://${window.location.host}`
    });
  } else {
    document.getElementById(
      "cardBody"
    ).innerHTML += `<h5 style='text-align:center'>Your Cart is Empty!</h5>`;
  }
}
displayCartItems();


// add eventListener to delete item button
document.getElementById("cardBody").addEventListener("click", (event) => {
  if (event.target.classList.contains("remove")) {
    const index = parseInt(event.target.getAttribute("data-index"));
    removeItemFromCart(index);
  }
});

// delete item from cart
function removeItemFromCart(index) {
  console.log(allCartitems);
  allCartitems.splice(index, 1);
  localStorage.setItem("myCart", JSON.stringify(allCartitems));
  displayCartItems();
}

// Post to checkOut
function postToChekOut(productS) {
  fetch("http://localhost:3000/checkOut", {
    method: "POST",
    headers: {
      accept: "application.json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productS),
  })
    .then((res) => res.json())
    .then((res) => console.log(res));
}
