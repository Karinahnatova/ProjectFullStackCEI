import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import CartDialog from "./Cart/CartV1";
import { ProductProvider } from "../pages/Products/ProductContext";

/**
 * Componente de diseño que define la estructura general de la aplicación.
 * Utiliza React Router para enrutar los componentes secundarios.
 * Se encuentra el encabezado, el contenido principal renderizado por React Router, el pie de página y el diálogo del carrito.
 * Utiliza el proveedor de productos para proporcionar el contexto de productos a los componentes secundarios.
 */

function Layout() {
  return (
    <>
    {/* Proveedor de productos que envuelve la aplicación para proporcionar el contexto de productos */}
      <ProductProvider>
        <Header />
        {/* Contenedor principal del contenido de la aplicación */}
        <div className="content">
          <Outlet />
          {/* el outlet renderiza el child que provenga del router, que las rtas hijos se cargan dentro de la plantilla del layout */}
        </div>
        <Footer />
        {/* Componente del diálogo del carrito */}
        <CartDialog />
      </ProductProvider>
    </>
  );
}

export default Layout;
