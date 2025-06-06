import { UserActionTypes } from "../constants/actionTypes";
import UserService from "../services/user.service";
import { AppDispatch } from "../stores/configureStore";

export const getUserInfo = (userId: number) => {
  return async (dispatch: AppDispatch) => {
    dispatch({ type: UserActionTypes.GET_USER_PROFILE_INFO_REQUEST });

    try {
      const user = await UserService.getUserInfo(userId);

      dispatch({
        type: UserActionTypes.GET_USER_PROFILE_INFO_SUCCESS,
        payload: user,
      });
    } catch (error: any) {
      dispatch({
        type: UserActionTypes.GET_USER_PROFILE_INFO_FAILURE,
        payload: error.message,
      });
    }
  };
};
