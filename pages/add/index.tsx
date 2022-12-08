import dynamic from "next/dynamic";
import { Suspense } from "react";
import LoadingScreen from "../../components/shared/LoadingScreen";

const AddPlacePage = dynamic(
  () => import("../../components/main/AddPlacePage"),
  {
    suspense: true,
  }
);

// New places will be added from this page
const Add = () => {
  return (
    <div>
      <Suspense fallback={<LoadingScreen />}>
        <AddPlacePage />
      </Suspense>
    </div>
  );
};

export default Add;
