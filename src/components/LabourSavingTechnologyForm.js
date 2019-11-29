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

class LabourSavingTechnologyForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      checked: "radio1",
      checkedOneValue: "KVK",
      checked2: "radio11",
      checkedTwoValue: "Financial",
      formtype1: "",
      formtype2: "",
      formtype3: "",
      formtype4: "",
      specifyTraining: "",
      agencyName: "",
      linkPurpose: "",
      date: "",
      crop_name_equpment: "",
      extension: "NO",
      extentionChecked: "ExtensionNo",
      irigation: "",
      land_Preparation: "",
      planting: "",
      weeding: "",
      pesticide: "",
      harvesting: "",
      toolused: "",
      sourcetool: "",
      toolDeployed: "",
      nooftool: "",
      areaunderlst: "",

      FinancialChecked: "",
      typelink: "",
      Linkageform: "",
      AgencyLinkForm: ""
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
      this.func_ShowAlert("Select Household ");
    } else if (this.state.date == "") {
      this.func_ShowAlert("Select Date ");
    } else {
      let forSaveData = {
        logged_date: this.state.date,
        hh_id: this.props.house_hold.id,
        farmer_type:
          this.state.formtype1 == "Farmer Type" ? "" : this.state.formtype1,
        farmer_status:
          this.state.formtype2 == "Farmer Status" ? "" : this.state.formtype2,
        crop_name_lst_equip: this.state.crop_name_equpment,
        extension_support_provided: this.state.extension,
        tool_used_irrigation_water:
          this.state.irigation ==
          "Select Implement / Tool used for - Irrigation & Water Application Support"
            ? ""
            : this.state.irigation,
        tool_used_land_prep_prim_support:
          this.state.land_Preparation ==
          "Select Implement / Tool used for - Land Preparation - Primary Tillage Support"
            ? ""
            : this.state.land_Preparation,
        tool_used_plant_transpl_seed_sowing:
          this.state.planting ==
          "Select Implement / Tool used for - Planting / Transplanting / Seed - Sowing"
            ? ""
            : this.state.planting,
        tool_used_weeding_cultural_operations:
          this.state.weeding ==
          "Select Implement / Tool used for - Weeding & Inter Cultural Operations"
            ? ""
            : this.state.weeding,
        tool_used_pesticide_appliation:
          this.state.pesticide ==
          "Select Implement / Tool used for - Pesticide Application"
            ? ""
            : this.state.pesticide,

        tool_used_harvesting_pluking:
          this.state.harvesting ==
          "Select Implement / Tool used for - Harvesting / Plucking"
            ? ""
            : this.state.harvesting,
        job_per_with_other_tool: this.state.toolused,
        source_of_tool:
          this.state.sourcetool == "Source of Tool"
            ? ""
            : this.state.sourcetool,
        tools_deployed_at:
          this.state.toolDeployed == "Tools Deployed at"
            ? ""
            : this.state.toolDeployed,
        no_of_tools_deployed: this.state.nooftool,
        area_under_lst: this.state.areaunderlst,

        type_of_linkages: this.state.typelink,
        agency_linked_with: this.state.AgencyLinkForm,
        linkage_purpose: this.state.Linkageform,
        logged_date: this.state.date,
        hh_id: this.props.house_hold.id,
        farmer_type:
          this.state.formtype1 == "Farmer Type" ? "" : this.state.formtype1,
        farmer_status:
          this.state.formtype2 == "Farmer Status" ? "" : this.state.formtype2,
        crop_name_with_lst_equipments: this.state.crop_name_equpment,

        logged_from: "MOBILE_APP",
        op: "add_lst_data"
      };

      //**If needed part of object for farmer type and farmer status */
      // farmer_type: this.state.formtype1 == "Farmer Type"?"":this.state.formtype1,
      // farmer_status: this.state.formtype2 == "Farmer Status" ? "":this.state.formtype2,
      let isConnection = this.props.is_connection;
      await this.props.onSaveData(forSaveData, isConnection);
      this.setState({
        checked: "radio1",
        checkedOneValue: "KVK",
        checked2: "radio11",
        checkedTwoValue: "Financial",
        formtype1: "",
        formtype2: "",
        formtype3: "",
        formtype4: "",
        specifyTraining: "",
        agencyName: "",
        linkPurpose: "",
        date: "",
        crop_name_equpment: "",
        extension: "NO",
        extentionChecked: "ExtensionNo",
        irigation: "",
        land_Preparation: "",
        planting: "",
        weeding: "",
        pesticide: "",
        harvesting: "",
        toolused: "",
        sourcetool: "",
        toolDeployed: "",
        nooftool: "",
        areaunderlst: "",

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
              value={this.state.crop_name_equpment}
              onChangeText={name => this.setState({ crop_name_equpment: name })}
              placeholder={"Crop Name with LST Equipments"}
              secureTextEntry={false}
              style={styles.input}
            />
            <View style={styles.radioBtnStyle}>
              <Text style={{ fontFamily: FONT_FAMILY }}>
                Extension Support Provided
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
                      extentionChecked: "ExtensionYes",
                      extension: "YES"
                    })
                  }
                >
                  <View
                    style={
                      this.state.extentionChecked === "ExtensionYes"
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
                      extentionChecked: "ExtensionNo",
                      extension: "NO"
                    })
                  }
                >
                  <View
                    style={
                      this.state.extentionChecked === "ExtensionNo"
                        ? styles.activeRadion
                        : styles.inActiveRadion
                    }
                  />

                  <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>
                    NO
                  </Text>
                </TouchableOpacity>
              </View>
              {this.state.extension == "YES" ? (
                <View style={{ width: "100%" }}>
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
                      selectedValue={this.state.irigation}
                      style={{ fontFamily: FONT_FAMILY }}
                      onValueChange={(itemValue, itemIndex) =>
                        // alert(itemValue)
                        this.setState({ irigation: itemValue })
                      }
                    >
                      {/* value={this.state.formtype} /> */}
                      <Picker.Item
                        itemStyle={{ fontFamily: FONT_FAMILY }}
                        label="Select Implement / Tool used for - Irrigation & Water Application Support"
                        value="Select Implement / Tool used for - Irrigation & Water Application Support"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Desi plough"
                        value="Desi plough"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Mould board plough"
                        value="Mould board plough"
                      />
                      <Picker.Item
                        label="Disc Harrow (Bullock drawn)"
                        value="Disc Harrow (Bullock drawn)"
                      />
                      <Picker.Item
                        label="Disc Harrow (Power triller / tractor drawn)"
                        value="Disc Harrow (Power triller / tractor drawn)"
                      />
                      <Picker.Item
                        label="Tyne Harrow (Bullock drawn)"
                        value="Tyne Harrow (Bullock drawn)"
                      />
                      <Picker.Item
                        label="Tyne Harrow (Power triller / tractor drawn)"
                        value="Tyne Harrow (Power triller / tractor drawn)"
                      />
                      <Picker.Item
                        label="Furrow Ridge Maker"
                        value="Furrow Ridge Maker"
                      />
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
                      selectedValue={this.state.land_Preparation}
                      style={{ fontFamily: FONT_FAMILY }}
                      onValueChange={(itemValue, itemIndex) =>
                        // alert(itemValue)
                        this.setState({ land_Preparation: itemValue })
                      }
                    >
                      {/* value={this.state.formtype} /> */}
                      <Picker.Item
                        itemStyle={{ fontFamily: FONT_FAMILY }}
                        label="Select Implement / Tool used for - Land Preparation - Primary Tillage Support"
                        value="Select Implement / Tool used for - Land Preparation - Primary Tillage Support"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Solar Nano Pump"
                        value="Solar Nano Pump"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Fossil Fuel run pumpset"
                        value="Fossil Fuel run pumpset"
                      />
                      <Picker.Item
                        label="Gravity based Drip Kit"
                        value="Gravity based Drip Kit"
                      />
                      <Picker.Item
                        label="Micro Sprinkler"
                        value="Micro Sprinkler"
                      />
                      <Picker.Item
                        label="Rose Cane manual"
                        value="Rose Cane manual"
                      />
                      <Picker.Item
                        label="PVC / Hose Pipe manual"
                        value="PVC / Hose Pipe manual"
                      />

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
                      selectedValue={this.state.planting}
                      style={{ fontFamily: FONT_FAMILY }}
                      onValueChange={(itemValue, itemIndex) =>
                        // alert(itemValue)
                        this.setState({ planting: itemValue })
                      }
                    >
                      {/* value={this.state.formtype} /> */}
                      <Picker.Item
                        itemStyle={{ fontFamily: FONT_FAMILY }}
                        label="Select Implement / Tool used for - Planting / Transplanting / Seed - Sowing"
                        value="Select Implement / Tool used for - Planting / Transplanting / Seed - Sowing"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Planter - Dibbler Manual"
                        value="Planter - Dibbler Manual"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Broadcaster Rotary Fertilizer applicator"
                        value="Broadcaster Rotary Fertilizer applicator"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Seed Drill"
                        value="Seed Drill"
                      />
                      <Picker.Item
                        label="Behind Plough Planting (Line Sowing)"
                        value="Behind Plough Planting (Line Sowing)"
                      />
                      <Picker.Item
                        label="Seed cum Fertilizer Drill"
                        value="Seed cum Fertilizer Drill"
                      />
                      <Picker.Item label="Transplanter" value="Transplanter" />

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
                      selectedValue={this.state.weeding}
                      style={{ fontFamily: FONT_FAMILY }}
                      onValueChange={(itemValue, itemIndex) =>
                        // alert(itemValue)
                        this.setState({ weeding: itemValue })
                      }
                    >
                      {/* value={this.state.formtype} /> */}
                      <Picker.Item
                        itemStyle={{ fontFamily: FONT_FAMILY }}
                        label="Select Implement / Tool used for - Weeding & Inter Cultural Operations"
                        value="Select Implement / Tool used for - Weeding & Inter Cultural Operations"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Cono / Mandua Weeder"
                        value="Cono / Mandua Weeder"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Finger Weeder"
                        value="Finger Weeder"
                      />
                      <Picker.Item label="Cycle Weeder" value="Cycle Weeder" />
                      <Picker.Item label="Garden Rake" value="Garden Rake" />
                      <Picker.Item label="Hand Hoe" value="Hand Hoe" />
                      <Picker.Item
                        label="Dry Land Weeder"
                        value="Dry Land Weeder"
                      />
                      <Picker.Item
                        label="Wet Land Weeder"
                        value="Wet Land Weeder"
                      />
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
                      selectedValue={this.state.pesticide}
                      style={{ fontFamily: FONT_FAMILY }}
                      onValueChange={(itemValue, itemIndex) =>
                        // alert(itemValue)
                        this.setState({ pesticide: itemValue })
                      }
                    >
                      {/* value={this.state.formtype} /> */}
                      <Picker.Item
                        itemStyle={{ fontFamily: FONT_FAMILY }}
                        label="Select Implement / Tool used for - Pesticide Application"
                        value="Select Implement / Tool used for - Pesticide Application"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Knapsack Manual Sprayer"
                        value="Knapsack Manual Sprayer"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Battery Operated Sprayer"
                        value="Battery Operated Sprayer"
                      />
                      <Picker.Item
                        label="Small Hand Sprayer (Garden)"
                        value="Small Hand Sprayer (Garden)"
                      />

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
                      selectedValue={this.state.harvesting}
                      style={{ fontFamily: FONT_FAMILY }}
                      onValueChange={(itemValue, itemIndex) =>
                        // alert(itemValue)
                        this.setState({ harvesting: itemValue })
                      }
                    >
                      {/* value={this.state.formtype} /> */}
                      <Picker.Item
                        itemStyle={{ fontFamily: FONT_FAMILY }}
                        label="Select Implement / Tool used for - Harvesting / Plucking"
                        value="Select Implement / Tool used for - Harvesting / Plucking"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Power Operated Paddy Reaper"
                        value="Power Operated Paddy Reaper"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Improved Sickle"
                        value="Improved Sickle"
                      />
                      <Picker.Item
                        label="Cotton Picker"
                        value="Cotton Picker"
                      />
                      <Picker.Item
                        label="Fruit Plucker"
                        value="Fruit Plucker"
                      />
                      <Picker.Item label="SiCatcher" value="SiCatcher" />

                      <Picker.Item label="Others" value="Others" />
                    </Picker>
                  </View>
                  <TextInput
                    value={this.state.toolused}
                    onChangeText={name => this.setState({ toolused: name })}
                    placeholder={
                      "Please specify the tool used and nature of job performed with other tools"
                    }
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
                      selectedValue={this.state.sourcetool}
                      style={{ fontFamily: FONT_FAMILY }}
                      onValueChange={(itemValue, itemIndex) =>
                        // alert(itemValue)
                        this.setState({ sourcetool: itemValue })
                      }
                    >
                      {/* value={this.state.formtype} /> */}
                      <Picker.Item
                        itemStyle={{ fontFamily: FONT_FAMILY }}
                        label="Source of Tool"
                        value="Source of Tool"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="In House"
                        value="In House"
                      />

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
                      selectedValue={this.state.toolDeployed}
                      style={{ fontFamily: FONT_FAMILY }}
                      onValueChange={(itemValue, itemIndex) =>
                        // alert(itemValue)
                        this.setState({ toolDeployed: itemValue })
                      }
                    >
                      {/* value={this.state.formtype} /> */}
                      <Picker.Item
                        itemStyle={{ fontFamily: FONT_FAMILY }}
                        label="Tools Deployed at"
                        value="Tools Deployed at"
                      />
                      <Picker.Item label="Household" value="Household" />
                      <Picker.Item label="SHG / Group" value="SHG / Group" />
                      <Picker.Item label="Villages" value="Villages" />
                      <Picker.Item label="Panchayat" value="Panchayat" />
                      <Picker.Item label="Block" value="Block" />

                      <Picker.Item label="District" value="District" />
                    </Picker>
                  </View>
                  <TextInput
                    value={this.state.nooftool}
                    onChangeText={name => this.setState({ nooftool: name })}
                    placeholder={"No. of Tools Deployed"}
                    secureTextEntry={false}
                    style={styles.input}
                  />
                  <TextInput
                    value={this.state.areaunderlst}
                    onChangeText={name => this.setState({ areaunderlst: name })}
                    placeholder={"Area under LST (in Acres)"}
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
)(LabourSavingTechnologyForm);
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
