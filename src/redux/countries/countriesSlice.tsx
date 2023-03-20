import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { v4 as uuid } from "uuid";

import { baseURL } from "../../API/countriesAPI";
import { CountryType } from "../../components/countries/Country";
import { SortDirection, SortParam } from "../../components/countries/Countries";

const initialState: {
  countries: Array<CountryType>;
  displayedCountries: Array<CountryType>;
  error: string | null;
  isLoading: Boolean;
  sortDirections: {
    name: SortDirection;
    population: SortDirection;
  };
  page: number;
  elementsOnPage: number;
  searchValue: string;
  fetched: boolean;
  darkMode: boolean;
  isNotification: boolean;
} = {
  countries: [],
  displayedCountries: [],
  error: null,
  isLoading: false,
  sortDirections: {
    name: SortDirection.ascending,
    population: SortDirection.ascending,
  },
  page: 1,
  elementsOnPage: 5,
  searchValue: "",
  fetched: false,
  darkMode: false,
  isNotification: false,
};

export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  async () => {
    const response = await axios.get(baseURL);
    return await response.data;
  }
);

const compareCountries = (
  a: CountryType,
  b: CountryType,
  sortParam: SortParam,
  direction: SortDirection
) => {
  if (a[sortParam] > b[sortParam]) return direction ? 1 : -1;
  else if (b[sortParam] > a[sortParam]) return direction ? -1 : 1;
  else return 0;
};

export const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    sort: (state, action) => {
      const sortParam: SortParam = action.payload;
      state.displayedCountries = state.displayedCountries.sort((a, b) =>
        compareCountries(a, b, sortParam, state.sortDirections[sortParam])
      );
      state.sortDirections[sortParam] =
        state.sortDirections[sortParam] === SortDirection.ascending
          ? SortDirection.descending
          : SortDirection.ascending;
    },
    changePage: (state, action) => {
      state.page += action.payload;
    },
    search: (state, action) => {
      state.searchValue = action.payload.value;
      const likedOnly = action.payload.likedOnly;
      state.displayedCountries = state.countries.filter((country) => {
        if (
          (country.name
            .toLowerCase()
            .includes(state.searchValue.toLocaleLowerCase()) &&
            !likedOnly) ||
          (likedOnly &&
            country.liked &&
            country.name
              .toLowerCase()
              .includes(state.searchValue.toLocaleLowerCase()))
        )
          return true;

        return false;
      });
      state.page = 1;
    },
    like: (state, action) => {
      const indexCountries = state.countries.findIndex(
        (e) => e.id === action.payload.id
      );
      const indexDisplayed = state.displayedCountries.findIndex(
        (e) => e.id === action.payload.id
      );

      state.countries[indexCountries].liked =
        !state.countries[indexCountries].liked;
      state.displayedCountries[indexDisplayed].liked =
        !state.displayedCountries[indexDisplayed].liked;

      if (action.payload.likedOnly)
        state.displayedCountries.splice(indexDisplayed, 1);
    },
    setDisplayed: (state, action) => {
      if (action.payload.likedOnly)
        state.displayedCountries = state.countries.filter(
          (e) => e.liked === true
        );
      else state.displayedCountries = state.countries;
    },
    reset: (state) => {
      state.page = 1;
      state.searchValue = "";
    },
    switchMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    toggleNotification: (state) => {
      state.isNotification = !state.isNotification;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.countries = action.payload.map((c: any) => {
        return {
          id: uuid(),
          name: c.name.common,
          flag: c.flags.png,
          population: c.population,
          capital: c.capital,
          region: c.region,
          languages: c.languages ? Object.values(c.languages) : [],
          liked: false,
        };
      });
      state.displayedCountries = state.countries;
      state.isLoading = false;
      state.fetched = true;
    });
    builder.addCase(fetchCountries.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCountries.rejected, (state) => {
      state.error = "Error loading countries";
      state.countries = [];
      state.displayedCountries = [];
      state.isLoading = false;
    });
  },
});

export const {
  sort,
  changePage,
  search,
  like,
  setDisplayed,
  reset,
  switchMode,
  toggleNotification,
} = countriesSlice.actions;

export default countriesSlice.reducer;
