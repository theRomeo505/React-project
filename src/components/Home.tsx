import { useEffect } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import Footer from "./countries/Footer";
import Header from "./countries/Header";
import { AppDispatch } from "../app/store";
import { fetchCountries } from "../redux/countries/countriesSlice";
import { useAppSelector } from "../app/hooks";

export const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const dataFetched = useAppSelector((state) => state.countriesR.fetched);
  const countries = useAppSelector((state) => state.countriesR.countries);
  const navigate = useNavigate();

  useEffect(() => {
    if (!dataFetched) {
      dispatch(fetchCountries());
    }
  }, [dispatch, dataFetched]);
  const handleRandom = () => {
    const country = countries[Math.floor(Math.random() * countries.length)];
    navigate(`/countries/${country.name.split(" ").join("_")}`);
  };
  return (
    <Box>
      <Header></Header>

      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Where to GO ?
        </Typography>
        <Button variant="contained" onClick={handleRandom}>
          Get Random Country
        </Button>
      </Container>

      <Footer></Footer>
    </Box>
  );
};
