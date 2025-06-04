import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchPets } from "../../actions/pet.actions";
import ErrorMessage from "../common/ErrorMessage";
import { RootState, useAppDispatch } from "../../stores/configureStore";
import { PetList } from "./PetList";
import {
  Avatar,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Menu,
  MenuItem,
  useTheme,
  Fade,
  Button,
  InputBase,
  alpha,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import "./styles/pets.styles.css";
import { Pet } from "../../types";

const PetsPage: React.FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token, user } = useSelector((state: RootState) => state.auth);
  const { items: pets, error } = useSelector((state: RootState) => state.pets);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchPets());
  }, [dispatch]);

  if (error) return <ErrorMessage message={error} />;

  const getInitials = (name?: string) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    localStorage.clear();
    window.location.reload();
  };

  const filteredPets = pets.filter(
    (pet: Pet) =>
      pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: theme.palette.background.default }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: "white",
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography
              variant="h5"
              component="div"
              sx={{
                color: theme.palette.primary.main,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              🐾 PetFinder
            </Typography>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  borderRadius: theme.shape.borderRadius,
                  backgroundColor: alpha(theme.palette.common.black, 0.04),
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.common.black, 0.06),
                  },
                  marginRight: 2,
                  width: "300px",
                }}
              >
                <Box
                  sx={{
                    padding: theme.spacing(0, 2),
                    height: "100%",
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <SearchIcon sx={{ color: "text.secondary" }} />
                </Box>
                <InputBase
                  placeholder="Search pets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{
                    color: "inherit",
                    padding: theme.spacing(1, 1, 1, 6),
                    width: "100%",
                  }}
                />
              </Box>

              {token ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "text.primary",
                      fontWeight: 500,
                    }}
                  >
                    {user?.name}
                  </Typography>
                  <IconButton
                    onClick={handleMenuOpen}
                    sx={{
                      p: 0.5,
                      border: `2px solid ${theme.palette.primary.main}`,
                      "&:hover": {
                        backgroundColor: alpha(
                          theme.palette.primary.main,
                          0.04
                        ),
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 35,
                        height: 35,
                        bgcolor: theme.palette.primary.main,
                        fontSize: "0.9rem",
                      }}
                      src={user?.avatar}
                    >
                      {getInitials(user.username)}
                    </Avatar>
                  </IconButton>
                </Box>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => navigate("/login")}
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  Sign In
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {/* User Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        sx={{
          "& .MuiPaper-root": {
            mt: 1,
            minWidth: 180,
            boxShadow: theme.shadows[3],
          },
        }}
      >
        <MenuItem
          onClick={() => {
            navigate(`/profile/${user?.id}`);
            handleMenuClose();
          }}
          sx={{ gap: 1.5 }}
        >
          <PersonOutlineIcon fontSize="small" />
          Профиль
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ gap: 1.5 }}>
          <SettingsIcon fontSize="small" />
          Настройки
        </MenuItem>
        <MenuItem
          onClick={handleLogout}
          sx={{
            color: theme.palette.error.main,
            gap: 1.5,
          }}
        >
          <LogoutIcon fontSize="small" />
          Выйти
        </MenuItem>
      </Menu>

      {/* Main Content */}
      <Box sx={{ pt: 10 }}>
        <PetList pets={filteredPets} />
      </Box>
    </Box>
  );
};

export default PetsPage;
