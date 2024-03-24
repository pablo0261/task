import * as yup from 'yup';

const loginValidationSchema = yup.object().shape({
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

export default loginValidationSchema