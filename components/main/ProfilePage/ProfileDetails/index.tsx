import Image from "next/image";
import { useState } from "react";
import styles from "./style.module.css";
import { BsGenderAmbiguous } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BiLocationPlus } from "react-icons/bi";
import { FaBirthdayCake } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
import { userData } from "../types";
import { filePreviewLink } from "../../../utils/filePreviewLink";
import Button from "../../../shared/Button";
import Link from "next/link";
interface ProfileDetails {
  profile: userData;
}
const ProfileDetails = ({ profile }: ProfileDetails) => {
  const [profileData, setProfileData] = useState(profile);
  const { name, description, homeLocation, birthDate, image, gender } =
    profileData;

  const dummy = "https://newsroompost.com/wp-content/uploads/2021/09/NFT.png";
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Image
          width={500}
          height={500}
          src="me.png"
          loader={() => (image ? filePreviewLink(image.original.src) : dummy)}
          alt="me.png"
        />
      </div>
      <div className={styles.details}>
        <h1>{name}</h1>
        <p>{description}</p>
        <div className={styles.extraDetailsDiv}>
          <div className={styles.extraDetails}>
            <FaBirthdayCake />
            <p>{birthDate}</p>
          </div>
          <div className={styles.extraDetails}>
            <BsGenderAmbiguous />
            <p>{gender}</p>
          </div>
          <div className={styles.extraDetails}>
            <HiOutlineLocationMarker />
            <p>{homeLocation}</p>
          </div>
        </div>
        <div className={styles.addDetailsContainer}>
          <Link href="/add">
            <Button icon={<BiLocationPlus size={24} />}>Add place</Button>
          </Link>
          <Link href="/edit">
            <Button icon={<AiOutlineEdit size={24} />}>Edit profile</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
