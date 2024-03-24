import { Form, Formik } from "formik";
import FormikInput from "../../components/formik/formikInput";
import SigninValidationSchema from "./SignInValidation";
import { Link } from "react-router-dom";
import helpers from "../../helpers/routesFront";
import style from "./SignIn.module.sass";
import { useGoogleLogin } from "@react-oauth/google";

const SignIn = () => {
  const onSignIn = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
    flow: "auth-code",
  });

  return (
    <div className={style.background}>
      <div className={style.marginContainer}>
        <div className={style.logoWrapper}>
          <h1 className={style.logo}>MyStockify</h1>
        </div>
        <div className={style.quoteWrapper}>
          <h2 className={style.quote}>
            “Tu agenda, tu <span className={style.strong}>control</span>{" "}
            total”
          </h2>
          <h3 className={style.slogan}>
            Simplificando la gestión de tareas.
          </h3>
        </div>
        <div className={style.logInWrapper}>
          <div className={style.form}>
            <h2 className={style.titleForm}>Crear Cuenta</h2>
            <Formik
              initialValues=""
              onSubmit={(values) => console.log(values)}
              validationSchema={SigninValidationSchema}
            >
              {() => (
                <Form className={style.formik}>
                  <FormikInput
                    name="fullName"
                    label="Nombre"
                    placeholder="Nombre y Apellido"
                  />
                  <FormikInput
                    name="email"
                    label="Email"
                    placeholder="example@mail.com"
                  />
                  <FormikInput
                    name="password"
                    label="Contraseña"
                    placeholder="********"
                    type="password"
                  />
                  <button type="submit" className={style.submitBtn}>
                    Ingresar
                  </button>
                </Form>
              )}
            </Formik>
            <div className={style.separator}>
              <div className={style.line}></div>
              <div className={style.letter}>o</div>
              <div className={style.line}></div>
            </div>
            <div className={style.socialApps}>
              <div className={style.google}>
                <button className={style.googleButton} onClick={onSignIn}>
                  {" "}
                  Google{" "}
                </button>
              </div>
            </div>
          </div>
          <div className={style.questionWrapper}>
            <p className={style.question}>
              ¿Ya tienes una cuenta?
              <Link to={helpers.logIn} className={style.link}>
                Ingresar
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
