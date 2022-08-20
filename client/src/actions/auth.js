import * as actionTypes from "./type";
import axios from "axios";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthHeader";

// register user
export const register = (authData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post("/api/users", authData, config);
    dispatch({
      type: actionTypes.REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: actionTypes.REGISTER_FAIL,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");
    console.log(res.data.user);
    dispatch({
      type: actionTypes.USER_LOADED,
      payload: res.data.user,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.AUTH_ERROR,
    });
  }
};

export const login = (loginData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post("/api/auth", loginData, config);
    dispatch({
      type: actionTypes.LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: actionTypes.LOGIN_FAIL,
    });
  }
};

// Logout
export const logout = (history) => (dispatch) => {
  dispatch({ type: actionTypes.CLEAR_PROFILE });
  dispatch({ type: actionTypes.LOGOUT });
  history.push("/");
};
