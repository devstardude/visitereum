import { useRef } from "react";
import styles from "./style.module.css";
import useScrollSpy from "react-use-scrollspy";
import Image from "next/image";
import { jakarta } from "../../../../Fonts";
interface infoTexts {
  head: string;
  subHead: string;
  img: string;
}
const infoTexts: Array<infoTexts> = [
  {
    head: "Track all your places on blockchain",
    subHead: "Built on Polygon network",
    img: "/static/poly.jpg",
  },
  {
    head: "Decentralized Identity",
    subHead: "Connect your DID with Ceramic clay network",
    img: "/static/ceramic.jpeg",
  },
  {
    head: "Saved in IPFS",
    subHead: "Leverage the Decentralised storage, Encypt and Store",
    img: "/static/block.png",
  },
  {
    head: "Collect NFT based on your places",
    subHead: "Share places and collect limited NFTs",
    img: "/static/NFT.webp",
  },
  {
    head: "Claim Merch and prizes",
    subHead: "Redeem Gifts and merch on your achievements",
    img: "/static/merch.jpg",
  },
];

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
        <h2 className={jakarta.className}>{head}</h2>
        <h6>{subHead}</h6>
      </div>
      <div className={styles.dynamicCard}>
        <Image
          width={500}
          height={500}
          loader={() => img}
          src="image.png"
          alt="card-image"
        />
      </div>
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
