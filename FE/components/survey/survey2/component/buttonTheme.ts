import { createTheme } from "@mui/material/styles";
import { purple } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: purple[100],
      contrastText: "#555",
    },
  },
  typography: {
    fontFamily: ["Noto Sans KR"].join(""),
    fontSize: 15,
    button: {
      fontWeight: 700,
    },
  },
});
