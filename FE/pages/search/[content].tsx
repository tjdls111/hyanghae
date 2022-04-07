import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Navigation from "../../components/navigation/navigation";
import Container from "../../components/ui/container/container";
import PerfumeSearchHeader from "../../components/perfumeSearchHeader/perfumeSearchHeader";
import PerfumeSearchList from "../../components/perfumeList/perfumeSearchList";
import { useRouter } from "next/router";
import Footer from "../../components/landing/footer";
import Head from "next/head";

const SearchResult: NextPage = () => {
  const router = useRouter();
  const [content, setContent] = useState(router.query.content as string);

  useEffect(() => {
    setContent(router.query.content as string);
  }, [router]);

  return (
    <>
      <Head>
        <title>검색 결과</title>
        <link rel="icon" href="/logos/iconLogo.png" />
      </Head>
      <Navigation />
      <Container isTop={true}>
        <PerfumeSearchHeader content={content} />
      </Container>
      <Container isTop={false}>
        <PerfumeSearchList content={content} />
      </Container>
      <Footer />
    </>
  );
};

export default SearchResult;
