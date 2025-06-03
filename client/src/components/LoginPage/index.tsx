import React, { useState } from "react";
import { login } from "../../actions/auth.actions";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useAppDispatch } from "../../stores/configureStore";
import { redirect, useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(login(formData));
      navigate("/pets");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
          <Box display={"flex"} justifyContent={"flex-end"}>
            <Button
              type="button"
              variant="contained"
              color="success"
              size="large"
              sx={{ mt: 2, mr: 2 }}
              onClick={() => navigate("/register")}
            >
              Создать новый аккаунт
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 2 }}
            >
              Вход
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default LoginForm;
