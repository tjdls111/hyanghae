import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import 
interface stateProps {
  setState: (value: number) => void;
}

const Survey1Of1: React.FC<stateProps> = ({ setState }) => {
  const nextStep = (num: number) => {
    setState(num);
  };

  return (
    <div>
      <Card onClick={() => nextStep(1)}>
        <CardActionArea className={styles.card}>
          <CardMedia
            className={styles.card}
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

      <button onClick={() => click(2)}>낮</button>
    </div>
  );
};

export default Survey1Of1;
