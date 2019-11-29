import {
  HOUSE_HOLD,
  INTENET,
  FORM_DATA,
  SET_HOUSE,
  FORM_LOADING,
  SAVE_FORM,
  USER_SEARCH,
  LOGIN_TIME,
  LOGIN_EMAIL,
  LOGOUT_LOADING,
  LOGDATA_LOADING,
  PICK_LISt
} from "../config/Config";
import { searchHouseInArray, mapDataToArray } from "../business/TTFormBusiness";
import { Alert } from "react-native";
import ApiAccess from "../apiAccess/ApiAccess";
import {
  saveData,
  getSavedData
} from "../business/common/AsyncStorage/AsyncStorageDB";
import { _ } from "lodash";
import dataJson from "../config/loginDara.json";
import { Actions } from "react-native-router-flux";
import moment from "moment";

export const housldSearch = (text, arr) => {
  return async dispatch => {
    try {
      let data = searchHouseInArray(text, arr);
      debugger;
      dispatch({
        type: HOUSE_HOLD,
        payload: data
      });
    } catch (e) {}
  };
};
export const getSearchData = () => {
  return async dispatch => {
    try {
      dispatch({
        type: FORM_DATA,
        payload: []
      });
      //       debugger;
      //       await saveData(USER_SEARCH,dataJson)
      //       debugger;
      //       let savedData = await getSavedData(USER_SEARCH);//
      debugger;
      let data = await mapDataToArray();
      debugger;
      dispatch({
        type: FORM_DATA,
        payload: data
      });
    } catch (e) {}
  };
};
export const removeSearchData = () => {
  return async dispatch => {
    try {
      dispatch({
        type: FORM_DATA,
        payload: []
      });
      //       debugger;
      //       await saveData(USER_SEARCH,dataJson)
      //       debugger;
      //       let savedData = await getSavedData(USER_SEARCH);//
    } catch (e) {}
  };
};
export const onSaveData = (forSaveData, isConnection) => {
  debugger;
  return async dispatch => {
    try {
      dispatch({
        type: FORM_LOADING,
        payload: true
      });
      debugger;
      if (!isConnection) {
        let savedData = await getSavedData(SAVE_FORM);
        let currentUser = await getSavedData(LOGIN_EMAIL);

        let index = _.findIndex(savedData, function(o) {
          return o.user == currentUser;
        });
        debugger;
        if (index == -1) {
          let saveDataWithId = {
            user: currentUser,
            formSaved: [forSaveData]
          };
          debugger;
          savedData.push(saveDataWithId);
          await saveData(SAVE_FORM, savedData);
          Alert.alert("", "Record saved in offline storage! ");
          dispatch({
            type: SET_HOUSE,
            payload: {}
          });
        } else {
          debugger;
          if (forSaveData.op != "add_tt_data") {
            savedData[index].formSaved.push(forSaveData);
            await saveData(SAVE_FORM, savedData);
            Alert.alert("", "Record saved in offline storage! ");
            dispatch({
              type: SET_HOUSE,
              payload: {}
            });
          } else if (forSaveData.op == "add_tt_data") {
            debugger;
            if (
              !_.find(savedData[index].formSaved, {
                training_id_no: forSaveData.training_id_no
              })
            ) {
              savedData[index].formSaved.push(forSaveData);
              await saveData(SAVE_FORM, savedData);
              Alert.alert("", "Record saved in offline storage! ");
              dispatch({
                type: SET_HOUSE,
                payload: {}
              });
            } else {
              Alert.alert("", "This record already exist in offline storage! ");
              dispatch({
                type: SET_HOUSE,
                payload: {}
              });
            }
          }
        }
      } else {
        // params.append("logged_from", forSaveData.logged_from);
        debugger;
        let params = [forSaveData];
        debugger;
        let resp = await ApiAccess.postSubmitForm("post", params);
        Alert.alert("", resp.msg);
        dispatch({
          type: SET_HOUSE,
          payload: {}
        });
      }
      debugger;
      dispatch({
        type: FORM_LOADING,
        payload: false
      });
    } catch (e) {
      debugger;
      dispatch({
        type: FORM_LOADING,
        payload: false
      });
      dispatch({
        type: SET_HOUSE,
        payload: {}
      });
      Alert.alert("", "Form data successfully saved.");
    }
  };
};

export const connectionCheck = isConnected => {
  return async dispatch => {
    try {
      //alert(isConnected)
      dispatch({
        type: INTENET,
        payload: isConnected
      });
    } catch (e) {}
  };
};
export const setHouseholdField = item => {
  return async dispatch => {
    try {
      //alert(isConnected)
      dispatch({
        type: SET_HOUSE,
        payload: item
      });
    } catch (e) {}
  };
};

export const clearHouseholdField = () => {
  return async dispatch => {
    try {
      //alert(isConnected)
      dispatch({
        type: SET_HOUSE,
        payload: {}
      });
    } catch (e) {}
  };
};

export const saveOflineDataToServer = (forSaveData, is_connection, index) => {
  debugger;
  return async dispatch => {
    let userDataLength = 0;
    try {
      debugger;
      if (getSession()) {
        if (is_connection) {
          dispatch({
            type: LOGDATA_LOADING,
            payload: true
          });
          debugger;
          let userData = forSaveData[index].formSaved;
          userDataLength = userData.length;
          let resp = await ApiAccess.postSubmitForm("post", userData);

          forSaveData.splice(index, 1);
          debugger;
          // forSaveData[index] == {};
          await saveData(SAVE_FORM, forSaveData);
          dispatch({
            type: LOGDATA_LOADING,
            payload: false
          });
          Actions.refresh({ key: Math.random() });
          Alert.alert(
            "",
            resp.msg,
            [{ text: "Ok", onPress: () => console.log("ok") }],
            { cancelable: false }
          );

          debugger;
        } else {
          debugger;

          Alert.alert(
            "Device is Offline ",
            "Please check the internet connections and try again."
          );
        }
      } else {
        // await saveData(USER_SEARCH, []);
        await saveData(LOGIN_TIME, []);
        await saveData(LOGIN_EMAIL, []);
        // Actions.LoginComponent();
        onLogOut(is_connection);
        Alert.alert("Session expired", "Please Login Again");
      }
    } catch (e) {
      debugger;
      forSaveData.splice(index, 1);
      await saveData(SAVE_FORM, forSaveData);
      dispatch({
        type: LOGDATA_LOADING,
        payload: false
      });
      Alert.alert(
        "",
        `Offline data of ${userDataLength} records sync successfully`
      );
      Actions.refresh({ key: Math.random() });
    }
  };
};
async function getSession() {
  let data = await getSavedData(LOGIN_TIME);
  var time = moment()
    .utcOffset("+05:30")
    .format(" hh:mm:ss a");
  var startTime = moment(data.login_Time, "HH:mm:ss a");
  var endTime = moment(time, "HH:mm:ss a");
  var duration = moment.duration(endTime.diff(startTime));
  var minutes = parseInt(duration.asMinutes()) % 60;
  var hours = parseInt(duration.asHours());

  if (hours >= 1 || hours < 0) {
    return false;
  } else {
    true;
  }
}

export const onLogOut = isConnection => {
  debugger;
  return async dispatch => {
    try {
      dispatch({
        type: LOGOUT_LOADING,
        payload: true
      });
      debugger;

      if (isConnection) {
        debugger;
        let resp = await ApiAccess.get("logout");
        if (resp.status == 1) {
          // await saveData(USER_SEARCH, []);
          await saveData(LOGIN_TIME, []);
          await saveData(LOGIN_EMAIL, []);
          dispatch({
            type: FORM_DATA,
            payload: []
          });
          dispatch({
            type: SET_HOUSE,
            payload: {}
          });
          Actions.LoginComponent();
        }
        debugger;
      } else {
        Alert.alert(
          "Device is Offline ",
          "Please check the internet connections and try again."
        );
      }
      debugger;
      dispatch({
        type: LOGOUT_LOADING,
        payload: false
      });
    } catch (e) {
      debugger;
      dispatch({
        type: LOGOUT_LOADING,
        payload: false
      });
      // await saveData(USER_SEARCH, []);
      await saveData(LOGIN_TIME, []);
      await saveData(LOGIN_EMAIL, []);
      dispatch({
        type: FORM_DATA,
        payload: []
      });
      dispatch({
        type: SET_HOUSE,
        payload: {}
      });
      Actions.LoginComponent();
    }
  };
};

export const pickChange = (pickList, index) => {
  debugger;
  return async dispatch => {
    try {
      dispatch({
        type: PICK_LISt,
        payload: []
      });
      index = index == 0 ? 0 : index - 1;
      if (pickList.length != 0) {
        let list = pickList[index].topic_names;
        debugger;
        dispatch({
          type: PICK_LISt,
          payload: list
        });
      }
    } catch (e) {
      debugger;
    }
  };
};
