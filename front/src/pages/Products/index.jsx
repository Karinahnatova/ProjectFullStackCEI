import { useState, useEffect } from "react";
import { easyFetch } from "../../helpers/utils.js";
import { Link } from "react-router-dom";
import "./index.css";
import Product from "../Product/index.jsx";
import { useNavigate, useSearchParams } from "react-router-dom"; // Importación de useHistory y useSearchParams para la navegación

/**
 * Componente de productos que muestra una lista de productos y permite filtrar por categorías.
 * Utiliza estados para almacenar los productos, el estado del lightbox y el título de la categoría.
 * Utiliza useEffect para cargar los productos cuando el componente se monta y cuando cambia la navegación.
 * Utiliza easyFetch para realizar solicitudes HTTP y toggleLightbox para controlar la apertura y cierre del lightbox.
 * También utiliza useHistory para la navegación y useSearchParams para obtener los parámetros de búsqueda de la URL.
 */

const Products = () => {
  const [products, setProducts] = useState([]); // Estado para almacenar los productos
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar si el lightbox está abierto
  const [lightboxProduct, setLightboxProduct] = useState(); // Estado para almacenar el producto que se muestra en el lightbox
  const [categoryTitle, setCategoryTitle] = useState("All The Products"); // Estado para almacenar el título de la categoría
  const [searchParams] = useSearchParams(); // Hook para obtener los parámetros de búsqueda de la URL
  const navigate = useNavigate();   // Función para la navegación

  // fetch a los productos
  const fetchProducts = async () => {
    try {
      const data = await easyFetch({
        url: "http://localhost:8080/API/v1/products",
      });
      setProducts(data);
      setCategoryTitle("All The Products");
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

   // Efecto para cargar los productos cuando el componente se monta y cuando cambia la navegación
  useEffect(() => {
    let searchParamObject = Object.fromEntries(searchParams);

    if (searchParamObject?.category) {
      filterProducts(searchParamObject?.category);
    } else {
      fetchProducts();
    }

    return () => {
      setLightboxProduct(undefined);
    };
  }, [navigate]);


  // Función para alternar el lightbox y mostrar o ocultar el producto seleccionado
  const toggleLightbox = (product) => {
    setLightboxProduct(product);
    setIsOpen(!isOpen);
  };

  // Función para filtrar los productos por categoría
  async function filterProducts(category) {
    const data = await easyFetch({
      url: "http://localhost:8080/API/v1/products",
    });
    const lc = category.toLowerCase();
    const filtered = data.filter((product) => product.category === lc);
    setProducts(filtered);
    setCategoryTitle(category);
  }

   // Renderizado condicional para mostrar el producto en el lightbox o la lista de productos
  if (lightboxProduct) {
    return (
      <Product product={lightboxProduct} toggleLightbox={toggleLightbox} />
    );
  } else {
    return (
      <div>
        {/* menu de navegacion de las categorias de los productos */}
        <div className="Products-categories">
          <ul className="Products-categories-ul">
            <li
              className="Products-categories-li"
              onClick={() => {
                filterProducts("Face");
              }}
            >
              Face
            </li>
            <li
              className="Products-categories-li"
              onClick={() => {
                filterProducts("Body");
              }}
            >
              Body
            </li>
            <li
              className="Products-categories-li"
              onClick={() => {
                filterProducts("Hair");
              }}
            >
              Hair
            </li>
            <li
              className="Products-categories-li"
              onClick={() => {
                filterProducts("Accesories");
              }}
            >
              Accessories
            </li>
            <li
              className="Products-categories-li"
              onClick={() => {
                fetchProducts();
              }}
            >
              All The Products
            </li>
          </ul>
        </div>
        <div className="Products">
          <div className="Products-title-container">
            <Link to="/home">
              <picture className="Lightbox-btn-arrow-back">
                <img
                  src="/src/assets/img/icons/arrow_back.svg"
                  alt="arrow_forward"
                />
              </picture>
            </Link>
            <h1 className="Products-h1">{categoryTitle}</h1>
          </div>

          <div className="Products-container">
            <div className="Products">
              {products &&
                products.map((product) => {
                  return (
                    <div
                      className="Product-div"
                      key={product.id}
                      onClick={() => {
                        toggleLightbox(product);
                      }}
                    >
                      <div className="Product-div-image">
                        <picture className="Product-picture">
                          <img className="Product-img" src={product.imageUrl} />
                        </picture>
                        <picture className="Product-like-icon">
                          <img
                            src="/src/assets/img/icons/favorite.svg"
                            alt="icon_heart"
                          />
                        </picture>
                        {product.discount === 20 && (
                          <div className="Product-discount">
                            -{product.discount}%
                          </div>
                        )}
                      </div>
                      <p className="Product-price">{product.price}€</p>
                      <p className="Product-name">{product.name}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Products;
