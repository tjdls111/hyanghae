import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Navigation from "../../components/navigation/navigation";
import Container from "../../components/ui/container/container";
import PerfumeSearchHeader from "../../components/perfumeSearchHeader/perfumeSearchHeader";
import PerfumeList from "../../components/perfumeList/perfumeList";
import { useRouter } from "next/router";

const SearchResult: NextPage = () => {
  const router = useRouter();
  const [content, setContent] = useState("");

  console.log(content);

  useEffect(() => {
    setContent(router.query.content as string);
  }, [router.isReady, router]);

  return (
    <>
      <Navigation />
      <Container isTop={true}>
        <PerfumeSearchHeader content={content} />
      </Container>
      <Container isTop={false}>
        <PerfumeList content={content} search={true} />
      </Container>
    </>
  );
};

export default SearchResult;
