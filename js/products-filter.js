$(function () {
  let allProducts = [];
  let filteredProducts = [];
  // Function to handle accordion behavior
  function accordion(section, heading, list) {
    $(section).each(function () {
      const $that = $(this); // Cache the current section
      const $list = $that.find(list); // Find the list within the section

      $that.find(heading).on("click", () => {
        console.log($that.find(heading)); // Log the heading
        $that.find(heading).toggleClass("plus"); // Toggle the "plus" class
        $list.toggle({ height: "0" }, 250); // Toggle the list visibility
      });
    });
  }

  // Function to update the filtered products
  function updateProducts() {
    const selectedCategories = getSelectedCheckboxes("category");
    const selectedColors = getSelectedCheckboxes("color");
    const selectedSizes = getSelectedCheckboxes("size");
    const selectedBrands = getSelectedCheckboxes("brand");
    console.log({ selectedColors, selectedSizes, selectedBrands, selectedCategories });

    filteredProducts = allProducts.filter((product) => {
      const categoryMatches =
        selectedCategories.length === 0 ||
        selectedCategories.some((category) => product.category === category);
        console.log(categoryMatches);
      const colorMatches =
        selectedColors.length === 0 ||
        selectedColors.some((color) => product.colors.includes(color));
      const sizeMatches =
        selectedSizes.length === 0 ||
        selectedSizes.some((size) => product.sizes.includes(size));
      const brandsMatches =
        selectedBrands.length === 0 ||
        selectedBrands.some((brand) => product.brand.includes(brand));

      return colorMatches && sizeMatches && brandsMatches && categoryMatches;
    });
    console.log(filteredProducts);

    displayProducts();
  }

  // Function to get selected checkboxes of a specific category
  function getSelectedCheckboxes(category) {
    const selectedCheckboxes = [];
    const $checkboxes = $(`input[data-type="${category}"]:checked`);
    $checkboxes.each(function () {
      selectedCheckboxes.push($(this).val());
    });
    return selectedCheckboxes;
  }

  // Function to fetch all products
  async function getAllProducts() {
    try {
      const response = await fetch("http://localhost:3000/products");
      allProducts = await response.json();
      console.log(allProducts);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  }

  // Function to display filtered products in the UI
  function displayProducts() {
    let container = "";
    for (const product of filteredProducts) {
      container += `
      <div class="col-md-4">
      <div class=" m-3 product" style="display: none;">
        <div class="productImg">
          <img value="${product.image}" data-id="${product.id}" src="${product.image}" class="img-fluid" alt="">
        </div>
        <div class="productDetails">
          <div class="row p-3 justify-content-between ">
            <div>
              <h4 value="${product.name}" class="name h5">${product.name}</h4>
              <p  class="text-dark currentPrice">$55</p>
            </div>
            <div class="addBtn">
              <button id="addToCartBtn" class="btn btn-dark addToCartBtn" ><i class="fa-solid fa-cart-plus"></i></button>
            </div>
          </div>
        </div>
      </div>
    </div>
      `;
    }
    $("#filtered").html(container);

    // Use jQuery's fadeIn to animate the product elements
    $(".product").each(function (index) {
      const $product = $(this);
      $product.delay(index * 400).fadeIn(400); // Adjust the duration and delay as needed
    });
  }

  // Function to navigate to product details
  function goToProductDetails(productId) {
    const params = new URLSearchParams();
    params.append("id", productId);
    const currentURL = window.location.host;
    const newURL = `http://${currentURL}/product-details.html?${params.toString()}`;
    console.log(newURL);
    window.location.assign(newURL);
  }

  // Event listeners
  accordion(
    ".filter-item",
    ".filter-item-inner-heading",
    ".filter-attribute-list"
  );
  getAllProducts().then(() => {
    updateProducts();
    displayProducts();
  });

  // update filtered products when change checkboxes check
  $(".filter-attribute-checkbox").on("change", updateProducts); 


  $("#filtered").on("click", ".productImg img", function () {
    const productId = $(this).data("id");
    goToProductDetails(productId);
  });
});
