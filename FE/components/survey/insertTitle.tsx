import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useRef } from "react";
import styles from "./insertTitle.module.css";
import { useDispatch } from "react-redux";
import { changeTitle } from "../../reducers/titleSlice";
import { theme } from "../survey/survey2/component/buttonTheme";
import { ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
interface propType {
  setState: (state: boolean) => void;
}

const InsertTitle: React.FC<propType> = ({ setState }) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const sendRequest = () => {
    setState(true);
    dispatch(changeTitle(titleRef.current.value));
  };

  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>오직 당신을 위한 추천</header>

        <Box component="form" noValidate autoComplete="off">
          <TextField
            id="standard-basic"
            autoFocus
            defaultValue="제목없음"
            style={{ width: "30rem", marginLeft: "2rem", marginBottom: "1.6em" }}
            label="설문조사 제목"
            variant="standard"
            inputRef={titleRef}
          />
        </Box>
        <ThemeProvider theme={theme}>
          <div className={styles.buttonContainer}>
            <Button onClick={sendRequest} size="large" variant="contained">
              다음
            </Button>
          </div>
        </ThemeProvider>
      </div>
    </>
  );
};

export default InsertTitle;
