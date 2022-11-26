import FilterChip from "../../../../shared/FilterChip";
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import Card from "../../../../shared/Card";
import { VisitedArray, Filter } from "../type";
import { BsBuilding, BsGlobe } from "react-icons/bs";
import { FaLeaf } from "react-icons/fa";
import { BiWater } from "react-icons/bi";

const filters: string[] = ["Urban", "Nature", "Sea", "Others"];
const Icons: any = {
  Urban: <BsBuilding />,
  Nature: <FaLeaf />,
  Sea: <BiWater />,
  Others: <BsGlobe />,
};

interface Props {
  data: VisitedArray;
}

const Visited = ({ data }: Props) => {
  const [places, setPlaces] = useState(data);
  const [filteredPlace, setFilteredPlaces] = useState(data);
  const [filterTag, setFilterTag] = useState(filters);
  const [customFilter, setCustomFilter] = useState<string[]>([]);
  const addFilterHandler = (_name: string) => {
    setCustomFilter((prev) => {
      if (prev.includes(_name)) {
        return prev.filter((value) => value !== _name);
      } else {
        return [...prev, _name];
      }
    });
  };
  useEffect(() => {
    if (customFilter.length === 0) {
      setFilterTag(filters);
      setFilteredPlaces(places);
    } else {
      setFilterTag(customFilter);
      setFilteredPlaces((prev) => {
        let filtered: any = [];
        customFilter.forEach((filter) => {
          places.forEach((item) => {
            if (item.type.includes(filter)) {
              filtered.push(item);
            }
          });
        });
        return filtered;
      });
    }
  }, [customFilter]);
  console.log("filtered", filteredPlace);
  return (
    <div className={styles.container}>
      <div className={styles.filterDiv}>
        <p>Filters:</p>
        {filters.map((item, idx) => (
          <FilterChip
            count={data.filter((place) => place.type === item).length}
            clicked={() => addFilterHandler(item)}
            key={idx}
            active={customFilter.includes(item)}
            chipName={item}
          />
        ))}
      </div>
      <div className={styles.placesContainer}>
        {filterTag.map((filter) => (
          <div key={filter}>
            <div className={styles.placeHeading}>
              <h2>
                {Icons[filter]}
                {filter}
              </h2>
            </div>
            {filteredPlace.filter((item) => item.type === filter).length ===
            0 ? (
              <p>No {filter} place added yet</p>
            ) : (
              <div className={styles.cardContainer}>
                {filteredPlace
                  .filter((item) => item.type === filter)
                  .map((place, idx) => (
                    <Card
                      key={idx}
                      title={place.address}
                      description={place.description}
                    />
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Visited;
