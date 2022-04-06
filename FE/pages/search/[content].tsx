import { NextPage } from "next";
import React from "react";
import Navigation from "../../components/navigation/navigation";
import Container from "../../components/ui/container/container";
import PerfumeSearchHeader from "../../components/perfumeSearchHeader/perfumeSearchHeader";
import PerfumeList from "../../components/perfumeList/perfumeList";

const SearchResult: NextPage = () => {
  return (
    <>
      <Navigation />
      <Container isTop={true}>
        <PerfumeSearchHeader />
      </Container>
      <Container isTop={false}>
        <PerfumeList search={true} />
      </Container>
    </>
  );
};

export default SearchResult;
