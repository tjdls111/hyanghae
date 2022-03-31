import React, { useEffect, useRef, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import clsx from "clsx";
import Button from "@mui/material/Button";
import styles from "./survey1.module.css";

interface stateProps {
  setState: (value: number) => void;
}

const Survey1Of1: React.FC<stateProps> = ({ setState }) => {
  const [number, setNumber] = useState(0);
  const nextStep = (num: number) => {
    if (num !== number) {
      return;
    }
    setState(num);
  };
  const firstNum = 0;
  const lastNum = 2;
  const innerCardRef = useRef<HTMLDivElement[]>([]);
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
  }, [number]);

  const prevCard = () => {
    if (number === firstNum) {
      setNumber(() => lastNum);
      return;
    }
    setNumber((prevState) => prevState - 1);
  };

  const nextCard = () => {
    if (number === lastNum) {
      setNumber(() => firstNum);
      return;
    }
    setNumber((prevState) => prevState + 1);
  };

  return (
    <>
      <header className={styles.header}>나의 시간에 안길 향기</header>
      <div className={styles.container}>
        <div className="inner-cont">
          <div className={clsx(styles.cardsWrapper, "cardList")}>
            <Card
              className={clsx(
                {
                  [styles.card]: true,
                  [styles.now]: number === 1,
                },
                "card"
              )}
              ref={(elem) =>
                ((innerCardRef.current as HTMLDivElement[])[
                  number === 0 ? 0 : number === 1 ? 2 : 1
                ] = elem as HTMLDivElement)
              }
              onClick={() => nextStep(firstNum)}
            >
              <CardActionArea>
                <CardMedia component="img" image="/images/survey/day.jpg" alt="survey3" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    낮
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    낮에 어울리는 향수를 추천받고 싶습니다.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card
              className={clsx(
                {
                  [styles.card]: true,
                  [styles.now]: number === 0,
                },
                "card"
              )}
              ref={(elem) =>
                ((innerCardRef.current as HTMLDivElement[])[
                  number === 0 ? 1 : number === 1 ? 0 : 2
                ] = elem as HTMLDivElement)
              }
              onClick={() => nextStep(firstNum + 1)}
            >
              <CardActionArea>
                <CardMedia component="img" image="/images/survey/night.jpg" alt="night" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    밤
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    밤에 어울리는 향수를 추천받고 싶습니다.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>

            <Card
              className={clsx(
                {
                  [styles.card]: true,
                  [styles.now]: number === 2,
                },
                "card"
              )}
              ref={(elem) =>
                ((innerCardRef.current as HTMLDivElement[])[
                  number === 0 ? 2 : number === 1 ? 1 : 0
                ] = elem as HTMLDivElement)
              }
              onClick={() => nextStep(firstNum + 2)}
            >
              <CardActionArea>
                <CardMedia component="img" image="/images/survey/uni.jpg" alt="survey3" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    상관없음
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    낮 밤 전부 사용할 수 있는 향수를 추천받고 싶습니다.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </div>
        </div>
      </div>
      <div className={styles.btns}>
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

export default Survey1Of1;
