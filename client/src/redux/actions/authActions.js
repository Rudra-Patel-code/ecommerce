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
