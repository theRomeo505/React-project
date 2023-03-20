import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { fetchCountries } from "../redux/countries/countriesSlice";
import { AppDispatch } from "../app/store";
import Header from "./countries/Header";
import Footer from "./countries/Footer";
import Countries from "./countries/Countries";
import { Box } from "@mui/material";
import { useAppSelector } from "../app/hooks";

const Main = () => {
  const dispatch = useDispatch<AppDispatch>();
  const dataFetched = useAppSelector((state) => state.countriesR.fetched);
  useEffect(() => {
    if (!dataFetched) {
      dispatch(fetchCountries());
    }
  }, [dispatch, dataFetched]);

  return (
    <Box>
      <Header></Header>
      <Countries></Countries>
      <Footer></Footer>
    </Box>
  );
};

export default Main;
