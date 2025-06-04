import { PetActionTypes } from "../constants/actionTypes";
import { PetState } from '../types/index';

const initialState: PetState = {
    pet: {
        id: 0,
        name: '',
        type: 'cat',
        breed: '',
        age: NaN,
        price: NaN,
        description: '',
        image: '',
    },
    isLoading: false,
    error: null,
};

export default function petReducer(state = initialState, action: any) {
    switch (action.type) {
        case PetActionTypes.CREATE_PET_REQUEST:
            return { ...state, isLoading: true, error: null };
        case PetActionTypes.CREATE_PET_SUCCESS:
            return { ...state, items: action.payload, isLoading: false };
        case PetActionTypes.CREATE_PET_FAILURE:
            return { ...state, error: action.payload, isLoading: false };
        case PetActionTypes.REMOVE_PET_REQUEST:
            return { ...state, isLoading: false, error: null };
        case PetActionTypes.REMOVE_PET_SUCCESS:
            return { ...state, isLoading: false, items: action.payload };
        case PetActionTypes.REMOVE_PET_FAILURE:
            return { ...state, isLoading: false, error: action.payload };
        default:
            return state;
    }
};
