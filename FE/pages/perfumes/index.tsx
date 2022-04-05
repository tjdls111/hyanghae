import React from "react";
import { NextPage } from "next";
import Navigation from "../../components/navigation/navigation";
import Container from "../../components/ui/container/container";
import PerfumeFilter from "../../components/perfumeFilter/perFumeFilter";

const PerfumesPage: NextPage = () => {
  return (
    <>
      <Navigation />
      <Container isTop={true}>
        <PerfumeFilter />
      </Container>
    </>
  );
};

export default PerfumesPage;
