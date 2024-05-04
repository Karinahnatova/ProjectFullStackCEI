import { useState, useEffect } from "react";
import { easyFetch } from "../../helpers/utils.js"
import { Link } from "react-router-dom";
import './Bestsellers.css'
import Product from "../../pages/Product/index.jsx";

/**
 * Componente Bestsellers
 * - Muestra los productos más vendidos
 * - Incluye un enlace para ver todos los productos
 * - Carga los datos de los productos mediante una solicitud fetch
 * - Permite abrir un lightbox para ver más detalles de un producto
 */
function Bestsellers() {

  // Estado para almacenar los productos
  const [products, setProducts] = useState([]);
  // Estado para controlar si el lightbox está abierto o cerrado
  const [isOpen, setIsOpen] = useState(false);
  // Estado para almacenar el producto que se muestra en el lightbox
  const [lightboxProduct, setLightboxProduct] = useState();

  // Efecto para cargar los productos al montar el componente
  useEffect(()=> {
      fetchProducts();
  }, []);

  /**
   * Función para realizar una solicitud fetch y obtener los productos
   * - Maneja errores básicos
   */
  const fetchProducts = async () => {
    try {
      const data = await easyFetch({
        url: "http://localhost:8080/API/v1/specific-products",
      });
      setProducts(data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  /**
   * Función para abrir o cerrar el lightbox y establecer el producto que se muestra
   * @param {object} product - Producto que se mostrará en el lightbox
   */
  const toggleLightbox = (product) => {
    setLightboxProduct(product);
    setIsOpen(!isOpen);
  };

  // Renderizado condicional del componente
  if (lightboxProduct) {
    // Si hay un producto para mostrar en el lightbox, se renderiza el componente Product
    return (
      <Product product={lightboxProduct} toggleLightbox={toggleLightbox} />
    );
  } else {
    // Si no hay producto para mostrar en el lightbox, se renderiza el contenido de Bestsellers
    return (
      <div className="Bestsellers">
          {/* Título y mensaje */}
          <h1 className="Bestsellers-h1">Bestsellers</h1>
          <p className="Bestsellers-p">Spring Season Sale, -20% on Some Products</p>
          {/* Enlace para ver todos los productos */}
          <span className="Bestsellers-span-link"> 
              <p className="Bestsellers-span-link-p"><Link to="/products">View All The Products</Link> </p>
              <picture><img className="Bestsellers-img-arrow" src="/src/assets/img/icons/arrow_forward.svg" alt="icon_arrow_forward" loading="lazy" /></picture>
          </span>
          {/* Contenedor de los productos */}
          <div className="Products">
            {/* Mapeo de los productos */}
            {products &&
              products.map((product) => {
                return (
                  <div className="Product-div" key={product.id}>
                      <div className="Product-div-image" onClick={() => {
                      toggleLightbox(product);
                    }}>
                      {/* Imagen del producto */}
                      <picture className="Product-picture">
                       <img className="Product-img" src={product.imageUrl} alt="img_product" loading="lazy"/>
                      </picture>
                      {/* Icono de wishlist */}
                      <picture className="Product-like-icon">
                          <img src="/src/assets/img/icons/favorite.svg" alt="icon_heart" loading="lazy" />
                      </picture>
                      {/* Descuento */}
                      {product.discount === 20 && <div className="Product-discount">
                          -{product.discount}%
                      </div>}
                      
                      </div>
                    {/* Precio del producto */}
                    <p className="Product-price">{product.price}€</p>
                    {/* Nombre del producto */}
                    <p className="Product-name">{product.name}</p>
                  </div>
                );
              })}
          </div>
        </div>
      
    );
  }
}

export default Bestsellers