import './Info.css'
import { v4 as uuidv4 } from 'uuid'


/**
 * Componente Info
 * - Muestra la seccion de información rosa
 */
const Info = () => {
    // Datos de información
    const infoData = [
        {
            id: uuidv4(),
            iconSrc: "src/assets/img/icons/package.svg",
            altText: "package_icon",
            tittle: "Free Shipping",
            text: "For Shipping Orders Over 75€"
        },
        {
            id: uuidv4(),
            iconSrc: "src/assets/img/icons/credit_card.svg",
            altText: "credit_card_icon",
            tittle: "Secure Payment",
            text: "Pay With Multiple Credit Cards"
        },
        {
            id: uuidv4(),
            iconSrc: "src/assets/img/icons/spa.svg",
            tittle: "100% Quality Products",
            altText: "spa_flower_icon",
            text: "We Guarantee the quality of Our Products"
        },
        {
            id: uuidv4(),
            iconSrc: "src/assets/img/icons/support.svg",
            tittle: "Online Support",
            alt: "online_support_icon",
            text: "You Have Online Support 24h a day, 7 Days at Week"
        }
    ]
    
    // Renderizado del componente
    return(
        <div className='Info_section'>
            {/* Mapeo de datos de información de arriba */}
            {infoData.map((data) => {
                return (
                    <div className='Info' key={data.id}>
                         {/* Iconos */}
                        <picture className='Info-picture'>
                        <img className='Info-img' src={data.iconSrc} alt={data .altText} />
                        </picture>
                        {/* Título */}
                        <span className='Info-tittle'>{data.tittle}</span>
                        {/* Texto */}
                        <span className='Info-text'>{data.text}</span>
                    </div>

                )
                
                
            })}

        </div>
    )
}

export default Info