import FilterChip from "../../../../shared/FilterChip";
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import Card from "../../../../shared/Card";
import { VisitedArray, Filter } from "../type";
import { typeSeperator } from "./utils/typeSeperator";
const filters = [
  { name: "Urban", active: false },
  { name: "Nature", active: false },
  { name: "Sea", active: false },
  { name: "Others", active: false },
];

interface Props {
  data: VisitedArray;
}

const Visited = ({ data }: Props) => {
  const [place, setPlaces] = useState(typeSeperator(data));
  const [filteredPlace, setFilteredPlace] = useState({});
  const [filter, setFilter] = useState<Array<Filter>>(filters);
  const addFilterHandler = (_name: string, index: number, active: boolean) => {
    setFilter((prev) => {
      prev[index].active = !active;
      return [...prev];
    });
  };
  useEffect(() => {
    filter.forEach((item) => {
        if(item.active){
            setFilteredPlace((prev)=> {
                prev[item.name]=place[item.name]
                return prev;
            })
        }
    });
  }, [filter]);
  console.log(place);
  return (
    <div className={styles.container}>
      <div className={styles.filterDiv}>
        {filter.map((item, idx) => (
          <FilterChip
            clicked={() => addFilterHandler(item.name, idx, item.active)}
            key={idx}
            active={item.active}
            chipName={item.name}
          />
        ))}
      </div>
      <div className={styles.cardContainer}>
        {data.map((item, idx) => (
          <Card key={idx} title={item.address} description={item.description} />
        ))}
      </div>
    </div>
  );
};

export default Visited;
