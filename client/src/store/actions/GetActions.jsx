import { getUser } from "../../services/GetService";
import { loginConfirmedAction } from "./AuthActions";

export function getUserAction() {
  return (dispatch, getState) => {
    getUser().then((response) => {
      dispatch(loginConfirmedAction(response.data?.user));
    });
  };
}
