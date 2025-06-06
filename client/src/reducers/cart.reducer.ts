import { CartActionTypes } from "../constants/actionTypes";
import { Pet } from "../types";

interface cartItem {
  pet: Pet;
  quantity: number;
}

interface cartState {
  items: cartItem[];
}

const initialState: cartState = {
  items: [],
};

export default function cartReduer(state = initialState, action: any) {
  switch (action.type) {
    case CartActionTypes.ADD_TO_CART:
      // eslint-disable-next-line no-case-declarations
      const existingItem = state.items.find((item) => item.pet.id === action.payload.id);

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.pet.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { pet: action.payload, quantity: 1 }],
      };
    case CartActionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter((item) => item.pet.id !== action.payload),
      };
    case CartActionTypes.CLEAR_CART:
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
}
