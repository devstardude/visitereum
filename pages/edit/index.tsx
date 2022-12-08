import dynamic from "next/dynamic";
import { Suspense } from "react";
import LoadingScreen from "../../components/shared/LoadingScreen";

const UserEditPage = dynamic(
  () => import("../../components/main/UserEditPage"),
  {
    suspense: true,
  }
);
const New = () => {
  return (
    <>
      {/* Users can edit their did data in ceramic from here */}
      <Suspense fallback={<LoadingScreen />}>
        <UserEditPage />
      </Suspense>
    </>
  );
};

export default New;
