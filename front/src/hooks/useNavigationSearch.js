/**
 * Hook useNavigateSearch
 * - Personaliza la navegación para agregar parámetros de búsqueda a la URL
 * - Utiliza la función useNavigate de react-router-dom para la navegación
 * 
 * @returns {function} Función personalizada para la navegación con parámetros de búsqueda
 */

import { useNavigate, createSearchParams } from "react-router-dom";
const useNavigateSearch = () => {
  const navigate = useNavigate();

  // Retorna una función que navega a la ruta especificada con los parámetros de búsqueda dados
  return (pathname, params) =>
    navigate({ pathname, search: `?${createSearchParams(params)}` });
};
export default useNavigateSearch;
