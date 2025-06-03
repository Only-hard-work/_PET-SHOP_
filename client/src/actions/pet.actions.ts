import { PetActionTypes } from "../constants/actionTypes";
import petService from "../services/pet.service";
import { AppDispatch } from "../stores/configureStore";
import { Pet } from "../types";

export const fetchPets = () => {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: PetActionTypes.FETCH_PETS_REQUEST });

    try {
      const pets = await petService.getAllPets();

      dispatch({
        type: PetActionTypes.FETCH_PETS_SUCCESS,
        payload: pets,
      });
    } catch (error) {
      dispatch({
        type: PetActionTypes.FETCH_PETS_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const createPet = (petData: FormData) => {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: PetActionTypes.CREATE_PET_REQUEST });

    try {
      const pet = await petService.createPet(petData);
      dispatch({
        type: PetActionTypes.CREATE_PET_SUCCESS,
        payload: pet,
      });
    } catch (error) {
      dispatch({
        type: PetActionTypes.CREATE_PET_FAILURE,
        payload: error.message,
      });
    }
  };
};
