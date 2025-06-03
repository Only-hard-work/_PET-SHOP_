import { AuthActionTypes } from '../constants/actionTypes';

interface AuthState {
  token: string | null;
  user: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  user: null,
  loading: false,
  error: null
};

export default function authReducer(
  state = initialState,
  action: any
): AuthState {
  switch (action.type) {
    case AuthActionTypes.REGISTER_REQUEST:
    case AuthActionTypes.LOGIN_REQUEST:
    case AuthActionTypes.LOAD_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
      
    case AuthActionTypes.REGISTER_SUCCESS:
    case AuthActionTypes.LOGIN_SUCCESS:
    {
     console.log(action);

      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        loading: false,
        error: null
      };
    }
      
    case AuthActionTypes.LOAD_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null
      };
      
    case AuthActionTypes.REGISTER_FAILURE:
    case AuthActionTypes.LOGIN_FAILURE:
    case AuthActionTypes.LOAD_USER_FAILURE:
      return {
        ...state,
        token: null,
        user: null,
        loading: false,
        error: action.payload
      };
      
    case AuthActionTypes.LOGOUT:
      return {
        ...state,
        token: null,
        user: null
      };
      
    default:
      return state;
  }
}