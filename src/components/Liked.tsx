import { Box } from "@mui/material";

import Countries from "./countries/Countries";
import Footer from "./countries/Footer";
import Header from "./countries/Header";

export const Liked = () => {
  return (
    <Box>
      <Header></Header>
      <Countries likedOnly={true}></Countries>
      <Footer></Footer>
    </Box>
  );
};
