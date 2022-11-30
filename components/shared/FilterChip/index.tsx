import styles from "./style.module.css";
import { BsCheck2Circle } from "react-icons/bs";
interface FilterChip {
  chipName: string;
  active?: boolean;
  clicked?: () => void;
  count: number;
}
const FilterChip = ({ chipName, active, clicked, count }: FilterChip) => {
  return (
    <div
      onClick={clicked}
      className={`${styles.container} ${active && styles.active}`}
    >
      {chipName}
      <span>({count})</span>
      <BsCheck2Circle />
    </div>
  );
};

export default FilterChip;
