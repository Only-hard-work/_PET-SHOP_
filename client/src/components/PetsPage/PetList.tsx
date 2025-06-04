// PetList.tsx
import React, { useState } from "react";
import { Pet } from "../../types";
import PetCard from "./PetCard";
import {
  Box,
  Grow,
  Paper,
  Skeleton,
  Pagination,
  Container,
  Typography,
  useTheme,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/configureStore";
import { EditPetModal } from "./EditPetModal/EditPetModal";

interface PetListProps {
  pets: Pet[];
  isLoading?: boolean;
  isProfilePage?: boolean;
}

export const PetList = ({ pets, isProfilePage = false }: PetListProps) => {
  const theme = useTheme();
  const skeletonItems = Array(12).fill(null);
  const { isLoading } = useSelector((state: RootState) => state.pets);

  // Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(pets.length / itemsPerPage);

  const paginatedPets = !isLoading
    ? pets.slice((page - 1) * itemsPerPage, page * itemsPerPage)
    : skeletonItems.slice(0, itemsPerPage);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {!isProfilePage && (
        <Typography
          variant="h4"
          component="h1"
          align="center"
          gutterBottom
          sx={{
            mb: 4,
            fontWeight: 700,
            color: theme.palette.primary.main,
          }}
        >
          Найди своего чудесного питомца!
        </Typography>
      )}

      <Box
        display="flex"
        flexWrap="wrap"
        gap={3}
        justifyContent="center"
        className="pet_list"
        sx={{
          "& > *": {
            flex: "1 1 300px",
            maxWidth: "320px",
            minWidth: "280px",
          },
        }}
      >
        {paginatedPets.map((item, index) => (
          <Grow
            in
            timeout={(index + 1) * 200}
            key={isLoading ? `skeleton-${index}` : item.id}
          >
            <Paper
              elevation={2}
              sx={{
                width: "100%",
                borderRadius: 2,
                overflow: "hidden",
                backgroundColor: theme.palette.background.paper,
                "&:hover": {
                  transform: !isLoading ? "scale(1.03)" : undefined,
                  transition: !isLoading ? "all 0.3s ease-in-out" : undefined,
                  boxShadow: !isLoading ? theme.shadows[8] : undefined,
                },
              }}
            >
              {isLoading ? (
                <>
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={400}
                    sx={{ bgcolor: "grey.100" }}
                  />
                  <Box sx={{ p: 2 }}>
                    <Skeleton width="60%" height={32} />
                    <Skeleton width="40%" height={24} />
                    <Skeleton width="30%" height={28} sx={{ mt: 2 }} />
                    <Skeleton
                      width="100%"
                      height={36}
                      sx={{ mt: 2, borderRadius: 1 }}
                    />
                  </Box>
                </>
              ) : (
                <PetCard pet={item} />
              )}
            </Paper>
          </Grow>
        ))}
      </Box>

      {!isLoading && pets.length > itemsPerPage && (
        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "center",
            "& .MuiPagination-ul": {
              gap: 1,
            },
          }}
        >
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
            size="large"
            sx={{
              "& .MuiPaginationItem-root": {
                fontSize: "1.1rem",
                "&:hover": {
                  backgroundColor: theme.palette.primary.light,
                  color: theme.palette.common.white,
                },
              },
            }}
          />
        </Box>
      )}
      <EditPetModal />
    </Container>
  );
};
