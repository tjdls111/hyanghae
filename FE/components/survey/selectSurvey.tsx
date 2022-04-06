import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./survey2/component/buttonTheme";
import SlideNav from "./slideNav/slideNav";
import clsx from "clsx";

import styles from "./survey.module.css";
import { useRouter } from "next/router";
import { useEffect } from "react";

const SelectSurvey = () => {
  const router = useRouter();
  const [state, setState] = useState(1);
  const nextStep = (num: number) => {
    if (num !== state) {
      return;
    }

    router.push(`survey/${num + 1}`);
  };
  const innerCardRef = useRef<HTMLDivElement[]>([]);
  const firstNum = 0;
  const lastNum = 2;
  const transformCard = () => {
    const nodeList = innerCardRef.current;

    nodeList.forEach((item, i) => {
      const degree = 360 / nodeList.length;

      if (i === 0) {
        item.style.transform = "rotateY(0deg) translateZ(10rem)";
        item.style.filter = "brightness(100%)";
      } else {
        item.style.transform = `rotateY(${degree * i}deg) translateZ(10rem) rotateY(-${
          degree * i
        }deg)`;
        item.style.filter = "brightness(60%)";
      }
      //  0 1 2  1 2 0 [2 0 1 ]
    });
  };

  useEffect(() => {
    transformCard();
  }, [state]);

  const prevCard = () => {
    if (state === firstNum) {
      setState(() => lastNum);
      return;
    }
    setState((prevState) => prevState - 1);
  };

  const nextCard = () => {
    if (state === lastNum) {
      setState(() => firstNum);
      return;
    }
    setState((prevState) => prevState + 1);
  };

  return (
    <>
      <header className={styles.header}>당신을 위한 3가지 선택지</header>
      <div className={styles.container}>
        <div className="inner-cont">
          <div className={clsx(styles.cardsWrapper, "cardList")}>
            <Card
              className={clsx(
                {
                  [styles.card]: true,
                  [styles.now]: state === 0,
                },
                "card"
              )}
              ref={(elem) =>
                ((innerCardRef.current as HTMLDivElement[])[state === 0 ? 0 : state === 1 ? 2 : 1] =
                  elem as HTMLDivElement)
              }
              onClick={() => nextStep(firstNum)}
            >
              <CardActionArea>
                <CardMedia
                  className={styles.media}
                  component="img"
                  image="/images/survey/survey1.png"
                  alt="survey1"
                />
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

            <Card
              className={clsx(
                {
                  [styles.card]: true,
                  [styles.now]: state === 1,
                },
                "card"
              )}
              ref={(elem) =>
                ((innerCardRef.current as HTMLDivElement[])[state === 0 ? 1 : state === 1 ? 0 : 2] =
                  elem as HTMLDivElement)
              }
              onClick={() => nextStep(firstNum + 1)}
            >
              <CardActionArea>
                <CardMedia
                  className={styles.media}
                  component="img"
                  image="/images/survey/survey2.png"
                  alt="survey2"
                />
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

            <Card
              className={clsx(
                {
                  [styles.card]: true,
                  [styles.now]: state === 2,
                },
                "card"
              )}
              ref={(elem) =>
                ((innerCardRef.current as HTMLDivElement[])[state === 0 ? 2 : state === 1 ? 1 : 0] =
                  elem as HTMLDivElement)
              }
              onClick={() => nextStep(lastNum)}
            >
              <CardActionArea>
                <CardMedia
                  className={styles.media}
                  component="img"
                  image="/images/survey/survey3.png"
                  alt="survey3"
                />
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
        <div className={styles.slideNav}>
          <SlideNav limit={3} state={state} />
        </div>
      </div>

      <ThemeProvider theme={theme}>
        <div className={styles.btns}>
          <Button color="primary" onClick={prevCard} size="large" variant="contained">
            이전
          </Button>
          <Button onClick={nextCard} size="large" variant="contained">
            다음
          </Button>
        </div>
      </ThemeProvider>
    </>
  );
};

export default SelectSurvey;
