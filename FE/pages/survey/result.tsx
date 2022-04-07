import UserTestResult from "../../components/userDetail/userTestResult";
import Navigation from "../../components/navigation/navigation";
import Head from "next/head";

const Result = () => {
  return (
    <>
      <Head>
        <title>추천 결과</title>
        <link rel="icon" href="/logos/iconLogo.png" />
      </Head>
      <Navigation />
      <UserTestResult />
    </>
  );
};

export default Result;
