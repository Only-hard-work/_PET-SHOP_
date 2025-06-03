import React, { useState } from "react";
import { Pet } from "../../types";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Chip,
  Stack,
  Box,
  Divider,
  Rating,
  Skeleton,
  Modal,
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import CakeIcon from "@mui/icons-material/Cake";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { PetProfileModal } from "./PetProfileModal/PetProfileModal";

interface PetCardProps {
  pet: Pet;
  isLoading?: boolean;
}

const PetCard: React.FC<PetCardProps> = ({
  pet,
  isLoading = false,
}) => {
  const [isOpenedPetModal, setIsOpenedPetModal] = useState(false);

  if (isLoading) {
    return (
      <Card
        sx={{
          maxWidth: 345,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Skeleton
          variant="rectangular"
          width="100%"
          height={240}
          sx={{ bgcolor: "grey.200" }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Skeleton width="60%" height={32} />
          <Stack direction="row" spacing={1} sx={{ my: 1 }}>
            <Skeleton width={80} height={24} />
            <Skeleton width={80} height={24} />
          </Stack>
          <Skeleton width="100%" height={72} sx={{ mt: 1 }} />
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <Skeleton width={120} height={24} />
          </Box>
          <Skeleton width="100%" height={40} sx={{ mt: 2, borderRadius: 1 }} />
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "transform 0.3s",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
          },
        }}
      >
        <CardMedia
          component="img"
          height="240"
          image={pet.image}
          alt={pet.name}
          sx={{ objectFit: "cover" }}
          onClick={() => setIsOpenedPetModal(true)}
        />
        <CardContent
          sx={{ flexGrow: 1 }}
          onClick={() => setIsOpenedPetModal(true)}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ fontWeight: 600 }}
            >
              {pet.name}
            </Typography>
            <Chip
              label={pet.type}
              color={pet.type === "dog" ? "primary" : "secondary"}
              size="small"
              icon={<PetsIcon fontSize="small" />}
            />
          </Stack>

          <Stack direction="row" spacing={1} sx={{ my: 1 }}>
            <Chip label={pet.breed} variant="outlined" size="small" />
            <Chip
              label={`${pet.age} yrs`}
              icon={<CakeIcon fontSize="small" />}
              size="small"
            />
          </Stack>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 1,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {pet.description}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {`$ ${pet.price.toLocaleString()}`}
            </Typography>

            {pet.rating && (
              <Rating
                value={pet.rating}
                precision={0.5}
                readOnly
                size="small"
              />
            )}
          </Box>
        </CardContent>
          <Button
            variant="contained"
            sx={{
              mt: 2,
              p: 1,
              fontWeight: 600,
              textTransform: "none",
            }}
            startIcon={<PetsIcon />}
          >
            Хочу забрать
          </Button>
      </Card>
        <PetProfileModal
          pet={pet}
          isOpenedPetModal={isOpenedPetModal}
          setIsOpenedPetModal={setIsOpenedPetModal}
        />
    </>
  );
};

export default PetCard;
