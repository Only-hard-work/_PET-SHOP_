import { PetActionTypes } from "../constants/actionTypes";
import { Pet, PetsState } from "../types/index";

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
        items: state.items.filter((pet) => pet.id !== action.payload),
        isLoading: false,
      };
    case PetActionTypes.UPDATE_PET_IN_LIST:
      return {
        ...state,
        items: state.items.map((pet) => (pet.id === action.payload.id ? action.payload : pet)),
      };
    case PetActionTypes.REMOVE_PET_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case PetActionTypes.ADD_TO_FAVORITES:
      if (state.favorites.some((pet: Pet) => pet.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case PetActionTypes.REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter((pet) => pet.id !== action.payload),
      };
    default:
      return state;
  }
}
