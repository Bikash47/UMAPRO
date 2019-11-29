import { LOGIN_LOADING, SAVE_DATA } from "../config/Config";

const INITIAL_STATE = { loginLoading: false,savedData :{} };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_LOADING:
      return { ...state, loginLoading: action.payload };
      case SAVE_DATA:
      return { ...state, savedData: action.payload };
    default:
      return state;
  }
};
