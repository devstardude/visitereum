import ContentTab from "./ContentTab";
import ProfileDetails from "./ProfileDetails";
import styles from "./style.module.css";
import { usePublicRecord } from "@self.id/framework";

interface ProfilePage {
  did: string;
  urladdress: string;
}

const ProfilePage = ({ did, urladdress }: ProfilePage) => {
  const { content, isLoading, isError, error } = usePublicRecord(
    "basicProfile",
    did
  );

  return (
    <div className={styles.container}>
      {content && <ProfileDetails urladdress={urladdress} profile={content} />}
      {content && <ContentTab urladdress={urladdress} />}
    </div>
  );
};

export default ProfilePage;
