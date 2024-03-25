import { useState } from "react";
import { Link } from "react-router-dom";
import helpers from "../../helpers/routesFront";
import style from "./SignIn.module.sass";
import axios from 'axios'; 
import Swal from 'sweetalert2';
import SignInValidationSchema from "./SignInValidation"; // Importa las validaciones

const SignIn = () => {
    const [values, setValues] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Validar los datos del formulario
            await SignInValidationSchema.validate(values, { abortEarly: false });

            console.log('Datos enviados al servidor:', values);
            const response = await axios.post('http://localhost:3000/signin', values);
            console.log("responde:", response)
            if (response.status === 200) {
                console.log('Inicio de sesión exitoso con email y contraseña:', response.data);
                //* Manejar la respuesta del servidor, como guardar el token y redirigir a la página de inicio
            }
        } catch (error) {
            console.error('Error al iniciar sesión con email y contraseña:', error);
            const validationErrors = {};
            error.inner.forEach(err => {
                validationErrors[err.path] = err.message;
            });
            setErrors(validationErrors);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                html: Object.values(validationErrors).join("<br/>"),
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
                    <h2 className={style.quote}>“Tu inventario, tu <span className={style.strong}>control</span> total”</h2>
                    <h3 className={style.slogan}>Simplificando la gestión de stock para tu éxito.</h3>
                </div>
                <div className={style.logInWrapper}>
                    <div className={style.form}>
                        <h2 className={style.titleForm}>Iniciar Sesión</h2>
                        <form onSubmit={handleSubmit} className={style.formik}>
                            <div className={style.wrapper}>
                                <label htmlFor="email" className={style.label}>
                                    Email:
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    placeholder="example@mail.com"
                                    className={`${style.input} ${errors.email && style.error}`}
                                />
                                {errors.email && <p className={style.errorMessage}>{errors.email}</p>}
                            </div>
                            <div className={style.wrapper}>
                                <label htmlFor="password" className={style.label}>
                                    Contraseña:
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    placeholder="********"
                                    className={`${style.input} ${errors.password && style.error}`}
                                />
                                {errors.password && <p className={style.errorMessage}>{errors.password}</p>}
                            </div>
                            <button type="submit" className={style.submitBtn}>
                                Ingresar
                            </button>
                        </form>
                        <div className={style.separator}>
                            <div className={style.line}></div>
                            <div className={style.letter}>o</div>
                            <div className={style.line}></div>
                        </div>
                    </div>
                    <div className={style.questionWrapper}>
                        <p className={style.question}>¿No tienes una cuenta? <Link to={helpers.logIn} className={style.link}>Regístrate</Link> </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
