import { Link } from 'react-router-dom'
import './Footer.css'
import { v4 as uuidv4 } from 'uuid'




/**
 * Componente Footer
 * - Muestra el pie de página con el logo, menú y enlaces a redes sociales
 */
const Footer = () => {
    // Definición del logo, menú y iconos de redes sociales
    const { logo, menu, icons } = {
      logo: {
        id: uuidv4(),
        name: "ELA"
      },
      menu: [
        {
          id: uuidv4(),
          text: "Home",
          link: "/home",
        },
        {
          id: uuidv4(),
          text: "Products",
          link: "/products",
        },
        {
          id: uuidv4(),
          text: "Account",
          link: "/login",
        }
      ],
      icons: [
        {
          id: uuidv4(),
          imgSrc: "src/assets/img/icons/instagram.svg",
          altText: "instagram_icon"
        },
        {
          id: uuidv4(),
          imgSrc: "src/assets/img/icons/pinterest.svg",
          altText: "pinterest_icon"
        },
        {
          id: uuidv4(),
          imgSrc: "src/assets/img/icons/twitter.svg",
          altText: "twitter_icon"
        },
        {
          id: uuidv4(),
          imgSrc: "src/assets/img/icons/facebook.svg",
          altText: "facebook_icon"
        },
      ]
    };
  
    // Renderizado del componente
    return (
      <footer className='Footer'>
        {/* Logo */}
        <h1 className='Footer-logo-h1'>{logo.name}</h1>
        {/* Menú */}
        <ul className='Footer-menu-ul'>
          {/* Mapeo del menú */}
          {menu.map((data) => {
            return (
              <li className='Footer-menu-li' key={data.id}>
                {/* Enlace del menú */}
                <Link to={data.link}>{data.text}</Link>
              </li>
            );
          })}
        </ul>
        {/* Iconos de redes sociales */}
        <div className='Footer-icons'>
          {/* Mapeo de los iconos */}
          {icons.map((data) => {
            return (
              <picture className='Footer-picture' key={data.id}>
                {/* Imagen del icono */}
                <img className='Footer-ico-img' src={data.imgSrc} alt={data.altText} />
              </picture>
            );
          })}
        </div>
      </footer>
    );
  };
  
  export default Footer;