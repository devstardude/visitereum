import styles from "./style.module.css";
import { BsCheck2Circle } from "react-icons/bs";
interface FilterChip {
  chipName: string;
  active?: boolean;
  clicked?: () => void;
}
const FilterChip = ({ chipName, active, clicked }: FilterChip) => {
  return (
    <div
      onClick={clicked}
      className={`${styles.container} ${active && styles.active}`}
    >
      {chipName}
      <BsCheck2Circle />
    </div>
  );
};

export default FilterChip;
