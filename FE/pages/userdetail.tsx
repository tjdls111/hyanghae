import { NextPage } from "next";
import Navigation from "../components/ui/navigation";
import DetailMain from "../components/userdetail/detailmain";
import DetailSide from "../components/userdetail/detailside";

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
      <aside>
        <DetailSide />
      </aside>
      <main>
        <DetailMain />
      </main>
      <footer>
        <footer />
      </footer>
    </>
  );
};

export default UserDetail;
