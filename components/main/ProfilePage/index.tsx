import ContentTab from "./ContentTab";
import ProfileDetails from "./ProfileDetails";
import styles from "./style.module.css";
import { usePublicRecord } from "@self.id/framework";
import { useEffect, useState } from "react";
import { useViewerRecord } from "@self.id/framework";

interface ProfilePage {
  did: string;
  address: string;
}

const ProfilePage = ({ did, address }: ProfilePage) => {
  const { content, isLoading, isError, error } = usePublicRecord(
    "basicProfile",
    did
  );

  return (
    <div className={styles.container}>
      {content && <ProfileDetails profile={content} />}
      {content && <ContentTab address={address} />}
    </div>
  );
};

export default ProfilePage;
