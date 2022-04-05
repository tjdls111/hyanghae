import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import styles from "./survey1.module.css";

interface stateProps {
  setState: (value: number) => void;
}

const Survey1Of1: React.FC<stateProps> = ({ setState }) => {
  const nextStep = (num: number) => {
    setState(num);
  };

  return (
    <div>
      <button onClick={() => nextStep(1)}>낮</button>
      <button onClick={() => nextStep(2)}>밤</button>
    </div>
  );
};

export default Survey1Of1;
