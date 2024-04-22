import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import FormikInput from "../../components/formik/formikInput.jsx";
import loginValidationSchema from "./loginValidation.js";
import helpers from "../../helpers/routesFront.js";
import style from "./LogIn.module.sass";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import StoreItem from "../../helpers/LocalStorage.js";
import { jwtDecode } from "jwt-decode";

const initialValues = {
  email: "",
  password: "",
  rememberMe: "",
};

function LogIn() {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const tokenStorage = localStorage.getItem("token");
    if (tokenStorage) {
      console.log("tokenStorage", tokenStorage);
      try {
        const decodedToken = jwtDecode(tokenStorage);
        const username = decodedToken.username;
        console.log("Usuario ya autenticado:", decodedToken.username);
        console.log("typeAdmin:", decodedToken.typeAdmin);
        Swal.fire({
          icon: "success",
          title: `¡Bienvenido de nuevo ${username}!`,
          text: `Vamos a MyTask?`,
          showDenyButton: true,
          confirmButtonText: "SI!",
          denyButtonText: `Volver al Login`,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/myTasks");
          } else if (result.isDenied) {
            navigate("/login");
          }
        });
      } catch (error) {
        console.log("Error al decodificar el token:", error);
      }
    }
  }, [navigate]);

  const handleLogin = async (values) => {
    try {
      console.log(values, "values");
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/login`, values);
      console.log(response.status, "response.status");
      if (response.status === 200) {
        const token = response.data.token;
        console.log(rememberMe, "remenberMe");
        console.log("Token recibido del servidor:", token);

        localStorage.setItem("token", token);

        if (rememberMe) {
          const passwordUser = response.data.password;
          const email = response.data.email;

          console.log(
            "Email y password recibida del servidor:",
            email,
            passwordUser
          );

          localStorage.setItem(
            StoreItem.passwordUser,
            JSON.stringify(passwordUser)
          );
          localStorage.setItem(StoreItem.email, JSON.stringify(email));
        }

        navigate("/myTasks");
      } else {
        console.error(
          "Error de inicio de sesión en el servidor:",
          response.statusText
        );
        // Mostrar el mensaje de error proporcionado por el servidor
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            response.data.error ||
            "Ocurrió un error al iniciar sesión. Por favor, inténtalo de nuevo.",
        });
      }
    } catch (error) {
      console.error(
        "Error al enviar los datos de inicio de sesión al servidor:",
        error
      );

      // Mostrar el mensaje de error
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al enviar los datos de inicio de sesión al servidor. Por favor, inténtalo de nuevo más tarde.",
      });
    }
  };

  const loginWithGoogle = async (credentialResponse) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/loginGoogle`, {
        token: credentialResponse.credential,
      });
      console.log("response",response)
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/myTasks");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al iniciar sesión con Google.",
        });
      }
    } catch (error) {
      console.error("Error al enviar los datos de inicio de sesión al servidor:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.error || "Ocurrió un error al enviar los datos de inicio de sesión al servidor. Por favor, inténtalo de nuevo más tarde.",
      });
    }
  }
  

  // const onGoogleLoginSuccess = async () => {
  //   try {
  //     // Envía el código de autorización al servidor para iniciar sesión con Google
  //     const response = await axios.post("http://localhost:3000/login/google", {
  //       code: "your_code",
  //       client_id: "your_client_id",
  //       client_secret: "your_client_secret",
  //       redirect_uri: "your_redirect_uri",
  //       grant_type: "authorization_code",
  //     });

  //     if (response.status === 200) {
  //       // El servidor ha validado el código y ha respondido con un token JWT
  //       console.log("Token recibido del servidor:", response.data.token);
  //       // Aquí puedes manejar la respuesta del servidor, como guardar el token en el almacenamiento local o redirigir a otra página
  //     } else {
  //       // Maneja errores de inicio de sesión con Google
  //       console.error(
  //         "Error de inicio de sesión con Google en el servidor:",
  //         response.statusText
  //       );

  //       // Mostrar el mensaje de error proporcionado por el servidor
  //       Swal.fire({
  //         icon: "error",
  //         title: "Error",
  //         text:
  //           response.data.error ||
  //           "Ocurrió un error al iniciar sesión con Google. Por favor, inténtalo de nuevo más tarde.",
  //       });
  //     }
  //   } catch (error) {
  //     console.error(
  //       "Error al enviar el código de autorización al servidor:",
  //       error
  //     );

  //     // Mostrar el mensaje de error
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: "Ocurrió un error al iniciar sesión con Google. Por favor, inténtalo de nuevo más tarde.",
  //     });
  //   }
  // };

  // const onGoogleLogin = useGoogleLogin({
  //   onSuccess: onGoogleLoginSuccess,
  //   flow: "auth-code",
  //   scope: "https://www.googleapis.com/auth/plus.login",
  //   cookiepolicy: "none",
  //   accesstype: "offline",
  // });

  return (
    <div className={style.background}>
      <div className={style.marginContainer}>
        <div className={style.logoWrapper}>
          <h1 className={style.logo}>MyTask</h1>
        </div>
        <div className={style.quoteWrapper}>
          <h2 className={style.quote}>
            “Tu agenda, tu <span className={style.strong}>control</span> total”
          </h2>
          <h3 className={style.slogan}>Simplificando la gestión de Tareas.</h3>
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
                          className={style.inputRememberMe}
                          type="checkbox"
                          name="rememberMe"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                        />
                      </label>
                      <p className={style.rememberMeText}>Recordarme</p>
                    </div>
                    <button type="submit" className={style.submitBtn}>
                      Ingresar
                    </button>
                    <div className={style.socialApps}>
                      <GoogleLogin
                        onSuccess={(credentialResponse) => {
                          loginWithGoogle(credentialResponse)
                        }}
                        onError={() => {
                          console.log("Login Failed");
                        }}
                      />
                    </div>
                  </Form>
                );
              }}
            </Formik>
            <div className={style.separator}>
              <div className={style.line}></div>
              <div className={style.letter}>o</div>
              <div className={style.line}></div>
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
    </div>
  );
}

export default LogIn;
