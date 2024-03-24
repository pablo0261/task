import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import FormikInput from "../../components/formik/formikInput.jsx";
import  loginValidationSchema  from "./loginValidation.js";
import helpers from '../../helpers/routesFront.js'
import style from './LogIn.module.sass'

const initialValues = {
  email: '',
  password: ''
}

function LogIn() {

  return (
    <div className={style.background}>
      <div className={style.marginContainer}>
        <div className={style.logoWrapper}>
          <h1 className={style.logo}>MyStockify</h1>
        </div>
        <div className={style.quoteWrapper}>
          <h2 className={style.quote}>“Tu inventario, tu <span className={style.strong}>control</span> total”</h2>
          <h3 className={style.slogan}>Simplificando la gestión de stock para tu éxito.</h3>
        </div>
        <div className={style.logInWrapper}>
          <div className={style.form}>
            <h2 className={style.titleForm}>Iniciar Sesión</h2>
            <Formik
              initialValues={initialValues}
              onSubmit={(values) => console.log(values)}
              validationSchema={loginValidationSchema}
            >
              {() => {
                return (
                  <Form
                    className={style.formik}
                  >
                    <FormikInput
                      name='email'
                      label='Email'
                      placeholder='example@mail.com'
                    ></FormikInput>
                    <FormikInput
                      name='password'
                      label='Contraseña'
                      securetextentry='true'
                    ></FormikInput>
                    <button type='submit' className={style.submitBtn}>Ingresar</button>
                  </Form>
                )
              }}
            </Formik>
            <div className={style.separator}>
              <div className={style.line}></div>
              <div className={style.letter}>o</div>
              <div className={style.line}></div>
            </div>
            <div className={style.socialApps}>
              <div className={style.google}>Google</div>
              <div className={style.facebook}>Facebook</div>
            </div>
          </div>
          <div className={style.questionWrapper}>
            <p className={style.question}>¿No tienes una cuenta? <Link to={helpers.signIn} className={style.link}>Registrate</Link> </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LogIn