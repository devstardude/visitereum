import Image from "next/image";
import { useState } from "react";
import styles from "./style.module.css";
import { BsGenderAmbiguous } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BiLocationPlus } from "react-icons/bi";
import { FaBirthdayCake } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
import ModalWrapper from "../../../shared/ModalWrapper";
import AddPlaceForm from "./AddPlaceForm";
import {  userData } from "../types";
import EditProfile from "./EditProfile";
import { filePreviewLink } from "../../../utils/filePreviewLink";
interface ProfileDetails {
  profile: userData;
}
const ProfileDetails = ({ profile }: ProfileDetails) => {
  const [profileData, setProfileData] = useState(profile);
  const { name, description, homeLocation, birthDate, image, gender } =
    profileData;

  const editedHandler = (data: userData) => {
    setProfileData((prev) => {
      console.log(prev.image);
      return { ...data,image: prev.image };
    });
  };

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
          <ModalWrapper icon={<BiLocationPlus size={28} />} text={"Add Place"}>
            <AddPlaceForm />
          </ModalWrapper>
          <ModalWrapper
            icon={<AiOutlineEdit size={28} />}
            text={"Edit profile"}
          >
            <EditProfile profile={profile} edited={editedHandler} />
          </ModalWrapper>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
