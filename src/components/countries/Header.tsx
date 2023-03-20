import {
  AppBar,
  Badge,
  Box,
  Container,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as ReactLink } from "react-router-dom";
import React from "react";
import { useDispatch } from "react-redux";

import { reset, switchMode } from "../../redux/countries/countriesSlice";
import { useAppSelector } from "../../app/hooks";

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const likedCount = useAppSelector(
    (state) => state.countriesR.countries
  ).filter((c) => c.liked).length;
  const dispatch = useDispatch();

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    dispatch(reset());
  };
  const darkMode = useAppSelector((state) => state.countriesR.darkMode);

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
              display: { xs: "none", md: "flex" },
              fontWeight: 700,

              color: "inherit",
              textDecoration: "none",
            }}
          >
            theRomeo`s Countries
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "space-around",
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  to="/home"
                  component={ReactLink}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    display: "block",
                    margin: 1,
                    textDecoration: "none",
                    padding: "5px",
                  }}
                >
                  Home
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  to="/main"
                  component={ReactLink}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    display: "block",
                    margin: 1,
                    textDecoration: "none",
                    padding: "5px",
                  }}
                >
                  Countries
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  to="/liked"
                  component={ReactLink}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    display: "block",
                    margin: 1,
                    textDecoration: "none",
                    padding: "5px",
                  }}
                >
                  Favourites
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Switch
                  onChange={() => dispatch(switchMode())}
                  checked={darkMode}
                />
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component={ReactLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,

              color: "inherit",
              textDecoration: "none",
            }}
          >
            theRomeo`s Countries
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                md: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              },
            }}
          >
            <Link
              to="/home"
              component={ReactLink}
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                color: "white",
                display: "block",

                textDecoration: "none",
              }}
            >
              Home
            </Link>
            <Link
              to="/main"
              component={ReactLink}
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                color: "white",
                display: "block",
                margin: 1,
                textDecoration: "none",
                padding: "5px",
              }}
            >
              Countries
            </Link>
            <Badge badgeContent={likedCount} color="error">
              <Link
                to="/liked"
                component={ReactLink}
                onClick={handleCloseNavMenu}
                sx={{
                  color: "white",
                  display: "block",

                  textDecoration: "none",
                }}
              >
                Favourite
              </Link>
            </Badge>

            <Switch
              onChange={() => dispatch(switchMode())}
              sx={{ ml: 5 }}
              checked={darkMode}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
