import { getCartProductFromLS } from "./getCartProducts";
import { showToast } from "./showToast";
import { updateCartValue } from "./updateCartValue";

getCartProductFromLS();

export const addToCart = (event, id, stock) => {
  let cartProducts = getCartProductFromLS();

  const productElement = document.querySelector(`#card${id}`);
  let quantity = parseInt(productElement.querySelector(".productQuantity").innerText, 10);
  let price = parseFloat(productElement.querySelector(".productPrice").innerText.replace("₹", ""));
  const productName = productElement.querySelector(".productName").innerText; // Extract product name

  const existingProduct = cartProducts.find((product) => product.id === id);

  if (existingProduct) {
    if (quantity > 1) {
      quantity += existingProduct.quantity;
      price *= quantity;
      cartProducts = cartProducts.map((product) => 
        product.id === id ? { ...product, quantity, price } : product
      ); 

      localStorage.setItem("cartProductLS", JSON.stringify(cartProducts));
      showToast("add", productName); 
    }
    return false;
  }

  cartProducts.push({ id, quantity, price: price * quantity });
  localStorage.setItem("cartProductLS", JSON.stringify(cartProducts));

  updateCartValue(cartProducts);
  showToast("add", productName); 
};
