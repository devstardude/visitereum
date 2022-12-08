import dynamic from "next/dynamic";
import { Suspense } from "react";
import LoadingScreen from "../../components/shared/LoadingScreen";
const AboutPage = dynamic(() => import("../../components/main/AboutPage"), {
  suspense: true,
});

const About = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <AboutPage />
    </Suspense>
  );
};

export default About;
