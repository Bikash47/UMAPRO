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
import Snackbar from "react-native-snackbar";
import * as Animatable from "react-native-animatable";
import { func_validateNumbersInForms } from "../business/common/CommonFunctions";

class HomesteadKitchenGardenDataForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radioBtnsData: ["Item1", "Item2", "Item3"],
      checked: "radio1",
      formtype1: "",
      formtype3: "",
      date: "",

      TrainingChecked: "No",
      Training: "NO",
      TarinaChecked: "Yes",
      Tarina: "TARINA",
      TarinaOther: "",
      ExtensionYes1: "No",
      Extension1: "NO",
      no_of_extension: "",
      purpose_of_extension: "",
      no_of_gots_male: "",
      no_of_gots_female: "",
      no_of_gots_kids: "",
      MedicineChecked: "No",
      Medicine: "NO",
      TarinaSupChecked: "",
      TarinaSup: "",
      MedicineQuantity: "",
      MedicineName: "",
      goatsMedicine: "",
      goatsMedicineFemail: "",
      goatsMedicineKids: "",
      DewormingChecked: "No",
      Deworming: "NO",
      DewormingCheck: "",
      DewormingQuantity: "",
      DewormingName: "",
      goatsDeworming: "",
      goatsDewormingFemail: "",
      goatsDewormingKids: "",

      VaccinationCheck: "",
      Vaccination: "",
      VaccinationQuantityMust: "",
      VaccinationName: "",
      goatsVaccination: "",
      goatsVaccinationFemail: "",
      goatsVaccinationKids: "",
      FodderChecked: "No",
      FeedChecked: "No",
      Feed: "NO",
      FeedQuatityField: "",
      FeedName: "",
      FeedVaccination: "",
      goatsFeedFemail: "",
      goatsFeedKids: "",
      VaccinationChecked: "No",

      Fodder: "NO",
      FodderQuatityField: "",
      FodderName: "",
      FodderVaccination: "",
      goatsFodderFemail: "",
      goatsFodderKids: "",
      ShedChecked: "No",
      Shed: "NO",
      ShedQuatityField: "",
      ShedName: "",
      ShedVaccination: "",
      goatsShedFemail: "",
      goatsShedKids: "",
      OtherSupChecked: "",
      OtherSup: "",
      gotsRsvOther: "",
      gotsRsvOtherMale: "",
      gotsRsvOtherKids: "",
      OtherChecked: "No",
      Other: "NO",
      HealthChecked: "No",
      Health: "NO",

      FinancialChecked: "",
      typelink: "",
      Linkageform: "",
      AgencyLinkForm: ""
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
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
    } else if (
      func_validateNumbersInForms(0, 100, this.state.no_of_extension)
    ) {
      this.func_ShowAlert(
        "No. of Extension Support given (Must be greater than 0 and less than 1000)"
      );
    } else if (
      func_validateNumbersInForms(0, 100, this.state.no_of_gots_male)
    ) {
      this.func_ShowAlert(
        "No. of goats received Extension Support (Male) (Must be greater than 0 and less than 100)"
      );
    } else if (
      func_validateNumbersInForms(0, 100, this.state.no_of_gots_female)
    ) {
      this.func_ShowAlert(
        "No. of goats received Extension Support (Female) (Must be greater than 0 and less than 100)"
      );
    } else if (
      func_validateNumbersInForms(0, 100, this.state.no_of_gots_kids)
    ) {
      this.func_ShowAlert(
        "No. of goats received Extension Support (Kids) (Must be greater than 0 and less than 100)"
      );
    } else if (
      func_validateNumbersInForms(0, 1000, this.state.MedicineQuantity)
    ) {
      this.func_ShowAlert(
        "Medicine Quantity Must be greater than 0 and less than 1000"
      );
    } else if (func_validateNumbersInForms(0, 100, this.state.goatsMedicine)) {
      this.func_ShowAlert(
        "No. of goats received Medicine Support (Male) (Must be greater than 0 and less than 100)"
      );
    } else if (
      func_validateNumbersInForms(0, 100, this.state.goatsMedicineFemail)
    ) {
      this.func_ShowAlert(
        "No. of goats received Medicine Support (Female) (Must be greater than 0 and less than 100)"
      );
    } else if (
      func_validateNumbersInForms(0, 100, this.state.goatsMedicineKids)
    ) {
      this.func_ShowAlert(
        "No. of goats received Medicine Support (Kids) (Must be greater than 0 and less than 100"
      );
    } else if (
      func_validateNumbersInForms(0, 1000, this.state.DewormingQuantity)
    ) {
      this.func_ShowAlert(
        "Deworming Quantity Must be greater than 0 and less than 1000"
      );
    } else if (func_validateNumbersInForms(0, 100, this.state.goatsDeworming)) {
      this.func_ShowAlert(
        "No. of goats received Deworming Support (Male) (Must be greater than 0 and less than 100)"
      );
    } else if (
      func_validateNumbersInForms(0, 100, this.state.goatsDewormingFemail)
    ) {
      this.func_ShowAlert(
        "No. of goats received Deworming Support (Female) (Must be greater than 0 and less than 100)"
      );
    } else if (
      func_validateNumbersInForms(0, 100, this.state.goatsDewormingKids)
    ) {
      this.func_ShowAlert(
        "No. of goats received Deworming Support (Kids) (Must be greater than 0 and less than 100)"
      );
    } else if (
      func_validateNumbersInForms(0, 100, this.state.VaccinationQuantityMust)
    ) {
      this.func_ShowAlert(
        "Vaccination Quantity Must be greater than 0 and less than 1000"
      );
    } else if (
      func_validateNumbersInForms(0, 100, this.state.goatsVaccination)
    ) {
      this.func_ShowAlert(
        "No. of goats received Vaccination Support (Male) (Must be greater than 0 and less than 100)"
      );
    } else if (
      func_validateNumbersInForms(0, 100, this.state.goatsVaccinationFemail)
    ) {
      this.func_ShowAlert(
        "No. of goats received Vaccination Support (Female) (Must be greater than 0 and less than 100)"
      );
    } else if (
      func_validateNumbersInForms(0, 100, this.state.goatsVaccinationKids)
    ) {
      this.func_ShowAlert(
        "No. of goats received Vaccination Support (Kids) (Must be greater than 0 and less than 100)"
      );
    } else if (
      func_validateNumbersInForms(0, 1000, this.state.FodderQuatityField)
    ) {
      this.func_ShowAlert(
        "Fodder Quantity Must be greater than 0 and less than 1000"
      );
    } else if (
      func_validateNumbersInForms(0, 100, this.state.FodderVaccination)
    ) {
      this.func_ShowAlert(
        "No. of goats received Fodder Support (Male) (Must be greater than 0 and less than 100)"
      );
    } else if (
      func_validateNumbersInForms(0, 100, this.state.goatsFodderFemail)
    ) {
      this.func_ShowAlert(
        "No. of goats received Fodder Support (Female) (Must be greater than 0 and less than 100)"
      );
    } else if (
      func_validateNumbersInForms(0, 100, this.state.goatsFodderKids)
    ) {
      this.func_ShowAlert(
        "No. of goats received Fodder Support (Kids) (Must be greater than 0 and less than 100)"
      );
    } else if (
      func_validateNumbersInForms(0, 1000, this.state.FeedQuatityField)
    ) {
      this.func_ShowAlert(
        "Feed Quantity Must be greater than 0 and less than 1000"
      );
    } else if (
      func_validateNumbersInForms(0, 100, this.state.FeedVaccination)
    ) {
      this.func_ShowAlert(
        "No. of goats received Feed Support (Male) (Must be greater than 0 and less than 100)"
      );
    } else if (
      func_validateNumbersInForms(0, 100, this.state.goatsFeedFemail)
    ) {
      this.func_ShowAlert(
        "No. of goats received Feed Support (Female) (Must be greater than 0 and less than 100)"
      );
    } else if (func_validateNumbersInForms(0, 100, this.state.goatsFeedKids)) {
      this.func_ShowAlert(
        "No. of goats received Feed Support (Kids) (Must be greater than 0 and less than 100)"
      );
    } else if (
      func_validateNumbersInForms(0, 1000, this.state.ShedQuatityField)
    ) {
      this.func_ShowAlert(
        "Shed Quantity Must be greater than 0 and less than 1000"
      );
    } else if (
      func_validateNumbersInForms(0, 100, this.state.ShedVaccination)
    ) {
      this.func_ShowAlert(
        "No. of goats received Shed Support (Male) (Must be greater than 0 and less than 100)"
      );
    } else if (
      func_validateNumbersInForms(0, 100, this.state.goatsShedFemail)
    ) {
      this.func_ShowAlert(
        "No. of goats received Shed Support (Female) (Must be greater than 0 and less than 100)"
      );
    } else if (func_validateNumbersInForms(0, 100, this.state.goatsShedKids)) {
      this.func_ShowAlert(
        "No. of goats received Shed Support (Kids) (Must be greater than 0 and less than 100)"
      );
    } else if (
      func_validateNumbersInForms(0, 100, this.state.gotsRsvOtherMale)
    ) {
      this.func_ShowAlert(
        "No. of goats received Other Support (Male) (Must be greater than 0 and less than 100)"
      );
    } else if (func_validateNumbersInForms(0, 100, this.state.gotsRsvOther)) {
      this.func_ShowAlert(
        "No. of goats received Other Support (Female) (Must be greater than 0 and less than 100)"
      );
    } else if (
      func_validateNumbersInForms(0, 100, this.state.gotsRsvOtherKids)
    ) {
      this.func_ShowAlert(
        "No. of goats received Other Support (Kids) (Must be greater than 0 and less than 100)"
      );
    } else {
      let forSaveData = {
        logged_date: this.state.date,
        hh_id: this.props.house_hold.id,
        farmer_type: this.state.formtype1,
        farmer_status: this.state.formtype3,

        training: this.state.Training,
        training_imparted_by: this.state.Tarina,
        training_imparted_by_others_value: this.state.TarinaOther,
        extension_support: this.state.Extension1,

        no_of_extension_support_given: this.state.no_of_extension,
        purpose_of_extension_support_given: this.state.purpose_of_extension,
        no_of_male_goats_rec_extension_support: this.state.no_of_gots_male,
        no_of_female_goats_rec_extension_support: this.state.no_of_gots_female,
        no_of_kids_goats_rec_extension_support: this.state.no_of_gots_kids,
        medicine_support: this.state.Medicine,
        medicine_supplied_by: this.state.TarinaSup,
        medicine_quantity: this.state.MedicineQuantity,
        medicine_name: this.state.MedicineName,
        no_of_male_goats_rec_medicine_support: this.state.goatsMedicine,
        no_of_female_goats_rec_medicine_support: this.state.goatsMedicineFemail,
        no_of_kids_goats_rec_medicine_support: this.state.goatsMedicineKids,

        deworming_support: this.state.Deworming,
        deworming_support_provided_by: this.state.DewormingCheck,
        deworming_quantity: this.state.DewormingQuantity,
        deworming_name: this.state.DewormingName,
        no_of_male_goats_rec_deworming_support: this.state.goatsDeworming,
        no_of_female_goats_rec_deworming_support: this.state
          .goatsDewormingFemail,
        no_of_kids_goats_rec_deworming_support: this.state.goatsDewormingKids,

        vaccination_support: this.state.Vaccination,
        vaccination_support_provided_by: this.state.VaccinationCheck,
        vaccination_quantity: this.state.VaccinationQuantityMust,
        vaccination_name: this.state.VaccinationName,
        no_of_male_goats_rec_vaccination_support: this.state.goatsVaccination,
        no_of_male_goats_rec_vaccination_support: this.state
          .goatsVaccinationFemail,
        no_of_kids_goats_rec_vaccination_support: this.state
          .goatsVaccinationKids,

        fodder_support: this.state.Fodder,
        fodder_quantity: this.state.FodderQuatityField,
        fodder_name: this.state.FodderName,
        no_of_male_goats_rec_fodder_support: this.state.FodderVaccination,
        no_of_female_goats_rec_fodder_support: this.state.goatsFodderFemail,
        no_of_kids_goats_rec_fodder_support: this.state.goatsFodderKids,

        feed_support: this.state.Feed,
        feed_quantity: this.state.FeedQuatityField,
        feed_name: this.state.FeedName,
        no_of_male_goats_rec_feed_support: this.state.FeedVaccination,
        no_of_female_goats_rec_feed_support: this.state.goatsFeedFemail,
        no_of_kids_goats_rec_feed_support: this.state.goatsFeedKids,

        shed_support: this.state.Shed,
        shed_quantity: this.state.ShedQuatityField,
        shed_name: this.state.ShedName,
        no_of_male_goats_rec_shed_support: this.state.ShedVaccination,
        no_of_female_goats_rec_shed_support: this.state.goatsShedFemail,
        no_of_kids_goats_rec_shed_support: this.state.goatsShedKids,
        others_support: this.state.Other,
        others_support_type: this.state.OtherSup,
        no_of_male_goats_rec_others_support: this.state.gotsRsvOtherMale,
        no_of_female_goats_rec_others_support: this.state.gotsRsvOther,
        no_of_kids_goats_rec_others_support: this.state.gotsRsvOtherKids,
        health_vacc_card_maintained: this.state.Health,

        type_of_linkages: this.state.typelink,
        linkage_purpose: this.state.Linkageform,
        agency_linked_with: this.state.AgencyLinkForm,
        logged_from: "MOBILE_APP",
        op: "add_lsg_data"
      };
      let isConnection = this.props.is_connection;
      await this.props.onSaveData(forSaveData, isConnection);
      this.setState({
        radioBtnsData: ["Item1", "Item2", "Item3"],
      checked: "radio1",
      formtype1: "",
      formtype3: "",
      date: "",

      TrainingChecked: "No",
      Training: "NO",
      TarinaChecked: "Yes",
      Tarina: "TARINA",
      TarinaOther: "",
      ExtensionYes1: "No",
      Extension1: "NO",
      no_of_extension: "",
      purpose_of_extension: "",
      no_of_gots_male: "",
      no_of_gots_female: "",
      no_of_gots_kids: "",
      MedicineChecked: "No",
      Medicine: "NO",
      TarinaSupChecked: "",
      TarinaSup: "",
      MedicineQuantity: "",
      MedicineName: "",
      goatsMedicine: "",
      goatsMedicineFemail: "",
      goatsMedicineKids: "",
      DewormingChecked: "No",
      Deworming: "NO",
      DewormingCheck: "",
      DewormingQuantity: "",
      DewormingName: "",
      goatsDeworming: "",
      goatsDewormingFemail: "",
      goatsDewormingKids: "",

      VaccinationCheck: "",
      Vaccination: "",
      VaccinationQuantityMust: "",
      VaccinationName: "",
      goatsVaccination: "",
      goatsVaccinationFemail: "",
      goatsVaccinationKids: "",
      FodderChecked: "No",
      FeedChecked: "No",
      Feed: "NO",
      FeedQuatityField: "",
      FeedName: "",
      FeedVaccination: "",
      goatsFeedFemail: "",
      goatsFeedKids: "",
      VaccinationChecked: "No",

      Fodder: "NO",
      FodderQuatityField: "",
      FodderName: "",
      FodderVaccination: "",
      goatsFodderFemail: "",
      goatsFodderKids: "",
      ShedChecked: "No",
      Shed: "NO",
      ShedQuatityField: "",
      ShedName: "",
      ShedVaccination: "",
      goatsShedFemail: "",
      goatsShedKids: "",
      OtherSupChecked: "",
      OtherSup: "",
      gotsRsvOther: "",
      gotsRsvOtherMale: "",
      gotsRsvOtherKids: "",
      OtherChecked: "No",
      Other: "NO",
      HealthChecked: "No",
      Health: "NO",

      FinancialChecked: "",
      typelink: "",
      Linkageform: "",
      AgencyLinkForm: ""
      });
      this.props.clearHouseholdField();
    }
  }
  render() {
    return (
      <ScrollView
        keyboardShouldPersistTaps={"always"}
        style={{ backgroundColor: "#ffffff" }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            backgroundColor: "#ffffff",
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
                  label="Diversified / Influenced"
                  value="Diversified / Influenced"
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
            <View style={styles.radioBtnStyle}>
              <Text style={{ fontFamily: FONT_FAMILY }}>Training</Text>
              <View
                style={{
                  flexDirection: "row",
                  width: "50%",
                  marginTop: 10
                  //  justifyContent: "flex-end",
                  //  alignItems: "flex-end"
                }}
              >
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() =>
                    this.setState({ TrainingChecked: "Yes", Training: "YES" })
                  }
                >
                  <View
                    style={
                      this.state.TrainingChecked === "Yes"
                        ? styles.activeRadion
                        : styles.inActiveRadion
                    }
                  />

                  <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>
                    YES
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ flexDirection: "row", marginLeft: 10 }}
                  onPress={() =>
                    this.setState({ TrainingChecked: "No", Training: "NO" })
                  }
                >
                  <View
                    style={
                      this.state.TrainingChecked === "No"
                        ? styles.activeRadion
                        : styles.inActiveRadion
                    }
                  />

                  <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>
                    NO
                  </Text>
                </TouchableOpacity>
              </View>

              {this.state.Training == "YES" ? (
                <View style={styles.radioBtnStyle}>
                  <Text style={{ fontFamily: FONT_FAMILY }}>
                    Training Imparted By
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      width: "50%",
                      marginTop: 10
                      //  justifyContent: "flex-end",
                      //  alignItems: "flex-end"
                    }}
                  >
                    <TouchableOpacity
                      style={{ flexDirection: "row" }}
                      onPress={() =>
                        this.setState({
                          TarinaChecked: "Yes",
                          Tarina: "TARINA"
                        })
                      }
                    >
                      <View
                        style={
                          this.state.Tarina === "TARINA"
                            ? styles.activeRadion
                            : styles.inActiveRadion
                        }
                      />

                      <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>
                        TARINA
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{ flexDirection: "row", marginLeft: 10 }}
                      onPress={() =>
                        this.setState({
                          TarinaChecked: "No",
                          Tarina: "Others"
                        })
                      }
                    >
                      <View
                        style={
                          this.state.TarinaChecked === "No"
                            ? styles.activeRadion
                            : styles.inActiveRadion
                        }
                      />

                      <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>
                        Others
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {this.state.Tarina === "Others" ? (
                    <TextInput
                      value={this.state.TarinaOther}
                      onChangeText={name =>
                        this.setState({ TarinaOther: name })
                      }
                      placeholder={"Training Imparted By Other"}
                      secureTextEntry={false}
                      style={styles.input}
                    />
                  ) : null}
                </View>
              ) : null}
            </View>

            <View style={styles.radioBtnStyle}>
              <Text style={{ fontFamily: FONT_FAMILY }}>Extension Support</Text>
              <View
                style={{
                  flexDirection: "row",
                  width: "50%",
                  marginTop: 10
                  //  justifyContent: "flex-end",
                  //  alignItems: "flex-end"
                }}
              >
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() =>
                    this.setState({
                      ExtensionYes1: "Yes",
                      Extension1: "YES"
                    })
                  }
                >
                  <View
                    style={
                      this.state.ExtensionYes1 === "Yes"
                        ? styles.activeRadion
                        : styles.inActiveRadion
                    }
                  />

                  <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>
                    YES
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ flexDirection: "row", marginLeft: 10 }}
                  onPress={() =>
                    this.setState({
                      ExtensionYes1: "No",
                      Extension1: "NO"
                    })
                  }
                >
                  <View
                    style={
                      this.state.ExtensionYes1 === "No"
                        ? styles.activeRadion
                        : styles.inActiveRadion
                    }
                  />

                  <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>
                    NO
                  </Text>
                </TouchableOpacity>
              </View>
              {this.state.ExtensionYes1 === "Yes" ? (
                <View style={{ width: "100%" }}>
                  <TextInput
                    value={this.state.no_of_extension}
                    onChangeText={name =>
                      this.setState({ no_of_extension: name })
                    }
                    placeholder={
                      "No. of Extension Support given (Must be greater than 0 and less than 1000)"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType = 'numeric'
                  />

                  <TextInput
                    value={this.state.purpose_of_extension}
                    onChangeText={name =>
                      this.setState({ purpose_of_extension: name })
                    }
                    placeholder={"Purpose of Extension Support given"}
                    secureTextEntry={false}
                    style={styles.input}
                  />

                  <TextInput
                    value={this.state.no_of_gots_male}
                    onChangeText={name =>
                      this.setState({ no_of_gots_male: name })
                    }
                    placeholder={
                      "No. of goats received Extension Support (Male) (Must be greater than 0 and less than 100)"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType = 'numeric'
                  />

                  <TextInput
                    value={this.state.no_of_gots_female}
                    onChangeText={name =>
                      this.setState({ no_of_gots_female: name })
                    }
                    placeholder={
                      "No. of goats received Extension Support (Female) (Must be greater than 0 and less than 100)"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType = 'numeric'
                  />

                  <TextInput
                    value={this.state.no_of_gots_kids}
                    onChangeText={name =>
                      this.setState({ no_of_gots_kids: name })
                    }
                    placeholder={
                      "No. of goats received Extension Support (Kids) (Must be greater than 0 and less than 100)"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType = 'numeric'
                  />
                </View>
              ) : null}
            </View>

            <View style={styles.radioBtnStyle}>
              <Text style={{ fontFamily: FONT_FAMILY }}>Medicine Support</Text>
              <View
                style={{
                  flexDirection: "row",
                  width: "50%",
                  marginTop: 10
                  //  justifyContent: "flex-end",
                  //  alignItems: "flex-end"
                }}
              >
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() =>
                    this.setState({ MedicineChecked: "Yes", Medicine: "YES" })
                  }
                >
                  <View
                    style={
                      this.state.MedicineChecked === "Yes"
                        ? styles.activeRadion
                        : styles.inActiveRadion
                    }
                  />

                  <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>
                    YES
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ flexDirection: "row", marginLeft: 10 }}
                  onPress={() =>
                    this.setState({ MedicineChecked: "No", Medicine: "NO" })
                  }
                >
                  <View
                    style={
                      this.state.MedicineChecked === "No"
                        ? styles.activeRadion
                        : styles.inActiveRadion
                    }
                  />

                  <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>
                    NO
                  </Text>
                </TouchableOpacity>
              </View>

              {this.state.Medicine == "YES" ? (
                <View style={styles.radioBtnStyle}>
                  <Text style={{ fontFamily: FONT_FAMILY }}>
                    Medicine Supplied By
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      width: "50%",
                      marginTop: 10
                      //  justifyContent: "flex-end",
                      //  alignItems: "flex-end"
                    }}
                  >
                    <TouchableOpacity
                      style={{ flexDirection: "row" }}
                      onPress={() =>
                        this.setState({
                          TarinaSupChecked: "Yes",
                          TarinaSup: "TARINA"
                        })
                      }
                    >
                      <View
                        style={
                          this.state.TarinaSup === "TARINA"
                            ? styles.activeRadion
                            : styles.inActiveRadion
                        }
                      />

                      <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>
                        TARINA
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{ flexDirection: "row", marginLeft: 10 }}
                      onPress={() =>
                        this.setState({
                          TarinaSupChecked: "No",
                          TarinaSup: "AH Department"
                        })
                      }
                    >
                      <View
                        style={
                          this.state.TarinaSupChecked === "No"
                            ? styles.activeRadion
                            : styles.inActiveRadion
                        }
                      />

                      <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>
                        AH Department
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <TextInput
                    value={this.state.MedicineQuantity}
                    onChangeText={name =>
                      this.setState({ MedicineQuantity: name })
                    }
                    placeholder={
                      "Medicine Quantity Must be greater than 0 and less than 1000"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType = 'numeric'
                  />

                  <TextInput
                    value={this.state.MedicineName}
                    onChangeText={name => this.setState({ MedicineName: name })}
                    placeholder={"Medicine Name"}
                    secureTextEntry={false}
                    style={styles.input}
                  />

                  <TextInput
                    value={this.state.goatsMedicine}
                    onChangeText={name =>
                      this.setState({ goatsMedicine: name })
                    }
                    placeholder={
                      "No. of goats received Medicine Support (Male) (Must be greater than 0 and less than 100)"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType = 'numeric'
                  />

                  <TextInput
                    value={this.state.goatsMedicineFemail}
                    onChangeText={name =>
                      this.setState({ goatsMedicineFemail: name })
                    }
                    placeholder={
                      "No. of goats received Medicine Support (Female) (Must be greater than 0 and less than 100)"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType = 'numeric'
                  />

                  <TextInput
                    value={this.state.goatsMedicineKids}
                    onChangeText={name =>
                      this.setState({ goatsMedicineKids: name })
                    }
                    placeholder={
                      "No. of goats received Medicine Support (Kids) (Must be greater than 0 and less than 100)"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType = 'numeric'
                  />
                </View>
              ) : null}
            </View>
            <View style={styles.radioBtnStyle}>
              <Text style={{ fontFamily: FONT_FAMILY }}>Deworming Support</Text>
              <View
                style={{
                  flexDirection: "row",
                  width: "50%",
                  marginTop: 10
                  //  justifyContent: "flex-end",
                  //  alignItems: "flex-end"
                }}
              >
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() =>
                    this.setState({ DewormingChecked: "Yes", Deworming: "YES" })
                  }
                >
                  <View
                    style={
                      this.state.DewormingChecked === "Yes"
                        ? styles.activeRadion
                        : styles.inActiveRadion
                    }
                  />

                  <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>
                    YES
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ flexDirection: "row", marginLeft: 10 }}
                  onPress={() =>
                    this.setState({ DewormingChecked: "No", Deworming: "NO" })
                  }
                >
                  <View
                    style={
                      this.state.DewormingChecked === "No"
                        ? styles.activeRadion
                        : styles.inActiveRadion
                    }
                  />

                  <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>
                    NO
                  </Text>
                </TouchableOpacity>
              </View>

              {this.state.Deworming == "YES" ? (
                <View style={styles.radioBtnStyle}>
                  <Text style={{ fontFamily: FONT_FAMILY }}>
                    Deworming Support Provided by
                  </Text>
                  <View
                    style={{
                      flexDirection: "column",
                      width: "50%",
                      marginTop: 10
                      //  justifyContent: "flex-end",
                      //  alignItems: "flex-end"
                    }}
                  >
                    <TouchableOpacity
                      style={{ flexDirection: "row" }}
                      onPress={() =>
                        this.setState({
                          // DewormingChecked: "Yes",
                          DewormingCheck: "Facilitated by TARINA"
                        })
                      }
                    >
                      <View
                        style={
                          this.state.DewormingCheck === "Facilitated by TARINA"
                            ? styles.activeRadion
                            : styles.inActiveRadion
                        }
                      />

                      <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>
                        Facilitated by TARINA
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{ flexDirection: "row", marginTop: 5 }}
                      onPress={() =>
                        this.setState({
                          // DewormingChecked: "Yes",
                          DewormingCheck: "Medicine by AH Department"
                        })
                      }
                    >
                      <View
                        style={
                          this.state.DewormingCheck ===
                          "Medicine by AH Department"
                            ? styles.activeRadion
                            : styles.inActiveRadion
                        }
                      />

                      <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>
                        Medicine by AH Department
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ flexDirection: "row" }}
                      onPress={() =>
                        this.setState({
                          // DewormingChecked: "Yes",
                          DewormingCheck: "Medicine by TARINA"
                        })
                      }
                    >
                      <View
                        style={
                          this.state.DewormingCheck === "Medicine by TARINA"
                            ? styles.activeRadion
                            : styles.inActiveRadion
                        }
                      />

                      <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>
                        Medicine by TARINA
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <TextInput
                    value={this.state.DewormingQuantity}
                    onChangeText={name =>
                      this.setState({ DewormingQuantity: name })
                    }
                    placeholder={
                      "Deworming Quantity Must be greater than 0 and less than 1000"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType = 'numeric'
                  />

                  <TextInput
                    value={this.state.DewormingName}
                    onChangeText={name =>
                      this.setState({ DewormingName: name })
                    }
                    placeholder={"Deworming Name"}
                    secureTextEntry={false}
                    style={styles.input}
                  />

                  <TextInput
                    value={this.state.goatsDeworming}
                    onChangeText={name =>
                      this.setState({ goatsDeworming: name })
                    }
                    placeholder={
                      "No. of goats received Deworming Support (Male) (Must be greater than 0 and less than 100)"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType = 'numeric'
                  />

                  <TextInput
                    value={this.state.goatsDewormingFemail}
                    onChangeText={name =>
                      this.setState({ goatsDewormingFemail: name })
                    }
                    placeholder={
                      "No. of goats received Deworming Support (Female) (Must be greater than 0 and less than 100)"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType = 'numeric'
                  />

                  <TextInput
                    value={this.state.goatsDewormingKids}
                    onChangeText={name =>
                      this.setState({ goatsDewormingKids: name })
                    }
                    placeholder={
                      "No. of goats received Deworming Support (Kids) (Must be greater than 0 and less than 100)"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType = 'numeric'
                  />
                </View>
              ) : null}
            </View>
            <View style={styles.radioBtnStyle}>
              <Text style={{ fontFamily: FONT_FAMILY }}>
                Vaccination Support
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  width: "50%",
                  marginTop: 10
                  //  justifyContent: "flex-end",
                  //  alignItems: "flex-end"
                }}
              >
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() =>
                    this.setState({
                      VaccinationChecked: "Yes",
                      Vaccination: "YES"
                    })
                  }
                >
                  <View
                    style={
                      this.state.VaccinationChecked === "Yes"
                        ? styles.activeRadion
                        : styles.inActiveRadion
                    }
                  />

                  <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>
                    YES
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ flexDirection: "row", marginLeft: 10 }}
                  onPress={() =>
                    this.setState({
                      VaccinationChecked: "No",
                      Vaccination: "NO"
                    })
                  }
                >
                  <View
                    style={
                      this.state.VaccinationChecked === "No"
                        ? styles.activeRadion
                        : styles.inActiveRadion
                    }
                  />

                  <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>
                    NO
                  </Text>
                </TouchableOpacity>
              </View>

              {this.state.Vaccination == "YES" ? (
                <View style={styles.radioBtnStyle}>
                  <Text style={{ fontFamily: FONT_FAMILY }}>
                    Vaccination Support Provided by
                  </Text>
                  <View
                    style={{
                      flexDirection: "column",
                      width: "50%",
                      marginTop: 10
                      //  justifyContent: "flex-end",
                      //  alignItems: "flex-end"
                    }}
                  >
                    <TouchableOpacity
                      style={{ flexDirection: "row" }}
                      onPress={() =>
                        this.setState({
                          // DewormingChecked: "Yes",
                          VaccinationCheck: "Facilitated by TARINA"
                        })
                      }
                    >
                      <View
                        style={
                          this.state.VaccinationCheck ===
                          "Facilitated by TARINA"
                            ? styles.activeRadion
                            : styles.inActiveRadion
                        }
                      />

                      <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>
                        Facilitated by TARINA
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{ flexDirection: "row", marginTop: 5 }}
                      onPress={() =>
                        this.setState({
                          // DewormingChecked: "Yes",
                          VaccinationCheck: "Medicine by AH Department"
                        })
                      }
                    >
                      <View
                        style={
                          this.state.VaccinationCheck ===
                          "Medicine by AH Department"
                            ? styles.activeRadion
                            : styles.inActiveRadion
                        }
                      />

                      <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>
                        Medicine by AH Department
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ flexDirection: "row" }}
                      onPress={() =>
                        this.setState({
                          // DewormingChecked: "Yes",
                          VaccinationCheck: "Medicine by TARINA"
                        })
                      }
                    >
                      <View
                        style={
                          this.state.VaccinationCheck === "Medicine by TARINA"
                            ? styles.activeRadion
                            : styles.inActiveRadion
                        }
                      />

                      <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>
                        Medicine by TARINA
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <TextInput
                    value={this.state.VaccinationQuantityMust}
                    onChangeText={name =>
                      this.setState({ VaccinationQuantityMust: name })
                    }
                    placeholder={
                      "Vaccination Quantity Must be greater than 0 and less than 1000"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType = 'numeric'
                  />

                  <TextInput
                    value={this.state.VaccinationName}
                    onChangeText={name =>
                      this.setState({ VaccinationName: name })
                    }
                    placeholder={"Vaccination Name"}
                    secureTextEntry={false}
                    style={styles.input}
                  />

                  <TextInput
                    value={this.state.goatsVaccination}
                    onChangeText={name =>
                      this.setState({ goatsVaccination: name })
                    }
                    placeholder={
                      "No. of goats received Vaccination Support (Male) (Must be greater than 0 and less than 100)"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType = 'numeric'
                  />

                  <TextInput
                    value={this.state.goatsVaccinationFemail}
                    onChangeText={name =>
                      this.setState({ goatsVaccinationFemail: name })
                    }
                    placeholder={
                      "No. of goats received Vaccination Support (Female) (Must be greater than 0 and less than 100)"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType = 'numeric'
                  />

                  <TextInput
                    value={this.state.goatsVaccinationKids}
                    onChangeText={name =>
                      this.setState({ goatsVaccinationKids: name })
                    }
                    placeholder={
                      "No. of goats received Vaccination Support (Kids) (Must be greater than 0 and less than 100)"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType = 'numeric'
                  />
                </View>
              ) : null}
            </View>
            <View style={styles.radioBtnStyle}>
              <Text style={{ fontFamily: FONT_FAMILY }}>Fodder Support</Text>
              <View
                style={{
                  flexDirection: "row",
                  width: "50%",
                  marginTop: 10
                  //  justifyContent: "flex-end",
                  //  alignItems: "flex-end"
                }}
              >
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() =>
                    this.setState({
                      FodderChecked: "Yes",
                      Fodder: "YES"
                    })
                  }
                >
                  <View
                    style={
                      this.state.FodderChecked === "Yes"
                        ? styles.activeRadion
                        : styles.inActiveRadion
                    }
                  />

                  <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>
                    YES
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ flexDirection: "row", marginLeft: 10 }}
                  onPress={() =>
                    this.setState({
                      FodderChecked: "No",
                      Fodder: "NO"
                    })
                  }
                >
                  <View
                    style={
                      this.state.FodderChecked === "No"
                        ? styles.activeRadion
                        : styles.inActiveRadion
                    }
                  />

                  <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>
                    NO
                  </Text>
                </TouchableOpacity>
              </View>
              {this.state.Fodder === "YES" ? (
                <View style={{ width: "100%" }}>
                  <TextInput
                    value={this.state.FodderQuatityField}
                    onChangeText={name =>
                      this.setState({ FodderQuatityField: name })
                    }
                    placeholder={
                      "Fodder Quantity Must be greater than 0 and less than 1000"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType = 'numeric'
                  />

                  <TextInput
                    value={this.state.FodderName}
                    onChangeText={name => this.setState({ FodderName: name })}
                    placeholder={"Fodder Name"}
                    secureTextEntry={false}
                    style={styles.input}
                  />

                  <TextInput
                    value={this.state.FodderVaccination}
                    onChangeText={name =>
                      this.setState({ FodderVaccination: name })
                    }
                    placeholder={
                      "No. of goats received Fodder Support (Male) (Must be greater than 0 and less than 100)"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType = 'numeric'
                  />

                  <TextInput
                    value={this.state.goatsFodderFemail}
                    onChangeText={name =>
                      this.setState({ goatsFodderFemail: name })
                    }
                    placeholder={
                      "No. of goats received Fodder Support (Female) (Must be greater than 0 and less than 100)"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType = 'numeric'
                  />

                  <TextInput
                    value={this.state.goatsFodderKids}
                    onChangeText={name =>
                      this.setState({ goatsFodderKids: name })
                    }
                    placeholder={
                      "No. of goats received Fodder Support (Kids) (Must be greater than 0 and less than 100)"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType = 'numeric'
                  />
                </View>
              ) : null}
            </View>
            <View style={styles.radioBtnStyle}>
              <Text style={{ fontFamily: FONT_FAMILY }}>Feed Support</Text>
              <View
                style={{
                  flexDirection: "row",
                  width: "50%",
                  marginTop: 10
                  //  justifyContent: "flex-end",
                  //  alignItems: "flex-end"
                }}
              >
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() =>
                    this.setState({
                      FeedChecked: "Yes",
                      Feed: "YES"
                    })
                  }
                >
                  <View
                    style={
                      this.state.FeedChecked === "Yes"
                        ? styles.activeRadion
                        : styles.inActiveRadion
                    }
                  />

                  <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>
                    YES
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ flexDirection: "row", marginLeft: 10 }}
                  onPress={() =>
                    this.setState({
                      FeedChecked: "No",
                      Feed: "NO"
                    })
                  }
                >
                  <View
                    style={
                      this.state.FeedChecked === "No"
                        ? styles.activeRadion
                        : styles.inActiveRadion
                    }
                  />

                  <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>
                    NO
                  </Text>
                </TouchableOpacity>
              </View>
              {this.state.Feed === "YES" ? (
                <View style={{ width: "100%" }}>
                  <TextInput
                    value={this.state.FeedQuatityField}
                    onChangeText={name =>
                      this.setState({ FeedQuatityField: name })
                    }
                    placeholder={
                      "Feed Quantity Must be greater than 0 and less than 1000"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType = 'numeric'
                  />

                  <TextInput
                    value={this.state.FeedName}
                    onChangeText={name => this.setState({ FeedName: name })}
                    placeholder={"Feed Name"}
                    secureTextEntry={false}
                    style={styles.input}
                  />

                  <TextInput
                    value={this.state.FeedVaccination}
                    onChangeText={name =>
                      this.setState({ FeedVaccination: name })
                    }
                    placeholder={
                      "No. of goats received Feed Support (Male) (Must be greater than 0 and less than 100)"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType = 'numeric'
                  />

                  <TextInput
                    value={this.state.goatsFeedFemail}
                    onChangeText={name =>
                      this.setState({ goatsFeedFemail: name })
                    }
                    placeholder={
                      "No. of goats received Feed Support (Female) (Must be greater than 0 and less than 100)"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType = 'numeric'
                  />

                  <TextInput
                    value={this.state.goatsFeedKids}
                    onChangeText={name =>
                      this.setState({ goatsFeedKids: name })
                    }
                    placeholder={
                      "No. of goats received Feed Support (Kids) (Must be greater than 0 and less than 100)"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType = 'numeric'
                  />
                </View>
              ) : null}
            </View>
            <View style={styles.radioBtnStyle}>
              <Text style={{ fontFamily: FONT_FAMILY }}>Shed Support</Text>
              <View
                style={{
                  flexDirection: "row",
                  width: "50%",
                  marginTop: 10
                  //  justifyContent: "flex-end",
                  //  alignItems: "flex-end"
                }}
              >
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() =>
                    this.setState({
                      ShedChecked: "Yes",
                      Shed: "YES"
                    })
                  }
                >
                  <View
                    style={
                      this.state.ShedChecked === "Yes"
                        ? styles.activeRadion
                        : styles.inActiveRadion
                    }
                  />

                  <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>
                    YES
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ flexDirection: "row", marginLeft: 10 }}
                  onPress={() =>
                    this.setState({
                      ShedChecked: "No",
                      Shed: "NO"
                    })
                  }
                >
                  <View
                    style={
                      this.state.ShedChecked === "No"
                        ? styles.activeRadion
                        : styles.inActiveRadion
                    }
                  />

                  <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>
                    NO
                  </Text>
                </TouchableOpacity>
              </View>
              {this.state.Shed === "YES" ? (
                <View style={{ width: "100%" }}>
                  <TextInput
                    value={this.state.ShedQuatityField}
                    onChangeText={name =>
                      this.setState({ ShedQuatityField: name })
                    }
                    placeholder={
                      "Shed Quantity Must be greater than 0 and less than 1000"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType = 'numeric'
                  />

                  <TextInput
                    value={this.state.ShedName}
                    onChangeText={name => this.setState({ ShedName: name })}
                    placeholder={"Shed Name"}
                    secureTextEntry={false}
                    style={styles.input}
                  />

                  <TextInput
                    value={this.state.ShedVaccination}
                    onChangeText={name =>
                      this.setState({ ShedVaccination: name })
                    }
                    placeholder={
                      "No. of goats received Shed Support (Male) (Must be greater than 0 and less than 100)"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType = 'numeric'
                  />

                  <TextInput
                    value={this.state.goatsShedFemail}
                    onChangeText={name =>
                      this.setState({ goatsShedFemail: name })
                    }
                    placeholder={
                      "No. of goats received Shed Support (Female) (Must be greater than 0 and less than 100)"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType = 'numeric'
                  />

                  <TextInput
                    value={this.state.goatsShedKids}
                    onChangeText={name =>
                      this.setState({ goatsShedKids: name })
                    }
                    placeholder={
                      "No. of goats received Shed Support (Kids) (Must be greater than 0 and less than 100)"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType = 'numeric'
                  />
                </View>
              ) : null}
            </View>
            <View style={styles.radioBtnStyle}>
              <Text style={{ fontFamily: FONT_FAMILY }}>Other Support</Text>
              <View
                style={{
                  flexDirection: "row",
                  width: "50%",
                  marginTop: 10
                  //  justifyContent: "flex-end",
                  //  alignItems: "flex-end"
                }}
              >
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() =>
                    this.setState({ OtherChecked: "Yes", Other: "YES" })
                  }
                >
                  <View
                    style={
                      this.state.OtherChecked === "Yes"
                        ? styles.activeRadion
                        : styles.inActiveRadion
                    }
                  />

                  <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>
                    YES
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ flexDirection: "row", marginLeft: 10 }}
                  onPress={() =>
                    this.setState({ OtherChecked: "No", Other: "NO" })
                  }
                >
                  <View
                    style={
                      this.state.OtherChecked === "No"
                        ? styles.activeRadion
                        : styles.inActiveRadion
                    }
                  />

                  <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>
                    NO
                  </Text>
                </TouchableOpacity>
              </View>

              {this.state.Other == "YES" ? (
                <View style={styles.radioBtnStyle}>
                  <Text style={{ fontFamily: FONT_FAMILY }}>
                    Other Support Type (Tagging / Castration)
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      width: "50%",
                      marginTop: 10
                      //  justifyContent: "flex-end",
                      //  alignItems: "flex-end"
                    }}
                  >
                    <TouchableOpacity
                      style={{ flexDirection: "row" }}
                      onPress={() =>
                        this.setState({
                          OtherSupChecked: "Yes",
                          OtherSup: "Tagging"
                        })
                      }
                    >
                      <View
                        style={
                          this.state.OtherSup === "Tagging"
                            ? styles.activeRadion
                            : styles.inActiveRadion
                        }
                      />

                      <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>
                        Tagging
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{ flexDirection: "row", marginLeft: 10 }}
                      onPress={() =>
                        this.setState({
                          OtherSupChecked: "No",
                          OtherSup: "Castration"
                        })
                      }
                    >
                      <View
                        style={
                          this.state.OtherSupChecked === "No"
                            ? styles.activeRadion
                            : styles.inActiveRadion
                        }
                      />

                      <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>
                        Castration
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <TextInput
                    value={this.state.gotsRsvOther}
                    onChangeText={name => this.setState({ gotsRsvOther: name })}
                    placeholder={
                      "No. of goats received Other Support (Female) (Must be greater than 0 and less than 100)"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType = 'numeric'
                  />

                  <TextInput
                    value={this.state.gotsRsvOtherMale}
                    onChangeText={name =>
                      this.setState({ gotsRsvOtherMale: name })
                    }
                    placeholder={
                      "No. of goats received Other Support (Male) (Must be greater than 0 and less than 100)"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType = 'numeric'
                  />

                  <TextInput
                    value={this.state.gotsRsvOtherKids}
                    onChangeText={name =>
                      this.setState({ gotsRsvOtherKids: name })
                    }
                    placeholder={
                      "No. of goats received Other Support (Kids) (Must be greater than 0 and less than 100)"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType = 'numeric'
                  />
                </View>
              ) : null}
            </View>
            <View style={styles.radioBtnStyle}>
              <Text style={{ fontFamily: FONT_FAMILY }}>
                Health cum Vaccination Card Maintained - Yes / No
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  width: "50%",
                  marginTop: 10
                  //  justifyContent: "flex-end",
                  //  alignItems: "flex-end"
                }}
              >
                <TouchableOpacity
                  style={{ flexDirection: "row" }}
                  onPress={() =>
                    this.setState({
                      HealthChecked: "Yes",
                      Health: "YES"
                    })
                  }
                >
                  <View
                    style={
                      this.state.HealthChecked === "Yes"
                        ? styles.activeRadion
                        : styles.inActiveRadion
                    }
                  />

                  <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>
                    YES
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ flexDirection: "row", marginLeft: 10 }}
                  onPress={() =>
                    this.setState({
                      HealthChecked: "No",
                      Health: "NO"
                    })
                  }
                >
                  <View
                    style={
                      this.state.HealthChecked === "No"
                        ? styles.activeRadion
                        : styles.inActiveRadion
                    }
                  />

                  <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>
                    NO
                  </Text>
                </TouchableOpacity>
              </View>
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
                  //alignItems: "flex-end",
                  marginTop: 15
                }}
              >
                <TouchableOpacity
                  style={{ flexDirection: "row", marginLeft: 10 }}
                  onPress={() =>
                    this.setState({
                      FinancialChecked: "FinancialYes",
                      typelink: "Financial"
                    })
                  }
                >
                  <View
                    style={
                      this.state.FinancialChecked === "FinancialYes"
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
                      FinancialChecked: "FinancialStrengthening",
                      typelink: "Capacity Strengthening – Market"
                    })
                  }
                >
                  <View
                    style={
                      this.state.FinancialChecked === "FinancialStrengthening"
                        ? styles.activeRadion
                        : styles.inActiveRadion
                    }
                  />

                  <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>
                  Capacity Strengthening – Market
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: "50%",
                  justifyContent: "flex-start",
                  alignItems: "flex-end",
                  marginTop: 10,
                  marginHorizontal: 0,
                  backgroundColor: "transparent"
                }}
              >
                <TouchableOpacity
                  style={{ flexDirection: "row", marginLeft: 10 }}
                  onPress={() =>
                    this.setState({
                      FinancialChecked: "Input",
                      typelink: "Input Resources"
                    })
                  }
                >
                  <View
                    style={
                      this.state.FinancialChecked === "Input"
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
              value={this.state.AgencyLinkForm}
              onChangeText={name => this.setState({ AgencyLinkForm: name })}
              placeholder={"Agency Linked with"}
              secureTextEntry={false}
              style={styles.input}
            />
            <TextInput
              value={this.state.Linkageform}
              onChangeText={name => this.setState({ Linkageform: name })}
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
)(HomesteadKitchenGardenDataForm);
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
  },
  radioBtnStyle: {
    width: "100%",
    padding: 10,
    borderWidth: 0.5,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 6,
    fontFamily: FONT_FAMILY
  }
});
//house_hold
