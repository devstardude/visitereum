import { useState } from "react";
import styles from "./style.module.css";
import UserProfileDataSet from "../../../../shared/UserProfileDataSet";
import { userData, Profile } from "../../types";
import { storeImage } from "../../../../utils/storeImage";
import { writeProfile } from "../../../../utils/writeProfie";
import { useAddress } from "@thirdweb-dev/react";
import LoadingScreen from "../../../../shared/LoadingScreen";

interface EditProfile {
  profile: userData;
}
const EditProfile = ({ profile }: EditProfile) => {
  const address = useAddress();
  const [loadingScreen, setLoadingScreen] = useState(false);

  const setProfileData = async (data: userData) => {
    setLoadingScreen(true);
    if (data.image) {
      const imageUrl = await storeImage(data.image, data.image.name);
      data.image = imageUrl;
    }
    if (address) {
      await writeProfile(address, data);
    }
    setLoadingScreen(false);
  };
  return (
    <div className={styles.container}>
      {loadingScreen && <LoadingScreen show={loadingScreen} />}
      <h3>Edit Profile</h3>
      <div className={styles.formDiv}>
        <UserProfileDataSet userData={profile} submitData={setProfileData} />
      </div>
    </div>
  );
};

export default EditProfile;
