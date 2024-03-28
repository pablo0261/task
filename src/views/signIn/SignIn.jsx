import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import FormikInput from "../../components/formik/formikInput";
import SignInValidationSchema from "./SignInValidation";
import style from "./SignIn.module.sass";
import axios from "axios";
import Swal from "sweetalert2";
import helpers from "../../helpers/routesFront";

const SignIn = () => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    try {
      console.log("Datos enviados al servidor:", values);
      const response = await axios.post("http://localhost:3000/signin", values);
      console.log("response:", response);

      if (response.status === 200) {
        console.log(
          "Inicio de sesión exitoso con email y contraseña:",
          response.data
        );
        // Aquí puedes manejar la respuesta del servidor, como guardar el token y redirigir a la página de inicio
      }
    } catch (error) {
      console.error("Error al iniciar sesión con email y contraseña:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al iniciar sesión. Por favor, intenta de nuevo.",
      });
    }
  };

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
              onSubmit={handleSubmit}
              validationSchema={SignInValidationSchema}
            >
              <Form className={style.formik}>
                <FormikInput name="username" label="Nombre" />
                <FormikInput name="email" label="Email" />
                <FormikInput
                  name="password"
                  label="Contraseña"
                  securetextentry
                />
                <button type="submit" className={style.submitBtn}>
                  Ingresar
                </button>
              </Form>
            </Formik>
            {/* Separador y opción para registrarse */}
            <div className={style.separator}>
              <div className={style.line}></div>
              <div className={style.letter}>o</div>
              <div className={style.line}></div>
            </div>
            <div className={style.questionWrapper}>
              <p className={style.question}>
                ¿No tienes una cuenta?{" "}
                <Link to={helpers.logIn} className={style.link}>
                  {" "}
                  Ingresa
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
