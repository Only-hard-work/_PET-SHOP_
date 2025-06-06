import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/common/PrivateRoute";
import LoginForm from "./components/LoginPage";
import RegisterForm from "./components/RegisterPage";
import PetsPage from "./components/PetsPage";
import { UserProfile } from "./components/UserProfilePage/UserProfile";
import { PetForm } from "./components/PetsPage/AddPetForm/PetForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/profile/:id"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/pets/new"
          element={
            <PrivateRoute>
              <PetForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/pets"
          element={
            <PrivateRoute>
              <PetsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <PetsPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
