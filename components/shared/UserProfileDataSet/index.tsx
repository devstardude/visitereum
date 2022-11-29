import { Form, Formik } from "formik";
import * as Yup from "yup";
import { CustomInput, CustomInputDate, CustomInputImage } from "../Inputs";
import styles from "./style.module.css";

interface userData {
  name?: string;
  bio?: string;
  birthday?: string;
  gender?: string;
  address?: string;
  image?: any;
}

interface UserProfileDataSet {
  userData: userData;
  submitData: (data: userData) => void;
}
const UserProfileDataSet = ({ userData, submitData }: UserProfileDataSet) => {
  const { name, bio, birthday, gender, address, image } = userData;
  const dataSubmitHandler = async (
    values: userData,
    { setSubmitting, resetForm }: any
  ) => {
    submitData(values);
  };

  return (
    <div>
      <Formik
        initialValues={{
          name: name ? name : "",
          bio: bio ? bio : "",
          birthday: birthday ? birthday : "",
          gender: gender ? gender : "",
          address: address ? address : "",
          image: image ? image : null,
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Required"),
          bio: Yup.string()
            .min(4, "Must be 4 characters or more")
            .max(100, "Must be 100 characters or less")
            .required("Required"),
          birthday: Yup.date().required("Required"),
          gender: Yup.string().required("Required"),
          image: Yup.string().required("Required"),
        })}
        onSubmit={dataSubmitHandler}
      >
        {({ setFieldValue, errors, touched, ...props }) => (
          <Form>
            <CustomInput name="name" placeholder="Name" />
            <CustomInput name="bio" placeholder="Bio" textarea />
            <CustomInputDate name="birthday" placeholder="Birthday" />
            <CustomInput name="gender" placeholder="Gender" />
            <CustomInput name="address" placeholder="Address" />
            <CustomInputImage
              setValue={(file) => {
                setFieldValue("image", file);
              }}
              name="image"
              placeholder="Add image"
            />
            <div className={styles.submitButtonDiv}>
              <button type="submit">Submit</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserProfileDataSet;
