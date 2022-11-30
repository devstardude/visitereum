import ContentTab from "./ContentTab";
import ProfileDetails from "./ProfileDetails";
import styles from "./style.module.css";
import { Profile } from "./types";
import { usePublicRecord } from "@self.id/framework";
const profile = {
  name: "Arun Shekhar",
  description: "Hello I'm Arun I love to travel",
  birthDate: "20-10-199",
  gender: "Male",
  homeLocation: "address",
  image: "https://newsroompost.com/wp-content/uploads/2021/09/NFT.png",
};

const ProfilePage = () => {
  const record = usePublicRecord(
    "basicProfile",
    "did:pkh:eip155:80001:0xEea556138095F32746Ca7205673206d07012c43a"
  );
  return (
    <div className={styles.container}>
      <ProfileDetails profile={profile} />
      <ContentTab />
    </div>
  );
};

export default ProfilePage;
