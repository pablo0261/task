import { Formik, Form } from "formik";
import { Link, useNavigate} from "react-router-dom";
import FormikInput from "../../components/formik/formikInput.jsx";
import loginValidationSchema from "./loginValidation.js";
import helpers from "../../helpers/routesFront.js";
import style from "./LogIn.module.sass";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import Swal from "sweetalert2";
import { useState } from "react";

const initialValues = {
  email: "",
  password: "",
  rememberMe: false,
};

function LogIn() {
  const Navigate =  useNavigate();
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (values) => {
    try {
      // Envía los datos de inicio de sesión al servidor
      const response = await axios.post("http://localhost:3000/login", values);

      if (response.status === 200) {
        const token = response.data.token;
        console.log("Token recibido del servidor:", token);
        
        // Verificar si el usuario seleccionó recordar credenciales
        if (values.rememberMe) {
          // Si el usuario desea recordar sus credenciales, guardamos el token en localStorage
          localStorage.setItem("token", token);
        }
        
        // Redirigir al usuario a la página de inicio
        Navigate("/myTask"); // Ajusta la ruta según tu configuración
      } else {
        // Manejar errores de inicio de sesión
        console.error("Error de inicio de sesión en el servidor:", response.statusText);
        
        // Mostrar el mensaje de error proporcionado por el servidor
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.error || "Ocurrió un error al iniciar sesión. Por favor, inténtalo de nuevo.",
        });
      }
    } catch (error) {
      console.error("Error al enviar los datos de inicio de sesión al servidor:", error);
      
      // Mostrar el mensaje de error
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al enviar los datos de inicio de sesión al servidor. Por favor, inténtalo de nuevo más tarde.",
      });
    }
  };

  const onGoogleLoginSuccess = async () => {
    try {
      // Envía el código de autorización al servidor para iniciar sesión con Google
      const response = await axios.post("http://localhost:3000/login/google", {
        code: "your_code",
        client_id: "your_client_id",
        client_secret: "your_client_secret",
        redirect_uri: "your_redirect_uri",
        grant_type: "authorization_code",
      });

      if (response.status === 200) {
        // El servidor ha validado el código y ha respondido con un token JWT
        console.log("Token recibido del servidor:", response.data.token);
        // Aquí puedes manejar la respuesta del servidor, como guardar el token en el almacenamiento local o redirigir a otra página
      } else {
        // Maneja errores de inicio de sesión con Google
        console.error("Error de inicio de sesión con Google en el servidor:", response.statusText);
        
        // Mostrar el mensaje de error proporcionado por el servidor
        Swal.fire({
          icon: "error",
          title: "Error",
          text: response.data.error || "Ocurrió un error al iniciar sesión con Google. Por favor, inténtalo de nuevo más tarde.",
        });
      }
    } catch (error) {
      console.error("Error al enviar el código de autorización al servidor:", error);
      
      // Mostrar el mensaje de error
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al iniciar sesión con Google. Por favor, inténtalo de nuevo más tarde.",
      });
    }
  };

  const onGoogleLogin = useGoogleLogin({
    onSuccess: onGoogleLoginSuccess,
    flow: "auth-code",
    scope: "https://www.googleapis.com/auth/plus.login",
    cookiepolicy: "none",
    accesstype: "offline",
  });

  return (
    <div className={style.background}>
      <div className={style.marginContainer}>
        <div className={style.logoWrapper}>
          <h1 className={style.logo}>MyTask</h1>
        </div>
        <div className={style.quoteWrapper}>
          <h2 className={style.quote}>
            “Tu agenda, tu <span className={style.strong}>control</span>{" "}
            total”
          </h2>
          <h3 className={style.slogan}>
            Simplificando la gestión de Tareas.
          </h3>
        </div>
        <div className={style.logInWrapper}>
          <div className={style.form}>
            <h2 className={style.titleForm}>Iniciar Sesión</h2>
            <Formik
              initialValues={initialValues}
              onSubmit={handleLogin}
              validationSchema={loginValidationSchema}
            >
              {() => {
                return (
                  <Form className={style.formik}>
                    <FormikInput
                      name="email"
                      label="Email"
                      placeholder="example@mail.com"
                    ></FormikInput>
                    <FormikInput
                      name="password"
                      label="Contraseña"
                      securetextentry="true"
                    ></FormikInput>
                    <div className={style.rememberMe}>
                      <label>
                        <input
                          type="checkbox"
                          name="rememberMe"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <span className={style.rememberMeText}>Recordar mis datos</span>
                      </label>
                    </div>
                    <button type="submit" className={style.submitBtn}>
                      Ingresar
                    </button>
                  </Form>
                );
              }}
            </Formik>
            <div className={style.separator}>
              <div className={style.line}></div>
              <div className={style.letter}>o</div>
              <div className={style.line}></div>
            </div>
            <div className={style.socialApps}>
              <button className={style.google} onClick={onGoogleLogin}>
                Ingresar con Google
              </button>
            </div>
          </div>
          <div className={style.questionWrapper}>
            <p className={style.question}>
              ¿No tienes una cuenta?{" "}
              <Link to={helpers.signIn} className={style.link}>
                Registrate
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;