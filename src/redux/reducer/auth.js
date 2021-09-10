import { SIGNED_IN, SIGN_IN, SIGN_OUT } from "../actionCreators/actionString";
import { ActionType } from "redux-promise-middleware";

const defaultState = {
  authInfo: {},
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  isLogin: false,
  error: {},
};

const authReducer = (prevstate = defaultState, action) => {
  const { Pending, Fulfilled, Rejected } = ActionType;
  switch (action.type) {
    case SIGN_IN.concat("_", Pending):
      return {
        ...prevstate,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };
    case SIGN_IN.concat("_", Rejected):
      return {
        ...prevstate,
        isPending: false,
        isRejected: true,
        error: action.payload,
      };
    case SIGN_IN.concat("_", Fulfilled):
      localStorage.setItem("token", String(action.payload.data.result.token));
      localStorage.setItem(
        "userInfo",
        JSON.stringify(action.payload.data.result.userInfo)
      );
      return {
        ...prevstate,
        isPending: false,
        isFulfilled: true,
        authInfo: action.payload.data.result,
        isLogin: true,
      };
    case SIGNED_IN:
      return {
        ...prevstate,
        authInfo: JSON.parse(localStorage.getItem("userInfo")),
        isLogin: true,
      };
    case SIGN_OUT.concat("_", Pending):
      return {
        ...prevstate,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
      };
    case SIGN_OUT.concat("_", Rejected):
      return {
        ...prevstate,
        isPending: false,
        isRejected: true,
        error: action.payload,
      };
    case SIGN_OUT.concat("_", Fulfilled):
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      return {
        ...prevstate,
        isPending: false,
        isFulfilled: true,
        authInfo: action.payload.data.result,
        isLogin: false,
      };
    default:
      return prevstate;
  }
};

export default authReducer;