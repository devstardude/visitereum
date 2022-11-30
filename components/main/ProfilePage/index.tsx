import ContentTab from "./ContentTab";
import ProfileDetails from "./ProfileDetails";
import styles from "./style.module.css";
import { useState } from "react";
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
