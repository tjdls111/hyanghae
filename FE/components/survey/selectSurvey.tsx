import React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import clsx from "clsx";

import styles from "./survey.module.css";
import { useRouter } from "next/router";
import { useEffect } from 'react';
const SelectSurvey = () => {
  const router = useRouter();
  const nextStep = (num: number) => {
    router.push(`survey/${num}`);
  };

  const transformCard = () => {

  }

  useEffect(() => {
    transformCard();
  }, [])


  const prevCard = () => {

  };

  const nextCard = () => {
    
  };

  return (
    <>
      <header className={styles.header}>당신을 위한 3가지 선택지</header>
      <div className={styles.container}>
        <div className="inner-cont">
          <div className={styles.cardsWrapper}>
            <Card className={styles.card} onClick={() => nextStep(1)}>
              <CardActionArea>
                <CardMedia component="img" image="/images/survey/survey1.png" alt="survey1" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    라이프 스타일
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    당신의 라이프 스타일에 맞는 향수를 추천해드립니다.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>

            <Card className={clsx(styles.card, styles.now)} onClick={() => nextStep(2)}>
              <CardActionArea>
                <CardMedia component="img" image="/images/survey/survey2.png" alt="survey2" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    내가 가진 향수
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    내가 가진 향수를 바탕으로 비슷한 향 혹은 색다른 향수를 추천 받을 수 있습니다.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>

            <Card className={styles.card} onClick={() => nextStep(3)}>
              <CardActionArea>
                <CardMedia component="img" image="/images/survey/survey3.png" alt="survey3" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    패션
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    내가 가진 옷에 어울리는 향수를 추천 받을 수 있습니다.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button onClick={prevCard} size="large" variant="contained">
          이전
        </Button>
        <Button onClick={nextCard} size="large" variant="contained">
          다음
        </Button>
      </div>
    </>
  );
};

export default SelectSurvey;
