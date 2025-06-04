import { PetActionTypes } from "../constants/actionTypes";
import petService from "../services/pet.service";
import { AppDispatch } from "../stores/configureStore";

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

export const deletePet = (id: number) => {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: PetActionTypes.REMOVE_PET_REQUEST });

    try {
      await petService.deletePet(id);
      dispatch({
        type: PetActionTypes.REMOVE_PET_SUCCESS,
        payload: id,
        isLoading: false,
      });
    } catch (error) {
      console.error("Error in deletePet:", error);
      dispatch({
        type: PetActionTypes.REMOVE_PET_FAILURE,
        payload: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };
};

export const updatePet = (petData: FormData) => {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: PetActionTypes.UPDATE_PET_REQUEST });

    try {
      const pet = await petService.updatePet(petData);
      dispatch({
        type: PetActionTypes.UPDATE_PET_SUCCESS,
        payload: pet,
      });
    } catch (error) {
      dispatch({
        type: PetActionTypes.UPDATE_PET_FAILURE,
        payload: error.message,
      });
    }
  };
};
