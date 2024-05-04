import useNavigateSearch from "../../hooks/useNavigationSearch";
import "./Categories.css";
import { v4 as uuidv4 } from "uuid";

/**
 * Componente Categories
 * - Muestra las categorías de productos disponibles
 * - Permite navegar a la página de productos filtrando por categoría
 */
const Categories = () => {
  
  // Definición de las categorías de productos con su nombre, imagen y texto alternativo
  const imgCategories = [
    {
      id: uuidv4(),
      name: "Body",
      imgUrl: "src/assets/img/categories/body.png",
      altText: "imgage_body_cream",
    },
    {
      id: uuidv4(),
      name: "Face",
      imgUrl: "src/assets/img/categories/face.jpg",
      altText: "imgage_face_cream",
    },
    {
      id: uuidv4(),
      name: "Hair",
      imgUrl: "src/assets/img/categories/hair.jpg",
      altText: "imgage_hair_cream",
    },
    {
      id: uuidv4(),
      name: "Accesories",
      imgUrl: "src/assets/img/categories/accesories.jpg",
      altText: "imgage_accesories",
    },
    {
      id: uuidv4(),
      name: "All the products",
      imgUrl: "src/assets/img/categories/all_the_products.jpg",
      altText: "imgage_products",
    },
  ];

  // Hook para navegar y buscar en la URL
  const navigateSearch = useNavigateSearch();

  /**
   * Función para manejar el clic en una categoría
   * @param {string} category - Nombre de la categoría seleccionada
   */
  const handleCategoryClick = (category) => {
    // Si se hace clic en "All the products", se navega a la página de productos sin filtrar
    if (category === "All the products") {
      navigateSearch("/products");
    } else {
      // Si se hace clic en una categoría específica, se navega a la página de productos filtrando por esa categoría
      navigateSearch("/products", {
        category: category,
      });
    }
  };

  // Renderización del componente
  return (
    <div className="Categories-container">
      {/* Título y subtítulo */}
      <h1 className="Categories-tittle-h1">Shop By Categories</h1>
      <p className="Categories-tittle-p">Illuminate Your Beauty Journey</p>
      {/* Contenedor de categorías */}
      <div className="Categories">
        {/* Mapeo de las categorías */}
        {imgCategories.map((category) => {
          return (
            <div
              className="Categories-div"
              key={category.id}
              onClick={() => handleCategoryClick(category.name)}
            >
              {/* Imagen de la categoría */}
              <picture className="Category-picture">
                <img
                  className="Categories-img"
                  src={category.imgUrl}
                  alt={category.altText}
                />
              </picture>
              {/* Nombre de la categoría */}
              <p className="Category-name">{category.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;