import { useState } from "react";
import Modal from "react-modal";
import Button from "../Button";
import styles from "./style.module.css";
import { AiOutlineCloseCircle } from "react-icons/ai";

interface ModalWrapper {
  icon?: React.ReactNode;
  text: string;
  children: React.ReactNode;
}
const ModalWrapper = ({ icon, text, children }: ModalWrapper) => {
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
        ariaHideApp={false}
        className={styles.modelContainer}
        overlayClassName={styles.overlay}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
      >
        <div className={styles.closeButton} onClick={closeModal}>
          <AiOutlineCloseCircle className="cursor-pointer" size={34} />
        </div>
        <div className="prose sm:prose-md lg:prose-xl dark:prose-invert max-w-none">
          {children}
        </div>
      </Modal>
    </div>
  );
};

export default ModalWrapper;
