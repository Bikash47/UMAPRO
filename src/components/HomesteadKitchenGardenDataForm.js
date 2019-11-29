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

      khgChecked: "khgNo",
      khg: "NO",
      cropped_area: "",
      crop_infochecked: "cropInfoNo",
      crop_info: "NO",
      crop_name_input: "",
      crop_seed_veriety: "",
      total_area_cultivated_crup: "",
      TARINA_supported_area_crop: "",
      seed_cropChecked: "CheckedNo",
      seed_crop: "NO",
      seed_quen_rsv: "",
      seeding_form_cluster_checked: "clusterNo",
      seeding_form_cluster: "NO",
      seeding_form_cluster_form: "",
      seeding_outside_cropchecked: "clusterNo",
      seeding_outside_crop: "NO",
      seeding_outside_crop_form: "",
      total_quantity_prod: "",
      total_quantity_consu: "",
      total_quantity_seed: "",
      total_quantity_sale: "",
      average_sale: "",

      supportChecked: "SupportNo",
      support: "NO",
      TrainingChecked: "TrainingNo",
      Training: "NO",
      bioform: "",

      Bio_Fertilizer: "BioNo",
      Bio: "NO",

      Fertilizer_Name: "",
      FertilizerCheckedform: "",
      FertilizerChecked: "OnlyFertilizerNo",
      Fertilizer: "NO",

      Pesticide_Name: "",
      Pesticideform: "",
      PesticideChecked: "PesticideNo",
      Pesticide: "NO",

      Herbicide_Name: "",
      Herbicideform: "",
      HerbicideChecked: "HerbicideNo",
      Herbicide: "NO",

      Extensionfrom: "",
      ExtensionChecked: "ExtensionNo",
      Extension: "NO",
      Machineryform: "",
      MachineryChecked: "MachineryNo",
      Machinery: "NO",
      Irrigationform: "",
      IrrigationChecked: "IrrigationNo",
      Irrigation: "NO",
      Fencingform: "",
      FencingChecked: "FencingNo",
      Fencing: "NO",
      support_other: "",

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
    } else if (this.state.trainId == "") {
      this.func_ShowAlert("Enter Training ID / No ");
    } else if (
      func_validateNumbersInForms(
        0,
        1000,
        this.state.total_area_cultivated_crup
      )
    ) {
      this.func_ShowAlert(
        "Total Area Cultivated (Square Metres) - Crop (Must be greater than 0 and less than 1000)"
      );
    } else if (
      func_validateNumbersInForms(
        0,
        1000,
        this.state.TARINA_supported_area_crop
      )
    ) {
      this.func_ShowAlert(
        "TARINA Supported Area Cultivated (Square Metres) - Crop (Must be greater than 0 and less than 1000)"
      );
    } else if (func_validateNumbersInForms(0, 1000, this.state.seed_quen_rsv)) {
      this.func_ShowAlert(
        "Seed Quantity Received (in gm) - Crop (Must be greater than 0 and less than 2000)"
      );
    } else if (
      func_validateNumbersInForms(0, 1000, this.state.seeding_form_cluster_form)
    ) {
      this.func_ShowAlert(
        "Seedling Quantity Received (in No.) - Crop (Must be greater than 0 and less than 1000)"
      );
    } else if (
      func_validateNumbersInForms(0, 1000, this.state.seeding_outside_crop_form)
    ) {
      this.func_ShowAlert(
        "Seedling Quantity Received (in No.) - Crop (Must be greater than 0 and less than 1000)"
      );
    } else if (
      func_validateNumbersInForms(0, 1000, this.state.total_quantity_prod)
    ) {
      this.func_ShowAlert(
        "Total Quantity (in Kg.) - Production (Must be greater than 0 and less than 1000)"
      );
    } else if (
      func_validateNumbersInForms(0, 1000, this.state.total_quantity_consu)
    ) {
      this.func_ShowAlert(
        "Total Quantity (in Kg) - Consumption (Must be greater than 0 and less than 1000)"
      );
    } else if (
      func_validateNumbersInForms(0, 1000, this.state.total_quantity_seed)
    ) {
      this.func_ShowAlert(
        "Total Quantity (in Kg) - Seed (Must be greater than 0 and less than 1000)"
      );
    } else if (
      func_validateNumbersInForms(0, 1000, this.state.total_quantity_sale)
    ) {
      this.func_ShowAlert(
        "Total Quantity (in Kg) - Sale (Must be greater than 0 and less than 1000)"
      );
    } else if (func_validateNumbersInForms(0, 1000, this.state.average_sale)) {
      this.func_ShowAlert(
        "Average Sale Price (Rs / Kg) (Must be greater than 0 and less than 1000)"
      );
    } else if (
      func_validateNumbersInForms(0, 100, this.state.FertilizerCheckedform)
    ) {
      this.func_ShowAlert(
        "Fertilizer Quantity Received (Kg) Must be greater than 0 and less than 100"
      );
    } else if (func_validateNumbersInForms(0, 100, this.state.Pesticideform)) {
      this.func_ShowAlert(
        "Pesticide Quantity Received (gm / ml) Must be greater than 0 and less than 1000"
      );
    } else if (func_validateNumbersInForms(0, 100, this.state.Herbicideform)) {
      this.func_ShowAlert(
        "Herbicide Quantity Received (ml) Must be greater than 0 and less than 1000"
      );
    } else if (func_validateNumbersInForms(0, 100, this.state.Extensionfrom)) {
      this.func_ShowAlert(
        "Extension Support Quantity Received (No) Must be greater than 0 and less than 100"
      );
    } else if (func_validateNumbersInForms(0, 100, this.state.Machineryform)) {
      this.func_ShowAlert(
        "Machinery Support Quantity Received (No) Must be greater than 0 and less than 100"
      );
    } else if (func_validateNumbersInForms(0, 100, this.state.Fencingform)) {
      this.func_ShowAlert(
        "Fencing Support Quantity Received (No) Must be greater than 0 and less than 100"
      );
    } else {
      let forSaveData = {
        logged_date: this.state.date,
        hh_id: this.props.house_hold.id,

        farmer_type_div_inf: this.state.formtype1,
        farmer_status: this.state.formtype3,
        is_ffs_conducted: this.state.khg,
        cropped_area: this.state.cropped_area,
        crop_info_present: this.state.crop_info,

        crop_crop_name: this.state.crop_name_input,

        crop_seed_variety: this.state.crop_seed_veriety,

        crop_total_area_cultivated: this.state.total_area_cultivated_crup,
        crop_tarina_supported_area_cultivated: this.state
          .TARINA_supported_area_crop,

        crop_seed_present: this.state.seed_crop,

        crop_seed_quantity_received: this.state.seed_quen_rsv,

        crop_seeding_cluster_nursery_present: this.state.seeding_form_cluster,

        crop_seeding_cluster_nursery_quantity_received: this.state
          .seeding_form_cluster_form,

        crop_seeding_outside_nursery_present: this.state.seeding_outside_crop,

        crop_seeding_outside_nursery_quantity_received: this.state
          .seeding_outside_crop_form,

        crop_total_quantity_production: this.state.total_quantity_prod,

        crop_total_quantity_consumption: this.state.total_quantity_consu,

        crop_total_quantity_seed: this.state.total_quantity_seed,

        crop_total_quantity_sale: this.state.total_quantity_sale,

        crop_avg_sale_price: this.state.average_sale,

        support_info_present: this.state.support,
        support_training: this.state.Training,

        fertilizer_present: this.state.Fertilizer,
        fertilizer_name: this.state.Fertilizer_Name,
        fertilizer_quantity_received: this.state.FertilizerCheckedform,

        pesticide_present: this.state.Pesticide,
        pesticide_name: this.state.Pesticide_Name,
        pesticide_quantity_received: this.state.Pesticideform,

        herbicide_present: this.state.Herbicide,

        herbicide_name: this.state.Herbicide_Name,
        herbicide_quantity_received: this.state.Herbicideform,

        extension_support_present: this.state.Extension,

        extension_support_quantity: this.state.Extensionfrom,

        machinery_support_present: this.state.Machinery,

        machinery_support_quantity: this.state.Machineryform,

        irrigation_support_present: this.state.Irrigation,

        irrigation_support_quantity: this.state.Irrigationform,

        fencing_trellis_support_present: this.state.Fencing,

        fencing_trellis_support_quantity: this.state.Fencingform,

        others_specify: this.state.support_other,
        type_of_linkages: this.state.typelink,

        agency_linked_with: this.state.AgencyLinkForm,

        linkage_purpose: this.state.Linkageform,

        logged_from: "MOBILE_APP",
        op: "add_hkg_data"
      };
      debugger;
      let isConnection = this.props.is_connection;
      this.props.onSaveData(forSaveData, isConnection);
      this.setState({
        radioBtnsData: ["Item1", "Item2", "Item3"],
        checked: "radio1",
        formtype1: "",
        formtype3: "",

        date: "",

        khgChecked: "khgNo",
        khg: "NO",
        cropped_area: "",
        crop_infochecked: "cropInfoNo",
        crop_info: "NO",
        crop_name_input: "",
        crop_seed_veriety: "",
        total_area_cultivated_crup: "",
        TARINA_supported_area_crop: "",
        seed_cropChecked: "CheckedNo",
        seed_crop: "NO",
        seed_quen_rsv: "",
        seeding_form_cluster_checked: "clusterNo",
        seeding_form_cluster: "NO",
        seeding_form_cluster_form: "",
        seeding_outside_cropchecked: "clusterNo",
        seeding_outside_crop: "NO",
        seeding_outside_crop_form: "",
        total_quantity_prod: "",
        total_quantity_consu: "",
        total_quantity_seed: "",
        total_quantity_sale: "",
        average_sale: "",

        supportChecked: "SupportNo",
        support: "NO",
        TrainingChecked: "TrainingNo",
        Training: "NO",
        bioform: "",

        Bio_Fertilizer: "BioNo",
        Bio: "NO",

        Fertilizer_Name: "",
        FertilizerCheckedform: "",
        FertilizerChecked: "OnlyFertilizerNo",
        Fertilizer: "NO",

        Pesticide_Name: "",
        Pesticideform: "",
        PesticideChecked: "PesticideNo",
        Pesticide: "NO",

        Herbicide_Name: "",
        Herbicideform: "",
        HerbicideChecked: "HerbicideNo",
        Herbicide: "NO",

        Extensionfrom: "",
        ExtensionChecked: "ExtensionNo",
        Extension: "NO",
        Machineryform: "",
        MachineryChecked: "MachineryNo",
        Machinery: "NO",
        Irrigationform: "",
        IrrigationChecked: "IrrigationNo",
        Irrigation: "NO",
        Fencingform: "",
        FencingChecked: "FencingNo",
        Fencing: "NO",
        support_other: "",

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
                  label="Farmer Type - Diversified / Influenced (New / Continued)"
                  value="Farmer Type - Diversified / Influenced (New / Continued)"
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
              <Text style={{ fontFamily: FONT_FAMILY }}>
                Is this HKG a Model on which FFS is conducted
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
                    this.setState({ khgChecked: "khgYes", khg: "YES" })
                  }
                >
                  <View
                    style={
                      this.state.khgChecked === "khgYes"
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
                    this.setState({ khgChecked: "khgNo", khg: "NO" })
                  }
                >
                  <View
                    style={
                      this.state.khgChecked === "khgNo"
                        ? styles.activeRadion
                        : styles.inActiveRadion
                    }
                  />

                  <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>
                    NO
                  </Text>
                </TouchableOpacity>
              </View>

              <TextInput
                value={this.state.pulses_crop_name}
                onChangeText={name => this.setState({ pulses_crop_name: name })}
                placeholder={"Cropped Area (in Square Metres)"}
                secureTextEntry={false}
                style={styles.input}
              />
            </View>

            <View style={styles.radioBtnStyle}>
              <Text style={{ fontFamily: FONT_FAMILY }}>
                Crop - Do you wish to enter Crop Information
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
                      crop_infochecked: "cropInfoYes",
                      crop_info: "YES"
                    })
                  }
                >
                  <View
                    style={
                      this.state.crop_infochecked === "cropInfoYes"
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
                      crop_infochecked: "cropInfoNo",
                      crop_info: "NO"
                    })
                  }
                >
                  <View
                    style={
                      this.state.crop_infochecked === "cropInfoNo"
                        ? styles.activeRadion
                        : styles.inActiveRadion
                    }
                  />

                  <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>
                    NO
                  </Text>
                </TouchableOpacity>
              </View>
              {this.state.crop_info == "YES" ? (
                <View style={{ width: "100%" }}>
                  <Text
                    style={{
                      fontFamily: FONT_FAMILY,
                      fontWeight: "bold",
                      fontSize: 15,
                      marginTop: 10
                    }}
                  >
                    Crop Information Entry
                  </Text>
                  <TextInput
                    value={this.state.crop_name_input}
                    onChangeText={name =>
                      this.setState({ crop_name_input: name })
                    }
                    placeholder={"Crop Name"}
                    secureTextEntry={false}
                    style={styles.input}
                  />

                  <TextInput
                    value={this.state.crop_seed_veriety}
                    onChangeText={name =>
                      this.setState({ crop_seed_veriety: name })
                    }
                    placeholder={"Crop Seed Variety"}
                    secureTextEntry={false}
                    style={styles.input}
                  />

                  <TextInput
                    value={this.state.total_area_cultivated_crup}
                    onChangeText={name =>
                      this.setState({ total_area_cultivated_crup: name })
                    }
                    placeholder={
                      "Total Area Cultivated (Square Metres) - Crop (Must be greater than 0 and less than 1000)"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType="numeric"
                  />

                  <TextInput
                    value={this.state.TARINA_supported_area_crop}
                    onChangeText={name =>
                      this.setState({ TARINA_supported_area_crop: name })
                    }
                    placeholder={
                      "TARINA Supported Area Cultivated (Square Metres) - Crop (Must be greater than 0 and less than 1000)"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType="numeric"
                  />
                  <View style={styles.radioBtnStyle}>
                    <Text style={{ fontFamily: FONT_FAMILY }}>Seed - Crop</Text>
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
                            seed_cropChecked: "CheckedYes",
                            seed_crop: "YES"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.seed_cropChecked === "CheckedYes"
                              ? styles.activeRadion
                              : styles.inActiveRadion
                          }
                        />

                        <Text
                          style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}
                        >
                          YES
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={{ flexDirection: "row", marginLeft: 10 }}
                        onPress={() =>
                          this.setState({
                            seed_cropChecked: "CheckedNo",
                            seed_crop: "NO"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.seed_cropChecked === "CheckedNo"
                              ? styles.activeRadion
                              : styles.inActiveRadion
                          }
                        />

                        <Text
                          style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}
                        >
                          NO
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {this.state.seed_crop == "YES" ? (
                      <View style={{ width: "100%" }}>
                        <TextInput
                          value={this.state.seed_quen_rsv}
                          onChangeText={name =>
                            this.setState({ seed_quen_rsv: name })
                          }
                          placeholder={
                            "Seed Quantity Received (in gm) - Crop (Must be greater than 0 and less than 2000)"
                          }
                          secureTextEntry={false}
                          style={styles.input}
                          keyboardType="numeric"
                        />
                      </View>
                    ) : null}
                  </View>
                  <View style={styles.radioBtnStyle}>
                    <Text style={{ fontFamily: FONT_FAMILY }}>
                      Seedlings from Cluster Nursery - Crop
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
                            seeding_form_cluster_checked: "clusterYes",
                            seeding_form_cluster: "YES"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.seeding_form_cluster_checked ===
                            "clusterYes"
                              ? styles.activeRadion
                              : styles.inActiveRadion
                          }
                        />

                        <Text
                          style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}
                        >
                          YES
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={{ flexDirection: "row", marginLeft: 10 }}
                        onPress={() =>
                          this.setState({
                            seeding_form_cluster_checked: "clusterNo",
                            seeding_form_cluster: "NO"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.seeding_form_cluster_checked ===
                            "clusterNo"
                              ? styles.activeRadion
                              : styles.inActiveRadion
                          }
                        />

                        <Text
                          style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}
                        >
                          NO
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {this.state.seeding_form_cluster == "YES" ? (
                      <View style={{ width: "100%" }}>
                        <TextInput
                          value={this.state.seeding_form_cluster_form}
                          onChangeText={name =>
                            this.setState({ seeding_form_cluster_form: name })
                          }
                          placeholder={
                            "Seedling Quantity Received (in No.) - Crop (Must be greater than 0 and less than 1000)"
                          }
                          secureTextEntry={false}
                          style={styles.input}
                          keyboardType="numeric"
                        />
                      </View>
                    ) : null}
                  </View>
                  <View style={styles.radioBtnStyle}>
                    <Text style={{ fontFamily: FONT_FAMILY }}>
                      Seedlings from Outside Nursery - Crop
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
                            seeding_outside_cropchecked: "clusterYes",
                            seeding_outside_crop: "YES"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.seeding_outside_cropchecked ===
                            "clusterYes"
                              ? styles.activeRadion
                              : styles.inActiveRadion
                          }
                        />

                        <Text
                          style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}
                        >
                          YES
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={{ flexDirection: "row", marginLeft: 10 }}
                        onPress={() =>
                          this.setState({
                            seeding_outside_cropchecked: "clusterNo",
                            seeding_outside_crop: "NO"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.seeding_outside_cropchecked ===
                            "clusterNo"
                              ? styles.activeRadion
                              : styles.inActiveRadion
                          }
                        />

                        <Text
                          style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}
                        >
                          NO
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {this.state.seeding_outside_crop == "YES" ? (
                      <View style={{ width: "100%" }}>
                        <TextInput
                          value={this.state.seeding_outside_crop_form}
                          onChangeText={name =>
                            this.setState({ seeding_outside_crop_form: name })
                          }
                          placeholder={
                            "Seedling Quantity Received (in No.) - Crop (Must be greater than 0 and less than 1000)"
                          }
                          secureTextEntry={false}
                          style={styles.input}
                          keyboardType="numeric"
                        />
                      </View>
                    ) : null}
                  </View>
                  <TextInput
                    value={this.state.total_quantity_prod}
                    onChangeText={name =>
                      this.setState({ total_quantity_prod: name })
                    }
                    placeholder={
                      "Total Quantity (in Kg.) - Production (Must be greater than 0 and less than 1000)"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType="numeric"
                  />

                  <TextInput
                    value={this.state.total_quantity_consu}
                    onChangeText={name =>
                      this.setState({ total_quantity_consu: name })
                    }
                    placeholder={
                      "Total Quantity (in Kg) - Consumption (Must be greater than 0 and less than 1000)"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType="numeric"
                  />

                  <TextInput
                    value={this.state.total_quantity_seed}
                    onChangeText={name =>
                      this.setState({ total_quantity_seed: name })
                    }
                    placeholder={
                      "Total Quantity (in Kg) - Seed (Must be greater than 0 and less than 1000)"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType="numeric"
                  />

                  <TextInput
                    value={this.state.total_quantity_sale}
                    onChangeText={name =>
                      this.setState({ total_quantity_sale: name })
                    }
                    placeholder={
                      "Total Quantity (in Kg) - Sale (Must be greater than 0 and less than 1000)"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType="numeric"
                  />
                  <TextInput
                    value={this.state.average_sale}
                    onChangeText={name => this.setState({ average_sale: name })}
                    placeholder={
                      "Average Sale Price (Rs / Kg) (Must be greater than 0 and less than 1000)"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType="numeric"
                  />
                </View>
              ) : null}
            </View>

            <View style={styles.radioBtnStyle}>
              <Text style={{ fontFamily: FONT_FAMILY }}>
                Support Information - Do you wish to enter Support Information
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
                      supportChecked: "SupportYes",
                      support: "YES"
                    })
                  }
                >
                  <View
                    style={
                      this.state.supportChecked === "SupportYes"
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
                      supportChecked: "SupportNo",
                      support: "NO"
                    })
                  }
                >
                  <View
                    style={
                      this.state.supportChecked === "SupportNo"
                        ? styles.activeRadion
                        : styles.inActiveRadion
                    }
                  />

                  <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>
                    NO
                  </Text>
                </TouchableOpacity>
              </View>
              {this.state.support == "YES" ? (
                <View style={{ width: "100%" }}>
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
                          this.setState({
                            TrainingChecked: "TrainingYes",
                            Training: "YES"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.TrainingChecked === "TrainingYes"
                              ? styles.activeRadion
                              : styles.inActiveRadion
                          }
                        />

                        <Text
                          style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}
                        >
                          YES
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={{ flexDirection: "row", marginLeft: 10 }}
                        onPress={() =>
                          this.setState({
                            TrainingChecked: "TrainingNo",
                            Training: "NO"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.TrainingChecked === "TrainingNo"
                              ? styles.activeRadion
                              : styles.inActiveRadion
                          }
                        />

                        <Text
                          style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}
                        >
                          NO
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.radioBtnStyle}>
                    <Text style={{ fontFamily: FONT_FAMILY }}>Fertilizer</Text>
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
                            FertilizerChecked: "OnlyFertilizerYes",
                            Fertilizer: "YES"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.FertilizerChecked === "OnlyFertilizerYes"
                              ? styles.activeRadion
                              : styles.inActiveRadion
                          }
                        />

                        <Text
                          style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}
                        >
                          YES
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={{ flexDirection: "row", marginLeft: 10 }}
                        onPress={() =>
                          this.setState({
                            FertilizerChecked: "OnlyFertilizerNo",
                            Fertilizer: "NO"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.FertilizerChecked === "OnlyFertilizerNo"
                              ? styles.activeRadion
                              : styles.inActiveRadion
                          }
                        />

                        <Text
                          style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}
                        >
                          NO
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {this.state.Bio == "YES" ? (
                      <View style={{ width: "100%" }}>
                        <TextInput
                          value={this.state.Fertilizer_Name}
                          onChangeText={name =>
                            this.setState({ Fertilizer_Name: name })
                          }
                          placeholder={"Fertilizer Name"}
                          secureTextEntry={false}
                          style={styles.input}
                        />
                        <TextInput
                          value={this.state.FertilizerCheckedform}
                          onChangeText={name =>
                            this.setState({ FertilizerCheckedform: name })
                          }
                          placeholder={
                            "Fertilizer Quantity Received (Kg) Must be greater than 0 and less than 100"
                          }
                          secureTextEntry={false}
                          style={styles.input}
                          keyboardType="numeric"
                        />
                      </View>
                    ) : null}
                  </View>
                  <View style={styles.radioBtnStyle}>
                    <Text style={{ fontFamily: FONT_FAMILY }}>Pesticide</Text>
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
                            PesticideChecked: "PesticideYes",
                            Pesticide: "YES"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.PesticideChecked === "PesticideYes"
                              ? styles.activeRadion
                              : styles.inActiveRadion
                          }
                        />

                        <Text
                          style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}
                        >
                          YES
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={{ flexDirection: "row", marginLeft: 10 }}
                        onPress={() =>
                          this.setState({
                            PesticideChecked: "PesticideNo",
                            Pesticide: "NO"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.PesticideChecked === "PesticideNo"
                              ? styles.activeRadion
                              : styles.inActiveRadion
                          }
                        />

                        <Text
                          style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}
                        >
                          NO
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {this.state.Pesticide == "YES" ? (
                      <View style={{ width: "100%" }}>
                        <TextInput
                          value={this.state.Pesticide_Name}
                          onChangeText={name =>
                            this.setState({ Pesticide_Name: name })
                          }
                          placeholder={"Pesticide Name"}
                          secureTextEntry={false}
                          style={styles.input}
                        />
                        <TextInput
                          value={this.state.Pesticideform}
                          onChangeText={name =>
                            this.setState({ Pesticideform: name })
                          }
                          placeholder={
                            "Pesticide Quantity Received (gm / ml) Must be greater than 0 and less than 1000"
                          }
                          secureTextEntry={false}
                          style={styles.input}
                          keyboardType="numeric"
                        />
                      </View>
                    ) : null}
                  </View>
                  <View style={styles.radioBtnStyle}>
                    <Text style={{ fontFamily: FONT_FAMILY }}>Herbicide</Text>
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
                            HerbicideChecked: "HerbicideYes",
                            Herbicide: "YES"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.HerbicideChecked === "HerbicideYes"
                              ? styles.activeRadion
                              : styles.inActiveRadion
                          }
                        />

                        <Text
                          style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}
                        >
                          YES
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={{ flexDirection: "row", marginLeft: 10 }}
                        onPress={() =>
                          this.setState({
                            HerbicideChecked: "HerbicideNo",
                            Herbicide: "NO"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.HerbicideChecked === "HerbicideNo"
                              ? styles.activeRadion
                              : styles.inActiveRadion
                          }
                        />

                        <Text
                          style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}
                        >
                          NO
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {this.state.Herbicide == "YES" ? (
                      <View style={{ width: "100%" }}>
                        <TextInput
                          value={this.state.Herbicide_Name}
                          onChangeText={name =>
                            this.setState({ Herbicide_Name: name })
                          }
                          placeholder={"Herbicide Name"}
                          secureTextEntry={false}
                          style={styles.input}
                        />
                        <TextInput
                          value={this.state.Herbicideform}
                          onChangeText={name =>
                            this.setState({ Herbicideform: name })
                          }
                          placeholder={
                            "Herbicide Quantity Received (ml) Must be greater than 0 and less than 1000"
                          }
                          secureTextEntry={false}
                          style={styles.input}
                          keyboardType="numeric"
                        />
                      </View>
                    ) : null}
                  </View>
                  <View style={styles.radioBtnStyle}>
                    <Text style={{ fontFamily: FONT_FAMILY }}>
                      Extension Support
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
                            ExtensionChecked: "ExtensionYes",
                            Extension: "YES"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.ExtensionChecked === "ExtensionYes"
                              ? styles.activeRadion
                              : styles.inActiveRadion
                          }
                        />

                        <Text
                          style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}
                        >
                          YES
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={{ flexDirection: "row", marginLeft: 10 }}
                        onPress={() =>
                          this.setState({
                            ExtensionChecked: "ExtensionNo",
                            Extension: "NO"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.ExtensionChecked === "ExtensionNo"
                              ? styles.activeRadion
                              : styles.inActiveRadion
                          }
                        />

                        <Text
                          style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}
                        >
                          NO
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {this.state.Extension == "YES" ? (
                      <View style={{ width: "100%" }}>
                        <TextInput
                          value={this.state.Extensionform}
                          onChangeText={name =>
                            this.setState({ Extensionfrom: name })
                          }
                          placeholder={
                            "Extension Support (in No.) Must be greater than 0 and less than 100"
                          }
                          secureTextEntry={false}
                          style={styles.input}
                          keyboardType="numeric"
                        />
                      </View>
                    ) : null}
                  </View>
                  <View style={styles.radioBtnStyle}>
                    <Text style={{ fontFamily: FONT_FAMILY }}>
                      Machinery Support
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
                            MachineryChecked: "MachineryYes",
                            Machinery: "YES"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.MachineryChecked === "MachineryYes"
                              ? styles.activeRadion
                              : styles.inActiveRadion
                          }
                        />

                        <Text
                          style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}
                        >
                          YES
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={{ flexDirection: "row", marginLeft: 10 }}
                        onPress={() =>
                          this.setState({
                            MachineryChecked: "MachineryNo",
                            Machinery: "NO"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.MachineryChecked === "MachineryNo"
                              ? styles.activeRadion
                              : styles.inActiveRadion
                          }
                        />

                        <Text
                          style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}
                        >
                          NO
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {this.state.Machinery == "YES" ? (
                      <View style={{ width: "100%" }}>
                        <TextInput
                          value={this.state.Machineryform}
                          onChangeText={name =>
                            this.setState({ Machineryform: name })
                          }
                          placeholder={
                            "Machinery Support (in No.) Must be greater than 0 and less than 100"
                          }
                          secureTextEntry={false}
                          style={styles.input}
                          keyboardType="numeric"
                        />
                      </View>
                    ) : null}
                  </View>
                  <View style={styles.radioBtnStyle}>
                    <Text style={{ fontFamily: FONT_FAMILY }}>
                      Irrigation Support
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
                            IrrigationChecked: "IrrigationYes",
                            Irrigation: "YES"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.IrrigationChecked === "IrrigationYes"
                              ? styles.activeRadion
                              : styles.inActiveRadion
                          }
                        />

                        <Text
                          style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}
                        >
                          YES
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={{ flexDirection: "row", marginLeft: 10 }}
                        onPress={() =>
                          this.setState({
                            IrrigationChecked: "IrrigationNo",
                            Irrigation: "NO"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.IrrigationChecked === "IrrigationNo"
                              ? styles.activeRadion
                              : styles.inActiveRadion
                          }
                        />

                        <Text
                          style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}
                        >
                          NO
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {this.state.Irrigation == "YES" ? (
                      <View style={{ width: "100%" }}>
                        <TextInput
                          value={this.state.Irrigationform}
                          onChangeText={name =>
                            this.setState({ Irrigationform: name })
                          }
                          placeholder={"Specify Irrigation Support Type"}
                          secureTextEntry={false}
                          style={styles.input}
                        />
                      </View>
                    ) : null}
                  </View>
                  <View style={styles.radioBtnStyle}>
                    <Text style={{ fontFamily: FONT_FAMILY }}>
                      Fencing / Trellis Support
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
                            FencingChecked: "FencingYes",
                            Fencing: "YES"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.FencingChecked === "FencingYes"
                              ? styles.activeRadion
                              : styles.inActiveRadion
                          }
                        />

                        <Text
                          style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}
                        >
                          YES
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={{ flexDirection: "row", marginLeft: 10 }}
                        onPress={() =>
                          this.setState({
                            FencingChecked: "FencingNo",
                            Fencing: "NO"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.FencingChecked === "FencingNo"
                              ? styles.activeRadion
                              : styles.inActiveRadion
                          }
                        />

                        <Text
                          style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}
                        >
                          NO
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {this.state.Fencing == "YES" ? (
                      <View style={{ width: "100%" }}>
                        <TextInput
                          value={this.state.Fencingform}
                          onChangeText={name =>
                            this.setState({ Fencingform: name })
                          }
                          placeholder={
                            "Fencing Support (in No.) Must be greater than 0 and less than 100"
                          }
                          secureTextEntry={false}
                          style={styles.input}
                          keyboardType="numeric"
                        />
                      </View>
                    ) : null}
                  </View>
                  <TextInput
                    value={this.state.support_other}
                    onChangeText={name =>
                      this.setState({ support_other: name })
                    }
                    placeholder={"Others Specify"}
                    secureTextEntry={false}
                    style={styles.input}
                  />
                </View>
              ) : null}
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
                  style={{ flexDirection: "row", marginTop: 5, marginLeft: 10 }}
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
                <TouchableOpacity
                  style={{ flexDirection: "row", marginLeft: 10, marginTop: 5 }}
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
