import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Navigation from "../../components/navigation/navigation";
import Container from "../../components/ui/container/container";
import PerfumeSearchHeader from "../../components/perfumeSearchHeader/perfumeSearchHeader";
import PerfumeSearchList from "../../components/perfumeList/perfumeSearchList";
import { useRouter } from "next/router";

const SearchResult: NextPage = () => {
  const router = useRouter();
  const [content, setContent] = useState(router.query.content as string);

  useEffect(() => {
    setContent(router.query.content as string);
  }, [router]);

  return (
    <>
      <Navigation />
      <Container isTop={true}>
        <PerfumeSearchHeader content={content} />
      </Container>
      <Container isTop={false}>
        <PerfumeSearchList content={content} />
      </Container>
    </>
  );
};

export default SearchResult;
