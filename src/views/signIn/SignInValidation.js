import * as yup from 'yup';

const SignInValidationSchema = yup.object().shape({
    email: yup
        .string()
        .email('Ingrese un email válido')
        .required('Campo obligatorio'),
    password: yup
        .string()
        .min(8, 'Debe tener al menos 8 dígitos')
        .max(15, 'Contraseña demasiado larga')
        .required('Campo obligatorio')
});

export default SignInValidationSchema;
