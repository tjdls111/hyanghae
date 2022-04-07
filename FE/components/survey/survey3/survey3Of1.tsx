import React, { useRef, useState, useEffect } from "react";
import styles from "./survey3.module.css";
import { useAppSelector } from "../../../reducers/hooks";
import { RootState } from "../../../reducers/store";
import Image from "next/image";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../survey2/component/buttonTheme";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { apiSurvey3Res } from "../../../api/survey";
import { storage } from "../../../firebase/firebase";
import CircularProgress from "@mui/material/CircularProgress";

interface stateType {
  url: string;
  file: File;
}
interface propType {
  setResult: (state: boolean) => void;
  setData: (state: []) => void;
}

const Survey3Of1: React.FC<propType> = ({ setResult, setData }) => {
  const [state, setState] = useState(false);
  const pictureRef = useRef<stateType>();
  const inputRef = useRef<HTMLInputElement>();
  const boxRef = useRef<HTMLDivElement>(null);
  const token = useAppSelector((state: RootState) => state.authReducer.token);
  const [loading, setLoading] = useState("");
  const [spinner, setSpinner] = useState(false);
  const surveyTitle = useAppSelector((state: RootState) => state.titleReducer.title);
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (url !== "") {
      const data = makeForm();
      (async function post() {
        try {
          setSpinner(true);
          const result = await apiSurvey3Res(data, token);
          setSpinner(false);
          setResult(true);
          setData(result.data.recommendPerfumeList);
        } catch (e) {
          console.error(e);
        }
      })();
    }
  }, [url]);

  const uploadFireBase = () => {
    const data = pictureRef.current.file;

    const storageRef = ref(storage, `images/${data.name}`);
    const uploadTask = uploadBytesResumable(storageRef, data);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.ceil((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setLoading(`${progress}%`);
      },
      (error) => {
        // Handle unsuccessful uploads
        console.error(error);
      },
      async () => {
        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrl(downloadURL);
        });
      }
    );
  };

  const makeForm = () => {
    const formData = new FormData();
    formData.append("imgFile", pictureRef.current.file);
    formData.append("clothesUrl", JSON.stringify(url));
    formData.append("surveyTitle", JSON.stringify(surveyTitle));
    return formData;
  };

  const uploadImg = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      uploadFireBase();
      setState(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleClick = () => {
    if (!pictureRef.current) {
      inputRef.current.click();
    }
  };

  const handlePhoto = (e) => {
    const photo = e.target.files[0];
    if (photo) {
      if (photo.type !== "image/png" && photo.type !== "image/jpg" && photo.type !== "image/jpeg") {
        setState(false);
        return;
      }
    } else {
      return;
    }

    pictureRef.current = { url: URL.createObjectURL(photo), file: photo };
    setState(true);
    boxRef.current.style.cursor = "Default";
  };

  const deletePhoto = (e) => {
    e.stopPropagation();
    setState(false);
    boxRef.current.style.cursor = "pointer";
    pictureRef.current = null;
    inputRef.current.files = null;
  };

  return (
    <div className={styles.inputWrapper}>
      <header className={styles.header}>
        <div>내 옷과 어울리는 향수 찾기</div>
        <div>jpg, jpeg, png 파일만 업로드 가능합니다</div>
      </header>
      <form className={styles.form} onSubmit={uploadImg} encType="multipart/form-data">
        <div className={styles.outerBox} onClick={handleClick}>
          <div className={styles.innerBox} ref={boxRef}>
            {state ? (
              <Image src={pictureRef.current.url} layout="fill" objectFit="cover" />
            ) : loading !== "" ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div className={styles.loadingFont}>{loading}</div>
                <CircularProgress />
              </div>
            ) : (
              <div className={styles.plusFont}>+</div>
            )}

            {state ? (
              <button className={styles.cancel} type="button" onClick={deletePhoto}>
                X
              </button>
            ) : null}
          </div>
        </div>

        <input
          type="file"
          accept="image/jpg, image/jpeg, image/png"
          multiple
          ref={inputRef}
          onChange={(e) => handlePhoto(e)}
          style={{ display: "none" }}
        />
        <ThemeProvider theme={theme}>
          <div className={styles.buttonContainer}>
            <Button disabled={!state} type="submit" size="large" variant="contained">
              향수 추천받기
            </Button>
          </div>
        </ThemeProvider>
      </form>
    </div>
  );
};

export default Survey3Of1;
