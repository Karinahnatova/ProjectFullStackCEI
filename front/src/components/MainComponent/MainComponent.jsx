import Product from "../../pages/Product";
import Cart from "../../pages/Cart/Cart";
import { useState } from "react";
import PropTypes from "prop-types";

/**
 * Componente MainComponent
 * - Contiene la vista principal que muestra un producto y el carrito de compras
 */

const MainComponent = ({ tuProducto, toggleLightbox }) => {

   // Estado para almacenar los elementos del carrito
  const [cartItems, setCartItems] = useState([]);
  
  // Función para enviar datos al componente padre
  const sendDataToParent = (data) => {
    setCartItems((prevState) => ({
      // Agregar el nuevo elemento al array de elementos del carrito
      myArray: [...prevState, data],
    }));
  };

  return (
    <div>
       {/* Componente Product */}
      <Product
        product={tuProducto}
        toggleLightbox={toggleLightbox}
        sendDataToParent={sendDataToParent}
      />
      
      {/* Componente Cart */}
      <Cart cartItems={cartItems} />
    </div>
  );
};


// Propiedades de MainComponent
MainComponent.propTypes = {
  tuProducto: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    discount: PropTypes.number,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  toggleLightbox: PropTypes.func.isRequired,
  sendDataToParent: PropTypes.func.isRequired,
};

export default MainComponent;
