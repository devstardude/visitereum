import ContentTab from "./ContentTab";
import ProfileDetails from "./ProfileDetails";
import styles from "./style.module.css";
import { usePublicRecord } from "@self.id/framework";

interface ProfilePage {
  did: string;
}

const ProfilePage = ({ did }: ProfilePage) => {
  const { content, isLoading, isError, error } = usePublicRecord(
    "basicProfile",
    did
  );
  console.log(content);
  return (
    <div className={styles.container}>
      {content && <ProfileDetails profile={content} />}
      {content && <ContentTab />}
    </div>
  );
};

export default ProfilePage;
