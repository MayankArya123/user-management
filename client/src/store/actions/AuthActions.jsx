import {
  formatError,
  login,
  runLogoutTimer,
  saveTokenInLocalStorage,
  signUp,
} from "../../services/AuthService";

import { updateUser } from "../../services/UserService";

export const SIGNUP_CONFIRMED_ACTION = "[signup action] confirmed signup";
export const SIGNUP_FAILED_ACTION = "[signup action] failed signup";
export const LOGIN_CONFIRMED_ACTION = "[login action] confirmed login";
export const LOGIN_FAILED_ACTION = "[login action] failed login";
export const LOADING_TOGGLE_ACTION = "[Loading action] toggle loading";
export const LOGOUT_ACTION = "[Logout action] logout action";
export const UPDATE_USER_SUCCESS = "[User] Update Success";

export function signupAction(name, email, password, navigate) {
  return (dispatch) => {
    signUp(name, email, password)
      .then((response) => {
        saveTokenInLocalStorage(response.data);
        runLogoutTimer(dispatch, response.data.expiresIn * 1000);
        dispatch(confirmedSignupAction(response.data));
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorMessage = formatError(error.response.data);
        dispatch(signupFailedAction(errorMessage));
      });
  };
}

export function Logout(navigate) {
  localStorage.removeItem("userDetails");
  navigate("/login");
  return {
    type: LOGOUT_ACTION,
  };
}

export function loginAction(email, password, navigate) {
  return (dispatch) => {
    login(email, password)
      .then((response) => {
        console.log("response", response);
        saveTokenInLocalStorage(response.data?.token);
        //     runLogoutTimer(
        //         dispatch,
        //         response.data.expiresIn * 1000,
        //         navigate,
        //     );
        //    dispatch(loginConfirmedAction(response.data));
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log("error", error);
        const errorMessage = formatError(error.response.data);
        dispatch(loginFailedAction(errorMessage));
      });
  };
}

export function loginFailedAction(data) {
  return {
    type: LOGIN_FAILED_ACTION,
    payload: data,
  };
}

export function loginConfirmedAction(data) {
  console.log("check data ", data);
  return {
    type: LOGIN_CONFIRMED_ACTION,
    payload: data,
  };
}

export function confirmedSignupAction(payload) {
  return {
    type: SIGNUP_CONFIRMED_ACTION,
    payload,
  };
}

export function signupFailedAction(message) {
  return {
    type: SIGNUP_FAILED_ACTION,
    payload: message,
  };
}

export function loadingToggleAction(status) {
  return {
    type: LOADING_TOGGLE_ACTION,
    payload: status,
  };
}

export function setUserData(payload) {
  return {
    type: UPDATE_USER_SUCCESS,
    payload: payload,
  };
}

export function updateUserAction(userId, data, navigate) {
  return (dispatch) => {
    updateUser(userId, data)
      .then((response) => {
        console.log("user updated", response);
        if (response?.status === 200) {
          alert("user updated");
          navigate("/dashboard");

          dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: response?.data?.user,
          });
        }
      })
      .catch((error) => {
        // const errorMessage = formatError(error.response.data);
        // dispatch(signupFailedAction(errorMessage));
      });
  };
}
