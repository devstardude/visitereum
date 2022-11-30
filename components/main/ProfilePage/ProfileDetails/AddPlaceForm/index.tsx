import { CustomInput, CustomSelectInput } from "../../../../shared/Inputs";
import styles from "./style.module.css";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const AddPlaceForm = () => {
  const dataSubmitHandler = async (
    values: any,
    { setSubmitting, resetForm }: any
  ) => {
    const data = {
      wallet: "0xabcd",
      address: values.address,
      description: values.description,
      type: values.type,
      image: values.image,
      lattitude: "100000",
      longitude: "100000",
    };
    console.log(data);
  };
  return (
    <div className={styles.container}>
      <h3>Add Place</h3>
      <div className={styles.formDiv}>
        <Formik
          initialValues={{
            address: "",
            description: "",
            type: "Urban",
            image: "",
          }}
          validationSchema={Yup.object({
            address: Yup.string().required("Required"),
            description: Yup.string()
              .min(4, "Must be 4 characters or more")
              .max(100, "Must be 100 characters or less")
              .required("Required"),
            type: Yup.string().required("Required"),
            image: Yup.string().required("Required"),
          })}
          onSubmit={dataSubmitHandler}
        >
          {({ setFieldValue, errors, touched, ...props }) => (
            <Form>
              <CustomInput name="address" placeholder="Address" />
              <CustomInput
                name="description"
                placeholder="Description"
                textarea
              />
              <CustomSelectInput
                name="type"
                placeholder="Select type of place"
              />
              <CustomInput name="image" placeholder="Add image" />
              <div className={styles.submitButtonDiv}>
                <button type="submit">Submit</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddPlaceForm;
