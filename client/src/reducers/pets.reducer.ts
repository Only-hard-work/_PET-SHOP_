import { PetActionTypes } from "../constants/actionTypes";
import { PetsState } from "../types/index";

const initialState: PetsState = {
  items: [],
  isLoading: false,
  error: null,
  favorites: [],
};

export default function petsReducer(state = initialState, action: any) {
  switch (action.type) {
    case PetActionTypes.FETCH_PETS_REQUEST:
      return { ...state, isLoading: true, error: null };
    case PetActionTypes.FETCH_PETS_SUCCESS:
      return { ...state, items: action.payload, isLoading: false };
    case PetActionTypes.FETCH_PETS_FAILURE:
      return { ...state, error: action.payload, isLoading: false };
    case PetActionTypes.REMOVE_PET_REQUEST:
      return { ...state, isLoading: true, error: null };
    case PetActionTypes.REMOVE_PET_SUCCESS:
      return {
        ...state,
        items: state.items.filter((pet) => pet.id != action.payload),
        isLoading: false,
      };
    case PetActionTypes.REMOVE_PET_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
}
