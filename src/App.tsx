import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { createTheme, GlobalStyles } from "@mui/material";
import { green, purple } from "@mui/material/colors";
import { ThemeProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";

import "./App.css";
import Main from "./components/Main";
import { Home } from "./components/Home";
import { Liked } from "./components/Liked";
import Country from "./components/countries/Country";
import { useAppSelector } from "./app/hooks";

function App() {
  const darkMode = useAppSelector((state) => state.countriesR.darkMode);

  const theme = createTheme({
    typography: { fontFamily: "Ubuntu" },
    components: {
      MuiLink: {
        styleOverrides: {
          root: {
            textDecoration: "none",
            ":hover": {
              textDecoration: "underline",
            },
          },
        },
      },
    },
    palette: {
      mode: darkMode ? "dark" : "light",

      ...(!darkMode
        ? {
            primary: {
              main: purple[500],
            },
            secondary: {
              main: green[500],
            },
            background: {
              default: purple[50],
            },
            error: { main: "#f00" },
          }
        : {}),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles
        styles={() => ({
          html: { height: "100%" },
          body: { height: "100%" },
          "#root": { height: "100%" },
          "#root>div": {
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 20,
            justifyContent: "space-between",
            alignItems: "center",
          },
        })}
      ></GlobalStyles>
      <CssBaseline></CssBaseline>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/countries" element={<Main />}></Route>
          <Route path="/main" element={<Main />}></Route>
          <Route path="/liked" element={<Liked />}></Route>
          <Route path="/countries/:name" element={<Country />}></Route>

          {/* create err page <Route path="*" element={<Main />} /> */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
