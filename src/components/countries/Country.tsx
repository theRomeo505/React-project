import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";

import { useAppSelector } from "../../app/hooks";
import { AppDispatch } from "../../app/store";
import { fetchCountries } from "../../redux/countries/countriesSlice";
import Footer from "./Footer";
import Header from "./Header";

export interface CountryType {
  name: string;
  flag: string;
  population: number;
  capital: Array<string>;
  region: string;
  languages: Array<string>;
  liked: boolean;
  id: string;
}

const Country = () => {
  let { name } = useParams();
  name = name?.split("_").join(" ");
  const dispatch = useDispatch<AppDispatch>();
  const dataFetched = useAppSelector((state) => state.countriesR.fetched);
  useEffect(() => {
    if (!dataFetched) {
      dispatch(fetchCountries());
    }
  }, [dataFetched, dispatch]);

  const countries: Array<CountryType> = useAppSelector(
    (state) => state.countriesR.countries
  );
  const country: CountryType | undefined = countries.find(
    (c) => c.name === name
  );

  return (
    <Box>
      <Header></Header>
      {country ? (
        <Card sx={{ width: { xs: "300px", md: "500px" } }}>
          <CardMedia
            image={country.flag}
            title={country.name}
            sx={{ height: { xs: "150px", md: "250px" } }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {country.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Capital: {country.capital}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Population: {country.population}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Region: {country.region}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <div>No such country</div>
      )}
      <Footer></Footer>
    </Box>
  );
};

export default Country;
