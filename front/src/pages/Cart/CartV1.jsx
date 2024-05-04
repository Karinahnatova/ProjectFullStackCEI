import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  List,
  ListItem,
} from "@mui/material";
import { useProductContext } from "../Products/ProductContext"; // Contexto de productos para el carrito
import "./Cart.css";


/**
 * Componente CartDialog
 * - Muestra un diálogo que contiene los elementos del carrito de compras
 * - Permite eliminar productos del carrito
 * - Calcula y muestra el subtotal, costo de envío y total de la compra
 *
 * @returns {JSX.Element} Elemento JSX que representa el diálogo del carrito de compras
 */

const CartDialog = () => {
  // Importación de dependencias y contexto
  const {
    isCartOpen,
    cartProducts,
    closeCart,
    removeProductFromCart,
  } = useProductContext();

  // Precio de envío
  const shippingCost = 3;

  // Función para manejar la eliminación de un producto del carrito
  const handleRemoveProduct = (index) => {
    removeProductFromCart(index);
  };
  
  // Función para calcular el subtotal de la compra
  function getSubTotal() {
    if (cartProducts.length === 0) {
      return 0; // Devuelve 0 si no hay productos en el carrito
    }
  
    let subTotal = 0;
    cartProducts.forEach((element) => {
      if (element.discount) {
        subTotal += element.price - element.price * 0.2;
      } else {
        subTotal += element.price;
      }
    });
    return subTotal;
  }
  
  // Función para calcular el total de la compra, incluyendo el costo de envío
  function getTotal() {
    if (cartProducts.length === 0) {
      return 0; // Devuelve 0 si no hay productos en el carrito
    }
  
    let total = 0;
    cartProducts.forEach((element) => {
      if (element.discount) {
        total += element.price - element.price * 0.2;
      } else {
        total += element.price;
      }
    });
  
    if (total < 50) {
      return total + 3;
    }
    return total;
  }

  return (
    <div>
      <Dialog fullScreen open={isCartOpen} onClose={closeCart}>
        <DialogTitle>
          <Button onClick={closeCart}>
            <picture>
              <img
                src="src/assets/img/icons/arrow_back.svg"
                alt="icon_arrow_back"
              />
            </picture>
          </Button>{" "}
          <h2 className="Dialog-cart-title">Shopping Cart Items</h2>
        </DialogTitle>
        <div className="Dialog-container">
          <DialogContent>
            <div className="Dialog-cart-content">
              {cartProducts.length > 0 ? (
                <List>
                  {cartProducts.map((product, index) => (
                    <ListItem key={index}>
                      <div className="Dialog-cart-listitem">
                        <div>
                        <picture>
                          <img
                            className="Dialog-cart-img"
                            src={product.imageUrl}
                            alt="product_image"
                          />
                        </picture>
                        {product.discount === 20 && (
                          <div className="Dialog-cart-discount">
                            -{product.discount}%
                          </div>
                        )}

                        </div>
                        
                        <span className="Dialog-cart-name">{product.name}</span>
                        <span className="Dialog-cart-price">
                          {product.price}€
                          {product.discount === 20 && (
                          <p className="Dialog-cart-discount-message">The final discount will be applied in the summary</p>
                        )}
                        </span>
                        <Button
                          className="Dialog-cart-btn-remove"
                          onClick={() => handleRemoveProduct(index)}
                        >
                          <picture>
                            <img
                              src="src/assets/img/icons/delete.svg"
                              alt="icon_trashcan"
                            />
                          </picture>
                        </Button>
                      </div>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <p className="Dialog-cart-p-empty">No items in the cart</p>
              )}
            </div>
          </DialogContent>
          <div className="Cart-summary-container">
            <div className="Cart-summary">
              <h4 className="Cart-summary-h4">Summary</h4>
              <span className="Cart-summary-span">
                Subtotal: {getSubTotal()}€
              </span>
              <span className="Cart-summary-span">
                Shipping: {getTotal() > 50 ? "FREE" : `${shippingCost}€`}
              </span>
              <span className="Cart-summary-span Cart-summary-span-total">
                Total: {getTotal()}€
              </span>
            </div>
            <button className="Cart-summary-button">CHECKOUT</button>
            <p className="Cart-summary-p">Free shipping for orders over 50€!</p>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default CartDialog;
