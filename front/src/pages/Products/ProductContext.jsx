import { createContext, useContext, useState } from "react"; // Importación de createContext, useContext y useState para el contexto de productos
import PropTypes from "prop-types"; // Importación de PropTypes para la validación de datos

/**
 * Contexto y proveedor de productos para gestionar el estado global de los productos y el carrito.
 * Utiliza createContext, useContext y useState para crear y utilizar el contexto.
 * El proveedor envuelve la aplicación y proporciona los estados y funciones necesarios para gestionar los productos y el carrito.
 */

// Creación del contexto de productos
const ProductContext = createContext();

// Hook personalizado para utilizar el contexto de productos
export const useProductContext = () => useContext(ProductContext);

// Proveedor de productos que proporciona el estado global de los productos y el carrito
export const ProductProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]); // Estado para almacenar los productos en el carrito
  const [isCartOpen, setIsCartOpen] = useState(false); // Estado para controlar si el carrito está abierto
 
    // Función para abrir el carrito
  const openCart = () => {
    setIsCartOpen(true);
  };

  // Función para cerrar el carrito
  const closeCart = () => {
    setIsCartOpen(false);
  };

   // Función para agregar un producto al carrito
  const addToCart = (product) => {
    setCartProducts([...cartProducts, product]);
  };

   // Función para eliminar un producto del carrito
  const removeProductFromCart = (index) => {
    const updatedCart = [...cartProducts];
    updatedCart.splice(index, 1);
    setCartProducts(updatedCart);
  };

  // Devuelve el proveedor del contexto de productos con los valores proporcionados
  return (
    <ProductContext.Provider
      value={{ cartProducts, isCartOpen, openCart, closeCart, addToCart, removeProductFromCart }}
    >
      {children} {/* Renderiza los componentes secundarios envueltos por el proveedor */}
    </ProductContext.Provider>
  );
};

// Validación de los tipos de datos de los props del proveedor
ProductProvider.propTypes = {
  children: PropTypes.node.isRequired, // el children debe ser un nodo de React
};
