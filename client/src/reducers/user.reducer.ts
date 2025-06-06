import { PetActionTypes, UserActionTypes } from "../constants/actionTypes";
import { User } from "../types/user.types";

export interface UserState {
  userProfile: User;
}

const initialState: UserState = {
  userProfile: {
    id: 0,
    username: "",
    email: "",
    password: "",
    avatar: "",
    phone: "",
    address: "",
    pets: [],
  },
};

export default function userReducer(state = initialState, action: any) {
  switch (action.type) {
    case UserActionTypes.GET_USER_PROFILE_INFO_REQUEST:
      return { ...state, isLoading: true, error: null };
    case UserActionTypes.GET_USER_PROFILE_INFO_SUCCESS:
      return {
        ...state,
        userProfile: action.payload,
        isLoading: false,
        error: null,
      };
    case UserActionTypes.GET_USER_PROFILE_INFO_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case PetActionTypes.UPDATE_PET_SUCCESS:
      return {
        ...state,
        items: state.userProfile.pets.map((pet) =>
          pet.id === action.payload.id ? action.payload : pet,
        ),
        isLoading: false,
      };
    case PetActionTypes.UPDATE_PET_IN_LIST:
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          pets: state.userProfile.pets.map((pet) =>
            pet.id === action.payload.id ? action.payload : pet,
          ),
        },
      };
    case PetActionTypes.REMOVE_PET_FROM_USER_PROFILE:
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          pets: state.userProfile.pets.filter((pet) => pet.id !== action.payload),
        },
      };
    default:
      return state;
  }
}
