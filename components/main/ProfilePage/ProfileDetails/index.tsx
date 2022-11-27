import Image from "next/image";
import styles from "./style.module.css";
import { BsGenderAmbiguous } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BiLocationPlus } from "react-icons/bi";
import { FaBirthdayCake } from "react-icons/fa";
import Button from "../../../shared/Button";
import ModalWrapper from "../../../shared/ModalWrapper";
const ProfileDetails = () => {
  const img = "https://newsroompost.com/wp-content/uploads/2021/09/NFT.png";
  return (
    <div className={styles.container}>
      <div className={styles.image}>
        <Image
          width={500}
          height={500}
          src="me.png"
          loader={() => img}
          alt="me.png"
        />
      </div>
      <div className={styles.details}>
        <h1>Arun shekhar</h1>
        <p>Hello I'm Arun I love to travel</p>
        <div className={styles.extraDetailsDiv}>
          <div className={styles.extraDetails}>
            <FaBirthdayCake />
            <p>20-10-1999</p>
          </div>
          <div className={styles.extraDetails}>
            <BsGenderAmbiguous />
            <p>Male</p>
          </div>
          <div className={styles.extraDetails}>
            <HiOutlineLocationMarker />
            <p>Hno-346/216 India</p>
          </div>
        </div>
        <div className={styles.addDetailsContainer}>
          <ModalWrapper
            icon={<BiLocationPlus size={28} />}
            text={"Add Place"}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
