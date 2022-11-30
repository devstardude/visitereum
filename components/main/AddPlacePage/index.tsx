import AddPlaceForm from "./AddPlaceForm";
import styles from "./style.module.css";

const AddPlacePage = () => {
  return (
    <div className={styles.container}>
      <h3>Add place</h3>
      <AddPlaceForm />
    </div>
  );
};

export default AddPlacePage;
