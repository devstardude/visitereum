import ContentTab from "./ContentTab";
import ProfileDetails from "./ProfileDetails";
import styles from "./style.module.css";
import { Profile } from "./types";

const profile = {
  name: "Arun Shekhar",
  bio: "Hello I'm Arun I love to travel",
  birthday: "20-10-199",
  gender: "Male",
  address: "address",
  image: "https://newsroompost.com/wp-content/uploads/2021/09/NFT.png",
};

const ProfilePage = () => {
  return (
    <div className={styles.container}>
      <ProfileDetails profile={profile} />
      <ContentTab />
    </div>
  );
};

export default ProfilePage;
