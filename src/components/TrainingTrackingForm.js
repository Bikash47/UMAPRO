import React, { Component } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Picker,
  ActivityIndicator,
  BackHandler,
  BackAndroid,
  FlatList
} from "react-native";
import { Radio } from "native-base";
import {
  STATUS_BAR_COLOR,
  FONT_FAMILY_BOLD,
  FONT_FAMILY
} from "../config/ConfigStyle";
import DatePicker from "react-native-datepicker";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import {
  onSaveData,
  clearHouseholdField,
  pickChange
} from "../actions/TTFormAction";
import Snackbar from "react-native-snackbar";
import * as Animatable from "react-native-animatable";
import {
  getSavedData,
  getFromFs
} from "../business/common/AsyncStorage/AsyncStorageDB";
import { USER_SEARCH } from "../config/Config";
let participant = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//let participant = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
import { Dialog } from "react-native-simple-dialogs";

//let interventionDataList = [];
class TrainingTrackingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogVisible: false,
      interventionDataList: {},
      pickIndex: 0,
      radioBtnsData: ["Item1", "Item2", "Item3"],
      checked: "radio1",
      formtype1: "",
      formtype2: "",
      formtype3: "",
      Intervention: "",
      Source: "",
      Training: "",
      trainId: "",
      name_of_participent: "",
      gender: "Female",
      topic_of_train: "Topic of Training",
      name_of_tool: "",
      duration_of_traing: "",
      name_of_resource: "",
      organization: "",
      designation: "",
      specify1: "",
      specify2: "",
      date: "",

      participantGender: "Female",
      num_of_participent: "Participant Count",
      num_list: 0,
      participantNameList: [],
      participantGenderList: [],
      Attendedckeded: "Self1",
      Attended: "Self",
      others_topic_of_training_value: "",
      loaderIndicator: true
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  async componentWillMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    let data = await getFromFs();
    if (data.intervention_data.length > 0) {
      this.setState({ loaderIndicator: false });
    } else {
      this.setState({ loaderIndicator: true });
    }
    this.setState({ interventionDataList: data }); // getSavedData(USER_SEARCH)
    debugger;
  }
  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }
  returnPicker() {
    debugger;
    return (
      <View
        style={{
          width: "100%",
          //height: 44,
          // padding: 10,
          borderWidth: 0.5,
          borderColor: "#ccc",
          borderRadius: 5,
          marginTop: 10
        }}
      >
        <Picker
          selectedValue={this.state.topic_of_train}
          // style={{ alignItems: "center", justifyContent: "center" }}
          onValueChange={itemValue =>
            this.setState({ topic_of_train: itemValue })
          }
        >
          <Picker.Item label="Topic of Training" value="Topic of Training" />
          {this.props.pickedList.length != 0 ? (
            this.props.pickedList.map((item, index) => {
              return <Picker.Item label={item} value={item} />;
            })
          ) : (
            <Picker.Item label="Topic of Training" value="Topic of Training" />
          )}
        </Picker>
      </View>
    );
  }
  func_ShowAlert(msg) {
    Snackbar.show({
      title: msg,
      color: "white",
      duration: Snackbar.LENGTH_SHORT
    });
  }
  handleBackButtonClick() {
    //alert(Actions.currentScene)
    //this.func_ShowAlert ("Hello");
    Actions.pop();
    // Snackbar.show({
    //   title: 'Press Exit to Close the app',
    //   color:'white',
    //   duration: Snackbar.LENGTH_SHORT,
    //   action: {
    //     title: 'EXIT',
    //     color: 'red',
    //     onPress: () => { BackHandler.exitApp() },
    //   },
    // });
    //BackHandler.exitApp();

    return true;
  }
  async onLogClick() {
    if (!this.props.house_hold.hasOwnProperty("nameserch")) {
      this.func_ShowAlert("Select Household ");
    } else if (this.state.date == "") {
      this.func_ShowAlert("Select Date ");
    } else if (this.state.trainId == "") {
      this.func_ShowAlert("Enter Training ID / No ");
    } else {
      let forSaveData = {
        logged_date: this.state.date,
        training_id_no: this.state.trainId,
        name_of_intervention:
          this.state.Intervention == "Select Name of Intervention"
            ? ""
            : this.state.Intervention,
        topic_of_training:
          this.state.topic_of_train == "Topic of Training"
            ? ""
            : this.state.topic_of_train,
        name_of_tool: this.state.name_of_tool,
        type_of_source:
          this.state.Source == "Select Type of Source" ? "" : this.state.Source,
        type_of_training:
          this.state.Training == "Type of Training" ? "" : this.state.Training,
        others_topic_of_training_value: this.state
          .others_topic_of_training_value,
        others_source_value: this.state.specify1,
        others_training_value: this.state.specify2,
        duration_of_training: this.state.duration_of_traing,
        hh_id: this.props.house_hold.id,
        name_of_res_person: this.state.name_of_resource,
        attended_by: this.state.Attended,
        participant_count: "" + this.state.num_of_participent,
        org_of_res_person: this.state.organization,
        desg_of_res_person: this.state.designation,
        name_of_participant: this.state.name_of_participent,
        gender_of_participant: this.state.gender,
        farmer_type_div_inf:
          this.state.formtype1 ==
          "Farmer Type - Diversified / Influenced (New / Continued"
            ? ""
            : this.state.formtype1,
        farmer_type_dem_con:
          this.state.formtype2 == "Farmer Type - Demo / Continued"
            ? ""
            : this.state.formtype2,
        farmer_status:
          this.state.formtype3 == "Farmer Status" ? "" : this.state.formtype3,
        participant_name: this.state.participantNameList,
        participant_gender: this.state.participantGenderList,
        logged_from: "MOBILE_APP",
        op: "add_tt_data"
      };
      let isConnection = this.props.is_connection;
      await this.props.onSaveData(forSaveData, isConnection);
      this.setState({
        dialogVisible,
        pickIndex: 0,
        radioBtnsData: ["Item1", "Item2", "Item3"],
        checked: "radio1",
        formtype1: "",
        formtype2: "",
        formtype3: "",
        Intervention: "",
        Source: "",
        Training: "",
        trainId: "",
        name_of_participent: "",
        gender: "Female",
        topic_of_train: "Topic of Training",
        name_of_tool: "",
        duration_of_traing: "",
        name_of_resource: "",
        organization: "",
        designation: "",
        specify1: "",
        specify2: "",
        date: "",

        participantGender: "Female",
        num_of_participent: "Participant Count",
        num_list: 0,
        participantNameList: [],
        participantGenderList: [],
        Attendedckeded: "Self1",
        Attended: "Self",
        others_topic_of_training_value: ""
      });
      this.props.clearHouseholdField();
    }
  }
  onChangePartiName(name, index) {
    debugger;
    let list = this.state.participantNameList;
    list[index] = name;
    debugger;
    this.setState({ participantNameList: list });
  }
  onChangeGender(name, index) {
    debugger;
    let list = this.state.participantGenderList;
    list[index] = name;
    debugger;
    this.setState({ participantGenderList: list });
  }
  _renderItem = ({ item, index }) => (
    <View
      style={{
        width: "100%",
        marginTop: 10
      }}
    >
      <TextInput
        value={this.state.name_of_participent[index]}
        onChangeText={name => this.onChangePartiName(name, index)}
        placeholder={"Name of Participant"}
        secureTextEntry={false}
        style={{
          width: "100%",
          height: 44,
          padding: 10,
          borderWidth: 0.5,
          borderColor: "#ccc",
          borderRadius: 5,
          marginBottom: 10,
          marginTop: 6,
          backgroundColor: "#fff",
          fontFamily: FONT_FAMILY
        }}
      />
      <View
        style={{
          width: "100%",
          borderWidth: 0.5,
          borderColor: "#ccc",
          borderRadius: 5,
          backgroundColor: "#fff",

          marginTop: 10
        }}
      >
        <Picker
          selectedValue={
            this.state.participantGenderList.length != 0
              ? this.state.participantGenderList[index]
              : "Participant Gender"
          }
          onValueChange={
            itemValue => {
              itemValue !== "Participant Gender"
                ? this.onChangeGender(itemValue, index)
                : null;
            }
            //this.setState({ participantGender: itemValue })
          }
        >
          <Picker.Item label="Participant Gender" value="Participant Gender" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Male" value="Male" />
        </Picker>
      </View>
    </View>
  );

  render() {
    return (
      <ScrollView
        keyboardShouldPersistTaps={"always"}
        style={{ backgroundColor: "#fff" }}
      >
        {this.func_renderContent()}
      </ScrollView>
    );
  }

  func_renderContent() {
    if (this.state.loaderIndicator) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <ActivityIndicator size="large" color="#a82b2d" />
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            backgroundColor: "#fff",
            padding: 10,
            paddingBottom: 0
          }}
        >
          <Animatable.View
            animation="fadeInDownBig"
            useNativeDriver
            delay={500}
            style={{
              flex: 1,
              flexDirection: "column",
              backgroundColor: "#fff",
              padding: 5,
              borderRadius: 5
            }}
          >
            <Dialog
              visible={this.state.dialogVisible}
              title="Select Topic of Training"
              // onTouchOutside={() => {
              //   this.setState({ dialogVisible: false });
              //   this.props.pickChange([], 0);
              // }}
            >
              <View style={{ width: "100%", height: 300 }}>
                {this.props.pickedList.length != 0 ? (
                  <FlatList
                    style={{ flex: 1 }}
                    data={this.props.pickedList}
                    renderItem={({ item, index }) => (
                      <TouchableOpacity
                        style={styles.input}
                        onPress={() => {
                          this.setState({
                            topic_of_train: item,
                            dialogVisible: false
                          });
                        }}
                      >
                        <Text>{item}</Text>
                      </TouchableOpacity>
                    )}
                    keyExtractor={({ item, index }) => index}
                  />
                ) : (
                  <Text>Select Name of Intervention</Text>
                )}
                <TouchableOpacity
                  style={{
                    width: "20%",
                    height: 30,
                    backgroundColor: "#ccc",
                    marginTop: 20,
                    alignItems: "center",
                    justifyContent: "center",
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 50,
                    alignSelf: "flex-end"
                  }}
                  onPress={() => {
                    this.setState({
                      dialogVisible: false
                    });
                  }}
                >
                  <Text>Close</Text>
                </TouchableOpacity>
              </View>
            </Dialog>
            <TouchableOpacity
              style={styles.input}
              onPress={() => Actions.HouseholdSearch()}
            >
              <Text
                //value={this.state.username}
                //onChangeText={username => this.setState({ username })}
                placeholder={"Select Household"}
                ellipsizeMode="tail"
                numberOfLines={2}
                style={{
                  width: "100%",
                  height: 44,
                  fontFamily: FONT_FAMILY
                }}
              >
                {this.props.house_hold.hasOwnProperty("nameserch")
                  ? this.props.house_hold.nameserch
                  : "Select Household"}
              </Text>
            </TouchableOpacity>

            {/* <TextInput
            //value={this.state.password}
            //onChangeText={password => this.setState({ password })}
            placeholder={"Data"}
            secureTextEntry={false}
            style={styles.input}
          /> */}
            <DatePicker
              style={styles.input}
              date={this.state.date}
              mode="date"
              placeholder="Date"
              format="YYYY-MM-DD"
              minDate="2019-01-01"
              maxDate="2090-06-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}
              customStyles={{
                dateInput: {
                  borderWidth: 0,
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  color: "#00f"
                },
                placeholderText: {
                  color: "#cacbcc"
                }
              }}
              onDateChange={date => {
                this.setState({ date: date });
              }}
            />

            <TextInput
              value={this.state.trainId}
              onChangeText={trainid => this.setState({ trainId: trainid })}
              placeholder={"Training ID / No."}
              secureTextEntry={false}
              style={styles.input}
            />
            <View style={{ flexDirection: "row", marginTop: 6 }}>
              <Text style={{ fontFamily: FONT_FAMILY }}>Attended By</Text>
              <View
                style={{
                  flexDirection: "row",
                  width: "50%",
                  justifyContent: "flex-end",
                  alignItems: "flex-end"
                }}
              >
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() =>
                    this.setState({ Attendedckeded: "Self1", Attended: "Self" })
                  }
                >
                  <View
                    style={
                      this.state.Attendedckeded === "Self1"
                        ? styles.activeRadion
                        : styles.inActiveRadion
                    }
                  />

                  <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>
                    Self
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ flexDirection: "row", marginLeft: 10 }}
                  onPress={() =>
                    this.setState({
                      Attendedckeded: "Others1",
                      Attended: "Others"
                    })
                  }
                >
                  <View
                    style={
                      this.state.Attendedckeded === "Others1"
                        ? styles.activeRadion
                        : styles.inActiveRadion
                    }
                  />

                  <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>
                    Others
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                //height: 44,
                // padding: 10,
                borderWidth: 0.5,
                borderColor: "#ccc",
                borderRadius: 5,
                marginTop: 10
              }}
            >
              <Picker
                selectedValue={"" + this.state.num_of_participent}
                // style={{ alignItems: "center", justifyContent: "center" }}
                onValueChange={itemValue => {
                  debugger;
                  this.setState({
                    participantNameList: [],
                    participantGenderList: [],
                    num_of_participent: parseInt(itemValue, 10),
                    num_list:
                      itemValue === "Participant Count"
                        ? 0
                        : parseInt(itemValue, 10)
                  });
                }}
              >
                <Picker.Item
                  label="Participant Count"
                  value="Participant Count"
                />
                {participant.map((item, index) => {
                  return <Picker.Item label={"" + item} value={"" + item} />;
                })}
              </Picker>
            </View>
            {this.state.num_list !== 0 ? (
              <FlatList
                style={{
                  width: "100%",
                  padding: 10,
                  borderWidth: 0.5,
                  borderColor: "#ccc",
                  borderRadius: 5,
                  marginBottom: 10,
                  backgroundColor: "#ddd"
                }}
                data={[...Array(this.state.num_list)]}
                extraData={this.state}
                keyExtractor={(item, index) => index}
                renderItem={this._renderItem}
              />
            ) : null}

            <View
              style={{
                width: "100%",
                //height: 44,
                // padding: 10,
                borderWidth: 0.5,
                borderColor: "#ccc",
                borderRadius: 5,
                marginTop: 10
              }}
            >
              <Picker
                selectedValue={this.state.formtype1}
                style={{ fontFamily: FONT_FAMILY }}
                onValueChange={(itemValue, itemIndex) =>
                  // alert(itemValue)
                  this.setState({ formtype1: itemValue })
                }
              >
                {/* value={this.state.formtype} /> */}
                <Picker.Item
                  itemStyle={{ fontFamily: FONT_FAMILY }}
                  label="Farmer Type - Diversified / Influenced (New / Continued)"
                  value="Farmer Type - Diversified / Influenced (New / Continued)"
                />
                <Picker.Item
                  style={{ fontFamily: FONT_FAMILY }}
                  label="Diversfield (New)"
                  value="Diversfield (New)"
                />
                <Picker.Item
                  style={{ fontFamily: FONT_FAMILY }}
                  label="Diversfield (Continued)"
                  value="Diversfield (Continued)"
                />
                <Picker.Item label="Influened (New)" value="Influened (New)" />
                <Picker.Item
                  label="Influened (Continued)"
                  value="Influened (Continued)"
                />
              </Picker>
            </View>

            <View
              style={{
                width: "100%",
                //height: 44,
                // padding: 10,
                borderWidth: 0.5,
                borderColor: "#ccc",
                borderRadius: 5,
                marginTop: 10
              }}
            >
              <Picker
                selectedValue={this.state.formtype2}
                // style={{ alignItems: "center", justifyContent: "center" }}
                onValueChange={(itemValue, itemIndex) =>
                  // alert(itemValue)
                  this.setState({ formtype2: itemValue })
                }
              >
                <Picker.Item
                  label="Farmer Type - Demo / Continued"
                  value="Farmer Type - Demo / Continued"
                />
                <Picker.Item label="Demo" value="Demo" />
                <Picker.Item label="Continued" value="Continued" />
              </Picker>
            </View>
            <View
              style={{
                width: "100%",
                //height: 44,
                // padding: 10,
                borderWidth: 0.5,
                borderColor: "#ccc",
                borderRadius: 5,
                marginTop: 10
              }}
            >
              <Picker
                selectedValue={this.state.formtype3}
                // style={{ alignItems: "center", justifyContent: "center" }}
                onValueChange={(itemValue, itemIndex) =>
                  // alert(itemValue)
                  this.setState({ formtype3: itemValue })
                }
              >
                <Picker.Item label="Farmer Status" value="Farmer Status" />
                <Picker.Item label="SHG" value="SHG" />
                <Picker.Item label="Both FFS & SSG" value="Both FFS & SSG" />
                <Picker.Item label="FFS Member" value="FFS Member" />
                <Picker.Item
                  label="General Participant"
                  value="General Participant"
                />
              </Picker>
            </View>
            <View
              style={{
                width: "100%",
                //height: 44,
                // padding: 10,
                borderWidth: 0.5,
                borderColor: "#ccc",
                borderRadius: 5,
                marginTop: 10
              }}
            >
              <Picker
                selectedValue={this.state.Intervention}
                // style={{ alignItems: "center", justifyContent: "center" }}
                onValueChange={(itemValue, index) => {
                  // alert(itemValue)
                  let pickList = this.state.interventionDataList
                    .intervention_data;
                  this.props.pickChange(pickList, index);
                  if (itemValue == "Select Name of Intervention") {
                    this.setState({
                      topic_of_train: "Topic of Training"
                    });
                  }
                  this.setState({
                    Intervention: itemValue,
                    pickIndex: index - 1,
                    dialogVisible:
                      itemValue == "Select Name of Intervention" ? false : true
                  });
                }}
              >
                <Picker.Item
                  label="Select Name of Intervention"
                  value="Select Name of Intervention"
                />
                {this.state.interventionDataList.intervention_data != undefined
                  ? this.state.interventionDataList.intervention_data.map(
                      (item, index) => {
                        return (
                          <Picker.Item
                            label={item.intervention_name}
                            value={item.intervention_name}
                          />
                        );
                      }
                    )
                  : null}
                {/* <Picker.Item
                  label="Crop Diversification"
                  value="Crop Diversification"
                />
                <Picker.Item
                  label="Labour Saving Technology"
                  value="Labour Saving Technology"
                />
                <Picker.Item
                  label="Post harvest Management"
                  value="Post harvest Management"
                />
                <Picker.Item
                  label="Livestock - Poultry"
                  value="Livestock - Poultry"
                />
                <Picker.Item
                  label="Livestock - Goatery"
                  value="Livestock - Goatery"
                />
                <Picker.Item
                  label="Livestock - Diary"
                  value="Livestock - Diary"
                />
                <Picker.Item
                  label="Collective Strengthening"
                  value="Collective Strengthening"
                />
                <Picker.Item label="BCC" value="BCC" /> */}
              </Picker>
            </View>
            {/* {this.returnPicker()} */}
            <Text style={styles.input}>{this.state.topic_of_train}</Text>
            {this.state.topic_of_train == "Others" ? (
              <TextInput
                value={this.state.others_topic_of_training_value}
                onChangeText={name =>
                  this.setState({ others_topic_of_training_value: name })
                }
                placeholder={"Please Specify(Topic)"}
                secureTextEntry={false}
                style={styles.input}
              />
            ) : null}
            {/* <TextInput
              value={this.state.topic_of_train}
              onChangeText={name => this.setState({ topic_of_train: name })}
              placeholder={"Topic of Training"}
              secureTextEntry={false}
              style={styles.input}
            /> */}
            <TextInput
              value={this.state.name_of_tool}
              onChangeText={name => this.setState({ name_of_tool: name })}
              placeholder={"Name of Tool"}
              secureTextEntry={false}
              style={styles.input}
            />
            <View
              style={{
                width: "100%",
                //height: 44,
                // padding: 10,
                borderWidth: 0.5,
                borderColor: "#ccc",
                borderRadius: 5,
                marginTop: 10
              }}
            >
              <Picker
                selectedValue={this.state.Source}
                // style={{ alignItems: "center", justifyContent: "center" }}
                onValueChange={(itemValue, itemIndex) =>
                  // alert(itemValue)
                  this.setState({ Source: itemValue })
                }
              >
                <Picker.Item
                  label="Select Type of Source"
                  value="Select Type of Source"
                />
                <Picker.Item label="In House" value="In House" />
                <Picker.Item label="NGTK Care" value="NGTK Care" />
                <Picker.Item label="FFS Member" value="FFS Member" />
                <Picker.Item
                  label="Others (Specify)"
                  value="Others (Specify)"
                />
              </Picker>
            </View>
            {this.state.Source == "Others (Specify)" ? (
              <TextInput
                value={this.state.specify1}
                onChangeText={name => this.setState({ specify1: name })}
                placeholder={"If Others, Please Specify(source)"}
                secureTextEntry={false}
                style={styles.input}
              />
            ) : null}
            <View
              style={{
                width: "100%",
                //height: 44,
                // padding: 10,
                borderWidth: 0.5,
                borderColor: "#ccc",
                borderRadius: 5,
                marginTop: 10
              }}
            >
              <Picker
                selectedValue={this.state.Training}
                // style={{ alignItems: "center", justifyContent: "center" }}
                onValueChange={(itemValue, itemIndex) =>
                  // alert(itemValue)
                  this.setState({ Training: itemValue })
                }
              >
                <Picker.Item
                  label="Type of Training"
                  value="Type of Training"
                />
                <Picker.Item label="Fair / Mela" value="Fair / Mela" />
                <Picker.Item
                  label="Group Interaction / FFS"
                  value="Group Interaction / FFS"
                />
                <Picker.Item
                  label="Street Play Skit"
                  value="Street Play Skit"
                />
                <Picker.Item label="Demonstration" value="Demonstration" />
                <Picker.Item label="Expouser Visit" value="Expouser Visit" />
                <Picker.Item
                  label="Others (Specify)"
                  value="Others (Specify)"
                />
              </Picker>
            </View>
            {this.state.Training == "Others (Specify)" ? (
              <TextInput
                value={this.state.specify2}
                onChangeText={name => this.setState({ specify2: name })}
                placeholder={"Others (Specify)(training)"}
                secureTextEntry={false}
                style={styles.input}
              />
            ) : null}
            <TextInput
              value={this.state.duration_of_traing}
              onChangeText={name => this.setState({ duration_of_traing: name })}
              placeholder={"Duration of Traing (Hours)"}
              secureTextEntry={false}
              style={styles.input}
            />
            <TextInput
              value={this.state.name_of_resource}
              onChangeText={name => this.setState({ name_of_resource: name })}
              placeholder={"Name of Resource Person"}
              secureTextEntry={false}
              style={styles.input}
            />
            <TextInput
              value={this.state.organization}
              onChangeText={name => this.setState({ organization: name })}
              placeholder={"Organization of Resource Person"}
              secureTextEntry={false}
              style={styles.input}
            />
            <TextInput
              value={this.state.designation}
              onChangeText={name => this.setState({ designation: name })}
              placeholder={"Designation of Resource Person"}
              secureTextEntry={false}
              style={styles.input}
            />
            {this.props.formLoading ? (
              <ActivityIndicator size="large" color="#a82b2d" />
            ) : (
              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => this.onLogClick()}
              >
                <Text
                  style={{
                    color: "#fff",
                    textAlign: "center",
                    fontSize: 15,
                    fontFamily: FONT_FAMILY_BOLD
                  }}
                >
                  Log Data
                </Text>
              </TouchableOpacity>
            )}
          </Animatable.View>
        </View>
      );
    }
  }
}
const mapStateToProps = ({ formtt }) => {
  // email:auth.state.email;
  const { house_hold, formLoading, is_connection, pickedList } = formtt;
  return { house_hold, formLoading, is_connection, pickedList };
};
export default connect(
  mapStateToProps,
  { onSaveData, clearHouseholdField, pickChange }
)(TrainingTrackingForm);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#af2e2f"
  },
  input: {
    width: "100%",
    height: 44,
    padding: 10,
    borderWidth: 0.5,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 6,
    fontFamily: FONT_FAMILY
  },
  dialogContainer: {
    backgroundColor: "#fff",
    width: "95%",
    height: 350,
    elevation: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  loginFieldtitle: { color: "#686868", fontWeight: "bold", fontSize: 13 },
  loginButton: {
    backgroundColor: "#af2e2f",
    width: "100%",
    height: 40,
    marginTop: 5,
    borderWidth: 0.5,
    borderColor: "#af2e2f",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  activeRadion: {
    width: 20,
    height: 20,
    backgroundColor: "#ccc",
    borderRadius: 50,
    borderColor: "#ccc",
    borderWidth: 1
  },
  inActiveRadion: {
    width: 20,
    height: 20,
    borderRadius: 50,
    borderColor: "#ccc",
    borderWidth: 1
  }
});
//house_hold
