import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

export const AddPetButton = () => {
  const navigate = useNavigate();

  return (
    <Fab
      color="primary"
      aria-label="add"
      sx={{
        position: "fixed",
        bottom: 32,
        right: 32,
        zIndex: 1000,
      }}
      onClick={() => navigate("/pets/new")}
    >
      <AddIcon />
    </Fab>
  );
};
