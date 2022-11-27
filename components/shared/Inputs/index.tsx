import { Field, ErrorMessage } from "formik";
import styles from "./style.module.css";
interface CustomInput {
  name: string;
  placeholder: string;
  disabled?: boolean;
  textarea?: boolean;
}
export const CustomInput = ({
  name,
  placeholder,
  disabled,
  textarea,
}: CustomInput) => {
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={name}>
        {placeholder}
      </label>
      <Field
        disabled={disabled}
        component={`${textarea ? "textarea" : "input"}`}
        rows="3"
        name={name}
        className={styles.field}
        id={name}
        type="text"
        placeholder={placeholder}
      />
      <span className={styles.error}>
        <ErrorMessage name={name} />
      </span>
    </div>
  );
};

export const CustomSelectInput = ({
  name,
  placeholder,
  disabled,
  textarea,
}: CustomInput) => {
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={name}>
        {placeholder}
      </label>
      <Field
        as="select"
        disabled={disabled}
        rows="3"
        name={name}
        className={styles.field}
        id={name}
        placeholder={placeholder}
      >
        <option value="Urban">
          Urban
        </option>
        <option value="Nature">Nature</option>
        <option value="Sea">Sea</option>
        <option value="Others">Others</option>
      </Field>
      <span className={styles.error}>
        <ErrorMessage name={name} />
      </span>
    </div>
  );
};
