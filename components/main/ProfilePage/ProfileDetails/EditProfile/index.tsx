import { CustomInput, CustomSelectInput } from "../../../../shared/Inputs";
import styles from "./style.module.css";
import UserProfileDataSet from "../../../../shared/UserProfileDataSet";
const EditProfile = () => {
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
      <h3>Edit Profile</h3>
      <div className={styles.formDiv}>
        <UserProfileDataSet
          userData={{}}
          submitData={(data) => {
            console.log(data);
          }}
        />
      </div>
    </div>
  );
};

export default EditProfile;
