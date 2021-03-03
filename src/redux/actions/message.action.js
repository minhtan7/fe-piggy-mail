import * as types from "../constants/auth.constants";
import api from "../apiService";
import { toast } from "react-toastify";

/**Login with email password*/
const getListOfMessage = ({ email, password }) => async (dispatch) => {
  dispatch({ type: types.LOGIN_REQUEST, payload: null });
  try {
    const res = await api.post("/messages", { email, password });
    dispatch({ type: types.LOGIN_SUCCESS, payload: res.data.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: types.LOGIN_FAILURE, payload: error });
  }
};


export const authActions = {
  
};
