import * as yup from 'yup';

const SignInValidationSchema = yup.object().shape({
    fullname: yup
        .string()
        .min(1, "El nombre tiene que tener al menos un carácter")
        .max(100, "El nombre no puede superar los 100 carácteres")
        .required("El campo nombre es obligatorio"),
    email: yup
        .string()
        .email('Ingrese un email valido')
        .required('Campo obligatorio'),
    password: yup
        .string()
        .min(8, 'Debe tener al menos 8 digitos')
        .max(15, 'Contraseña demasiado larga')
        .required('Campo obligatorio')
})

export default SignInValidationSchema