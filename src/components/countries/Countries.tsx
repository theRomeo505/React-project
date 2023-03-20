import { fas, faHeart, faPlay } from "@fortawesome/free-solid-svg-icons";
import {
  Box,
  Button,
  Container,
  LinearProgress,
  Link,
  List,
  ListItem,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import { Link as ReactLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Typography from "@mui/material/Typography";

import { useAppSelector } from "../../app/hooks";
import { AppDispatch } from "../../app/store";
import {
  changePage,
  like,
  setDisplayed,
  search,
  sort,
  toggleNotification,
} from "../../redux/countries/countriesSlice";
import { CountryType } from "./Country";
import React from "react";

library.add(fas, faHeart, faPlay);
export enum SortParam {
  name = "name",
  population = "population",
}
export enum SortDirection {
  ascending = 1,
  descending = 0,
}

const Countries = (props: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const displayedCountries: Array<CountryType> = useAppSelector(
    (state) => state.countriesR.displayedCountries
  );

  const isLoading: Boolean = useAppSelector(
    (state) => state.countriesR.isLoading
  );
  const error: string | null = useAppSelector(
    (state) => state.countriesR.error
  );
  const page: number = useAppSelector((state) => state.countriesR.page);
  const elementsOnPage = useAppSelector(
    (state) => state.countriesR.elementsOnPage
  );

  const searchValue: string = useAppSelector(
    (state) => state.countriesR.searchValue
  );

  const isNotification = useAppSelector(
    (state) => state.countriesR.isNotification
  );

  const sortDirections: {
    name: SortDirection;
    population: SortDirection;
  } = useAppSelector((state) => state.countriesR.sortDirections);

  const handleSort = (sortParam: SortParam) => {
    dispatch(sort(sortParam));
  };
  const populationToString = (population: number) => {
    let populationString: string = "",
      count = 1;
    while (population > 0) {
      populationString =
        (count % 3 === 0 ? " " : "") + (population % 10) + populationString;

      population = Math.floor(population / 10);
      count++;
    }
    return populationString;
  };

  const manageLike = (id: string) => {
    dispatch(like({ id: id, likedOnly: props.likedOnly }));
    dispatch(toggleNotification());
  };

  useEffect(() => {
    dispatch(setDisplayed({ likedOnly: props.likedOnly }));
  }, [dispatch, props.likedOnly]);
  return (
    <Container
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {isLoading && <LinearProgress color="secondary" />}
      {error && <div> {error}</div>}
      {displayedCountries.length === 0 ? (
        <div>
          Nothing to show here yet. Try adding countries to your Favourites in
          Countries tab
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              label="Search"
              type="search"
              variant="filled"
              value={searchValue}
              onChange={(action) => {
                dispatch(
                  search({
                    value: action.target.value,
                    likedOnly: props.likedOnly,
                  })
                );
              }}
              sx={{ width: { xs: "150px" } }}
            />
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                onClick={() => dispatch(changePage(-1))}
                disabled={page - 1 === 0}
                color="primary"
                sx={{ fontSize: "24px" }}
              >
                {"<"}
              </Button>
              <Typography
                sx={{ fontSize: "24px", lineHeight: 1 }}
                component="span"
              >
                {page}
              </Typography>
              <Button
                onClick={() => dispatch(changePage(1))}
                disabled={
                  page === Math.ceil(displayedCountries.length / elementsOnPage)
                }
                color="primary"
                sx={{ fontSize: "24px" }}
              >
                {">"}
              </Button>
            </Box>
          </Box>

          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                  Flag
                </TableCell>
                <TableCell onClick={() => handleSort(SortParam.name)}>
                  Name
                  {sortDirections.name ? "▼" : "▲"}
                </TableCell>
                <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                  Region
                </TableCell>
                <TableCell
                  sx={{ display: { xs: "none", md: "table-cell" } }}
                  onClick={() => handleSort(SortParam.population)}
                >
                  Population{sortDirections.population ? "▼" : "▲"}
                </TableCell>
                <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                  Languages
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayedCountries
                .slice(elementsOnPage * (page - 1), elementsOnPage * page)
                .map((country, index) => (
                  <TableRow key={index}>
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ display: { xs: "none", sm: "table-cell" } }}
                    >
                      <Box
                        component="img"
                        sx={{
                          height: { xs: 80, md: 100 },
                          width: { xs: 115, md: 150 },
                        }}
                        alt={`flag of ${country.name}`}
                        src={country.flag}
                      />
                    </TableCell>
                    <TableCell>{country.name}</TableCell>
                    <TableCell
                      sx={{ display: { xs: "none", sm: "table-cell" } }}
                    >
                      {country.region}
                    </TableCell>
                    <TableCell
                      sx={{ display: { xs: "none", md: "table-cell" } }}
                    >
                      {country.population
                        ? populationToString(country.population)
                        : "Noone lives there"}
                    </TableCell>
                    <TableCell
                      sx={{ display: { xs: "none", md: "table-cell" } }}
                    >
                      <List>
                        {country.languages.map((lang, index) => (
                          <ListItem disablePadding key={index}>
                            {lang}
                          </ListItem>
                        ))}
                      </List>
                    </TableCell>
                    <TableCell>
                      <Button
                        sx={{
                          color: country.liked ? "red" : "",
                          fontSize: 24,
                        }}
                        onClick={() => manageLike(country.id)}
                      >
                        <FontAwesomeIcon icon={["fas", "heart"]} />
                        <Snackbar
                          open={isNotification}
                          autoHideDuration={1500}
                          onClose={() => {
                            dispatch(toggleNotification());
                          }}
                          message="Country added to Favourites"
                        />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Link
                        sx={{ fontSize: 24 }}
                        component={ReactLink}
                        to={`/countries/${country.name.split(" ").join("_")}`}
                      >
                        <FontAwesomeIcon icon={["fas", "play"]} />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default Countries;
