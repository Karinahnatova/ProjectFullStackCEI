import './Hero.css' 
import { v4 as uuidv4 } from 'uuid'


/**
 * Componente Hero
 * - Muestra una imagen de fondo y texto descriptivo
 */
const Hero = () => {

    // Datos de la imagen y el texto
    const {image, text} = {

        image: {
            id: uuidv4(),
            imgUrl: "src/assets/img/hero/hero3.jpg",
            imgUrlMobile: "src/assets/img/hero/hair_coconut_conditioner.jpg",
            altText: "imagen_modelo_con_producto",
        },
        text: {
            id: uuidv4(),
            text1: "New Collection",
            text2: "Transfrom With ELA: Where Beauty Begins.",
            text3: "Indulge in the enchantment of nature with Élixir de la Nature, our exquisite line of French beauty products. Crafted to nourish and revitalize your skin, each drop of our elixir blends carefully selected natural ingredients to reveal your inner radiance."
        }
    }
        
    // Renderizado del componente
    return (

        <div className="Hero">
            {/* Contenedor de imagen */}
            <picture className='Hero-img-container'>
                <img className='Hero-img' src={image.imgUrl} alt={image.altText} />
                <img className='Hero-img-mobile' src={image.imgUrlMobile} alt={image.altText} />
            </picture>
            {/* Texto publicitario */}
            <div className="Hero-text">
                <h4 className="Hero-text-h4">{text.text1}</h4>
                <h1 className="Hero-text-h1">{text.text2}</h1>
                <p className="Hero-text-p">{text.text3}</p>
            </div>
            
        </div>
    )
    
}

export default Hero