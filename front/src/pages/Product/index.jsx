import "./index.css";
import { useState } from "react";
import PropTypes from "prop-types"; // Importación de PropTypes para verificar las propiedades del componente
import { useProductContext } from "../Products/ProductContext"; // Contexto del producto para agregarlo al carrito

/**
 * Componente de producto que muestra información detallada sobre un producto y permite agregarlo al carrito.
 * Utiliza estados para controlar la cantidad de productos seleccionados y el contexto del producto para agregarlo al carrito.
 * Además, utiliza PropTypes para verificar la forma de los datos del producto y las funciones de manejo.
 */


const Product = ({ product, toggleLightbox }) => {
  const [count, setCount] = useState(0);  // Estado para almacenar la cantidad de productos seleccionados
  const { addToCart } = useProductContext(); // Función del contexto del producto para agregar productos al carrito


   // Función para incrementar la cantidad de productos seleccionados
  const incrementCounter = () => {
    setCount(count + 1);
  };

    // Función para decrementar la cantidad de productos seleccionados
  const decrementCounter = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div className="Lightbox">
      <div className="Lightbox-tittle">
        <picture
          className="Lightbox-btn-arrow-back"
          onClick={() => {
            toggleLightbox();
          }}
        >
          <img src="/src/assets/img/icons/arrow_back.svg" alt="arrow_forward" />
        </picture>
      </div>

      <div className="Lighthbox-product-info">
        <div className="Lightbox-div-img">
          <picture className="Lightbox-img">
            <img src={product.imageUrl} alt="imagen_producto" />
          </picture>
          {product.discount === 20 && (
            <div className="Product-discount">-{product.discount}%</div>
          )}
        </div>

        <div className="Lightbox-product-text">
          <h4 className="Lightbox-h4">{product.name}</h4>
          <div className="Div-Product-info">
            <span className="Span-Product-price">{product.price}€</span>
            <div className="Div-Product-quantity">
              <button
                className="Button-less btn-quant"
                onClick={decrementCounter}
              >
                -
              </button>
              <span className="Span-quant-number count">{count}</span>
              <button
                className="Button-more btn-quant"
                onClick={incrementCounter}
              >
                +
              </button>
            </div>
          </div>
          <div className="Div-Product-despricption">
            <p>{product.description}</p>
          </div>
          <div className="Lightbox-div-button">
            <button
              className="Lightbox-button-add-to-cart"
              onClick={() => {
                addToCart(product);
                toggleLightbox();
              }}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Propiedades para el componente de producto
Product.propTypes = {
  product: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    discount: PropTypes.number,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  toggleLightbox: PropTypes.func.isRequired,
  sendDataToParent: PropTypes.func.isRequired,
};

export default Product;
