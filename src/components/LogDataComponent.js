import React, { Component } from "react";
import {
  Alert,
  Button,
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import {
  housldSearch,
  getSearchData,
  setHouseholdField,
  saveOflineDataToServer
} from "../actions/TTFormAction";
import { Actions } from "react-native-router-flux";
import { Card, CardSection } from "./common";
import { getSavedData } from "../business/common/AsyncStorage/AsyncStorageDB";
import { SAVE_FORM, LOGIN_EMAIL } from "../config/Config";
import {
  STATUS_BAR_COLOR,
  FONT_FAMILY,
  FONT_FAMILY_BOLD
} from "../config/ConfigStyle";
import * as Animatable from "react-native-animatable";
import { _ } from "lodash";

MyCustomTouchableOpacity = Animatable.createAnimatableComponent(
  TouchableOpacity
);
MyCustomImage = Animatable.createAnimatableComponent(Image);

class LogDataComponent extends Component {
  constructor() {
    super();
    this.state = {
      savedData: 0,
      animating: false
    };
  }
  componentWillMount() {
    this.getStoredData();
  }
  handleViewRef = ref => (this.view = ref);

  onRefresh() {
    this.view.rotate(500);
    this.setState({
      animating: true
    });
    setTimeout(
      () =>
        this.setState({
          animating: false
        }),
      500
    );
  }
  showLoader() {
    let isLoading = this.props.logoutLoading;
    if (isLoading) {
      return <ActivityIndicator size="large" color="#a82b2d" />;
    } else {
      return null;
    }
  }
  render() {
    let arr = this.props.form_data;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: STATUS_BAR_COLOR,
          padding: 10,
          paddingBottom: 0
        }}
      >
        {this.props.logoutLoading ? (
          <ActivityIndicator size="large" color="#ffffff" />
        ) : (
          <Animatable.View
            animation="fadeInUpBig"
            useNativeDriver
            delay={500}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
              borderRadius: 5
            }}
          >
            {this.state.animating ? (
              <ActivityIndicator size="large" color="#a82b2d" />
            ) : (
              <View
                style={{
                  width: "90%",
                  height: "30%",
                  elevation: 10,
                  backgroundColor: "#fff"
                }}
              >
                {this.state.savedData != 0 ? (
                  <View>
                    <View
                      style={{
                        width: "100%",
                        height: 60,
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <MyCustomImage
                        animation="tada"
                        useNativeDriver
                        iterationCount="infinite"
                        source={require("../imgs/box.png")}
                        style={{
                          width: 50,
                          height: 50,
                          marginLeft: 5,
                          marginRight: 20
                        }}
                      />
                    </View>
                    <View
                      style={{
                        width: "90%",
                        height: 60,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#fff",
                        marginTop: 20,
                        alignSelf: "center"
                      }}
                    >
                      <Text style={{ alignSelf: "center", fontSize: 15 }}>
                        You have {this.state.savedData} offline record(s) in
                        storage to sync with server.
                      </Text>
                      {this.props.logLoading ? (
                        <ActivityIndicator size="large" color="#a82b2d" />
                      ) : (
                        <TouchableOpacity
                          style={{
                            backgroundColor: "#af2e2f",
                            width: "50%",
                            height: 30,
                            marginTop: 10,
                            borderWidth: 0.5,
                            borderColor: "#af2e2f",
                            borderRadius: 5,
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                          onPress={() => this.saveToDb()}
                        >
                          <View
                            style={{
                              width: "100%",
                              alignItems: "center",
                              justifyContent: "center",
                              flexDirection: "row"
                            }}
                          >
                            <MyCustomImage
                              animation="rotate"
                              useNativeDriver
                              iterationCount="infinite"
                              iterationDelay={200}
                              source={require("../imgs/sync.png")}
                              style={{
                                width: 18,
                                height: 18,
                                marginLeft: 5,
                                marginRight: 10
                              }}
                            />
                            <Text
                              style={{
                                color: "#fff",
                                textAlign: "center",
                                fontSize: 13,
                                fontFamily: FONT_FAMILY_BOLD
                              }}
                            >
                              Sync To Server
                            </Text>
                          </View>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                ) : (
                  <View>
                    <View
                      style={{
                        width: "100%",
                        height: 60,
                        marginTop: 30,
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <MyCustomImage
                        animation="tada"
                        useNativeDriver
                        iterationCount={5}
                        source={require("../imgs/emptybox.png")}
                        style={{
                          width: 60,
                          height: 60,
                          marginLeft: 5,
                          marginRight: 20
                        }}
                      />
                    </View>
                    <View
                      style={{
                        width: "90%",
                        height: 60,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#fff",
                        marginTop: 10,
                        alignSelf: "center"
                      }}
                    >
                      <Text
                        style={{
                          alignSelf: "center",
                          fontSize: 15,
                          fontFamily: FONT_FAMILY
                        }}
                      >
                        You don't have offline record(s) in storage.
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            )}

            <View
              style={{
                backgroundColor: "#f7f7f7",
                // backgroundColor: "#0f0",
                position: "absolute",
                // width: "100%",
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                bottom: 0,
                left: 0,
                right: 0,
                flexDirection: "row"
              }}
            >
              <Text style={{ fontFamily: FONT_FAMILY_BOLD, fontSize: 13 }}>
                Note:
              </Text>
              <Text
                style={{ fontFamily: FONT_FAMILY, fontSize: 11, marginLeft: 3 }}
              >
                Do not clear your device or app cache !
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "#f7f7f7",
                position: "absolute",
                width: 50,
                height: 50,
                borderRadius: 50,
                borderWidth: 1,
                borderColor: "#f8c133",
                justifyContent: "center",
                alignItems: "center",
                top: 5,
                right: 5,
                elevation: 5,
                backgroundColor: "#f8c133",
                flexDirection: "row"
              }}
            >
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%"
                }}
                onPress={() => this.onRefresh()}
              >
                <MyCustomImage
                  ref={this.handleViewRef}
                  source={require("../imgs/sync.png")}
                  style={{
                    width: 25,
                    height: 25
                  }}
                />
              </TouchableOpacity>
            </View>
            {/* </CardSection> */}
          </Animatable.View>
        )}
      </View>
    );
  }
  async getStoredData() {
    debugger;
    let saveData = await getSavedData(SAVE_FORM);
    let currentUser = await getSavedData(LOGIN_EMAIL);
    let index = _.findIndex(saveData, function(o) {
      return o.user == currentUser;
    });
    if (index != -1) {
      this.setState({ savedData: saveData[index].formSaved.length });
    } else {
      this.setState({ savedData: 0 });
    }
  }
  async saveToDb() {
    let forSaveData = await getSavedData(SAVE_FORM);
    let currentUser = await getSavedData(LOGIN_EMAIL);
    let index = _.findIndex(forSaveData, function(o) {
      return o.user == currentUser;
    });

    let is_connection = this.props.is_connection;
    this.props.saveOflineDataToServer(forSaveData, is_connection, index);
  }
}
const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 44,
    padding: 10,
    // borderWidth: 0.5,
    borderColor: "#ccc",
    //borderRadius: 5,
    //  marginBottom: 10,
    marginTop: 6
  }
});
const mapStateToProps = ({ formtt }) => {
  // email:auth.state.email;
  const {
    serch_data,
    form_data,
    logLoading,
    is_connection,
    logoutLoading
  } = formtt;
  return { serch_data, form_data, logLoading, is_connection, logoutLoading };
};
export default connect(
  mapStateToProps,
  { housldSearch, getSearchData, setHouseholdField, saveOflineDataToServer }
)(LogDataComponent);
