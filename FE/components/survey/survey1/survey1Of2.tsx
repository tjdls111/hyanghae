import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

interface stateProps {
  setState: (value: number) => void;
}

const Survey1Of2: React.FC<stateProps> = ({ setState }) => {
  const click = (num: number) => {
    setState(num);
  }
  
  return <div>
    <button onClick={() => click(1)}>남성</button>
    <button onClick={() => click(2)}>여성</button>
    <button onClick={() => click(3)}>상관없음</button>

  </div>;
};

export default Survey1Of2;
