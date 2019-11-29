import { AsyncStorage, Alert } from "react-native";
import { Actions } from "react-native-router-flux";
var RNFS = require("react-native-fs");

export async function setLoginSession(sessionData) {
  await AsyncStorage.setItem("userData", JSON.stringify(sessionData));
  debugger;
}
export async function getLoginSessionData() {
  let stringifydata = await AsyncStorage.getItem("userData");
  let data = (await JSON.parse(stringifydata)) || [];
  debugger;
  return data;
}
export async function clearLoginSession() {
  await AsyncStorage.removeItem("userData");
  debugger;
}
export function clearAllSavedData() {
  Alert.alert(
    "",
    "Are you sure you want to logout ?",
    [
      { text: "Cancel", onPress: () => console.log("cancel"), style: "cancel" },
      { text: "Yes", onPress: () => backToDashboard() }
    ],
    { cancelable: true }
  );
}
/*function backToDashboard() {
    AsyncStorage.removeItem('userData');
    Actions.Dashboard();
}*/
export async function clearSavedDataByKey(Key) {
  await AsyncStorage.removeItem(Key);
  debugger;
}
export async function saveData(Key, saveItem) {
  await AsyncStorage.setItem(Key, JSON.stringify(saveItem));
  debugger;
}
export async function getSavedData(Key) {
  debugger;
  let stringifydata = await AsyncStorage.getItem(Key);
  debugger;
  let data = (await JSON.parse(stringifydata)) || [];
  debugger;
  return data;
}

export async function saveInFs(content) {
  var path = RNFS.DocumentDirectoryPath + "/test.txt";
  debugger;

  // write the file
  RNFS.writeFile(path, JSON.stringify(content), "utf8")
    .then(success => {
      debugger;
      console.log("FILE WRITTEN!");
    })
    .catch(err => {
      console.log(err.message);
    });
}

export async function getFromFs() {
  debugger;
  return await RNFS.readDir(RNFS.DocumentDirectoryPath)
    .then(result => {
      console.log("GOT RESULT", result);
      debugger;
      // stat the first file
      return Promise.all([RNFS.stat(result[0].path), result[0].path]);
    })
    .then(statResult => {
      if (statResult[0].isFile()) {
        debugger;

        // if we have a file, read it
        return RNFS.readFile(statResult[1], "utf8");
      }

      return "no file";
    })
    .then(contents => {
      // log the file contents
      console.log(contents);
      return JSON.parse(contents);
    })
    .catch(err => {
      console.log(err.message, err.code);
    });
}
