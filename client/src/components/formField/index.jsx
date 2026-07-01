import styles from './field.module.css';

function FormField({ register, name, type, placeholder }) {
  return (
    <input
      className={styles.formInput}
      {...register(name, { required: 'All fields are required!' })}
      type={type}
      placeholder={placeholder}
    />
  );
}

export default FormField;
