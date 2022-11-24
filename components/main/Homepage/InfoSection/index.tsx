import { useRef, useState } from "react";
import styles from "./style.module.css";
import { motion, Variants, useInView } from "framer-motion";
import useScrollSpy from "react-use-scrollspy";

interface infoTexts {
  head: string;
  subHead: string;
  img: string;
}
const infoTexts: Array<infoTexts> = [
  {
    head: "Track all your places on blockchain",
    subHead: "Built on Polygon network",
    img: "https://cdn.proactiveinvestors.com/eyJidWNrZXQiOiJwYS1jZG4iLCJrZXkiOiJ1cGxvYWRcL05ld3NcL0ltYWdlXC8yMDIxXzA3XC8xNjI3NTY1NTAwXzIwMjEtMDctMjktMTQtMzEtNDBfY2M5NWI0NjEzYWU1M2VkMmU2YzRmYTA3OTFhMTZkOTkuanBnIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo0MjAsImhlaWdodCI6MTk1LCJmaXQiOiJjb3ZlciJ9fX0=",
  },
  {
    head: "Decentralized Identity",
    subHead: "Connect your DID with Ceramic",
    img: "https://icodrops.com/wp-content/uploads/2021/10/ceramicnetwork_logo.jpeg",
  },
  {
    head: "Saved in IPFS",
    subHead: "Leverage the Decentralised storage",
    img: "https://pbs.twimg.com/profile_images/1115618594350489601/k_57jhN2_400x400.png",
  },
  {
    head: "Collect NFT based on your places",
    subHead: "Share places and collect limited NFTs",
    img: "https://newsroompost.com/wp-content/uploads/2021/09/NFT.png",
  },
  {
    head: "Claim Merch and prizes",
    subHead: "Redeem Gifts and merch on your achievements",
    img: "https://mir-s3-cdn-cf.behance.net/project_modules/1400/63830961964067.5acaf09019db5.jpg",
  },
];

const cardVariants: Variants = {
  offscreen: {
    opacity: 0.1,
    rotate: 10,
  },
  onscreen: {
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 1,
    },
  },
};

interface InfoTabs {
  head: string;
  subHead: string;
  img: string;
  show: boolean;
}

const InfoTab = ({ head, subHead, img, show }: InfoTabs) => {
  return (
    <div className={styles.InfoTab}>
      <div className={show ? styles.headingActive : styles.headingsUnactive}>
        <h2>{head}</h2>
        <h6>{subHead}</h6>
      </div>
      <motion.div
        animate={show ? "onscreen" : "offscreen"}
        variants={cardVariants}
        className={styles.dynamicCard}
      >
        <img src={img} alt="card-image" />
      </motion.div>
    </div>
  );
};

const InfoSection = () => {
  const sectionRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const activeSection = useScrollSpy({
    sectionElementRefs: sectionRefs,
    offsetPx: -250,
  });

  return (
    <div className={styles.container}>
      {infoTexts.map((value, id) => (
        <div key={id} ref={sectionRefs[id]}>
          <InfoTab
            show={activeSection === id}
            head={value.head}
            img={value.img}
            subHead={value.subHead}
          />
        </div>
      ))}
    </div>
  );
};

export default InfoSection;
