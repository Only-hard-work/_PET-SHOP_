import React from "react";
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  IconButton,
  Avatar,
  Paper,
  Button,
  Chip,
  Stack,
  Divider,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PetsIcon from "@mui/icons-material/Pets";
import { Pet } from "../../../types";
import { useAppDispatch } from "../../../stores/configureStore";
import { removeFromFavorites } from "../../../actions/pet.actions";

interface FavoritesListProps {
  favorites: Pet[];
  setShowFavorites: (value: React.SetStateAction<boolean>) => void;
}

export const FavoritesList: React.FC<FavoritesListProps> = ({ favorites, setShowFavorites }) => {
  const dispatch = useAppDispatch();

  if (favorites.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper
          elevation={24}
          sx={{
            p: 4,
            textAlign: "center",
            backgroundColor: "background.default",
            borderRadius: 2,
            border: "1px dashed rgba(0, 0, 0, 0.12)",
          }}
        >
          <FavoriteIcon
            sx={{
              fontSize: 60,
              color: "primary.light",
              mb: 2,
            }}
          />
          <Typography variant="h5" gutterBottom>
            В избранном пока пусто
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Добавляйте понравившихся питомцев в избранное, чтобы не потерять их
          </Typography>
          <Button variant="contained" color="primary" onClick={() => setShowFavorites(false)}>
            Вернуться к поиску
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Избранные питомцы
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {`${favorites.length} ${favorites.length === 1 ? "питомец" : "питомцев"} в избранном`}
        </Typography>
      </Box>

      <Paper elevation={0} sx={{ borderRadius: 2 }}>
        <List>
          {favorites.map((pet, index) => (
            <React.Fragment key={pet.id}>
              {index > 0 && <Divider />}
              <ListItem
                sx={{
                  py: 2,
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.02)",
                  },
                }}
              >
                <Box sx={{ display: "flex", width: "100%", gap: 2 }}>
                  <Avatar
                    src={pet.image}
                    variant="rounded"
                    sx={{
                      width: 120,
                      height: 120,
                      borderRadius: 2,
                    }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                          {pet.name}
                        </Typography>
                        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                          <Chip
                            label={pet.type === "dog" ? "собака" : "кошка"}
                            color={pet.type === "dog" ? "primary" : "secondary"}
                            size="small"
                            icon={<PetsIcon fontSize="small" />}
                          />
                          <Chip label={pet.breed} variant="outlined" size="small" />
                          <Chip label={`${pet.age} лет`} variant="outlined" size="small" />
                        </Stack>
                      </Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: "primary.main",
                        }}
                      >
                        ${pet.price.toLocaleString()}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        mb: 1,
                      }}
                    >
                      {pet.description}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Button variant="outlined" size="small" onClick={() => {}}>
                        Подробнее
                      </Button>
                      <IconButton
                        color="error"
                        onClick={() => dispatch(removeFromFavorites(pet.id))}
                        size="small"
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Container>
  );
};
