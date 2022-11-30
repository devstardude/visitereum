import { Form, Formik } from "formik";
import * as Yup from "yup";
import { CustomInput, CustomInputDate, CustomInputImage } from "../Inputs";
import styles from "./style.module.css";
import { userData } from "../../main/ProfilePage/types";
import { filePreviewLink } from "../../utils/filePreviewLink";

interface UserProfileDataSet {
  userData: userData;
  submitData: (data: userData) => void;
}
const UserProfileDataSet = ({ userData, submitData }: UserProfileDataSet) => {
  const { name, description, birthDate, gender, homeLocation, image } =
    userData;
  const initialImage = image ? filePreviewLink(image.original.src) : null;
  const bdate = birthDate
    ? new Date(birthDate).toISOString().split("T")[0]
    : new Date().toISOString().split("T")[0];
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
          description: description ? description : "",
          birthDate: bdate,
          gender: gender ? gender : "",
          homeLocation: homeLocation ? homeLocation : "",
          image: null,
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Required"),
          description: Yup.string()
            .min(4, "Must be 4 characters or more")
            .max(100, "Must be 100 characters or less")
            .required("Required"),
          birthDate: Yup.date().required("Required"),
          gender: Yup.string().required("Required"),
        })}
        onSubmit={dataSubmitHandler}
      >
        {({ setFieldValue, errors, touched, ...props }) => (
          <Form>
            <CustomInput name="name" placeholder="Name" />
            <CustomInput name="description" placeholder="Bio" textarea />
            <CustomInputDate name="birthDate" placeholder="Birthday" />
            <CustomInput name="gender" placeholder="Gender" />
            <CustomInput name="homeLocation" placeholder="Address" />
            <CustomInputImage
              setFileValue={(file) => {
                setFieldValue("image", file);
              }}
              initialImage={initialImage}
              name="image"
              placeholder="Profile picture (optional)"
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
