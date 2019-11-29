import {
  HOUSE_HOLD,
  FORM_DATA,
  INTENET,
  SET_HOUSE,
  FORM_LOADING,
  LOGOUT_LOADING,
  LOGDATA_LOADING,
  PICK_LISt
} from "../config/Config";

const INITIAL_STATE = {
  serch_data: [],
  form_data: [],
  is_connection: false,
  house_hold: {},
  formLoading: false,
  logoutLoading: false,
  logLoading: false,
  pickedList: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case HOUSE_HOLD:
      return { ...state, serch_data: action.payload };

    case FORM_DATA:
      return { ...state, form_data: action.payload };
    case INTENET:
      return { ...state, is_connection: action.payload };
    case SET_HOUSE:
      return { ...state, house_hold: action.payload };
    case FORM_LOADING:
      return { ...state, formLoading: action.payload };
    case LOGOUT_LOADING:
      return { ...state, logoutLoading: action.payload };
    case LOGDATA_LOADING:
      return { ...state, logLoading: action.payload };
    case PICK_LISt:
      return { ...state, pickedList: action.payload };

    default:
      return state;
  }
};
