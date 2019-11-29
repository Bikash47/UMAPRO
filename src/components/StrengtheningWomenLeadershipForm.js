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
import {
  getSavedData,
  saveData,
  getFromFs
} from "../business/common/AsyncStorage/AsyncStorageDB";
import { USER_SEARCH } from "../config/Config";
import { onSaveData, clearHouseholdField } from "../actions/TTFormAction";
import Snackbar from "react-native-snackbar";
import * as Animatable from "react-native-animatable";

class StrengtheningWomenLeadershipForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      // checked: "radio1",
      // checkedOneValue: "KVK",
      // checked2: "radio11",
      // checkedTwoValue: "Financial",
      // formtype1: "",
      // formtype2: "",
      formtype3: "",
      formtype4: "",
      formtype5: "",
      formtype6: "",
      formtype7: "",
      formtype8: "",
      formtype9: "",
      formtype10: "",
      specifyTraining: "",
      // agencyName: "",
      linkPurpose: "",
      date: "",
      namesOfSHG: [],
      nameOfSHGLeader: "",
      productIdentifiedSHG: "",
      specifyTypeOfSupport: "",
      specifyInstitutionalRep: "",
      specifyTypeofLinkage: "",
      loaderIndicator: true
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
  async componentDidMount() {
    let data = await getFromFs(); //getSavedData(USER_SEARCH);
    if (data.shg_data.length > 0) {
      this.setState({ loaderIndicator: false });
    } else {
      this.setState({ loaderIndicator: true });
    }
    if (data.shg_data != undefined && data.shg_data.length > 0) {
      this.setState({ namesOfSHG: data.shg_data });
    }
    debugger;
  }
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
      this.func_ShowAlert("Select Household ");
    } else if (this.state.date == "") {
      this.func_ShowAlert("Select Date ");
    } else {
      // 'logged_date'
      // 'hh_id'
      // 'group_status'
      // 'trainings_attended'
      // 'others_training_value'
      // 'institutional_representation'
      // `institutional_representation_others_value`
      // 'shg_leader_name'
      // 'session_delivered_on'
      // 'fk_shg_id'
      // 'product_identify_shg_aggre'
      // 'type_of_support_required'
      // 'type_of_support_required_others_value'
      // 'type_of_linkages'
      // 'type_of_linkages_others_value'
      // 'agency_linked_with'
      // 'linkage_purpose'
      // 'logged_from'=>'MOBILE_APP'
      // 'op'=>'add_swl_data'
      let forSaveData = {
        logged_date: this.state.date,
        hh_id: this.props.house_hold.id,
        group_status:
          this.state.formtype3 == "Select Group Status"
            ? ""
            : this.state.formtype3,
        trainings_attended:
          this.state.formtype4 == "Select Trainings Attended"
            ? ""
            : this.state.formtype4,
        others_training_value: this.state.specifyTraining,
        institutional_representation:
          this.state.formtype8 == "Institutional Representation"
            ? ""
            : this.state.formtype8,
        institutional_representation_others_value: this.state
          .specifyInstitutionalRep,
        shg_leader_name: this.state.nameOfSHGLeader,
        session_delivered_on:
          this.state.formtype5 == "Sessions delivered on"
            ? ""
            : this.state.formtype5,
        fk_shg_id: this.state.formtype6,
        product_identify_shg_aggre: this.state.productIdentifiedSHG,
        type_of_support_required:
          this.state.formtype7 == "Type of Support required"
            ? ""
            : this.state.formtype7,
        type_of_support_required_others_value: this.state.specifyTypeOfSupport,
        type_of_linkages:
          this.state.formtype9 == "Type of Linkages"
            ? ""
            : this.state.formtype9,
        type_of_linkages_others_value: this.state.specifyTypeofLinkage,
        agency_linked_with: this.state.formtype10,
        linkage_purpose: this.state.linkPurpose,
        logged_from: "MOBILE_APP",
        op: "add_swl_data"
      };

      //**If needed part of object for farmer type and farmer status */
      // farmer_type: this.state.formtype1 == "Farmer Type"?"":this.state.formtype1,
      // farmer_status: this.state.formtype2 == "Farmer Status" ? "":this.state.formtype2,
      let isConnection = this.props.is_connection;
      await this.props.onSaveData(forSaveData, isConnection);
      this.setState({
        // checked: "radio1",
        // checkedOneValue: "KVK",
        // checked2: "radio11",
        // checkedTwoValue: "Financial",
        // formtype1: "",
        // formtype2: "",
        formtype3: "",
        formtype4: "",
        formtype5: "",
        formtype6: "",
        formtype7: "",
        formtype8: "",
        formtype9: "",
        formtype10: "",
        specifyTraining: "",
        // agencyName: "",
        linkPurpose: "",
        date: "",
        nameOfSHGLeader: "",
        productIdentifiedSHG: "",
        specifyTypeOfSupport: "",
        specifyInstitutionalRep: "",
        specifyTypeofLinkage: ""
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

            {/* <View
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
                <Picker.Item
                  label="Demo"
                  value="Demo"
                />
                <Picker.Item
                  label="Diversified / Influened"
                  value="Diversified / Influened" />
              </Picker>
            </View> */}
            {/* <View
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
                <Picker.Item label="General Participant" value="General Participant" />
              </Picker>
            </View> */}
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
                  label="Select Group Status"
                  value="Select Group Status"
                />
                <Picker.Item label="FFS Member" value="FFS Member" />
                <Picker.Item label="Non FFS" value="Non FFS" />
                <Picker.Item label="SHG" value="SHG" />
                <Picker.Item label="Both FFS & SSG" value="Both FFS & SSG" />
                <Picker.Item
                  label="General Participant"
                  value="General Participant"
                />
                <Picker.Item label="SHG Leader" value="SHG Leader" />
                <Picker.Item label="Others" value="Others" />
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
                selectedValue={this.state.formtype4}
                // style={{ alignItems: "center", justifyContent: "center" }}
                onValueChange={(itemValue, itemIndex) =>
                  // alert(itemValue)
                  this.setState({ formtype4: itemValue })
                }
              >
                <Picker.Item
                  label="Select Trainings Attended"
                  value="Select Trainings Attended"
                />
                <Picker.Item
                  label="Nutrition Messaging"
                  value="Nutrition Messaging"
                />
                <Picker.Item
                  label="Product Service Option"
                  value="Product Service Option"
                />
                <Picker.Item label="MSP / FAQ" value="MSP / FAQ" />
                <Picker.Item label="SHG Aggregation" value="SHG Aggregation" />
                <Picker.Item
                  label="Interface Meeting"
                  value="Interface Meeting"
                />
                <Picker.Item
                  label="FFS Session on Agri Services"
                  value="FFS Session on Agri Services"
                />
                <Picker.Item
                  label="Buyer Seller Meet"
                  value="Buyer Seller Meet"
                />
                <Picker.Item label="Others" value="Others" />
              </Picker>
            </View>
            {this.state.formtype4 == "Others" ? (
              <TextInput
                value={this.state.specifyTraining}
                onChangeText={name => this.setState({ specifyTraining: name })}
                placeholder={"Please Specify Training"}
                secureTextEntry={false}
                style={styles.input}
              />
            ) : null}
            <Text
              style={{
                width: "100%",
                height: 44,
                fontFamily: FONT_FAMILY,
                marginTop: 10
              }}
            >
              Sessions delivered by SHG leaders to SHG / Women farmers
            </Text>
            <TextInput
              value={this.state.nameOfSHGLeader} //i have to mention this state in constructor
              onChangeText={name => this.setState({ nameOfSHGLeader: name })}
              placeholder={"Name of SHG Leader"}
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
                borderRadius: 5
              }}
            >
              <Picker
                selectedValue={this.state.formtype5} //I have to cghange formType to formType5
                // style={{ alignItems: "center", justifyContent: "center" }}
                onValueChange={(itemValue, itemIndex) =>
                  // alert(itemValue)
                  this.setState({ formtype5: itemValue })
                }
              >
                <Picker.Item
                  label="Sessions delivered on"
                  value="Sessions delivered on"
                />
                <Picker.Item
                  label="Nutrition Messaging"
                  value="Nutrition Messaging"
                />
                <Picker.Item
                  label="Product Service Option"
                  value="Product Service Option"
                />
                <Picker.Item label="MSP/FAQ" value="MSP/FAQ" />
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
                selectedValue={this.state.formtype6} //I have to cghange formType to formType6
                // style={{ alignItems: "center", justifyContent: "center" }}
                onValueChange={(itemValue, itemIndex) =>
                  // alert(itemValue)
                  this.setState({ formtype6: itemValue })
                }
              >
                <Picker.Item
                  label="Name of SHG in which sessions facilitated"
                  value="Name of SHG in which sessions facilitated"
                />
                {this.state.namesOfSHG.map(obj => (
                  <Picker.Item label={obj.shg_name} value={obj.shg_id} />
                ))}
              </Picker>
            </View>
            <Text
              style={{
                width: "100%",
                height: 44,
                fontFamily: FONT_FAMILY,
                marginTop: 15
              }}
            >
              SHG Aggregation
            </Text>
            <TextInput
              value={this.state.productIdentifiedSHG} //i have to mention this state in constructor
              onChangeText={name =>
                this.setState({ productIdentifiedSHG: name })
              }
              placeholder={"Product identified by SHG for Aggregation"}
              secureTextEntry={false}
              style={[styles.input, { marginTop: 0 }]}
            />
            <View
              style={{
                width: "100%",
                //height: 44,
                // padding: 10,
                borderWidth: 0.5,
                borderColor: "#ccc",
                borderRadius: 5
              }}
            >
              <Picker
                selectedValue={this.state.formtype7} //I have to cghange formType to formType7
                // style={{ alignItems: "center", justifyContent: "center" }}
                onValueChange={(itemValue, itemIndex) =>
                  // alert(itemValue)
                  this.setState({ formtype7: itemValue })
                }
              >
                <Picker.Item
                  label="Type of Support required"
                  value="Type of Support required"
                />
                <Picker.Item label="Financial" value="Financial" />
                <Picker.Item
                  label="Capacity Strenthening"
                  value="Capacity Strenthening"
                />
                <Picker.Item label="Input Material" value="Input Material" />
                <Picker.Item label="Market Linkage" value="Market Linkage" />
                <Picker.Item label="Others" value="Others" />
              </Picker>
            </View>
            {this.state.formtype7 == "Others" ? (
              <TextInput
                value={this.state.specifyTypeOfSupport}
                onChangeText={name =>
                  this.setState({ specifyTypeOfSupport: name })
                }
                placeholder={"Please Specify Type of Support required"}
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
                marginTop: 6
              }}
            >
              <Picker
                selectedValue={this.state.formtype8} //I have to cghange formType to formType8
                // style={{ alignItems: "center", justifyContent: "center" }}
                onValueChange={(itemValue, itemIndex) =>
                  // alert(itemValue)
                  this.setState({ formtype8: itemValue })
                }
              >
                <Picker.Item
                  label="Institutional Representation"
                  value="Institutional Representation"
                />
                <Picker.Item label="SMC" value="SMC" />
                <Picker.Item label="Health" value="Health" />
                <Picker.Item
                  label="Water and Sanitation"
                  value="Water and Sanitation"
                />
                <Picker.Item label="Panchayat Raj" value="Panchayat Raj" />
                <Picker.Item label="Ward Member" value="Ward Member" />
                <Picker.Item
                  label="Forest Right Committee"
                  value="Forest Right Committee"
                />
                <Picker.Item label="ASHA" value="ASHA" />
                <Picker.Item label="AWW" value="AWW" />
                <Picker.Item label="Others" value="Others" />
              </Picker>
            </View>
            {this.state.formtype8 == "Others" ? (
              <TextInput
                value={this.state.specifyInstitutionalRep}
                onChangeText={name =>
                  this.setState({ specifyInstitutionalRep: name })
                }
                placeholder={"Please Specify Institutional Representation"}
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
                marginTop: 6
              }}
            >
              <Picker
                selectedValue={this.state.formtype9} //I have to cghange formType to formType9
                // style={{ alignItems: "center", justifyContent: "center" }}
                onValueChange={(itemValue, itemIndex) =>
                  // alert(itemValue)
                  this.setState({ formtype9: itemValue })
                }
              >
                <Picker.Item
                  label="Type of Linkages"
                  value="Type of Linkages"
                />
                <Picker.Item label="Financial" value="Financial" />
                <Picker.Item
                  label="Capacity Strenthening"
                  value="Capacity Strenthening"
                />
                <Picker.Item label="Input Material" value="Input Material" />
                <Picker.Item label="Market Linkage" value="Market Linkage" />
                <Picker.Item label="Others" value="Others" />
              </Picker>
            </View>
            {this.state.formtype9 == "Others" ? (
              <TextInput
                value={this.state.specifyTypeofLinkage}
                onChangeText={name =>
                  this.setState({ specifyTypeofLinkage: name })
                }
                placeholder={"Please Specify Type of Linkage"}
                secureTextEntry={false}
                style={styles.input}
              />
            ) : null}
            <Text
              style={{
                width: "100%",
                height: 44,
                fontFamily: FONT_FAMILY,
                marginTop: 15
              }}
            >
              Agency Linked with
            </Text>
            <View
              style={{
                width: "100%",
                //height: 44,
                // padding: 10,
                borderWidth: 0.5,
                borderColor: "#ccc",
                borderRadius: 5
              }}
            >
              <Picker
                selectedValue={this.state.formtype10} //I have to cghange formType to formType10
                // style={{ alignItems: "center", justifyContent: "center" }}
                onValueChange={(itemValue, itemIndex) =>
                  // alert(itemValue)
                  this.setState({ formtype10: itemValue })
                }
              >
                <Picker.Item label="KVK" value="KVK" />
                <Picker.Item label="Line Department" value="Line Department" />
                <Picker.Item label="ATMA" value="ATMA" />
                <Picker.Item label="RMC" value="RMC" />
                <Picker.Item label="Other NGOs" value="Other NGOs" />
                <Picker.Item
                  label="Private Agencies"
                  value="Private Agencies"
                />
              </Picker>
            </View>
            {/* <View style={{ flexDirection: "column", marginTop: 6 }}>
              <Text style={{ fontFamily: FONT_FAMILY, marginHorizontal: 8 }}>Institutional Representation</Text>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-around",
                  alignItems: "flex-end", marginTop: 15
                }}
              >
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() =>
                    this.setState({ checked: "radio1", checkedOneValue: "KVK" })
                  }
                >
                  <View
                    style={
                      this.state.checked === "radio1"
                        ? styles.activeRadion
                        : styles.inActiveRadion
                    }
                  />

                  <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>KVK</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ flexDirection: "row", marginLeft: 10 }}
                  onPress={() =>
                    this.setState({ checked: "radio2", checkedOneValue: "LineDepartments" })
                  }
                >
                  <View
                    style={
                      this.state.checked === "radio2"
                        ? styles.activeRadion
                        : styles.inActiveRadion
                    }
                  />

                  <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>Line Departments</Text>
                </TouchableOpacity>

              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: "50%",
                  justifyContent: "flex-start",
                  alignItems: "flex-end",
                  marginTop: 10,
                  marginHorizontal: 18,
                  backgroundColor: 'transparent'
                }}
              >

                <TouchableOpacity
                  style={{ flexDirection: "row", marginLeft: 10 }}
                  onPress={() =>
                    this.setState({ checked: "radio3", checkedOneValue: "ATMA" })
                  }
                >
                  <View
                    style={
                      this.state.checked === "radio3"
                        ? styles.activeRadion
                        : styles.inActiveRadion
                    }
                  />

                  <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>ATMA</Text>
                </TouchableOpacity>
              </View>
            </View> */}

            {/* <View style={{ flexDirection: "column", marginTop: 6 }}>
              <Text style={{ fontFamily: FONT_FAMILY, marginHorizontal: 8 }}>Types of Linkages</Text>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-around",
                  alignItems: "flex-end", marginTop: 15
                }}
              >
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() =>
                    this.setState({ checked2: "radio11", checkedTwoValue: "Financial" })
                  }
                >
                  <View
                    style={
                      this.state.checked2 === "radio11"
                        ? styles.activeRadion
                        : styles.inActiveRadion
                    }
                  />

                  <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>Financial</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ flexDirection: "row", marginLeft: 10 }}
                  onPress={() =>
                    this.setState({ checked2: "radio22", checkedTwoValue: "CapacityStengthening" })
                  }
                >
                  <View
                    style={
                      this.state.checked2 === "radio22"
                        ? styles.activeRadion
                        : styles.inActiveRadion
                    }
                  />

                  <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>Capacity Stengthening</Text>
                </TouchableOpacity>

              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: "50%",
                  justifyContent: "flex-start",
                  alignItems: "flex-end",
                  marginTop: 10,
                  //   marginHorizontal:18,
                  backgroundColor: 'transparent'
                }}
              >

                <TouchableOpacity
                  style={{ flexDirection: "row", marginLeft: 10 }}
                  onPress={() =>
                    this.setState({ checked2: "radio33", checkedTwoValue: "InputResources" })
                  }
                >
                  <View
                    style={
                      this.state.checked2 === "radio33"
                        ? styles.activeRadion
                        : styles.inActiveRadion
                    }
                  />

                  <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>Input Resources</Text>
                </TouchableOpacity>
              </View>
            </View> */}

            {/* <TextInput
              value={this.state.agencyName}
              onChangeText={name => this.setState({ agencyName: name })}
              placeholder={"Agency Linked With"}
              secureTextEntry={false}
              style={styles.input}
            /> */}
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
      );
    }
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
)(StrengtheningWomenLeadershipForm);
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
