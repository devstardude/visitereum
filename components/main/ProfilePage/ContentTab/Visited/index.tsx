import FilterChip from "../../../../shared/FilterChip";
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import Card from "../../../../shared/Card";
import { placeDataRead } from "../../types";
import { BsBuilding, BsGlobe } from "react-icons/bs";
import { FaLeaf } from "react-icons/fa";
import { BiWater } from "react-icons/bi";
import ModalWrapper from "../../../../shared/ModalWrapper";
import MapBox from "./MapBox";

const filters: string[] = ["Urban", "Nature", "Sea", "Others"];

const Icons: any = {
  Urban: <BsBuilding />,
  Nature: <FaLeaf />,
  Sea: <BiWater />,
  Others: <BsGlobe />,
};

interface Props {
  data: placeDataRead[];
}

const Visited = ({ data }: Props) => {
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
    } else {
      setFilterTag(customFilter);
    }
  }, [customFilter]);


  return (
    <div className={styles.container}>
      {data && (
        <>
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
                {data.filter((item) => item.type === filter).length === 0 ? (
                  <p>No {filter} place added yet</p>
                ) : (
                  <div className={styles.cardContainer}>
                    {data
                      .filter((item) => item.type === filter)
                      .map((place, idx) => (
                        <ModalWrapper
                          key={idx}
                          component={
                            <MapBox
                              lat={place.lattitude}
                              lon={place.longitude}
                            />
                          }
                        >
                          <Card
                            key={idx}
                            title={place.address}
                            description={place.description}
                            image={place.image}
                          />
                        </ModalWrapper>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Visited;
