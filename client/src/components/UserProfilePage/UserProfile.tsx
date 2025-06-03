import { useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  Button,
  Paper,
  IconButton,
  Chip,
  Stack,
  Tooltip,
} from "@mui/material";
import {
  Edit,
  Add,
  Pets,
  Phone,
  Email,
  Home,
  Delete,
  Close,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/configureStore";
import { PetList } from "../PetsPage/PetList";
import { Pet } from "../../types";
import { useNavigate } from "react-router-dom";

export const UserProfile = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* Профиль пользователя */}
      <Paper
        sx={{
          p: { xs: 2, md: 4 },
          mb: 4,
          borderRadius: 3,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            minWidth: { md: 200 },
            maxWidth: { md: 200 },
          }}
        >
          <Avatar
            src={user?.avatar}
            sx={{
              width: 150,
              height: 150,
              border: "3px solid",
              borderColor: "primary.main",
            }}
          />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
            {user?.username}
            <Tooltip title="Редактировать профиль">
              <IconButton color="primary" sx={{ ml: 1 }}>
                <Edit fontSize="small" />
              </IconButton>
            </Tooltip>
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <Chip
              icon={<Email fontSize="small" />}
              label={user?.email}
              size="small"
              variant="outlined"
            />
            {user?.phone && (
              <Chip
                icon={<Phone fontSize="small" />}
                label={user.phone}
                size="small"
                variant="outlined"
              />
            )}
          </Stack>

          {user?.address && (
            <Box display="flex" alignItems="center" mb={2}>
              <Home color="action" sx={{ mr: 1 }} />
              <Typography variant="body1">{user.address}</Typography>
            </Box>
          )}

          <Button variant="contained" startIcon={<Edit />} sx={{ mr: 2 }}>
            Редактировать
          </Button>
        </Box>
      </Paper>

      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Мои питомцы
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{ borderRadius: 5 }}
            onClick={() => navigate('/pets/new')}
          >
            Добавить питомца
          </Button>
        </Box>

        {user?.pets?.length ? (
          <PetList pets={user.pets} />
        ) : (
          <Paper sx={{ p: 4, textAlign: "center", borderRadius: 3 }}>
            <Pets sx={{ fontSize: 60, color: "text.disabled", mb: 2 }} />
            <Typography variant="h6" color="text.secondary" mb={2}>
              У вас пока нет питомцев
            </Typography>
            <Button variant="outlined" startIcon={<Add />}>
              Добавить первого питомца
            </Button>
          </Paper>
        )}
      </Box>
    </Box>
  );
};
