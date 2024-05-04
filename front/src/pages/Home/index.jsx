/**
 * Página principal que muestra varios componentes relacionados con la página de inicio.
 * Contiene un banner, información sobre productos destacados, categorías de productos, y más.
 */
import Hero from "../../components/Hero/Hero"
import Categories from "../../components/Categories/Categories"
import Banner from "../../components/Banner/Banner"
import Info from "../../components/Info/Info"
import Bestsellers from "../../components/Bestsellers/Bestsellers"

const Home = () => {

    return (
        <>
            <Hero/>
            <Categories/>
            <Banner/>
            <Bestsellers/>
            <Info/>
            
        </>
    )
}

export default Home