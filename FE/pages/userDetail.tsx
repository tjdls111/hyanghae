import { NextPage } from "next";
import Navigation from "../components/navigation/navigation";
import DetailSide from "../components/userDetail/detailSide";

/*
마이 페이지
@author Scarlet
@version 1.0.0
생성일 2022-03-16
마지막 수정일 2022-03-16
*/

const UserDetail: NextPage = () => {
  return (
    <>
      <Navigation />
      <DetailSide />
      <footer>
        <footer />
      </footer>
    </>
  );
};

export default UserDetail;
