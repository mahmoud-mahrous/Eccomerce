let allProducts = [];

async function getAllProducts() {
    try {
      const response = await fetch("http://localhost:3000/products");
      allProducts = await response.json();
      console.log(allProducts);
      return allProducts
    } catch (error) {
      console.log("error", error);
    }
  }


  export {
    getAllProducts,
  }