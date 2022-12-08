import { jakarta } from "../../../Fonts";
import PageTitle from "../../shared/PageTitle";
import styles from "./style.module.css";

const features: string[] = [
  "○ User can manage his decentralised Identity profile through Ceramic DID services",
  "○ User can track their visited places by addding them in smart contract which is deployed on Polygon blockchain",
  "○ User can store the image assets in decentralised way i.e. in the IPFS",
  "○ Automatic place search with suggestions and map rendering",
  "○ User can claim NFTs based on the count of the places they visited",
  "○ User can claim exclusive merch depending on the NFTs they own, and get enjoy other benefits",
];
const tech: string[] = [
  "○ Frontend is build on Next.js, TypeScript and Tailwind",
  "○ User profile is managed by Ceramic in Clay testnet",
  "○ Contract is deployed on Polygon Mumbai testnet",
  "○ NFTs are minted on OpenSea",
  "○ Thirdweb services are used to interact with smart contract",
];

const links: { title: string; link: string }[] = [
  {
    title: "Github",
    link: "https://github.com/devstardude/visitereum",
  },
  {
    title: "Smart Contract",
    link: "https://mumbai.polygonscan.com/address/0x6E06C606a7fBb153cFEdE1d934A2BE6C1E6658bE#code",
  },
  {
    title: "NFT collection on OpenSea",
    link: "https://testnets.opensea.io/collection/visitereum",
  },
  {
    title: "View my portfolio website and other projects",
    link: "https://devstardude.vercel.app/",
  },
];

const AboutPage = () => {
  return (
    <div className={styles.container}>
      <PageTitle text="About" />
      <p className={jakarta.className}>
        <span>Visitereum</span> is a Web 3 version of{" "}
        <a
          target="_blank"
          href="https://github.com/devstardude/Visite-place-tracker"
        >
          'Visite - A place tracker'
        </a>
        &nbsp;which is a web 2 version project with similar features.
      </p>
      <div className={`${styles.infoDiv} ${jakarta.className}`}>
        <h4>Here are the features it offers</h4>
        {features.map((feature, idx) => (
          <p key={idx}>{feature}</p>
        ))}
      </div>

      <div className={`${styles.infoDiv} ${jakarta.className}`}>
        <h4>Visitereum is Built on</h4>
        {tech.map((t, idx) => (
          <p key={idx}>{t}</p>
        ))}
      </div>

      <div className={`${styles.infoDiv} ${jakarta.className}`}>
        <h4>Links</h4>
        {links.map((link) => (
          <p>
            <a target="_blank" href={link.link}>
              {link.title}
            </a>
          </p>
        ))}
      </div>
    </div>
  );
};

export default AboutPage;
