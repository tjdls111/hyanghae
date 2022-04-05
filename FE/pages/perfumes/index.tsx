import React from "react";
import { NextPage } from "next";
import Navigation from "../../components/navigation/navigation";
import Container from "../../components/ui/container/container";
import PerfumeListHeader from "../../components/perfumeListHeader/perfumeListHeader";

const PerfumesPage: NextPage = () => {
  return (
    <>
      <Navigation />
      <Container isTop={true}>
        <PerfumeListHeader />
      </Container>
    </>
  );
};

export default PerfumesPage;
