import { useField } from 'formik';
import style from './FormikInput.module.sass';
import PropTypes from 'prop-types'; 

function FormikInput({ name, label, ...props }) {
    const [field, meta] = useField(name);

    FormikInput.propTypes = {
        name: PropTypes.string.isRequired, 
        label: PropTypes.string.isRequired, 
        securetextentry: PropTypes.bool,
    };

    return (
        <div className={style.wrapper}>
            <label htmlFor={name} className={style.label}>
                {label}:
            </label>
            <input
                id={name}
                type={props.securetextentry === 'true' ? 'password' : 'text'}
                {...field}
                {...props}
                className={`${style.input} ${meta.touched && meta.error && style.error}`}
            />
            {meta.touched && meta.error && (
                <p className={style.error}>{meta.error}</p>
            )}
            {!meta.error && meta.touched && typeof field.value === 'string' && field.value.length > 0 && (
                <p className={style.valid}>Dato Válido</p>
            )}
        </div>
    );
}

export default FormikInput;
