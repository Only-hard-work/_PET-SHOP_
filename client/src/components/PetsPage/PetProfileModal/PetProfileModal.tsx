import { Box, Button, CardMedia, Chip, Divider, Modal, Rating, Stack, Typography } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import CakeIcon from "@mui/icons-material/Cake";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Pet } from "../../../types";

interface petProfileProps {
  isOpenedPetModal: boolean;
  setIsOpenedPetModal: React.Dispatch<React.SetStateAction<boolean>>;
  pet: Pet;
}

export const PetProfileModal: React.FC<petProfileProps> = ({
  isOpenedPetModal,
  setIsOpenedPetModal,
  pet,
}) => {
  return (
    <Modal
      open={isOpenedPetModal}
      onClose={() => setIsOpenedPetModal(false)}
      aria-labelledby="pet-modal-title"
      aria-describedby="pet-modal-description"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: { xs: "90%", sm: 500 },
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          outline: "none",
          maxHeight: "90vh",
          overflow: "auto",
        }}
      >
        <CardMedia
          component="img"
          height="300"
          image={pet.image}
          alt={pet.name}
          sx={{ objectFit: "cover" }}
        />

        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h4" component="h2" sx={{ fontWeight: 700 }}>
              {pet.name}
            </Typography>

            <Chip
              label={pet.type === "dog" ? "Собака" : "Кошка"}
              color={pet.type === "dog" ? "primary" : "secondary"}
              icon={<PetsIcon />}
              sx={{ textTransform: "capitalize" }}
            />
          </Box>

          <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
            <Chip
              label={pet.breed}
              variant="outlined"
              color="info"
              size="medium"
            />
            <Chip
              label={`${pet.age} ${
                pet.age === 1 ? "год" : pet.age < 5 ? "года" : "лет"
              }`}
              icon={<CakeIcon />}
              size="medium"
            />
          </Stack>

          <Typography variant="body1" paragraph sx={{ mb: 3 }}>
            {pet.description}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Характеристики:
            </Typography>
            <Stack spacing={1}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AttachMoneyIcon color="success" sx={{ mr: 1 }} />
                <Typography>
                  Цена: <strong>${pet.price.toLocaleString()}</strong>
                </Typography>
              </Box>
              {pet.rating && (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Rating
                    value={pet.rating}
                    precision={0.5}
                    readOnly
                    sx={{ mr: 1 }}
                  />
                  <Typography>Рейтинг: {pet.rating.toFixed(1)}</Typography>
                </Box>
              )}
            </Stack>
          </Box>

          <Button
            variant="contained"
            fullWidth
            size="large"
            sx={{
              py: 1.5,
              fontWeight: 600,
              fontSize: "1.1rem",
              borderRadius: 1,
            }}
            startIcon={<PetsIcon />}
          >
            Хочу забрать!
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
