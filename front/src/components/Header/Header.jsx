import "./Header.css";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useProductContext } from "../../pages/Products/ProductContext";


/**
 * Componente Header
 * - Muestra la barra de navegación superior con el logo, menú y enlaces a las diferentes secciones
 *
 * Props:
 * - triggerFunction: Función que se activa al hacer clic en un elemento del menú
 */
const Header = () => {
  // Estado para controlar la apertura y cierre del menú
  const [isOpen, setIsOpen] = useState(false);

  // Referencia al componente para gestionar eventos fuera de él
  const componentRef = useRef(null);

  // Contexto del carrito de compras
  const { openCart } = useProductContext();

  // Función para abrir el carrito de compras
  const handleOpenCart = () => {
    openCart();
  };

  // Función para alternar la visibilidad del menú
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Efecto para cerrar el menú al hacer clic fuera de él
  useEffect(() => {
    if (isOpen) {
      const handleClickOutside = (event) => {
        if (
          componentRef.current &&
          !componentRef.current.contains(event.target)
        ) {
          toggleMenu();
        }
      };
      document.addEventListener("click", handleClickOutside, true);

      return () => {
        document.removeEventListener("click", handleClickOutside, true);
      };
    }
  }, [isOpen]);

  // Renderizado del componente
  return (
    <header className="Header" ref={componentRef}>
       {/* Menú de navegación */}
      <nav className={`Header-nav ${isOpen ? "" : "isVisible"}`}>
        <ul className="Header-nav-ul">
          <li className="Header-nav-li">
            <Link
              to="/home"
              onClick={() => {
                toggleMenu();
              }}
            >
              Home
            </Link>
          </li>
          <li className="Header-nav-li">
            <Link
              to="/products"
              onClick={() => {
                toggleMenu();
              }}
            >
              Products
            </Link>
          </li>
          <li className="Header-nav-li">
            <span onClick={() => {
            handleOpenCart();
          }}>
              Card
            </span>
          </li>
          <li className="Header-nav-li">
            <span>Wishlist</span>
          </li>
        </ul>
      </nav>
      {/* Icono menu hamburguesa */}
      <picture onClick={toggleMenu} className="Header-icon-container ">
        <img
          className="Header-menu-icon icon"
          src="src/assets/img/icons/menu.svg"
          alt="menu_icon"
        />
      </picture>

      <h1 className="Header-logo">ELA</h1>
      {/* Icono wishlist (no tiene funcionalidad) */}
      <div className="Header-icons-container">
        <picture className="Header-icon-container">
          <img
            className="Header-icon"
            src="src/assets/img/icons/favorite.svg"
            alt="menu_icon"
          />
        </picture>
         {/* Enlace a la pagina de login */}
        <Link to="/login" className="Header-icon-container">
          <picture className="Header-icon-container">
            <img
              className="Header-icon"
              src="src/assets/img/icons/account.svg"
              alt="menu_icon"
            />
          </picture>
        </Link>
        {/* Acción para abrir el carrito de compras */}
        <span
          className="Header-icon-container"
          onClick={() => {
            handleOpenCart();
          }}
        >
          <picture className="Header-icon-container">
            <img
              className="Header-icon"
              src="src/assets/img/icons/shopping_cart.svg"
              alt="menu_icon"
            />
          </picture>
        </span>
      </div>
    </header>
  );
};


// Definición de propTypes para las props del componente
Header.propTypes = {
  triggerFunction: PropTypes.func,
};

export default Header;
