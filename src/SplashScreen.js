import React, { Component } from "react";
import {
  View,
  Image,
  Alert,
  ImageBackground,
  ActivityIndicator,
  PermissionsAndroid
} from "react-native";

import { Actions } from "react-native-router-flux";

import {
  getSavedData,
  saveData
} from "./business/common/AsyncStorage/AsyncStorageDB";
import { USER_SEARCH, LOGIN_TIME, LOGIN_EMAIL } from "./config/Config";
import { getLocalDatas } from "./actions/LoginActions";
import { onLogOut } from "./actions/TTFormAction";

import { connect } from "react-redux";
import moment from "moment";

//

let data = [];

class SplashScreen extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      hasData: false
    };
  }
  async componentWillMount() {
    // data = await getSavedData(USER_SEARCH);
    await this.func_permissions();
    debugger;
  }
  async cleareUserData() {
    // await saveData(USER_SEARCH, []);
    // await saveData(LOGIN_TIME, []);
    // await saveData(LOGIN_EMAIL, []);

    // //  await clearLoginSession();
    // Actions.LoginComponent();
    let isConnection = this.props.is_connection;
    this.props.onLogOut(isConnection);
  }
  async componentDidMount() {
    //let data = this.props.getLocalDatas(USER_SEARCH);
    let data = await getSavedData(LOGIN_TIME);

    debugger; //
    setTimeout(async () => {
      debugger;
      if (data.hasOwnProperty("login_Time")) {
        var time = moment()
          .utcOffset("+05:30")
          .format(" hh:mm:ss a");
        var startTime = moment(data.login_Time, "HH:mm:ss a");
        var endTime = moment(time, "HH:mm:ss a");
        var duration = moment.duration(endTime.diff(startTime));
        var minutes = parseInt(duration.asMinutes()) % 60;
        var hours = parseInt(duration.asHours());
        debugger;
        if (hours >= 1 || hours < 0) {
          this.setState({ hasData: true });
          Alert.alert("Session expired", "Please Login Again");
        } else {
          Actions.Dashboard();
        }
      } else {
        Actions.LoginComponent();
      }
    }, 500);
  }

  async func_permissions() {
    await PermissionsAndroid.requestMultiple(
      [
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      ],
      {
        title: "Need Your Permission",
        message: "TCIMIS want to access your storage"
      }
    ).then(permRes => {
      if (
        permRes["android.permission.WRITE_EXTERNAL_STORAGE"] ===
          PermissionsAndroid.RESULTS.DENIED &&
        permRes["android.permission.READ_EXTERNAL_STORAGE"] ===
          PermissionsAndroid.RESULTS.DENIED
      ) {
        this.func_permissions();
      }
    });
  }
  render() {
    if (this.state.hasData) {
      let isConnection = this.props.is_connection;
      this.props.onLogOut(isConnection);
      this.setState({ hasData: false });
    }

    return (
      <ImageBackground
        resizeMode="stretch"
        source={require("./imgs/bgimage.png")}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <ActivityIndicator size="large" color="#fff" />
      </ImageBackground>
    );
  }
}
const mapStateToProps = ({ login, formtt }) => {
  // email:auth.state.email;
  const { savedData } = login;
  const { is_connection } = formtt;
  return { savedData, is_connection };
};
export default connect(
  mapStateToProps,
  { getLocalDatas, onLogOut }
)(SplashScreen); //
