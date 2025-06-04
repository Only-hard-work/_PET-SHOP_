import React, { useReducer, useState } from "react";
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
  IconButton,
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import CakeIcon from "@mui/icons-material/Cake";
import { PetProfileModal } from "./PetProfileModal/PetProfileModal";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../stores/configureStore";
import { deletePet } from "../../actions/pet.actions";
import { Delete, Edit } from "@mui/icons-material";
import { PetEditModal } from "./EditPetModal/EditPetModal";

interface PetCardProps {
  pet: Pet;
  isLoading?: boolean;
}

const PetCard: React.FC<PetCardProps> = ({ pet, isLoading = false }) => {
  const [isOpenedPetModal, setIsOpenedPetModal] = useState(false);
  const [isOpenedEditModal, setIsOpenedEditModal] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const updatedPet = useSelector((state: RootState) => {
    return state.pet.pet;
  });
  const currentPet =
    updatedPet.name != "" && updatedPet.id == pet.id ? updatedPet : pet;
  const isOwner = user.id === currentPet.ownerId;
  const dispatch = useAppDispatch();

  const handleDelete = async (id: number) => {
    if (window.confirm("Вы уверены, что хотите удалить это животное?")) {
      try {
        await dispatch(deletePet(id));
      } catch (error) {
        console.error("Ошибка при удалении:", error);
      }
    }
  };

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
          position: "relative",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
          },
        }}
      >
        {isOwner && (
          <Box
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              zIndex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderRadius: "12px",
              p: 0.5,
              boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
              border: "1px solid rgba(0,0,0,0.05)",
            }}
          >
            <IconButton
              aria-label="edit"
              onClick={(e) => {
                e.stopPropagation();
              }}
              size="small"
              sx={{
                width: 32,
                height: 32,
                "&:hover": {
                  backgroundColor: "rgba(25, 118, 210, 0.08)",
                },
              }}
              onClickCapture={() => setIsOpenedEditModal(true)}
            >
              <Edit fontSize="small" color="primary" />
            </IconButton>

            <IconButton
              aria-label="delete"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(pet.id);
              }}
              size="small"
              sx={{
                width: 32,
                height: 32,
                "&:hover": {
                  backgroundColor: "rgba(211, 47, 47, 0.08)",
                },
              }}
            >
              <Delete fontSize="small" color="error" />
            </IconButton>
          </Box>
        )}
        <CardMedia
          component="img"
          height="240"
          image={currentPet.image}
          alt={currentPet.name}
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
              {currentPet.name}
            </Typography>
            <Chip
              label={currentPet.type === "dog" ? "собака" : "кошка"}
              color={currentPet.type === "dog" ? "primary" : "secondary"}
              size="small"
              icon={<PetsIcon fontSize="small" />}
            />
          </Stack>
          <Stack direction="row" spacing={1} sx={{ my: 1 }}>
            <Chip label={currentPet.breed} variant="outlined" size="small" />
            <Chip
              label={`${currentPet.age} yrs`}
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
            {currentPet.description}
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
              {`$ ${currentPet.price.toLocaleString()}`}
            </Typography>

            {currentPet.rating && (
              <Rating
                value={currentPet.rating}
                precision={0.5}
                readOnly
                size="small"
              />
            )}
          </Box>
        </CardContent>
        {!isOwner && (
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
        )}
      </Card>
      <PetProfileModal
        pet={pet}
        isOpenedPetModal={isOpenedPetModal}
        setIsOpenedPetModal={setIsOpenedPetModal}
      />
      <PetEditModal
        open={isOpenedEditModal}
        onClose={() => setIsOpenedEditModal(false)}
        pet={currentPet}
      />
    </>
  );
};

export default PetCard;
