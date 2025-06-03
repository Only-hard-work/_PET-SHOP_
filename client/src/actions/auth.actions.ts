import { Dispatch } from 'redux';
import api from '../services/auth.service';
import { AuthActionTypes } from '../constants/actionTypes';
import { AppDispatch } from '../stores/configureStore';

export const register = (userData: {
  username: string;
  email: string;
  password: string;
}) => async (dispatch: Dispatch) => {
  dispatch({ type: AuthActionTypes.REGISTER_REQUEST });
  try {
    const response = await api.register(userData);
    dispatch({
      type: AuthActionTypes.REGISTER_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: AuthActionTypes.REGISTER_FAILURE,
      payload: error.response?.data?.message || 'Registration failed'
    });
    throw error;
  }
};

export const login = (credentials: {
  email: string;
  password: string;
}) => async (dispatch: Dispatch) => {
  dispatch({ type: AuthActionTypes.LOGIN_REQUEST });
  try {
    const response = await api.login(credentials);
    console.log('response: ', response.data);
    dispatch({
      type: AuthActionTypes.LOGIN_SUCCESS,
      payload: response.data
    });
    localStorage.setItem('token', response.data.token);
  } catch (error) {
    dispatch({
      type: AuthActionTypes.LOGIN_FAILURE,
      payload: error.response?.data?.message || 'Login failed'
    });
    throw error;
  }
};

export const logout = () => (dispatch: AppDispatch) => {
  localStorage.removeItem('token');
  dispatch({ type: AuthActionTypes.LOGOUT });
};

export const loadUser = () => async (dispatch: AppDispatch) => {
  dispatch({ type: AuthActionTypes.LOAD_USER_REQUEST });
  try {
    const response = await api.getMe();
    dispatch({
      type: AuthActionTypes.LOAD_USER_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: AuthActionTypes.LOAD_USER_FAILURE,
      payload: error.response?.data?.message || 'Failed to load user'
    });
  }
};