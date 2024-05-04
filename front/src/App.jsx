import './App.css'

import { Route, Routes} from 'react-router-dom'

//Rutas de páginas
import Layout from './pages/Layout'
import Home from './pages/Home'
import Products from './pages/Products'
import Login from './pages/Login'




function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/products/:category" element={<Products/>}/>
          <Route path="/login" element={<Login/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App


