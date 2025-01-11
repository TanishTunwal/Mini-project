import { getCartProductFromLS } from "./getCartProducts";
import { showToast } from "./showToast";
import { updateCartProductTotal } from "./updateCartProductTotal";
import { updateCartValue } from "./updateCartValue";

export const removeProdFromCart = (id) => {
  let cartProducts = getCartProductFromLS();
  const productElement = document.querySelector(`#card${id}`);
  const productName = productElement.querySelector(".productName").innerText;

  cartProducts = cartProducts.filter((curProd) => curProd.id !== id);

  localStorage.setItem("cartProductLS", JSON.stringify(cartProducts));

  let removeDiv = document.getElementById(`card${id}`);
  if (removeDiv) {
    removeDiv.remove();
    showToast("delete", productName);
  }
  updateCartProductTotal();
  updateCartValue(cartProducts);
};
