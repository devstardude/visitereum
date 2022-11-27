import { useField, Field, ErrorMessage } from "formik";

interface CustomInput {
  name: string;
  placeholder: string;
  disabled: boolean;
  textarea: string;
}
export const CustomInput = ({
  name,
  placeholder,
  disabled,
  textarea,
}: CustomInput) => {
  return (
    <div className="mb-4">
      <label className="block TextMod text-sm font-bold mb-2" htmlFor={name}>
        {placeholder}
      </label>
      <Field
        disabled={disabled}
        component={`${textarea ? "textarea" : "input"}`}
        rows="3"
        name={name}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={name}
        type="text"
        placeholder={placeholder}
      />
      <ErrorMessage className="text-red-800 text-xs italic" name={name} />
    </div>
  );
};
