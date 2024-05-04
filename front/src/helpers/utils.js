/**
 * Realiza una petición fetch
 * - Con gestión de errores básica
 * - incluye señal de Abort incluida de máximo 5 segundos
 *
 * @param {object}            fetchOptions                   - Opciones de nuestra solicitud fetch
 *
 * @param {string}            fetchOptions.url               - La url a la que se realizará la petición
 * @param {string}            [fetchOptions.metodo="GET"]    - El método http de nuestra solicitud (GET, POST, PUT, DELETE, etc)
 * @param {object|null}       [fetchOptions.body=null]       - El cuerpo de la petición que convertiremos a json
 * @param {number}            [fetchOptions.timeout=5000]    - Tiempo de espera máximo en milisegundos antes de abortar la petición
 * @param {function|null}     fetchOptions.callback          - Función que se ejecuta luego de recibir los datos
 *
 * @returns {Promise|void}                                   -Devuelve una promesa que resuelve los datod de la respuesta si no se proporciona una función de callback
 *
 */

export const easyFetch = async ({
  url,
  method = "GET",
  body = null,
  timeout = 5000,
  callback = null,
}) => {
  const controller = new AbortController();
  const AbortTimeout = setTimeout(() => controller.abort(), timeout); //reloj de 5 seg

  const fetchOptions = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    signal: controller.signal,
  };
  if (body) {
    fetchOptions.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, fetchOptions);

    clearTimeout(AbortTimeout);
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();

    if (callback) {
      callback(data);
    } else {
      return data;
    }
  } catch (error) {
    console.error("Error al realizar el request: ", error.message);
  }
};
