import Image from "next/image";
import styles from "./style.module.css";
import { BsGenderAmbiguous } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BiLocationPlus } from "react-icons/bi";
import { FaBirthdayCake } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
import ModalWrapper from "../../../shared/ModalWrapper";
import AddPlaceForm from "./AddPlaceForm";
import { Profile } from "../types";
import EditProfile from "./EditProfile";

const ProfileDetails = ({ profile }: Profile) => {
  const { name, bio, address, birthday, image, gender } = profile;
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Image
          width={500}
          height={500}
          src="me.png"
          loader={() => image}
          alt="me.png"
        />
      </div>
      <div className={styles.details}>
        <h1>{name}</h1>
        <p>{bio}</p>
        <div className={styles.extraDetailsDiv}>
          <div className={styles.extraDetails}>
            <FaBirthdayCake />
            <p>{birthday}</p>
          </div>
          <div className={styles.extraDetails}>
            <BsGenderAmbiguous />
            <p>{gender}</p>
          </div>
          <div className={styles.extraDetails}>
            <HiOutlineLocationMarker />
            <p>{address}</p>
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
            <EditProfile />
          </ModalWrapper>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
