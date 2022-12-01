import { useState } from "react";
import Modal from "react-modal";
import styles from "./style.module.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
interface ModalWrapper {
  component: React.ReactNode;
  children: React.ReactNode;
}
const ModalWrapper = ({ component, children }: ModalWrapper) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <div onClick={openModal}>{children}</div>
      <div>
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
            {component}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ModalWrapper;
