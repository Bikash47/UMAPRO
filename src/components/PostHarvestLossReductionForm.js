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
  BackAndroid
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
import { onSaveData, clearHouseholdField } from "../actions/TTFormAction";
import { func_validateNumbersInForms } from "../business/common/CommonFunctions";
import Snackbar from "react-native-snackbar";
import * as Animatable from "react-native-animatable";

class PostHarvestLossReductionForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      checked2: "",
      checkedTwoValue: "",
      formtype1: "",
      formtype2: "",
      formtype3: "",
      formtype4: "",
      formtype5: "",
      formtype6: "",
      formtype7: "",
      formtype8: "",
      specifyStorageTool: "",
      specifyDryingTool: "",
      specifyMillingThreshingTool: "",
      specifySourceofTool: "",
      agencyName: "",
      linkPurpose: "",
      date: "",
      nameOfCrop: "",
      quantityOfSeed: "",
      noOfToolsDeployed: ""
    };
  }
  componentWillMount() {
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }
  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }
  componentDidMount() {}
  handleBackButtonClick() {
    Actions.pop();
    return true;
  }
  func_ShowAlert(msg) {
    Snackbar.show({
      title: msg,
      color: "white",
      duration: Snackbar.LENGTH_SHORT
    });
  }

  async onLogClick() {
    if (!this.props.house_hold.hasOwnProperty("nameserch")) {
      this.func_ShowAlert("Select Household");
    } else if (this.state.date == "") {
      this.func_ShowAlert("Select Date");
    } else if (
      func_validateNumbersInForms(0, 100, this.state.noOfToolsDeployed)
    ) {
      this.func_ShowAlert(
        "No. of tools deployed should be greater than 0 and less than 100"
      );
    } else if (
      func_validateNumbersInForms(0, 1000, this.state.quantityOfSeed)
    ) {
      this.func_ShowAlert(
        "Quantity of seed/grain the tool has served(Kg) should be greater than 0 and less than 1000"
      );
    } else {
      let forSaveData = {
        logged_date: this.state.date,
        hh_id: this.props.house_hold.id,
        farmer_type:
          this.state.formtype1 == "Farmer Type" ? "" : this.state.formtype1,
        farmer_status:
          this.state.formtype2 == "Farmer Status" ? "" : this.state.formtype2,
        name_of_crop: this.state.nameOfCrop,
        storage_type_tech_tool_used:
          this.state.formtype3 == "Storage-Type of Technology & Tool Used"
            ? ""
            : this.state.formtype3,
        drying_type_tech_tool_used:
          this.state.formtype4 == "Drying-Type of Technology & Tool Used"
            ? ""
            : this.state.formtype4,
        gr_cl_so_type_tech_tool_used:
          this.state.formtype5 ==
          "Grading/Cleaning/Sorting-Type of Technology & Tool Used"
            ? ""
            : this.state.formtype5,
        mill_thre_type_tech_tool_used:
          this.state.formtype6 ==
          "Milling & Threshing-Type of Technology & Tool Used"
            ? ""
            : this.state.formtype6,
        source_of_tool:
          this.state.formtype7 == "Source of Tool" ? "" : this.state.formtype7,
        tools_deployed_at:
          this.state.formtype8 == "Tools Deployed at"
            ? ""
            : this.state.formtype8,
        no_of_tools_deployed: this.state.noOfToolsDeployed,
        quantity_of_seed_tool_served: this.state.quantityOfSeed,
        type_of_linkages: this.state.checkedTwoValue,
        agency_linked_with: this.state.agencyName,
        linkage_purpose: this.state.linkPurpose,
        logged_from: "MOBILE_APP",
        op: "add_phlr_data"
      };

      //**If needed part of object for farmer type and farmer status */
      // this.state.specifyStorageTool,
      // this.state.specifyDryingTool,
      // this.state.specifyMillingThreshingTool,
      // this.state.specifySourceofTool,

      let isConnection = this.props.is_connection;
      await this.props.onSaveData(forSaveData, isConnection);
      this.setState({
        checked2: "",
        checkedTwoValue: "",
        formtype1: "",
        formtype2: "",
        formtype3: "",
        formtype4: "",
        formtype5: "",
        formtype6: "",
        formtype7: "",
        formtype8: "",
        specifyStorageTool: "",
        specifyDryingTool: "",
        specifyMillingThreshingTool: "",
        specifySourceofTool: "",
        agencyName: "",
        linkPurpose: "",
        date: "",
        nameOfCrop: "",
        quantityOfSeed: "",
        noOfToolsDeployed: ""
      });
      this.props.clearHouseholdField();
    }
  }

  render() {
    return (
      <ScrollView
        keyboardShouldPersistTaps={"always"}
        style={{ backgroundColor: "#fff" }}
      >
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
                  label="Farmer Type"
                  value="Farmer Type"
                />
                <Picker.Item
                  style={{ fontFamily: FONT_FAMILY }}
                  label="Continued"
                  value="Continued"
                />
                <Picker.Item
                  style={{ fontFamily: FONT_FAMILY }}
                  label="New"
                  value="New"
                />
                <Picker.Item label="Demo" value="Demo" />
                <Picker.Item
                  label="Diversified / Influened"
                  value="Diversified / Influened"
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
                <Picker.Item label="Farmer Status" value="Farmer Status" />
                <Picker.Item label="SHG" value="SHG" />
                <Picker.Item label="Both FFS & SHG" value="Both FFS & SHG" />
                <Picker.Item label="FFS Member" value="FFS Member" />
                <Picker.Item
                  label="General Participant"
                  value="General Participant"
                />
              </Picker>
            </View>

            <TextInput
              value={this.state.nameOfCrop}
              onChangeText={name => this.setState({ nameOfCrop: name })}
              placeholder={"Name of Crop(s) dealt with"}
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
                selectedValue={this.state.formtype3}
                // style={{ alignItems: "center", justifyContent: "center" }}
                onValueChange={(itemValue, itemIndex) =>
                  // alert(itemValue)
                  this.setState({ formtype3: itemValue })
                }
              >
                <Picker.Item
                  label="Storage-Type of Technology & Tool Used"
                  value="Storage-Type of Technology & Tool Used"
                />
                <Picker.Item label="Hermative Bags" value="Hermative Bags" />
                <Picker.Item label="Moisture Meter" value="Moisture Meter" />
                <Picker.Item
                  label="Metallic Storage Bin"
                  value="Metallic Storage Bin"
                />
                <Picker.Item
                  label="Tarpaulin Sheets"
                  value="Tarpaulin Sheets"
                />
                <Picker.Item label="Indigenous" value="Indigenous" />
                <Picker.Item label="Others" value="Others" />
              </Picker>
            </View>
            {/* {this.state.formtype3 == "Others" ? (
                  <TextInput
                    value={this.state.specifyStorageTool}
                    onChangeText={name => this.setState({ specifyStorageTool: name })}
                    placeholder={"Please Specify Storage Tool Used"}
                    secureTextEntry={false}
                    style={styles.input}
                  />
                ) : null} */}
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
                selectedValue={this.state.formtype4}
                // style={{ alignItems: "center", justifyContent: "center" }}
                onValueChange={(itemValue, itemIndex) =>
                  // alert(itemValue)
                  this.setState({ formtype4: itemValue })
                }
              >
                <Picker.Item
                  label="Drying-Type of Technology & Tool Used"
                  value="Drying-Type of Technology & Tool Used"
                />
                <Picker.Item label="Sun Drying" value="Sun Drying" />
                <Picker.Item
                  label="Fabricated Solar Drier"
                  value="Fabricated Solar Drier"
                />
                <Picker.Item label="Others" value="Others" />
              </Picker>
            </View>
            {/* {this.state.formtype4 == "Others" ? (
                  <TextInput
                    value={this.state.specifyDryingTool}
                    onChangeText={name => this.setState({ specifyDryingTool: name })}
                    placeholder={"Please Specify Drying Tool Used"}
                    secureTextEntry={false}
                    style={styles.input}
                  />
                ) : null} */}

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
                selectedValue={this.state.formtype5}
                // style={{ alignItems: "center", justifyContent: "center" }}
                onValueChange={(itemValue, itemIndex) =>
                  // alert(itemValue)
                  this.setState({ formtype5: itemValue })
                }
              >
                <Picker.Item
                  label="Grading/Cleaning/Sorting-Type of Technology & Tool Used"
                  value="Storage-Type of Technology & Tool Used"
                />
                <Picker.Item label="Spiral Grader" value="Spiral Grader" />
                <Picker.Item label="Sieve" value="Sieve" />
                <Picker.Item label="Manual" value="Manual" />
                <Picker.Item label="Winnower" value="Winnower" />
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
                selectedValue={this.state.formtype6}
                // style={{ alignItems: "center", justifyContent: "center" }}
                onValueChange={(itemValue, itemIndex) =>
                  // alert(itemValue)
                  this.setState({ formtype6: itemValue })
                }
              >
                <Picker.Item
                  label="Milling & Threshing-Type of Technology & Tool Used"
                  value="Drying-Type of Technology & Tool Used"
                />
                <Picker.Item label="Mini Daal Mill" value="Mini Daal Mill" />
                <Picker.Item label="Manual Thresher" value="Manual Thresher" />
                <Picker.Item label="Power Thresher" value="Power Thresher" />
                <Picker.Item label="Others" value="Others" />
              </Picker>
            </View>
            {/* {this.state.formtype6 == "Others" ? (
                  <TextInput
                    value={this.state.specifyMillingThreshingTool}
                    onChangeText={name => this.setState({ specifyMillingThreshingTool: name })}
                    placeholder={"Please Specify Milling & Threshing Tool Used"}
                    secureTextEntry={false}
                    style={styles.input}
                  />
                ) : null} */}
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
                selectedValue={this.state.formtype7}
                // style={{ alignItems: "center", justifyContent: "center" }}
                onValueChange={(itemValue, itemIndex) =>
                  // alert(itemValue)
                  this.setState({ formtype7: itemValue })
                }
              >
                <Picker.Item label="Source of Tool" value="Source of Tool" />
                <Picker.Item label="In House" value="In House" />
                <Picker.Item
                  label="Hired or Borrowed"
                  value="Hired or Borrowed"
                />
              </Picker>
            </View>
            {/* {this.state.formtype7 == "Others" ? (
                  <TextInput
                    value={this.state.specifySourceofTool}
                    onChangeText={name => this.setState({ specifySourceofTool: name })}
                    placeholder={"Please Specify Source of Tool Used"}
                    secureTextEntry={false}
                    style={styles.input}
                  />
                ) : null} */}
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
                selectedValue={this.state.formtype8}
                // style={{ alignItems: "center", justifyContent: "center" }}
                onValueChange={(itemValue, itemIndex) =>
                  // alert(itemValue)
                  this.setState({ formtype8: itemValue })
                }
              >
                <Picker.Item
                  label="Tools Deployed at"
                  value="Tools Deployed at"
                />
                <Picker.Item label="Household" value="Household" />
                <Picker.Item label="SHG / Group" value="SHG / Group" />
                <Picker.Item label="Village" value="Village" />
                <Picker.Item label="Panchayat" value="Panchayat" />
                <Picker.Item label="Block" value="Block" />
                <Picker.Item label="District" value="District" />
              </Picker>
            </View>

            <View style={{ flexDirection: "column", marginTop: 6 }}>
              <TextInput
                value={this.state.noOfToolsDeployed}
                onChangeText={name =>
                  this.setState({ noOfToolsDeployed: name })
                }
                placeholder={"No. of Tools Deplyoed"}
                secureTextEntry={false}
                keyboardType="number-pad"
                style={styles.input}
              />
              <Text style={{ fontFamily: FONT_FAMILY, fontSize: 11 }}>
                (Must be greater than 0 and less than 100)
              </Text>
            </View>

            <View style={{ flexDirection: "column", marginTop: 6 }}>
              <TextInput
                value={this.state.quantityOfSeed}
                onChangeText={name => this.setState({ quantityOfSeed: name })}
                placeholder={"Quantity of Seed/Grain the tool has served(Kg)"}
                secureTextEntry={false}
                keyboardType="number-pad"
                style={styles.input}
              />
              <Text style={{ fontFamily: FONT_FAMILY, fontSize: 11 }}>
                (Must be greater than 0 and less than 1000)
              </Text>
            </View>

            <View style={{ flexDirection: "column", marginTop: 6 }}>
              <Text style={{ fontFamily: FONT_FAMILY, marginHorizontal: 8 }}>
                Types of Linkages
              </Text>
              <View
                style={{
                  flexDirection: "column",
                  width: "100%",
                  justifyContent: "space-around",
                  marginTop: 15
                }}
              >
                <TouchableOpacity
                  style={{ flexDirection: "row", marginLeft: 10 }}
                  onPress={() =>
                    this.setState({
                      checked2: "radio11",
                      checkedTwoValue: "Financial"
                    })
                  }
                >
                  <View
                    style={
                      this.state.checked2 === "radio11"
                        ? styles.activeRadion
                        : styles.inActiveRadion
                    }
                  />

                  <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>
                    Financial
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ flexDirection: "row", marginLeft: 10, marginTop: 5 }}
                  onPress={() =>
                    this.setState({
                      checked2: "radio22",
                      checkedTwoValue: "Capacity Strengthening – Market"
                    })
                  }
                >
                  <View
                    style={
                      this.state.checked2 === "radio22"
                        ? styles.activeRadion
                        : styles.inActiveRadion
                    }
                  />

                  <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>
                    Capacity Strengthening – Market
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ flexDirection: "row", marginLeft: 10, marginTop: 5 }}
                  onPress={() =>
                    this.setState({
                      checked2: "radio33",
                      checkedTwoValue: "InputResources"
                    })
                  }
                >
                  <View
                    style={
                      this.state.checked2 === "radio33"
                        ? styles.activeRadion
                        : styles.inActiveRadion
                    }
                  />

                  <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>
                    Input Resources
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <TextInput
              value={this.state.agencyName}
              onChangeText={name => this.setState({ agencyName: name })}
              placeholder={"Agency Linked With"}
              secureTextEntry={false}
              style={styles.input}
            />
            <TextInput
              value={this.state.linkPurpose}
              onChangeText={name => this.setState({ linkPurpose: name })}
              placeholder={"Linkage Purpose"}
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
      </ScrollView>
    );
  }
}
const mapStateToProps = ({ formtt }) => {
  // email:auth.state.email;
  const { house_hold, formLoading, is_connection } = formtt;
  return { house_hold, formLoading, is_connection };
};
export default connect(
  mapStateToProps,
  { onSaveData, clearHouseholdField }
)(PostHarvestLossReductionForm);
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
    marginTop: 6
    // fontFamily: FONT_FAMILY
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
