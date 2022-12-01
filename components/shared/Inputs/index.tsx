import { Field, ErrorMessage } from "formik";
import SearchBox from "tomtom-react-searchbox";
import Image from "next/image";
import styles from "./style.module.css";
interface CustomInput {
  name: string;
  placeholder: string;
  disabled?: boolean;
  textarea?: boolean;
}
import { useState } from "react";
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
        <option value="Urban">Urban</option>
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

export const CustomInputDate = ({
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
        type="date"
        placeholder={placeholder}
      />
      <span className={styles.error}>
        <ErrorMessage name={name} />
      </span>
    </div>
  );
};

interface CustomInputImage {
  name: string;
  placeholder: string;
  disabled?: boolean;
  setFileValue: (file: any) => void;
  initialImage?: string | null;
}
export const CustomInputImage = ({
  name,
  placeholder,
  disabled,
  setFileValue,
  initialImage,
}: CustomInputImage) => {
  const [preview, setPreview] = useState<string | null>(null);
  const setValue = (file: any) => {
    const objectUrl = file && URL.createObjectURL(file);
    setPreview(objectUrl);
    setFileValue(file);
  };

  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={name}>
        {placeholder}
      </label>
      <Field
        disabled={disabled}
        name={name}
        className={styles.field}
        id="attachment"
        component={CustomFileUpload}
        placeholder={placeholder}
        setValue={setValue}
      />
      <span className={styles.error}>
        <ErrorMessage name={name} />
      </span>
      {preview && (
        <>
          <div className={styles.image}>
            <Image
              width={500}
              height={500}
              src="me.png"
              loader={() => preview}
              alt="me.png"
            />
          </div>
        </>
      )}
      {initialImage && !preview && (
        <>
          <div className={styles.image}>
            <Image
              width={500}
              height={500}
              src="me.png"
              loader={() => initialImage}
              alt="me.png"
            />
          </div>
        </>
      )}
    </div>
  );
};

function CustomFileUpload({ field, setValue }: any) {
  const handleChange = async (e: any) => {
    const file = e.currentTarget.files[0];
    setValue(file);
  };

  return (
    <div>
      <input
        type={"file"}
        onChange={(o) => handleChange(o)}
        className={"form-control"}
      />
    </div>
  );
}

// map

interface CustomInputMap {
  name: string;
  placeholder: string;
  disabled?: boolean;
  setFieldValue: (val: any) => void;
}
export const CustomInputMap = ({
  name,
  placeholder,
  disabled,
  setFieldValue,
}: CustomInputMap) => {
  const setValue = (val: any) => {
    setFieldValue(val);
  };
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={name}>
        {placeholder}
      </label>
      <Field
        disabled={disabled}
        name={name}
        className={styles.field}
        component={MapInput}
        placeholder={placeholder}
        setValue={setValue}
      />
      <span className={styles.error}>
        <ErrorMessage name={name} />
      </span>
    </div>
  );
};

export const MapInput = ({ field, setValue }: any) => {
  return (
    <SearchBox
      wrapperClassName={styles.searchBox}
      onResultChoose={(result: any): any => setValue(result)}
      autofocus={false}
      placeholder="Search for an address"
      searchOptions={{
        key: process.env.NEXT_PUBLIC_TOMTOM_API_KEY,
        language: "en-Gb",
        limit: 5,
        typeahead: true,
      }}
    />
  );
};
