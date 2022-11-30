import ContentTab from "./ContentTab";
import ProfileDetails from "./ProfileDetails";
import styles from "./style.module.css";
import { usePublicRecord } from "@self.id/framework";
import { useEffect, useState } from "react";
import { useViewerRecord } from "@self.id/framework";
interface ProfilePage {
  did: string;
}

const ProfilePage = ({ did }: ProfilePage) => {
  const { content, isLoading, isError, error } = usePublicRecord(
    "basicProfile",
    did
  );
  const record = useViewerRecord("basicProfile");
  useEffect(() => {
    console.log(record.content?.name);
  }, [content]);

  return (
    <div className={styles.container}>
      {content && <ProfileDetails profile={content} />}
      {content && <ContentTab />}
    </div>
  );
};

export default ProfilePage;
