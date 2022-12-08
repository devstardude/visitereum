import dynamic from "next/dynamic";
import { Suspense } from "react";
import LoadingScreen from "../../components/shared/LoadingScreen";

const ShowUsers = dynamic(() => import("../../components/main/ShowUsersPage"), {
  suspense: true,
});

const Users = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <ShowUsers />
    </Suspense>
  );
};

export default Users;
