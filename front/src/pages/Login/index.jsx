import "./index.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'; // Cliente HTTP para realizar solicitudes al servidor


/**
 * Componente de inicio de sesión que permite a los usuarios iniciar sesión o registrarse.
 * Utilizamos un formulario para recopilar credenciales de usuario y enviarlas al servidor para autenticación.
 * Además, proporciona un formulario de registro para que los nuevos usuarios se registren.
 */

// Componente principal de inicio de sesión
function Login() {
  const navigate = useNavigate(); // Hook de navegación para redirigir a otras páginas
  const [username, setUsername] = useState(""); // Estado para almacenar el nombre de usuario
  const [password, setPassword] = useState(""); // Estado para almacenar la contraseña
  const [error, setError] = useState(""); // Estado para almacenar errores de inicio de sesión

  // Función para manejar el envío del formulario de inicio de sesión
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir la recarga de la página por defecto
 
    // Realizar una solicitud POST al servidor para autenticar al usuario
    try {
      const response = await fetch(
        "http://localhost:8080/API/v1/authenticate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }), // Cuerpo de la solicitud con nombre de usuario y contraseña
        }
      );

      // Verificar si la respuesta del servidor está bien hecha
      if (!response.ok) {
        throw new Error("Error al autenticar");
      }


      // Extraer el token de la respuesta
      const data = await response.json();
      const token = data.token;

      localStorage.setItem("token", token);

      if (token) {
        navigate("/home");
        console.log("Has iniciado sesión correctamente");
      }
    } catch (error) {
      // Manejar errores de inicio de sesión
      setError("Login failed");
      console.error("Error:", error.message);
    }
  };

  return (
    <div>
      <form className="Form-container" onSubmit={handleSubmit}>
      <h2 className="Form-h2">Login</h2>
      {error && <div className="Form-error-message">{error}</div>}
      <div className="Form-input">
        <label className="Form-label" htmlFor="username">
          Username
        </label>
        <input
          className="Form-input-text"
          id="username"
          type="text"
          placeholder="Type Your Username Here"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="Form-input">
        <label className="Form-label" htmlFor="password">
          Password
        </label>
        <input
          className="Form-input-text"
          id="password"
          type="password"
          placeholder="Type Your Password Here"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="Form-submit-button" type="submit">
        LOGIN
      </button>
      
    </form>
    <Register/> {/* Aquí se renderizará el formulario de register, ya que el componente login es el principal y el register un subcomponente */}
    
    </div>
    
  );
}

export default Login;

// Componente de registro de usuario
const Register = () => {
  const [message, setMessage] = useState(''); // Estado para almacenar mensajes de éxito o error
  const [formData, setFormData] = useState({  // Estado para almacenar datos del formulario de registro
    username: '',
    email: '',
    password: ''
  });

  // Función para manejar cambios en los campos del formulario de registro
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

   // Función para manejar el envío del formulario de registro
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
       // Realizar una solicitud POST al servidor para registrar al usuario
      const response = await axios.post("http://localhost:8080/API/v1/user", formData);
      console.log('Usuario registrado correctamente:', response.data);

       // Verificar si la respuesta del servidor es exitosa
      if (response.status >= 200 && response.status < 300) {
        setMessage("You have registered correctly, Login to start");
      }
    } catch (error) {
      console.error('Error al registrarse:', error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="Form-container">
      <h2 className="Form-h3">Or if you already don´t have an account, proceed to Register</h2>
      {message && <div className="Form-success-message">{message}</div>}
      <div className="Form-input">
        <label className="Form-label" htmlFor="username">Username</label>
      <input
        className="Form-input-text"
        type="text"
        name="username"
        id="username"
        placeholder="Type here your username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      </div>
      <div className="Form-input">
        <label className="Form-label" htmlFor="email">Email</label>
      <input
        className="Form-input-text"
        type="email"
        name="email"
        id="email"
        placeholder="Type here your email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      </div>
      <div className="Form-input">
        <label className="Form-label" htmlFor="password"></label>
      <input
        className="Form-input-text"
        type="password"
        name="password"
        id="password"
        placeholder="Type here your password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      </div>
      <button className="Form-submit-button" type="submit">Register</button>
    </form>
  );
};

