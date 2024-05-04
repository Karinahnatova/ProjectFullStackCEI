import './Banner.css'

const Banner = () => {

    return (
        <div className='Banners'>
            {/* Frente del banner con mensajes de descuento */}
            <div className='Banner-front marquesina' >
                <span className='texto'>20%  SALE</span>
                <span className='texto'>20%  SALE</span>
                <span className='texto'>20%  SALE</span>
                <span className='texto'>20%  SALE</span>
                <span className='texto'>20%  SALE</span>
            </div>
            {/* Frente del banner con mensajes de la temporada */}
            <div className='Banner-back marquesina-2'>
                <span className='texto'>Spring Season</span>
                <span className='texto'>Spring Season</span>
                <span className='texto'>Spring Season</span>
                <span className='texto'>Spring Season</span>
                <span className='texto'>Spring Season</span>

            </div>
        </div>

    )
}

export default Banner




  