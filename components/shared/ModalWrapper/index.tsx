import { useState } from "react";
import Modal from "react-modal";
import Button from "../Button";
import styles from "./style.module.css";


interface ModalWrapper{
  icon?:React.ReactNode;
  text:string
}
const ModalWrapper = ({ icon,text }:ModalWrapper) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <Button clicked={openModal}>
        {icon}
        {text}
      </Button>
      <Modal
        className={styles.modelContainer}
        overlayClassName={styles.overlay}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
      >
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
      </Modal>
    </div>
  );
};

export default ModalWrapper;
