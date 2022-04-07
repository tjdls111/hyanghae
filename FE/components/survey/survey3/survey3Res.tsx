import React, { useState, useEffect } from "react";
import { surveyPerfume } from "../../../api/survey";
import Image from "next/image";
import styles from "./survey3Res.module.css";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../survey2/component/buttonTheme";
import { useRouter } from "next/router";

const Survey3Res = ({ data }) => {
  const [random, setRandom] = useState([]);
  const getRandomInt = () => {
    const set = new Set();
    while (set.size < 5) {
      set.add(Math.floor(Math.random() * data.length));
    }
    const array = Array.from(set);
    setRandom(array);
  };
  const router = useRouter();
  const goDetail = (id) => {
    router.replace(`/perfume/${id}`);
  };

  const randDataSetting = random.map((item) => (
    <div className={styles.listContainer}>
      <div className={styles.imgContainer}>
        <Image src={data[item].imgUrl} objectFit="contain" layout="fill" />
      </div>
      <div
        style={{
          fontSize: "1.4em",
        }}
      >
        {data[item].perfumeBrand.korName}{" "}
      </div>
      <div
        style={{
          textOverflow: "ellipsis",
          overflow: "hidden",
          width: "15em",
          whiteSpace: "nowrap",
          textAlign: "center",
          height: "2em",
          fontSize: "1.4em",
        }}
      >
        {data[item].perfumeName}
      </div>
      <ThemeProvider theme={theme}>
        <div className={styles.btn}>
          <Button onClick={() => goDetail(data[item].id)} size="large" variant="contained">
            향수 상세보기
          </Button>
        </div>
      </ThemeProvider>
    </div>
  ));

  useEffect(() => {
    if (data.length !== 0) {
      console.log(data);
      getRandomInt();
    }
  }, [data]);

  return (
    <>
      <header className={styles.header}>추천결과</header>
      <div className={styles.innerContainer}>{randDataSetting}</div>
    </>
  );
};

export default Survey3Res;
