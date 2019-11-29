import {
  LOGIN_LOADING,
  USER_SEARCH,
  SAVE_DATA,
  LOGIN_EMAIL,
  LOGIN_TIME
} from "../config/Config";
import ApiAccess from "../apiAccess/ApiAccess";
import { Alert } from "react-native";
import {
  saveData,
  getSavedData,
  saveInFs,
  getFromFs
} from "../business/common/AsyncStorage/AsyncStorageDB";
import { Actions } from "react-native-router-flux";
import moment from "moment";

export const onClickLogin = (uid, password) => {
  return async dispatch => {
    dispatch({ type: LOGIN_LOADING, payload: true });
    try {
      let params = new FormData();
      params.append("username", uid);
      params.append("password", password);
      var time = moment()
        .utcOffset("+05:30")
        .format(" hh:mm:ss a");
      debugger;
      let resp = await ApiAccess.post("login", params);
      if (resp.status == 1) {
        // await saveData(USER_SEARCH, resp);
        await saveInFs(resp);
        await saveData(LOGIN_EMAIL, uid);
        await saveData(LOGIN_TIME, { login_Time: time });

        // Actions.TrainingTrackingForm();
        Actions.Dashboard();
      } else {
        Alert.alert("Sorry", "User name or Password is Incorrect ");
      }
      dispatch({ type: LOGIN_LOADING, payload: false });

      debugger;
    } catch (e) {
      alert(e);
      dispatch({ type: LOGIN_LOADING, payload: false });
      // Alert.alert("Sorry", "User name or Password is Incorrect");
    }
  };
};

export const getLocalDatas = () => {
  return async dispatch => {
    try {
      debugger;
      // let data = await getSavedData(USER_SEARCH);
      let data = await getFromFs();

      debugger;
      dispatch({ type: SAVE_DATA, payload: data });
    } catch (e) {
      debugger;
    }
  };
};
