import ContentTab from "./ContentTab";
import ProfileDetails from "./ProfileDetails";
import styles from "./style.module.css";

const ProfilePage = () => {
  return (
    <div className={styles.container}>
      <ProfileDetails />
      <ContentTab />
    </div>
  );
};

export default ProfilePage;
