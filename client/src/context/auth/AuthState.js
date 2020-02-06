import React, { useReducer } from "react";
import AuthReducer from "./authReducer";
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  AUTH_ERROR,
  USER_LOADED
  // CLEAR_ERRORS
} from "../types";
import Axios from "axios";
import AuthContext from "./authContext";
import setAuthToken from "../../SetAuthToken";

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    message: null,
    user: null,
    error: null,
    loading: true
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Load User
  const loadUser = async () => {
    // load token into global headers
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await Axios.get("/api/users");
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

  // config to supply axios post
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  // Redgister User
  const register = async newUserData => {
    try {
      initialState.loading = true;
      const res = await Axios.post("/api/users/signup", newUserData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data.msg
      });
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      });
    }
  };
  // Login User
  const loginUser = async userInput => {
    initialState.loading = true;
    try {
      const res = await Axios.post("/api/users/login", userInput, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  // Logout User
  const logout = () =>
    dispatch({
      type: LOGOUT
    });

  // // CLEAR Errors
  // const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        message: state.message,
        loginUser,
        loadUser,
        logout
        // clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
