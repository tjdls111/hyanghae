import { NextPage } from "next";
import React from "react";
import Navigation from "../../components/navigation/navigation";
import Container from "../../components/ui/container/container";

const SearchResult: NextPage = () => {
  return (
    <>
      <Navigation />
      <Container isTop={true}>
        <h2></h2>
      </Container>
    </>
  );
};

export default SearchResult;
