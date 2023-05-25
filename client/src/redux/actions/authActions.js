import axios from "axios";
import { server } from "../store";

export const register =
  (name, email, password, confirmPass) => async (dispatch) => {
    try {
      dispatch({ type: "registerRequest" });

      let link = `${server}/auth/register`;
      const { data } = await axios.post(
        link,
        { name, email, password, confirmPass },
        { headers: "Content-Type: application/json", withCredentials: true }
      );
      console.log(data);
      dispatch({ type: "registerSuccess", payload: data });
    } catch (error) {
      console.log(error);
      dispatch({ type: "registerFail", payload: error.response?.data.message });
    }
  };

export const loadData = () => async (dispatch) => {
  try {
    dispatch({
      type: "loadUserRequest",
    });

    const link = `${server}/auth/my-data`;

    const { data } = await axios.get(link, { withCredentials: true });

    dispatch({ type: "loadUserSuccess", payload: data });
  } catch (error) {
    dispatch({
      type: "loadUserFail",
      payload: error.response?.data.message,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "loginRequest" });

    const link = `${server}/auth/login`;

    const { data } = await axios.post(
      link,
      { email, password },
      { withCredentials: true, header: "Content-Type: application/json" }
    );

    dispatch({ type: "loginSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "loginFail", payload: error.response?.data.message });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: "logoutRequest" });
    const link = `${server}/auth/logout`;

    const { data } = await axios.get(link, { withCredentials: true });

    dispatch({ type: "logoutSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "logoutFail", payload: error.response?.data.message });
  }
};
