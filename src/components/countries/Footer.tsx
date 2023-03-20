import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import { Link as ReactLink } from "react-router-dom";

const Footer = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={ReactLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex" },
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            theRomeo`s Countries
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Footer;
