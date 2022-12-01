import {
  CustomInput,
  CustomInputImage,
  CustomInputMap,
  CustomSelectInput,
} from "../../../shared/Inputs";
import styles from "./style.module.css";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";
import { placeDataWrite } from "../../ProfilePage/types";

interface AddPlaceForm {
  placeData: (placeData: placeDataWrite) => void;
}

const AddPlaceForm = ({ placeData }: AddPlaceForm) => {
  //wallet
  const dataSubmitHandler = async (
    values: any,
    { setSubmitting, resetForm }: any
  ) => {
    const data = {
      id: uuidv4(),
      address: `${values.address.address?.freeformAddress}, ${values.address.address?.country}`,
      description: values.description,
      image: values.image,
      lattitude: String(values.address.position.lat),
      longitude: String(values.address.position.lon),
      type: values.type,
    };
    placeData(data);
  };
  return (
    <div>
      <Formik
        initialValues={{
          address: "",
          description: "",
          type: "Urban",
          image: null,
        }}
        validationSchema={Yup.object({
          address: Yup.object().required("Required"),
          description: Yup.string()
            .min(4, "Must be 4 characters or more")
            .max(100, "Must be 100 characters or less")
            .required("Required"),
          type: Yup.string().required("Required"),
        })}
        onSubmit={dataSubmitHandler}
      >
        {({ setFieldValue, errors, touched, ...props }) => (
          <Form>
            {/* <PlaceSearchBox searchResult={() => {}} /> */}
            <CustomInputMap
              setFieldValue={(val) => setFieldValue("address", val)}
              name="address"
              placeholder="Address"
            />
            <CustomInput
              name="description"
              placeholder="Description"
              textarea
            />
            <CustomSelectInput name="type" placeholder="Select type of place" />

            <CustomInputImage
              setFileValue={(file) => {
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

export default AddPlaceForm;
