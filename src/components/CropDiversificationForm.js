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
import * as MagicMove from "react-native-magic-move";
import { func_validateNumbersInForms } from "../business/common/CommonFunctions";

class CropDiversificationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radioBtnsData: ["Item1", "Item2", "Item3"],
      checked: "radio1",
      formtype1: "",
      formtype2: "",
      formtype3: "",
      pulsesChecked: "PulsesNo",
      pulses: "NO",
      vegetables: "NO",
      vegetablesChecked: "VegetablesNo",

      cereals: "NO",
      cerealsChecked: "CerealsNo",
      oilseeds: "NO",
      oilseedsChecked: "OilseedsNo",
      legumes: "NO",
      legumesChecked: "LegumesNo",
      mixed: "NO",
      mixedChecked: "MixedNo",
      support: "NO",
      supportChecked: "SupportNo",
      type: "NO",
      typeChecked: "",

      date: "",
      pulses_crop_name: "",
      pulses_seed_variety: "",
      total_area_cultivated: "",
      TARINA_supported_area: "",

      seedPulsesChecked: "PulsesNo000",
      seedPulses: "NO",
      seedPulses_quantity: "",
      SeedlingsfromClusterChecked: "PulsesNo0",
      SeedlingsfromCluster: "NO",
      SeedlingsfromClusterQuantity: "",
      SeedlingsfromOutside1: "NO",
      SeedlingsfromOutsideQuantity: "",
      pulses_rabi_kharif: "",
      pulses_Production: "",
      pulses_Consumption: "",
      pulses_seed: "",
      pulses_Sale: "",
      pulses_Average: "",
      SeedVegetablesChecked: "PulsesNo",
      SeedVegetables: "NO",
      SeedQuantityVegetables: "",
      SeedlingsfromNurseryChecked: "PulsesNo",
      SeedlingsfromNursery: "NO",
      SeedlingsQuantityReceivedVegetables: "",
      SeedlingsfromOutsideChecked: "PulsesNo",
      SeedlingsfromOutsideCheckedPul: "PulsesNo222",

      SeedlingsfromOutside: "NO",
      SeedlingsfromOutsideQuantityVegetables: "",
      VegetablesProduction: "",
      VegetablesConsumption: "",
      VegetablesSeed: "",
      VegetablesSale: "",
      AverageSalePrice: "",
      CerealsProduction: "",
      CerealsConsumption: "",
      CerealsSeed: "",
      AverageSalePriceCereals: "",
      CerealsSale: "",
      SeedlingsfromOutsideCheckedCereals: "PulsesNo",
      SeedlingsfromOutsideCereals: "NO",
      SeedlingsfromOutsideQuantityCereals: "",
      SeedlingsfromNurseryCerealsChecked: "PulsesNo",
      SeedlingsfromNurseryCereals: "NO",
      SeedlingsQuantityReceivedCereals: "",
      SeedCerealsChecked: "PulsesNo",
      SeedCereals: "NO",
      SeedQuantityCereals: "",
      SeedOilseedsChecked: "PulsesNo",
      SeedOilseeds: "NO",
      SeedQuantityOilseeds: "",
      SeedlingsfromNurseryOilseedsChecked: "PulsesNo",
      SeedlingsfromNurseryOilseeds: "NO",
      SeedlingsQuantityReceivedOilseeds: "",
      SeedlingsfromOutsideCheckedOilseeds: "PulsesNo",
      SeedlingsfromOutsideOilseeds: "NO",
      SeedlingsfromOutsideQuantityOilseeds: "",
      OilseedsProduction: "",
      OilseedsConsumption: "",
      OilseedsSeed: "",
      OilseedsSale: "",
      AverageSalePriceOilseeds: "",

      SeedLegumesChecked: "PulsesNo",
      SeedLegumes: "NO",
      SeedQuantityLegumes: "",
      SeedlingsfromNurseryLegumesChecked: "PulsesNo",
      SeedlingsfromNurseryLegumes: "NO",
      SeedlingsQuantityReceivedLegumes: "",
      SeedlingsfromOutsideCheckedLegumes: "PulsesNo",
      SeedlingsfromOutsideLegumes: "NO",
      SeedlingsfromOutsideQuantityLegumes: "",
      LegumesProduction: "",
      LegumesConsumption: "",
      LegumesSeed: "",
      LegumesSale: "",
      AverageSalePriceLegumes: "",

      vegetables_crop_name: "",
      vegetables_seed_variety: "",
      total_area_cultivated_vegetables: "",
      TARINA_supported_area_vegetables: "",

      cereals_crop_name: "",
      cereals_seed_variety: "",
      total_area_cultivated_cereals: "",
      TARINA_supported_area_cereals: "",

      oilseeds_crop_name: "",
      oilseeds_seed_variety: "",
      total_area_cultivated_oilseeds: "",
      TARINA_supported_area_oilseeds: "",

      legumes_crop_name: "",
      legumes_seed_variety: "",
      total_area_cultivated_legumes: "",
      TARINA_supported_area_legumes: "",

      mixed_crop_name: "",
      mixed_seed_variety: "",
      total_area_cultivated_mixed: "",
      TARINA_supported_area_mixed: "",
      seed_mixed_crop: "SeedMixedCropNo",
      seed_mixed: "NO",
      seed_mixed_crop_form: "",

      Seedlings_from_Cluster_Form: "",
      Seedlings_from_Cluster_Nursery: "SeedlingsfromClusterNurseryNo",
      Seedlings_from_Cluster: "No",

      Seedlings_from_Outside_Form: "",
      Seedlings_from_Outside_Nursery: "SeedlingsfromOutsideNurseryNo",
      Seedlings_from_Outside: "No",
      subform1: "",
      subform2: "",
      subform3: "",
      subform4: "",
      subform5: "",

      TrainingChecked: "TrainingNo",
      Training: "NO",

      bioformname: "",
      bioform: "",
      Bio_Fertilizer: "BioNo",
      Bio: "NO",

      FertilizerCheckedformName: "",
      FertilizerCheckedform: "",
      FertilizerChecked: "OnlyFertilizerNo",
      Fertilizer: "NO",

      PesticideName: "",
      Pesticideform: "",
      PesticideChecked: "PesticideNo",
      Pesticide: "NO",

      HerbicideformName: "",
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
      AgencyLinkForm: "",

      seeding_subform1: "",
      seeding_subform2: "",
      seeding_subform3: "",
      seeding_subform4: "",
      seeding_subform5: "",
      Extensionform: ""
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
    Actions.pop();

    return true;
  }
  async onLogClick() {
    if (!this.props.house_hold.hasOwnProperty("nameserch")) {
      this.func_ShowAlert("Select Household ");
    } else if (this.state.date == "") {
      this.func_ShowAlert("Select Date ");
    } else if (
      func_validateNumbersInForms(0, 50, this.state.total_area_cultivated)
    ) {
      this.func_ShowAlert(
        "Total Area Cultivated (Acre) - Pulses (Must be greater than 0 and less than 50)"
      );
    } else if (
      func_validateNumbersInForms(0, 50, this.state.TARINA_supported_area)
    ) {
      this.func_ShowAlert(
        "TARINA Supported Area Cultivated (Acre) - Pulses (Must be greater than 0 and less than 50)"
      );
    } else if (
      func_validateNumbersInForms(0, 100, this.state.seedPulses_quantity)
    ) {
      this.func_ShowAlert(
        "Seed Quantity Received (in Kg) - Pulses (Must be greater than 0 and less than 100)"
      );
    } else if (
      func_validateNumbersInForms(
        0,
        1000,
        this.state.SeedlingsfromClusterQuantity
      )
    ) {
      this.func_ShowAlert(
        "Seedling Quantity Received (in No.) - Pulses (Must be greater than 0 and less than 1000)"
      );
    } else if (
      func_validateNumbersInForms(
        0,
        1000,
        this.state.SeedlingsfromOutsideQuantity
      )
    ) {
      this.func_ShowAlert(
        "Seedling Quantity Received (in No.) - Pulses (Must be greater than 0 and less than 1000)"
      );
    } else if (
      func_validateNumbersInForms(0, 1000, this.state.pulses_Production)
    ) {
      this.func_ShowAlert(
        "Total Quantity (in Kg.) - Production (Must be greater than 0 and less than 1000)"
      );
    } else if (
      func_validateNumbersInForms(0, 1000, this.state.pulses_Consumption)
    ) {
      this.func_ShowAlert(
        "Total Quantity (in Kg) - Consumption (Must be greater than 0 and less than 1000)"
      );
    } else if (func_validateNumbersInForms(0, 1000, this.state.pulses_seed)) {
      this.func_ShowAlert(
        "Total Quantity (in Kg) - Seed (Must be greater than 0 and less than 1000)"
      );
    } else if (func_validateNumbersInForms(0, 1000, this.state.pulses_Sale)) {
      this.func_ShowAlert(
        "Total Quantity (in Kg) - Sale (Must be greater than 0 and less than 1000)"
      );
    } else if (
      func_validateNumbersInForms(0, 1000, this.state.pulses_Average)
    ) {
      this.func_ShowAlert(
        "Average Sale Price (Rs / Kg) (Must be greater than 0 and less than 1000)"
      );
    } else if (
      func_validateNumbersInForms(
        0,
        50,
        this.state.total_area_cultivated_vegetables
      )
    ) {
      this.func_ShowAlert(
        "Total Area Cultivated (Acre) - Vegetables (Must be greater than 0 and less than 50)"
      );
    } else if (
      func_validateNumbersInForms(
        0,
        50,
        this.state.TARINA_supported_area_vegetables
      )
    ) {
      this.func_ShowAlert(
        "TARINA Supported Area Cultivated (Acre) - Vegetables (Must be greater than 0 and less than 50)"
      );
    } else if (
      func_validateNumbersInForms(0, 2000, this.state.SeedQuantityVegetables)
    ) {
      this.func_ShowAlert(
        "Seed Quantity Received (in gm) - Vegetables (Must be greater than 0 and less than 2000)"
      );
    } else if (
      func_validateNumbersInForms(
        0,
        1000,
        this.state.SeedlingsQuantityReceivedVegetables
      )
    ) {
      this.func_ShowAlert(
        "Seedling Quantity Received (in No.) - Vegetables (Must be greater than 0 and less than 1000)"
      );
    } else if (
      func_validateNumbersInForms(
        0,
        1000,
        this.state.SeedlingsfromOutsideQuantityVegetables
      )
    ) {
      this.func_ShowAlert(
        "Seedling Quantity Received (in No.) - Vegetables (Must be greater than 0 and less than 1000)"
      );
    } else if (
      func_validateNumbersInForms(0, 1000, this.state.VegetablesProduction)
    ) {
      this.func_ShowAlert(
        "Total Quantity (in Kg.) - Production (Must be greater than 0 and less than 1000)"
      );
    } else if (
      func_validateNumbersInForms(0, 1000, this.state.VegetablesConsumption)
    ) {
      this.func_ShowAlert(
        "Total Quantity (in Kg) - Consumption (Must be greater than 0 and less than 1000)"
      );
    } else if (
      func_validateNumbersInForms(0, 1000, this.state.VegetablesSeed)
    ) {
      this.func_ShowAlert(
        "Total Quantity (in Kg) - Consumption (Must be greater than 0 and less than 1000)"
      );
    } else if (
      func_validateNumbersInForms(0, 1000, this.state.VegetablesSale)
    ) {
      this.func_ShowAlert(
        "Total Quantity (in Kg) - Seed (Must be greater than 0 and less than 1000)"
      );
    } else if (
      func_validateNumbersInForms(0, 1000, this.state.AverageSalePrice)
    ) {
      this.func_ShowAlert(
        "Average Sale Price (Rs / Kg) (Must be greater than 0 and less than 1000)"
      );
    } else if (
      func_validateNumbersInForms(
        0,
        50,
        this.state.total_area_cultivated_cereals
      )
    ) {
      this.func_ShowAlert(
        "Total Area Cultivated (Acre) - Cereals (Must be greater than 0 and less than 50)"
      );
    } else if (
      func_validateNumbersInForms(
        0,
        50,
        this.state.TARINA_supported_area_cereals
      )
    ) {
      this.func_ShowAlert(
        "TARINA Supported Area Cultivated (Acre) - Cereals (Must be greater than 0 and less than 50)"
      );
    } else if (
      func_validateNumbersInForms(0, 2000, this.state.SeedQuantityCereals)
    ) {
      this.func_ShowAlert(
        "Seed Quantity Received (in gm) - Cereals (Must be greater than 0 and less than 2000)"
      );
    } else if (
      func_validateNumbersInForms(
        0,
        1000,
        this.state.SeedlingsQuantityReceivedCereals
      )
    ) {
      this.func_ShowAlert(
        "Seedling Quantity Received (in No.) - Cereals (Must be greater than 0 and less than 1000)"
      );
    } else if (
      func_validateNumbersInForms(
        0,
        1000,
        this.state.SeedlingsfromOutsideQuantityCereals
      )
    ) {
      this.func_ShowAlert(
        "Seedling Quantity Received (in No.) - Cereals (Must be greater than 0 and less than 1000)"
      );
    } else if (
      func_validateNumbersInForms(0, 1000, this.state.CerealsProduction)
    ) {
      this.func_ShowAlert(
        "Total Quantity (in Kg.) - Production (Must be greater than 0 and less than 1000)"
      );
    } else if (
      func_validateNumbersInForms(0, 1000, this.state.CerealsConsumption)
    ) {
      this.func_ShowAlert(
        "Total Quantity (in Kg) - Consumption (Must be greater than 0 and less than 1000)"
      );
    } else if (func_validateNumbersInForms(0, 1000, this.state.CerealsSeed)) {
      this.func_ShowAlert(
        "Total Quantity (in Kg) - Seed (Must be greater than 0 and less than 1000)"
      );
    } else if (func_validateNumbersInForms(0, 1000, this.state.CerealsSale)) {
      this.func_ShowAlert(
        "Total Quantity (in Kg) - Sale (Must be greater than 0 and less than 1000)"
      );
    } else if (
      func_validateNumbersInForms(0, 1000, this.state.AverageSalePriceCereals)
    ) {
      this.func_ShowAlert(
        "Average Sale Price (Rs / Kg) (Must be greater than 0 and less than 1000)"
      );
    } else if (
      func_validateNumbersInForms(
        0,
        50,
        this.state.total_area_cultivated_oilseeds
      )
    ) {
      this.func_ShowAlert(
        "Total Area Cultivated (Acre) - Oilseeds (Must be greater than 0 and less than 50)"
      );
    } else if (
      func_validateNumbersInForms(
        0,
        50,
        this.state.TARINA_supported_area_oilseeds
      )
    ) {
      this.func_ShowAlert(
        "TARINA Supported Area Cultivated (Acre) - Oilseeds (Must be greater than 0 and less than 50)"
      );
    } else if (
      func_validateNumbersInForms(0, 2000, this.state.SeedQuantityOilseeds)
    ) {
      this.func_ShowAlert(
        "Seed Quantity Received (in gm) - Oilseeds (Must be greater than 0 and less than 2000)"
      );
    } else if (
      func_validateNumbersInForms(
        0,
        1000,
        this.state.SeedlingsQuantityReceivedOilseeds
      )
    ) {
      this.func_ShowAlert(
        "Seedling Quantity Received (in No.) - Oilseeds (Must be greater than 0 and less than 1000)"
      );
    } else if (
      func_validateNumbersInForms(
        0,
        1000,
        this.state.SeedlingsfromOutsideQuantityOilseeds
      )
    ) {
      this.func_ShowAlert(
        "Seedling Quantity Received (in No.) - Oilseeds (Must be greater than 0 and less than 1000)"
      );
    } else if (
      func_validateNumbersInForms(0, 1000, this.state.OilseedsProduction)
    ) {
      this.func_ShowAlert(
        "Total Quantity (in Kg.) - Production (Must be greater than 0 and less than 1000)"
      );
    } else if (
      func_validateNumbersInForms(0, 1000, this.state.OilseedsConsumption)
    ) {
      this.func_ShowAlert(
        "Total Quantity (in Kg) - Consumption (Must be greater than 0 and less than 1000)"
      );
    } else if (func_validateNumbersInForms(0, 1000, this.state.OilseedsSeed)) {
      this.func_ShowAlert(
        "Total Quantity (in Kg) - Seed (Must be greater than 0 and less than 1000)"
      );
    } else if (func_validateNumbersInForms(0, 1000, this.state.OilseedsSale)) {
      this.func_ShowAlert(
        "Total Quantity (in Kg) - Sale (Must be greater than 0 and less than 1000)"
      );
    } else if (
      func_validateNumbersInForms(0, 1000, this.state.AverageSalePriceOilseeds)
    ) {
      this.func_ShowAlert(
        "Average Sale Price (Rs / Kg) (Must be greater than 0 and less than 1000)"
      );
    } else if (
      func_validateNumbersInForms(
        0,
        50,
        this.state.total_area_cultivated_legumes
      )
    ) {
      this.func_ShowAlert(
        "Total Area Cultivated (Acre) - Legumes (Must be greater than 0 and less than 50)"
      );
    } else if (
      func_validateNumbersInForms(
        0,
        50,
        this.state.TARINA_supported_area_legumes
      )
    ) {
      this.func_ShowAlert(
        "TARINA Supported Area Cultivated (Acre) - Legumes (Must be greater than 0 and less than 50)"
      );
    } else if (
      func_validateNumbersInForms(0, 2000, this.state.SeedQuantityLegumes)
    ) {
      this.func_ShowAlert(
        "Seed Quantity Received (in gm) - Legumes (Must be greater than 0 and less than 2000)"
      );
    } else if (
      func_validateNumbersInForms(
        0,
        1000,
        this.state.SeedlingsQuantityReceivedLegumes
      )
    ) {
      this.func_ShowAlert(
        "Seedling Quantity Received (in No.) - Legumes (Must be greater than 0 and less than 1000)"
      );
    } else if (
      func_validateNumbersInForms(
        0,
        1000,
        this.state.SeedlingsfromOutsideQuantityLegumes
      )
    ) {
      this.func_ShowAlert(
        "Seedling Quantity Received (in No.) - Legumes (Must be greater than 0 and less than 1000)"
      );
    } else if (
      func_validateNumbersInForms(0, 1000, this.state.LegumesProduction)
    ) {
      this.func_ShowAlert(
        "Total Quantity (in Kg.) - Production (Must be greater than 0 and less than 1000)"
      );
    } else if (
      func_validateNumbersInForms(0, 1000, this.state.LegumesConsumption)
    ) {
      this.func_ShowAlert(
        "Total Quantity (in Kg) - Consumption (Must be greater than 0 and less than 1000)"
      );
    } else if (func_validateNumbersInForms(0, 1000, this.state.LegumesSeed)) {
      this.func_ShowAlert(
        "Total Quantity (in Kg) - Seed (Must be greater than 0 and less than 1000)"
      );
    } else if (func_validateNumbersInForms(0, 1000, this.state.LegumesSale)) {
      this.func_ShowAlert(
        "Total Quantity (in Kg) - Sale (Must be greater than 0 and less than 1000)"
      );
    } else if (
      func_validateNumbersInForms(0, 1000, this.state.AverageSalePriceLegumes)
    ) {
      this.func_ShowAlert(
        "Average Sale Price (Rs / Kg) (Must be greater than 0 and less than 1000)"
      );
    } else if (
      func_validateNumbersInForms(
        0,
        1000,
        this.state.total_area_cultivated_mixed
      )
    ) {
      this.func_ShowAlert(
        "Season Area Cultivated (Acre) - Mixed Crop (Must be greater than 0 and less than 50)"
      );
    } else if (
      func_validateNumbersInForms(
        0,
        1000,
        this.state.TARINA_supported_area_mixed
      )
    ) {
      this.func_ShowAlert(
        "TARINA Supported Area Cultivated (Acre) - Mixed Crop (Must be greater than 0 and less than 50)"
      );
    } else if (
      func_validateNumbersInForms(0, 1000, this.state.seed_mixed_crop_form)
    ) {
      this.func_ShowAlert(
        "Seed Quantity Received (in gm) - Mixed Crop (Must be greater than 0 and less than 2000)"
      );
    } else if (
      func_validateNumbersInForms(
        0,
        1000,
        this.state.Seedlings_from_Cluster_Form
      )
    ) {
      this.func_ShowAlert(
        "Seedling Quantity Received (in No.) - Mixed Crop (Must be greater than 0 and less than 1000)"
      );
    } else if (
      func_validateNumbersInForms(
        0,
        1000,
        this.state.Seedlings_from_Outside_Form
      )
    ) {
      this.func_ShowAlert(
        "Seedling Quantity Received (in No.) - Mixed Crop (Must be greater than 0 and less than 1000)"
      );
    } else if (
      func_validateNumbersInForms(0, 1000, this.state.seeding_subform1)
    ) {
      this.func_ShowAlert(
        "Total Quantity (in Kg.) - Production (Must be greater than 0 and less than 1000)"
      );
    } else if (
      func_validateNumbersInForms(0, 1000, this.state.seeding_subform2)
    ) {
      this.func_ShowAlert(
        "Total Quantity (in Kg) - Consumption (Must be greater than 0 and less than 1000)"
      );
    } else if (
      func_validateNumbersInForms(0, 1000, this.state.seeding_subform3)
    ) {
      this.func_ShowAlert(
        "Total Quantity (in Kg) - Seed (Must be greater than 0 and less than 1000)"
      );
    } else if (
      func_validateNumbersInForms(0, 1000, this.state.seeding_subform4)
    ) {
      this.func_ShowAlert(
        "Total Quantity (in Kg) - Sale (Must be greater than 0 and less than 1000)"
      );
    } else if (
      func_validateNumbersInForms(0, 1000, this.state.seeding_subform5)
    ) {
      this.func_ShowAlert(
        "Average Sale Price (Rs / Kg) (Must be greater than 0 and less than 1000)"
      );
    } else if (func_validateNumbersInForms(0, 1000, this.state.bioform)) {
      this.func_ShowAlert(
        "Bio-Fertilizer Quantity Received (gm) Must be greater than 0 and less than 1000"
      );
    } else if (
      func_validateNumbersInForms(0, 100, this.state.FertilizerCheckedform)
    ) {
      this.func_ShowAlert(
        "Fertilizer Quantity Received (Kg) Must be greater than 0 and less than 100"
      );
    } else if (func_validateNumbersInForms(0, 1000, this.state.Pesticideform)) {
      this.func_ShowAlert(
        "Plant Protection Chemicals / Pesticide Quantity Received (gm/ml) Must be greater than 0 and less than 1000"
      );
    } else if (func_validateNumbersInForms(0, 1000, this.state.Herbicideform)) {
      this.func_ShowAlert(
        "Herbicide Quantity Received (ml) Must be greater than 0 and less than 1000"
      );
    } else if (func_validateNumbersInForms(0, 100, this.state.Extensionform)) {
      this.func_ShowAlert(
        "Extension Support (in No.) Must be greater than 0 and less than 100"
      );
    } else if (func_validateNumbersInForms(0, 100, this.state.Machineryform)) {
      this.func_ShowAlert(
        "Machinery Support (in No.) Must be greater than 0 and less than 100"
      );
    } else if (func_validateNumbersInForms(0, 100, this.state.Fencingform)) {
      this.func_ShowAlert(
        "Fencing Support (in No.) Must be greater than 0 and less than 100"
      );
    } else {
      let forSaveData = {
        logged_date: this.state.date,
        hh_id: this.props.house_hold.id,
        farmer_type_div_inf: this.state.formtype1,
        farmer_type_dem_con: this.state.formtype2,
        farmer_status: this.state.formtype3,
        pulses_info_present: this.state.pulses,
        pulses_crop_name:
          this.state.pulses_crop_name == "Pulses Crop Name"
            ? ""
            : this.state.pulses_crop_name,
        pulses_seed_variety: this.state.pulses_seed_variety,
        pulses_total_area_cultivated: this.state.total_area_cultivated,
        pulses_tarina_supported_area_cultivated: this.state
          .TARINA_supported_area,
        pulses_seed_present: this.state.seedPulses,
        pulses_seed_quantity_received: this.state.seedPulses_quantity,
        pulses_seeding_cluster_nursery_present: this.state.SeedlingsfromCluster,
        pulses_seeding_cluster_nursery_quantity_received: this.state
          .SeedlingsfromClusterQuantity,
        pulses_seeding_outside_nursery_present: this.state
          .SeedlingsfromOutside1,
        pulses_seeding_outside_nursery_quantity_received: this.state
          .SeedlingsfromOutsideQuantity,
        rabi_or_kharif: this.state.pulses_rabi_kharif,
        pulses_total_quantity_production: this.state.pulses_Production,
        pulses_total_quantity_consumption: this.state.pulses_Consumption,
        pulses_total_quantity_seed: this.state.pulses_seed,
        pulses_total_quantity_sale: this.state.pulses_Sale,
        pulses_avg_sale_price: this.state.pulses_Average,
        vegetables_info_present: this.state.vegetables,
        vegetables_crop_name:
          this.state.vegetables_crop_name === "Vegetables Crop Name"
            ? ""
            : this.state.vegetables_crop_name,
        vegetables_seed_variety: this.state.vegetables_seed_variety,
        vegetables_total_area_cultivated: this.state
          .total_area_cultivated_vegetables,
        vegetables_tarina_supported_area_cultivated: this.state
          .TARINA_supported_area_vegetables,
        vegetables_seed_present: this.state.SeedVegetables,
        vegetables_seed_quantity_received: this.state.SeedQuantityVegetables,
        vegetables_seeding_cluster_nursery_present: this.state
          .SeedlingsfromNursery,
        vegetables_seeding_cluster_nursery_quantity_received: this.state
          .SeedlingsQuantityReceivedVegetables,
        vegetables_seeding_outside_nursery_present: this.state
          .SeedlingsfromOutside,
        vegetables_seeding_outside_nursery_quantity_received: this.state
          .SeedlingsfromOutsideQuantityVegetables,
        vegetables_total_quantity_production: this.state.VegetablesProduction,
        vegetables_total_quantity_consumption: this.state.VegetablesConsumption,
        vegetables_total_quantity_seed: this.state.VegetablesSeed,
        vegetables_total_quantity_sale: this.state.VegetablesSale,
        vegetables_avg_sale_price: this.state.AverageSalePrice,
        cereals_info_present: this.state.cereals,
        cereals_crop_name:
          this.state.cereals_crop_name === "Cereals Crop Name"
            ? ""
            : this.state.cereals_crop_name,
        cereals_seed_variety: this.state.cereals_seed_variety,
        cereals_total_area_cultivated: this.state.total_area_cultivated_cereals,
        cereals_tarina_supported_area_cultivated: this.state
          .TARINA_supported_area_cereals,
        cereals_seed_present: this.state.SeedCereals,
        cereals_seed_quantity_received: this.state.SeedQuantityCereals,
        cereals_seeding_cluster_nursery_present: this.state
          .SeedlingsfromNurseryCereals,
        cereals_seeding_cluster_nursery_quantity_received: this.state
          .SeedlingsQuantityReceivedCereals,
        cereals_seeding_outside_nursery_present: this.state
          .SeedlingsfromOutsideCereals,
        cereals_seeding_outside_nursery_quantity_received: this.state
          .SeedlingsfromOutsideQuantityCereals,
        cereals_total_quantity_production: this.state.CerealsProduction,
        cereals_total_quantity_consumption: this.state.CerealsConsumption,
        cereals_total_quantity_seed: this.state.CerealsSeed,
        cereals_total_quantity_sale: this.state.CerealsSale,
        cereals_avg_sale_price: this.state.AverageSalePriceCereals,
        oilseeds_info_present: this.state.oilseeds,
        oilseeds_crop_name:
          this.state.oilseeds_crop_name === "Oilseeds Crop Name"
            ? ""
            : this.state.oilseeds_crop_name,
        oilseeds_seed_variety: this.state.oilseeds_seed_variety,
        oilseeds_total_area_cultivated: this.state
          .total_area_cultivated_oilseeds,
        oilseeds_tarina_supported_area_cultivated: this.state
          .TARINA_supported_area_oilseeds,
        oilseeds_seed_present: this.state.SeedOilseeds,
        oilseeds_seed_quantity_received: this.state.SeedQuantityOilseeds,
        oilseeds_seeding_cluster_nursery_present: this.state
          .SeedlingsfromNurseryOilseeds,
        oilseeds_seeding_cluster_nursery_quantity_received: this.state
          .SeedlingsQuantityReceivedOilseeds,
        oilseeds_seeding_outside_nursery_present: this.state
          .SeedlingsfromOutsideOilseeds,
        oilseeds_seeding_outside_nursery_quantity_received: this.state
          .SeedlingsfromOutsideQuantityOilseeds,
        oilseeds_total_quantity_production: this.state.OilseedsProduction,
        oilseeds_total_quantity_consumption: this.state.OilseedsConsumption,
        oilseeds_total_quantity_seed: this.state.OilseedsSeed,
        oilseeds_total_quantity_sale: this.state.OilseedsSale,
        oilseeds_avg_sale_price: this.state.AverageSalePriceOilseeds,
        legumes_info_present: this.state.legumes,
        legumes_crop_name:
          this.state.legumes_crop_name == "Legumes Crop Name"
            ? ""
            : this.state.legumes_crop_name,
        legumes_seed_variety: this.state.legumes_seed_variety,
        legumes_total_area_cultivated: this.state.total_area_cultivated_legumes,
        legumes_tarina_supported_area_cultivated: this.state
          .TARINA_supported_area_legumes,
        legumes_seed_present: this.state.SeedLegumes,
        legumes_seed_quantity_received: this.state.SeedQuantityLegumes,
        legumes_seeding_cluster_nursery_present: this.state
          .SeedlingsfromNurseryLegumes,
        legumes_seeding_cluster_nursery_quantity_received: this.state
          .SeedlingsQuantityReceivedLegumes,
        legumes_seeding_outside_nursery_present: this.state
          .SeedlingsfromOutsideLegumes,
        legumes_seeding_outside_nursery_quantity_received: this.state
          .SeedlingsfromOutsideQuantityLegumes,
        legumes_total_quantity_production: this.state.LegumesProduction,
        legumes_total_quantity_consumption: this.state.LegumesConsumption,
        legumes_total_quantity_seed: this.state.LegumesSeed,
        legumes_total_quantity_sale: this.state.LegumesSale,
        legumes_avg_sale_price: this.state.AverageSalePriceLegumes,
        mixed_crop_info_present: this.state.mixed,
        mixed_crop_crop_name: this.state.mixed_crop_name,
        mixed_crop_seed_variety: this.state.mixed_seed_variety,
        mixed_crop_total_area_cultivated: this.state
          .total_area_cultivated_mixed,
        mixed_crop_tarina_supported_area_cultivated: this.state
          .TARINA_supported_area_mixed,
        mixed_crop_seed_present: this.state.seed_mixed,
        mixed_crop_seed_quantity_received: this.state.seed_mixed_crop_form,
        mixed_crop_seeding_cluster_nursery_present: this.state
          .Seedlings_from_Cluster,
        mixed_crop_seeding_cluster_nursery_quantity_received: this.state
          .Seedlings_from_Cluster_Form,
        mixed_crop_seeding_outside_nursery_present: this.state
          .Seedlings_from_Outside,
        mixed_crop_seeding_outside_nursery_quantity_received: this.state
          .Seedlings_from_Outside_Form,

        mixed_crop_total_quantity_production: this.state.seeding_subform1,
        mixed_crop_total_quantity_consumption: this.state.seeding_subform2,
        mixed_crop_total_quantity_seed: this.state.seeding_subform3,
        mixed_crop_total_quantity_sale: this.state.seeding_subform4,
        mixed_crop_avg_sale_price: this.state.seeding_subform5,

        support_info_present: this.state.support,
        support_training: this.state.Training,
        bio_fertilizer_present: this.state.Bio,
        bio_fertilizer_name: this.state.bioformname,
        bio_fertilizer_quantity_received: this.state.bioform,
        fertilizer_present: this.state.Fertilizer,
        fertilizer_name: this.state.FertilizerCheckedformName,
        fertilizer_quantity_received: this.state.FertilizerCheckedform,

        plant_protc_chem_pesticide_present: this.state.Pesticide,
        plant_protc_chem_pesticide_name: this.state.PesticideName,
        plant_protc_chem_pesticide_quantity_received: this.state.Pesticideform,
        herbicide_present: this.state.Herbicide,
        herbicide_name: this.state.HerbicideformName,
        herbicide_quantity_received: this.state.Herbicideform,
        extension_support_present: this.state.Extension,
        extension_support_quantity: this.state.Extensionform,
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
        op: "add_cd_data"
      };
      debugger;
      let isConnection = this.props.is_connection;
      await this.props.onSaveData(forSaveData, isConnection);
      this.setState({
        radioBtnsData: ["Item1", "Item2", "Item3"],
        checked: "radio1",
        formtype1: "",
        formtype2: "",
        formtype3: "",
        pulsesChecked: "PulsesNo",
        pulses: "NO",
        vegetables: "NO",
        vegetablesChecked: "VegetablesNo",

        cereals: "NO",
        cerealsChecked: "CerealsNo",
        oilseeds: "NO",
        oilseedsChecked: "OilseedsNo",
        legumes: "NO",
        legumesChecked: "LegumesNo",
        mixed: "NO",
        mixedChecked: "MixedNo",
        support: "NO",
        supportChecked: "SupportNo",
        type: "NO",
        typeChecked: "",

        date: "",
        pulses_crop_name: "",
        pulses_seed_variety: "",
        total_area_cultivated: "",
        TARINA_supported_area: "",

        seedPulsesChecked: "PulsesNo000",
        seedPulses: "NO",
        seedPulses_quantity: "",
        SeedlingsfromClusterChecked: "PulsesNo0",
        SeedlingsfromCluster: "NO",
        SeedlingsfromClusterQuantity: "",
        SeedlingsfromOutsideChecked: "PulsesNo",
        SeedlingsfromOutsideCheckedPul: "PulsesNo222",

        SeedlingsfromOutside1: "NO",
        SeedlingsfromOutsideQuantity: "",
        pulses_rabi_kharif: "",
        pulses_Production: "",
        pulses_Consumption: "",
        pulses_seed: "",
        pulses_Sale: "",
        pulses_Average: "",
        SeedVegetablesChecked: "PulsesNo",
        SeedVegetables: "NO",
        SeedQuantityVegetables: "",
        SeedlingsfromNurseryChecked: "PulsesNo",
        SeedlingsfromNursery: "NO",
        SeedlingsQuantityReceivedVegetables: "",
        SeedlingsfromOutside: "NO",
        SeedlingsfromOutsideQuantityVegetables: "",
        VegetablesProduction: "",
        VegetablesConsumption: "",
        VegetablesSeed: "",
        VegetablesSale: "",
        AverageSalePrice: "",
        CerealsProduction: "",
        CerealsConsumption: "",
        CerealsSeed: "",
        AverageSalePriceCereals: "",
        CerealsSale: "",
        SeedlingsfromOutsideCheckedCereals: "PulsesNo",
        SeedlingsfromOutsideCereals: "NO",
        SeedlingsfromOutsideQuantityCereals: "",
        SeedlingsfromNurseryCerealsChecked: "PulsesNo",
        SeedlingsfromNurseryCereals: "NO",
        SeedlingsQuantityReceivedCereals: "",
        SeedCerealsChecked: "PulsesNo",
        SeedCereals: "NO",
        SeedQuantityCereals: "",
        SeedOilseedsChecked: "PulsesNo",
        SeedOilseeds: "NO",
        SeedQuantityOilseeds: "",
        SeedlingsfromNurseryOilseedsChecked: "PulsesNo",
        SeedlingsfromNurseryOilseeds: "NO",
        SeedlingsQuantityReceivedOilseeds: "",
        SeedlingsfromOutsideCheckedOilseeds: "PulsesNo",
        SeedlingsfromOutsideOilseeds: "NO",
        SeedlingsfromOutsideQuantityOilseeds: "",
        OilseedsProduction: "",
        OilseedsConsumption: "",
        OilseedsSeed: "",
        OilseedsSale: "",
        AverageSalePriceOilseeds: "",

        SeedLegumesChecked: "PulsesNo",
        SeedLegumes: "NO",
        SeedQuantityLegumes: "",
        SeedlingsfromNurseryLegumesChecked: "PulsesNo",
        SeedlingsfromNurseryLegumes: "NO",
        SeedlingsQuantityReceivedLegumes: "",
        SeedlingsfromOutsideCheckedLegumes: "PulsesNo",
        SeedlingsfromOutsideLegumes: "NO",
        SeedlingsfromOutsideQuantityLegumes: "",
        LegumesProduction: "",
        LegumesConsumption: "",
        LegumesSeed: "",
        LegumesSale: "",
        AverageSalePriceLegumes: "",

        vegetables_crop_name: "",
        vegetables_seed_variety: "",
        total_area_cultivated_vegetables: "",
        TARINA_supported_area_vegetables: "",

        cereals_crop_name: "",
        cereals_seed_variety: "",
        total_area_cultivated_cereals: "",
        TARINA_supported_area_cereals: "",

        oilseeds_crop_name: "",
        oilseeds_seed_variety: "",
        total_area_cultivated_oilseeds: "",
        TARINA_supported_area_oilseeds: "",

        legumes_crop_name: "",
        legumes_seed_variety: "",
        total_area_cultivated_legumes: "",
        TARINA_supported_area_legumes: "",

        mixed_crop_name: "",
        mixed_seed_variety: "",
        total_area_cultivated_mixed: "",
        TARINA_supported_area_mixed: "",
        seed_mixed_crop: "SeedMixedCropNo",
        seed_mixed: "NO",
        seed_mixed_crop_form: "",

        Seedlings_from_Cluster_Form: "",
        Seedlings_from_Cluster_Nursery: "SeedlingsfromClusterNurseryNo",
        Seedlings_from_Cluster: "No",

        Seedlings_from_Outside_Form: "",
        Seedlings_from_Outside_Nursery: "SeedlingsfromOutsideNurseryNo",
        Seedlings_from_Outside: "No",
        subform1: "",
        subform2: "",
        subform3: "",
        subform4: "",
        subform5: "",

        TrainingChecked: "TrainingNo",
        Training: "NO",

        bioformname: "",
        bioform: "",
        Bio_Fertilizer: "BioNo",
        Bio: "NO",

        FertilizerCheckedformName: "",
        FertilizerCheckedform: "",
        FertilizerChecked: "OnlyFertilizerNo",
        Fertilizer: "NO",

        PesticideName: "",
        Pesticideform: "",
        PesticideChecked: "PesticideNo",
        Pesticide: "NO",

        HerbicideformName: "",
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
        AgencyLinkForm: "",

        seeding_subform1: "",
        seeding_subform2: "",
        seeding_subform3: "",
        seeding_subform4: "",
        seeding_subform5: "",
        Extensionform: ""
      });
      this.props.clearHouseholdField();
    }
  }
  render() {
    return (
      <ScrollView
        keyboardShouldPersistTaps={"always"}
        style={{ backgroundColor: "#fff" }} //STATUS_BAR_COLOR
      >
        {/* <MagicMove.Scene> */}

        <View
          style={{
            flex: 1,
            flexDirection: "column",
            backgroundColor: "#fff", //STATUS_BAR_COLOR
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
                  label="Diversfield (New)"
                  value="Diversfield (New)"
                />
                <Picker.Item
                  style={{ fontFamily: FONT_FAMILY }}
                  label="Diversfield (Continued)"
                  value="Diversfield (Continued)"
                />
                <Picker.Item label="Influenced (New)" value="Influenced (New)" />
                <Picker.Item
                  label="Influenced (Continued)"
                  value="Influenced (Continued)"
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
                enabled = {this.state.formtype1 == "Influenced (New)" || this.state.formtype1 == "Influenced (Continued)" ? false : true}
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
                Pulses - Do you wish to enter Pulses Information
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
                    this.setState({ pulsesChecked: "PulsesYes", pulses: "YES" })
                  }
                >
                  <View
                    style={
                      this.state.pulsesChecked === "PulsesYes"
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
                    this.setState({ pulsesChecked: "PulsesNo", pulses: "NO" })
                  }
                >
                  <View
                    style={
                      this.state.pulsesChecked === "PulsesNo"
                        ? styles.activeRadion
                        : styles.inActiveRadion
                    }
                  />

                  <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>
                    NO
                  </Text>
                </TouchableOpacity>
              </View>
              {this.state.pulses == "YES" ? (
                <View style={{ width: "100%" }}>
                  <Text
                    style={{
                      fontFamily: FONT_FAMILY,
                      fontWeight: "bold",
                      fontSize: 15,
                      marginTop: 10
                    }}
                  >
                    Pulses Information Entry
                  </Text>
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
                      selectedValue={this.state.pulses_crop_name}
                      // style={{ alignItems: "center", justifyContent: "center" }}
                      onValueChange={(itemValue, itemIndex) =>
                        // alert(itemValue)
                        this.setState({ pulses_crop_name: itemValue })
                      }
                    >
                      <Picker.Item
                        label="Pulses Crop Name"
                        value="Pulses Crop Name"
                      />
                      <Picker.Item label="Black Gram" value="Black Gram" />
                      <Picker.Item label="Chick Pea" value="Chick Pea" />
                      <Picker.Item label="Green Gram" value="Green Gram" />
                      <Picker.Item label="Lentil" value="Lentil" />
                      <Picker.Item label="Pea" value="Pea" />
                      <Picker.Item
                        label="Pigeon Pea|Red Gram|Tur"
                        value="Pigeon Pea|Red Gram|Tur"
                      />
                      <Picker.Item label="Wheat" value="Wheat" />
                    </Picker>
                  </View>

                  <TextInput
                    value={this.state.pulses_seed_variety}
                    onChangeText={name =>
                      this.setState({ pulses_seed_variety: name })
                    }
                    placeholder={"Pulses Seed Variety"}
                    secureTextEntry={false}
                    style={styles.input}
                  />
                  <TextInput
                    value={this.state.total_area_cultivated}
                    onChangeText={name =>
                      this.setState({ total_area_cultivated: name })
                    }
                    placeholder={
                      "Total Area Cultivated (Acre) - Pulses (Must be greater than 0 and less than 50)"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType="number-pad"
                  />
                  <TextInput
                    value={this.state.TARINA_supported_area}
                    onChangeText={name =>
                      this.setState({ TARINA_supported_area: name })
                    }
                    placeholder={
                      "TARINA Supported Area Cultivated (Acre) - Pulses (Must be greater than 0 and less than 50)"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType="number-pad"
                  />
                  <View style={styles.radioBtnStyle}>
                    <Text style={{ fontFamily: FONT_FAMILY }}>
                      Seed - Pulses
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
                            seedPulsesChecked: "PulsesYes000",
                            seedPulses: "YES"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.seedPulsesChecked === "PulsesYes000"
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
                            seedPulsesChecked: "PulsesNo000",
                            seedPulses: "NO"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.seedPulsesChecked === "PulsesNo000"
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
                    {this.state.seedPulses == "YES" ? (
                      <View style={{ width: "100%" }}>
                        <TextInput
                          value={this.state.seedPulses_quantity}
                          onChangeText={name =>
                            this.setState({ seedPulses_quantity: name })
                          }
                          placeholder={
                            "Seed Quantity Received (in Kg) - Pulses (Must be greater than 0 and less than 100)"
                          }
                          secureTextEntry={false}
                          style={styles.input}
                          keyboardType="number-pad"
                        />
                      </View>
                    ) : null}
                  </View>

                  <View style={styles.radioBtnStyle}>
                    <Text style={{ fontFamily: FONT_FAMILY }}>
                      Seedlings from Cluster Nursery - Pulses
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
                            SeedlingsfromClusterChecked: "PulsesYes111",
                            SeedlingsfromCluster: "YES"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.SeedlingsfromClusterChecked ===
                            "PulsesYes111"
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
                            SeedlingsfromClusterChecked: "PulsesNo0",
                            SeedlingsfromCluster: "NO"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.SeedlingsfromClusterChecked ===
                            "PulsesNo0"
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
                    {this.state.SeedlingsfromCluster == "YES" ? (
                      <View style={{ width: "100%" }}>
                        <TextInput
                          value={this.state.SeedlingsfromClusterQuantity}
                          onChangeText={name =>
                            this.setState({
                              SeedlingsfromClusterQuantity: name
                            })
                          }
                          placeholder={
                            "Seedling Quantity Received (in No.) - Pulses (Must be greater than 0 and less than 1000)"
                          }
                          secureTextEntry={false}
                          style={styles.input}
                          keyboardType="number-pad"
                        />
                      </View>
                    ) : null}
                  </View>
                  <View style={styles.radioBtnStyle}>
                    <Text style={{ fontFamily: FONT_FAMILY }}>
                      Seedlings from Outside Nursery - Pulses
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
                            SeedlingsfromOutsideCheckedPul: "PulsesYes222",
                            SeedlingsfromOutside1: "YES"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.SeedlingsfromOutsideCheckedPul ===
                            "PulsesYes222"
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
                            SeedlingsfromOutsideCheckedPul: "PulsesNo222",
                            SeedlingsfromOutside1: "NO"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.SeedlingsfromOutsideCheckedPul ===
                            "PulsesNo222"
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
                    {this.state.SeedlingsfromOutside1 == "YES" ? (
                      <View style={{ width: "100%" }}>
                        <TextInput
                          value={this.state.SeedlingsfromOutsideQuantity}
                          onChangeText={name =>
                            this.setState({
                              SeedlingsfromOutsideQuantity: name
                            })
                          }
                          placeholder={
                            "Seedling Quantity Received (in No.) - Pulses (Must be greater than 0 and less than 1000)"
                          }
                          secureTextEntry={false}
                          style={styles.input}
                          keyboardType="number-pad"
                        />
                      </View>
                    ) : null}
                  </View>
                  <View style={{ width: "100%" }}>
                    <TextInput
                      value={this.state.pulses_rabi_kharif}
                      onChangeText={name =>
                        this.setState({
                          pulses_rabi_kharif: name
                        })
                      }
                      placeholder={"Rabi / Kharif"}
                      secureTextEntry={false}
                      style={styles.input}
                    />
                    <TextInput
                      value={this.state.pulses_Production}
                      onChangeText={name =>
                        this.setState({
                          pulses_Production: name
                        })
                      }
                      placeholder={
                        "Total Quantity (in Kg.) - Production (Must be greater than 0 and less than 1000)"
                      }
                      secureTextEntry={false}
                      style={styles.input}
                      keyboardType="number-pad"
                    />
                    <TextInput
                      value={this.state.pulses_Consumption}
                      onChangeText={name =>
                        this.setState({
                          pulses_Consumption: name
                        })
                      }
                      placeholder={
                        "Total Quantity (in Kg) - Consumption (Must be greater than 0 and less than 1000)"
                      }
                      secureTextEntry={false}
                      style={styles.input}
                      keyboardType="number-pad"
                    />

                    <TextInput
                      value={this.state.pulses_seed}
                      onChangeText={name =>
                        this.setState({
                          pulses_seed: name
                        })
                      }
                      placeholder={
                        "Total Quantity (in Kg) - Seed (Must be greater than 0 and less than 1000)"
                      }
                      secureTextEntry={false}
                      style={styles.input}
                      keyboardType="number-pad"
                    />

                    <TextInput
                      value={this.state.pulses_Sale}
                      onChangeText={name =>
                        this.setState({
                          pulses_Sale: name
                        })
                      }
                      placeholder={
                        "Total Quantity (in Kg) - Sale (Must be greater than 0 and less than 1000)"
                      }
                      secureTextEntry={false}
                      style={styles.input}
                      keyboardType="number-pad"
                    />

                    <TextInput
                      value={this.state.pulses_Average}
                      onChangeText={name =>
                        this.setState({
                          pulses_Average: name
                        })
                      }
                      placeholder={
                        "Average Sale Price (Rs / Kg) (Must be greater than 0 and less than 1000)"
                      }
                      secureTextEntry={false}
                      style={styles.input}
                      keyboardType="number-pad"
                    />
                  </View>
                </View>
              ) : null}
            </View>

            <View style={styles.radioBtnStyle}>
              <Text style={{ fontFamily: FONT_FAMILY }}>
                Vegetables - Do you wish to enter Vegetables Information
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
                      vegetablesChecked: "VegetablesYes",
                      vegetables: "YES"
                    })
                  }
                >
                  <View
                    style={
                      this.state.vegetablesChecked === "VegetablesYes"
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
                      vegetablesChecked: "VegetablesNo",
                      vegetables: "NO"
                    })
                  }
                >
                  <View
                    style={
                      this.state.vegetablesChecked === "VegetablesNo"
                        ? styles.activeRadion
                        : styles.inActiveRadion
                    }
                  />

                  <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>
                    NO
                  </Text>
                </TouchableOpacity>
              </View>
              {this.state.vegetables == "YES" ? (
                <View style={{ width: "100%" }}>
                  <Text
                    style={{
                      fontFamily: FONT_FAMILY,
                      fontWeight: "bold",
                      fontSize: 15,
                      marginTop: 10
                    }}
                  >
                    Vegetables Information Entry
                  </Text>
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
                      selectedValue={this.state.vegetables_crop_name}
                      style={{ fontFamily: FONT_FAMILY }}
                      onValueChange={(itemValue, itemIndex) =>
                        // alert(itemValue)
                        this.setState({ vegetables_crop_name: itemValue })
                      }
                    >
                      {/* value={this.state.formtype} /> */}
                      <Picker.Item
                        itemStyle={{ fontFamily: FONT_FAMILY }}
                        label="Vegetables Crop Name"
                        value="Vegetables Crop Name"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Amaranthus"
                        value="Amaranthus"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Bael"
                        value="Bael"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Banana"
                        value="Banana"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Beans"
                        value="Beans"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Beetroot"
                        value="Beetroot"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Ber"
                        value="Ber"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Bitter Gourd"
                        value="Bitter Gourd"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Bottle Gourd"
                        value="Bottle Gourd"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Brinjal"
                        value="Brinjal"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Carrot"
                        value="Carrot"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Cauliflower"
                        value="Cauliflower"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Cluster Bean"
                        value="Cluster Bean"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Coriander"
                        value="Coriander"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Cucumber"
                        value="Cucumber"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Curry Leaf"
                        value="Curry Leaf"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Custard"
                        value="Custard"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Drumstick"
                        value="Drumstick"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Fenugreek"
                        value="Fenugreek"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Green Chilli"
                        value="Green Chilli"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Guava"
                        value="Guava"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Jackfruit"
                        value="Jackfruit"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Lady Finger"
                        value="Lady Finger"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Lemon"
                        value="Lemon"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Lobiya"
                        value="Lobiya"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Mango"
                        value="Mango"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Onion"
                        value="Onion"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Orange Flesh Sweet Potato"
                        value="Orange Flesh Sweet Potato"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Papaya"
                        value="Papaya"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Pumpkin"
                        value="Pumpkin"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Radish"
                        value="Radish"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Ridge Gourd"
                        value="Ridge Gourd"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Spinach"
                        value="Spinach"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Sponge Gourd"
                        value="Sponge Gourd"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Tomato"
                        value="Tomato"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Turmeric"
                        value="Turmeric"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Yam|Elephant Foot"
                        value="Yam|Elephant Foot"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Gooseberry"
                        value="Gooseberry"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Potato"
                        value="Potato"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Cabbage"
                        value="Cabbage"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Pulses"
                        value="Pulses"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Vegetables"
                        value="Vegetables"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Fruits & Vegetables"
                        value="Fruits & Vegetables"
                      />
                    </Picker>
                  </View>

                  <TextInput
                    value={this.state.vegetables_seed_variety}
                    onChangeText={name =>
                      this.setState({ vegetables_seed_variety: name })
                    }
                    placeholder={"Vegetables Seed Variety"}
                    secureTextEntry={false}
                    style={styles.input}
                  />
                  <TextInput
                    value={this.state.total_area_cultivated_vegetables}
                    onChangeText={name =>
                      this.setState({ total_area_cultivated_vegetables: name })
                    }
                    placeholder={
                      "Total Area Cultivated (Acre) - Vegetables (Must be greater than 0 and less than 50)"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType="number-pad"
                  />
                  <TextInput
                    value={this.state.TARINA_supported_area_vegetables}
                    onChangeText={name =>
                      this.setState({ TARINA_supported_area_vegetables: name })
                    }
                    placeholder={
                      "TARINA Supported Area Cultivated (Acre) - Vegetables (Must be greater than 0 and less than 50)"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType="number-pad"
                  />
                  <View style={styles.radioBtnStyle}>
                    <Text style={{ fontFamily: FONT_FAMILY }}>
                      Seed - Vegetables
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
                            SeedVegetablesChecked: "PulsesYes",
                            SeedVegetables: "YES"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.SeedVegetablesChecked === "PulsesYes"
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
                            SeedVegetablesChecked: "PulsesNo",
                            SeedVegetables: "NO"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.SeedVegetablesChecked === "PulsesNo"
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
                    {this.state.SeedVegetables == "YES" ? (
                      <View style={{ width: "100%" }}>
                        <TextInput
                          value={this.state.SeedQuantityVegetables}
                          onChangeText={name =>
                            this.setState({ SeedQuantityVegetables: name })
                          }
                          placeholder={
                            "Seed Quantity Received (in gm) - Vegetables (Must be greater than 0 and less than 2000)"
                          }
                          secureTextEntry={false}
                          style={styles.input}
                          keyboardType="number-pad"
                        />
                      </View>
                    ) : null}
                  </View>
                  <View style={styles.radioBtnStyle}>
                    <Text style={{ fontFamily: FONT_FAMILY }}>
                      Seedlings from Cluster Nursery - Vegetables
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
                            SeedlingsfromNurseryChecked: "PulsesYes",
                            SeedlingsfromNursery: "YES"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.SeedlingsfromNurseryChecked ===
                            "PulsesYes"
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
                            SeedlingsfromNurseryChecked: "PulsesNo",
                            SeedlingsfromNursery: "NO"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.SeedlingsfromNurseryChecked ===
                            "PulsesNo"
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
                    {this.state.SeedlingsfromNursery == "YES" ? (
                      <View style={{ width: "100%" }}>
                        <TextInput
                          value={this.state.SeedlingsQuantityReceivedVegetables}
                          onChangeText={name =>
                            this.setState({
                              SeedlingsQuantityReceivedVegetables: name
                            })
                          }
                          placeholder={
                            "Seedling Quantity Received (in No.) - Vegetables (Must be greater than 0 and less than 1000)"
                          }
                          secureTextEntry={false}
                          style={styles.input}
                          keyboardType="number-pad"
                        />
                      </View>
                    ) : null}
                  </View>
                  <View style={styles.radioBtnStyle}>
                    <Text style={{ fontFamily: FONT_FAMILY }}>
                      Seedlings from Outside Nursery - Vegetables
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
                            SeedlingsfromOutsideChecked: "PulsesYes",
                            SeedlingsfromOutside: "YES"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.SeedlingsfromOutsideChecked ===
                            "PulsesYes"
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
                            SeedlingsfromOutsideChecked: "PulsesNo",
                            SeedlingsfromOutside: "NO"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.SeedlingsfromOutsideChecked ===
                            "PulsesNo"
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
                    {this.state.SeedlingsfromOutside == "YES" ? (
                      <View style={{ width: "100%" }}>
                        <TextInput
                          value={
                            this.state.SeedlingsfromOutsideQuantityVegetables
                          }
                          onChangeText={name =>
                            this.setState({
                              SeedlingsfromOutsideQuantityVegetables: name
                            })
                          }
                          placeholder={
                            "Seedling Quantity Received (in No.) - Vegetables (Must be greater than 0 and less than 1000)"
                          }
                          secureTextEntry={false}
                          style={styles.input}
                          keyboardType="number-pad"
                        />
                      </View>
                    ) : null}
                  </View>
                  <View style={{ width: "100%" }}>
                    <TextInput
                      value={this.state.VegetablesProduction}
                      onChangeText={name =>
                        this.setState({ VegetablesProduction: name })
                      }
                      placeholder={
                        "Total Quantity (in Kg.) - Production (Must be greater than 0 and less than 1000)"
                      }
                      secureTextEntry={false}
                      style={styles.input}
                      keyboardType="number-pad"
                    />
                    <TextInput
                      value={this.state.VegetablesConsumption}
                      onChangeText={name =>
                        this.setState({ VegetablesConsumption: name })
                      }
                      placeholder={
                        "Total Quantity (in Kg) - Consumption (Must be greater than 0 and less than 1000)"
                      }
                      secureTextEntry={false}
                      style={styles.input}
                      keyboardType="number-pad"
                    />

                    <TextInput
                      value={this.state.VegetablesSeed}
                      onChangeText={name =>
                        this.setState({ VegetablesSeed: name })
                      }
                      placeholder={
                        "Total Quantity (in Kg) - Seed (Must be greater than 0 and less than 1000)"
                      }
                      secureTextEntry={false}
                      style={styles.input}
                      keyboardType="number-pad"
                    />

                    <TextInput
                      value={this.state.VegetablesSale}
                      onChangeText={name =>
                        this.setState({ VegetablesSale: name })
                      }
                      placeholder={
                        "Total Quantity (in Kg) - Sale (Must be greater than 0 and less than 1000)"
                      }
                      secureTextEntry={false}
                      style={styles.input}
                      keyboardType="number-pad"
                    />

                    <TextInput
                      value={this.state.AverageSalePrice}
                      onChangeText={name =>
                        this.setState({ AverageSalePrice: name })
                      }
                      placeholder={
                        "Average Sale Price (Rs / Kg) (Must be greater than 0 and less than 1000)"
                      }
                      secureTextEntry={false}
                      style={styles.input}
                      keyboardType="number-pad"
                    />
                  </View>
                </View>
              ) : null}
            </View>
            <View style={styles.radioBtnStyle}>
              <Text style={{ fontFamily: FONT_FAMILY }}>
                Cereals - Do you wish to enter Cereals Information
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
                      cerealsChecked: "CerealsYes",
                      cereals: "YES"
                    })
                  }
                >
                  <View
                    style={
                      this.state.cerealsChecked === "CerealsYes"
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
                      cerealsChecked: "CerealsNo",
                      cereals: "NO"
                    })
                  }
                >
                  <View
                    style={
                      this.state.cerealsChecked === "CerealsNo"
                        ? styles.activeRadion
                        : styles.inActiveRadion
                    }
                  />

                  <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>
                    NO
                  </Text>
                </TouchableOpacity>
              </View>
              {this.state.cereals == "YES" ? (
                <View style={{ width: "100%" }}>
                  <Text
                    style={{
                      fontFamily: FONT_FAMILY,
                      fontWeight: "bold",
                      fontSize: 15,
                      marginTop: 10
                    }}
                  >
                    Cereals Information Entry
                  </Text>
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
                      selectedValue={this.state.cereals_crop_name}
                      style={{ fontFamily: FONT_FAMILY }}
                      onValueChange={(itemValue, itemIndex) =>
                        // alert(itemValue)
                        this.setState({ cereals_crop_name: itemValue })
                      }
                    >
                      {/* value={this.state.formtype} /> */}
                      <Picker.Item
                        itemStyle={{ fontFamily: FONT_FAMILY }}
                        label="Cereals Crop Name"
                        value="Cereals Crop Name"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Paddy"
                        value="Paddy"
                      />
                    </Picker>
                  </View>

                  <TextInput
                    value={this.state.cereals_seed_variety}
                    onChangeText={name =>
                      this.setState({ cereals_seed_variety: name })
                    }
                    placeholder={"Cereals Seed Variety"}
                    secureTextEntry={false}
                    style={styles.input}
                  />

                  <TextInput
                    value={this.state.total_area_cultivated_cereals}
                    onChangeText={name =>
                      this.setState({ total_area_cultivated_cereals: name })
                    }
                    placeholder={
                      "Total Area Cultivated (Acre) - Cereals (Must be greater than 0 and less than 50)"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType="number-pad"
                  />
                  <TextInput
                    value={this.state.TARINA_supported_area_cereals}
                    onChangeText={name =>
                      this.setState({ TARINA_supported_area_cereals: name })
                    }
                    placeholder={
                      "TARINA Supported Area Cultivated (Acre) - Cereals (Must be greater than 0 and less than 50)"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType="number-pad"
                  />
                  <View style={styles.radioBtnStyle}>
                    <Text style={{ fontFamily: FONT_FAMILY }}>
                      Seed - Cereals
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
                            SeedCerealsChecked: "PulsesYes",
                            SeedCereals: "YES"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.SeedCerealsChecked === "PulsesYes"
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
                            SeedCerealsChecked: "PulsesNo",
                            SeedCereals: "NO"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.SeedCerealsChecked === "PulsesNo"
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
                    {this.state.SeedCereals == "YES" ? (
                      <View style={{ width: "100%" }}>
                        <TextInput
                          value={this.state.SeedQuantityCereals}
                          onChangeText={name =>
                            this.setState({ SeedQuantityCereals: name })
                          }
                          placeholder={
                            "Seed Quantity Received (in gm) - Cereals (Must be greater than 0 and less than 2000)"
                          }
                          secureTextEntry={false}
                          style={styles.input}
                          keyboardType="number-pad"
                        />
                      </View>
                    ) : null}
                  </View>
                  <View style={styles.radioBtnStyle}>
                    <Text style={{ fontFamily: FONT_FAMILY }}>
                      Seedlings from Cluster Nursery - Cereals
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
                            SeedlingsfromNurseryCerealsChecked: "PulsesYes",
                            SeedlingsfromNurseryCereals: "YES"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.SeedlingsfromNurseryCerealsChecked ===
                            "PulsesYes"
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
                            SeedlingsfromNurseryCerealsChecked: "PulsesNo",
                            SeedlingsfromNurseryCereals: "NO"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.SeedlingsfromNurseryCerealsChecked ===
                            "PulsesNo"
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
                    {this.state.SeedlingsfromNurseryCereals == "YES" ? (
                      <View style={{ width: "100%" }}>
                        <TextInput
                          value={this.state.SeedlingsQuantityReceivedCereals}
                          onChangeText={name =>
                            this.setState({
                              SeedlingsQuantityReceivedCereals: name
                            })
                          }
                          placeholder={
                            "Seedling Quantity Received (in No.) - Cereals (Must be greater than 0 and less than 1000)"
                          }
                          secureTextEntry={false}
                          style={styles.input}
                          keyboardType="number-pad"
                        />
                      </View>
                    ) : null}
                  </View>
                  <View style={styles.radioBtnStyle}>
                    <Text style={{ fontFamily: FONT_FAMILY }}>
                      Seedlings from Outside Nursery - Cereals
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
                            SeedlingsfromOutsideCheckedCereals: "PulsesYes",
                            SeedlingsfromOutsideCereals: "YES"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.SeedlingsfromOutsideCheckedCereals ===
                            "PulsesYes"
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
                            SeedlingsfromOutsideCheckedCereals: "PulsesNo",
                            SeedlingsfromOutsideCereals: "NO"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.SeedlingsfromOutsideCheckedCereals ===
                            "PulsesNo"
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
                    {this.state.SeedlingsfromOutsideCereals == "YES" ? (
                      <View style={{ width: "100%" }}>
                        <TextInput
                          value={this.state.SeedlingsfromOutsideQuantityCereals}
                          onChangeText={name =>
                            this.setState({
                              SeedlingsfromOutsideQuantityCereals: name
                            })
                          }
                          placeholder={
                            "Seedling Quantity Received (in No.) - Vegetables (Must be greater than 0 and less than 1000)"
                          }
                          secureTextEntry={false}
                          style={styles.input}
                          keyboardType="number-pad"
                        />
                      </View>
                    ) : null}
                  </View>
                  <View style={{ width: "100%" }}>
                    <TextInput
                      value={this.state.CerealsProduction}
                      onChangeText={name =>
                        this.setState({ CerealsProduction: name })
                      }
                      placeholder={
                        "Total Quantity (in Kg.) - Production (Must be greater than 0 and less than 1000)"
                      }
                      secureTextEntry={false}
                      style={styles.input}
                      keyboardType="number-pad"
                    />

                    <TextInput
                      value={this.state.CerealsConsumption}
                      onChangeText={name =>
                        this.setState({ CerealsConsumption: name })
                      }
                      placeholder={
                        "Total Quantity (in Kg) - Consumption (Must be greater than 0 and less than 1000)"
                      }
                      secureTextEntry={false}
                      style={styles.input}
                      keyboardType="number-pad"
                    />

                    <TextInput
                      value={this.state.CerealsSeed}
                      onChangeText={name =>
                        this.setState({ CerealsSeed: name })
                      }
                      placeholder={
                        "Total Quantity (in Kg) - Seed (Must be greater than 0 and less than 1000)"
                      }
                      secureTextEntry={false}
                      style={styles.input}
                      keyboardType="number-pad"
                    />

                    <TextInput
                      value={this.state.CerealsSale}
                      onChangeText={name =>
                        this.setState({ CerealsSale: name })
                      }
                      placeholder={
                        "Total Quantity (in Kg) - Sale (Must be greater than 0 and less than 1000)"
                      }
                      secureTextEntry={false}
                      style={styles.input}
                      keyboardType="number-pad"
                    />

                    <TextInput
                      value={this.state.AverageSalePriceCereals}
                      onChangeText={name =>
                        this.setState({ AverageSalePriceCereals: name })
                      }
                      placeholder={
                        "Average Sale Price (Rs / Kg) (Must be greater than 0 and less than 1000)"
                      }
                      secureTextEntry={false}
                      style={styles.input}
                      keyboardType="number-pad"
                    />
                  </View>
                </View>
              ) : null}
            </View>
            <View style={styles.radioBtnStyle}>
              <Text style={{ fontFamily: FONT_FAMILY }}>
                Oilseeds - Do you wish to enter Oilseeds Information
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
                      oilseedsChecked: "OilseedsYes",
                      oilseeds: "YES"
                    })
                  }
                >
                  <View
                    style={
                      this.state.oilseedsChecked === "OilseedsYes"
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
                      oilseedsChecked: "OilseedsNo",
                      oilseeds: "NO"
                    })
                  }
                >
                  <View
                    style={
                      this.state.oilseedsChecked === "OilseedsNo"
                        ? styles.activeRadion
                        : styles.inActiveRadion
                    }
                  />

                  <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>
                    NO
                  </Text>
                </TouchableOpacity>
              </View>
              {this.state.oilseeds == "YES" ? (
                <View style={{ width: "100%" }}>
                  <Text
                    style={{
                      fontFamily: FONT_FAMILY,
                      fontWeight: "bold",
                      fontSize: 15,
                      marginTop: 10
                    }}
                  >
                    Oilseeds Information Entry
                  </Text>
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
                      selectedValue={this.state.oilseeds_crop_name}
                      style={{ fontFamily: FONT_FAMILY }}
                      onValueChange={(itemValue, itemIndex) =>
                        // alert(itemValue)
                        this.setState({ oilseeds_crop_name: itemValue })
                      }
                    >
                      {/* value={this.state.formtype} /> */}
                      <Picker.Item
                        itemStyle={{ fontFamily: FONT_FAMILY }}
                        label="Oilseeds Crop Name"
                        value="Oilseeds Crop Name"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Groundnut"
                        value="Groundnut"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Mustard"
                        value="Mustard"
                      />
                    </Picker>
                  </View>

                  <TextInput
                    value={this.state.oilseeds_seed_variety}
                    onChangeText={name =>
                      this.setState({ oilseeds_seed_variety: name })
                    }
                    placeholder={"Oilseeds Seed Variety"}
                    secureTextEntry={false}
                    style={styles.input}
                  />

                  <TextInput
                    value={this.state.total_area_cultivated_oilseeds}
                    onChangeText={name =>
                      this.setState({ total_area_cultivated_oilseeds: name })
                    }
                    placeholder={
                      "Total Area Cultivated (Acre) - Oilseeds (Must be greater than 0 and less than 50)"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType="number-pad"
                  />

                  <TextInput
                    value={this.state.TARINA_supported_area_oilseeds}
                    onChangeText={name =>
                      this.setState({ TARINA_supported_area_oilseeds: name })
                    }
                    placeholder={
                      "TARINA Supported Area Cultivated (Acre) - Oilseeds (Must be greater than 0 and less than 50)"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType="number-pad"
                  />
                  <View style={styles.radioBtnStyle}>
                    <Text style={{ fontFamily: FONT_FAMILY }}>
                      Seed - Oilseeds
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
                            SeedOilseedsChecked: "PulsesYes",
                            SeedOilseeds: "YES"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.SeedOilseedsChecked === "PulsesYes"
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
                            SeedOilseedsChecked: "PulsesNo",
                            SeedOilseeds: "NO"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.SeedOilseedsChecked === "PulsesNo"
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
                    {this.state.SeedOilseeds == "YES" ? (
                      <View style={{ width: "100%" }}>
                        <TextInput
                          value={this.state.SeedQuantityOilseeds}
                          onChangeText={name =>
                            this.setState({ SeedQuantityOilseeds: name })
                          }
                          placeholder={
                            "Seed Quantity Received (in gm) - Oilseeds (Must be greater than 0 and less than 2000)"
                          }
                          secureTextEntry={false}
                          style={styles.input}
                          keyboardType="number-pad"
                        />
                      </View>
                    ) : null}
                  </View>
                  <View style={styles.radioBtnStyle}>
                    <Text style={{ fontFamily: FONT_FAMILY }}>
                      Seedlings from Cluster Nursery - Oilseeds
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
                            SeedlingsfromNurseryOilseedsChecked: "PulsesYes",
                            SeedlingsfromNurseryOilseeds: "YES"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.SeedlingsfromNurseryOilseedsChecked ===
                            "PulsesYes"
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
                            SeedlingsfromNurseryOilseedsChecked: "PulsesNo",
                            SeedlingsfromNurseryOilseeds: "NO"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.SeedlingsfromNurseryOilseedsChecked ===
                            "PulsesNo"
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
                    {this.state.SeedlingsfromNurseryOilseeds == "YES" ? (
                      <View style={{ width: "100%" }}>
                        <TextInput
                          value={this.state.SeedlingsQuantityReceivedOilseeds}
                          onChangeText={name =>
                            this.setState({
                              SeedlingsQuantityReceivedOilseeds: name
                            })
                          }
                          placeholder={
                            "Seedling Quantity Received (in No.) - Oilseeds (Must be greater than 0 and less than 1000)"
                          }
                          secureTextEntry={false}
                          style={styles.input}
                          keyboardType="number-pad"
                        />
                      </View>
                    ) : null}
                  </View>
                  <View style={styles.radioBtnStyle}>
                    <Text style={{ fontFamily: FONT_FAMILY }}>
                      Seedlings from Outside Nursery - Oilseeds
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
                            SeedlingsfromOutsideCheckedOilseeds: "PulsesYes",
                            SeedlingsfromOutsideOilseeds: "YES"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.SeedlingsfromOutsideCheckedOilseeds ===
                            "PulsesYes"
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
                            SeedlingsfromOutsideCheckedOilseeds: "PulsesNo",
                            SeedlingsfromOutsideOilseeds: "NO"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.SeedlingsfromOutsideCheckedOilseeds ===
                            "PulsesNo"
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
                    {this.state.SeedlingsfromOutsideOilseeds == "YES" ? (
                      <View style={{ width: "100%" }}>
                        <TextInput
                          value={
                            this.state.SeedlingsfromOutsideQuantityOilseeds
                          }
                          onChangeText={name =>
                            this.setState({
                              SeedlingsfromOutsideQuantityOilseeds: name
                            })
                          }
                          placeholder={
                            "Seedling Quantity Received (in No.) - Oilseeds (Must be greater than 0 and less than 1000)"
                          }
                          secureTextEntry={false}
                          style={styles.input}
                          keyboardType="number-pad"
                        />
                      </View>
                    ) : null}
                  </View>
                  <View style={{ width: "100%" }}>
                    <TextInput
                      value={this.state.OilseedsProduction}
                      onChangeText={name =>
                        this.setState({ OilseedsProduction: name })
                      }
                      placeholder={
                        "Total Quantity (in Kg.) - Production (Must be greater than 0 and less than 1000)"
                      }
                      secureTextEntry={false}
                      style={styles.input}
                      keyboardType="number-pad"
                    />

                    <TextInput
                      value={this.state.OilseedsConsumption}
                      onChangeText={name =>
                        this.setState({ OilseedsConsumption: name })
                      }
                      placeholder={
                        "Total Quantity (in Kg) - Consumption (Must be greater than 0 and less than 1000)"
                      }
                      secureTextEntry={false}
                      style={styles.input}
                      keyboardType="number-pad"
                    />

                    <TextInput
                      value={this.state.OilseedsSeed}
                      onChangeText={name =>
                        this.setState({ OilseedsSeed: name })
                      }
                      placeholder={
                        "Total Quantity (in Kg) - Seed (Must be greater than 0 and less than 1000)"
                      }
                      secureTextEntry={false}
                      style={styles.input}
                      keyboardType="number-pad"
                    />

                    <TextInput
                      value={this.state.OilseedsSale}
                      onChangeText={name =>
                        this.setState({ OilseedsSale: name })
                      }
                      placeholder={
                        "Total Quantity (in Kg) - Sale (Must be greater than 0 and less than 1000)"
                      }
                      secureTextEntry={false}
                      style={styles.input}
                      keyboardType="number-pad"
                    />

                    <TextInput
                      value={this.state.AverageSalePriceOilseeds}
                      onChangeText={name =>
                        this.setState({ AverageSalePriceOilseeds: name })
                      }
                      placeholder={
                        "Average Sale Price (Rs / Kg) (Must be greater than 0 and less than 1000)"
                      }
                      secureTextEntry={false}
                      style={styles.input}
                      keyboardType="number-pad"
                    />
                  </View>
                </View>
              ) : null}
            </View>
            <View style={styles.radioBtnStyle}>
              <Text style={{ fontFamily: FONT_FAMILY }}>
                Legumes (Other than Pulses) - Do you wish to enter Legumes
                Information
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
                      legumesChecked: "LegumesYes",
                      legumes: "YES"
                    })
                  }
                >
                  <View
                    style={
                      this.state.legumesChecked === "LegumesYes"
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
                      legumesChecked: "LegumesNo",
                      legumes: "NO"
                    })
                  }
                >
                  <View
                    style={
                      this.state.legumesChecked === "LegumesNo"
                        ? styles.activeRadion
                        : styles.inActiveRadion
                    }
                  />

                  <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>
                    NO
                  </Text>
                </TouchableOpacity>
              </View>
              {this.state.legumes == "YES" ? (
                <View style={{ width: "100%" }}>
                  <Text
                    style={{
                      fontFamily: FONT_FAMILY,
                      fontWeight: "bold",
                      fontSize: 15,
                      marginTop: 10
                    }}
                  >
                    Legumes Information Entry
                  </Text>
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
                      selectedValue={this.state.legumes_crop_name}
                      style={{ fontFamily: FONT_FAMILY }}
                      onValueChange={(itemValue, itemIndex) =>
                        // alert(itemValue)
                        this.setState({ legumes_crop_name: itemValue })
                      }
                    >
                      {/* value={this.state.formtype} /> */}
                      <Picker.Item
                        itemStyle={{ fontFamily: FONT_FAMILY }}
                        label="Legumes Crop Name"
                        value="Legumes Crop Name"
                      />
                      <Picker.Item
                        style={{ fontFamily: FONT_FAMILY }}
                        label="Sweet Potato"
                        value="Sweet Potato"
                      />
                    </Picker>
                  </View>

                  <TextInput
                    value={this.state.legumes_seed_variety}
                    onChangeText={name =>
                      this.setState({ legumes_seed_variety: name })
                    }
                    placeholder={"Legumes Seed Variety"}
                    secureTextEntry={false}
                    style={styles.input}
                  />

                  <TextInput
                    value={this.state.total_area_cultivated_legumes}
                    onChangeText={name =>
                      this.setState({ total_area_cultivated_legumes: name })
                    }
                    placeholder={
                      "Total Area Cultivated (Acre) - Legumes (Must be greater than 0 and less than 50)"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType="number-pad"
                  />

                  <TextInput
                    value={this.state.TARINA_supported_area_legumes}
                    onChangeText={name =>
                      this.setState({ TARINA_supported_area_legumes: name })
                    }
                    placeholder={
                      "TARINA Supported Area Cultivated (Acre) - Legumes (Must be greater than 0 and less than 50)"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType="number-pad"
                  />
                  <View style={styles.radioBtnStyle}>
                    <Text style={{ fontFamily: FONT_FAMILY }}>
                      Seed - Legumes
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
                            SeedLegumesChecked: "PulsesYes",
                            SeedLegumes: "YES"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.SeedLegumesChecked === "PulsesYes"
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
                            SeedLegumesChecked: "PulsesNo",
                            SeedLegumes: "NO"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.SeedLegumesChecked === "PulsesNo"
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
                    {this.state.SeedLegumes == "YES" ? (
                      <View style={{ width: "100%" }}>
                        <TextInput
                          value={this.state.SeedQuantityLegumes}
                          onChangeText={name =>
                            this.setState({ SeedQuantityLegumes: name })
                          }
                          placeholder={
                            "Seed Quantity Received (in gm) - Legumes (Must be greater than 0 and less than 2000)"
                          }
                          secureTextEntry={false}
                          style={styles.input}
                          keyboardType="number-pad"
                        />
                      </View>
                    ) : null}
                  </View>
                  <View style={styles.radioBtnStyle}>
                    <Text style={{ fontFamily: FONT_FAMILY }}>
                      Seedlings from Cluster Nursery - Legumes
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
                            SeedlingsfromNurseryLegumesChecked: "PulsesYes",
                            SeedlingsfromNurseryLegumes: "YES"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.SeedlingsfromNurseryLegumesChecked ===
                            "PulsesYes"
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
                            SeedlingsfromNurseryLegumesChecked: "PulsesNo",
                            SeedlingsfromNurseryLegumes: "NO"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.SeedlingsfromNurseryLegumesChecked ===
                            "PulsesNo"
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
                    {this.state.SeedlingsfromNurseryLegumes == "YES" ? (
                      <View style={{ width: "100%" }}>
                        <TextInput
                          value={this.state.SeedlingsQuantityReceivedLegumes}
                          onChangeText={name =>
                            this.setState({
                              SeedlingsQuantityReceivedLegumes: name
                            })
                          }
                          placeholder={
                            "Seedling Quantity Received (in No.) - Legumes (Must be greater than 0 and less than 1000)"
                          }
                          secureTextEntry={false}
                          style={styles.input}
                          keyboardType="number-pad"
                        />
                      </View>
                    ) : null}
                  </View>
                  <View style={styles.radioBtnStyle}>
                    <Text style={{ fontFamily: FONT_FAMILY }}>
                      Seedlings from Outside Nursery - Legumes
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
                            SeedlingsfromOutsideCheckedLegumes: "PulsesYes",
                            SeedlingsfromOutsideLegumes: "YES"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.SeedlingsfromOutsideCheckedLegumes ===
                            "PulsesYes"
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
                            SeedlingsfromOutsideCheckedLegumes: "PulsesNo",
                            SeedlingsfromOutsideLegumes: "NO"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.SeedlingsfromOutsideCheckedLegumes ===
                            "PulsesNo"
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
                    {this.state.SeedlingsfromOutsideLegumes == "YES" ? (
                      <View style={{ width: "100%" }}>
                        <TextInput
                          value={this.state.SeedlingsfromOutsideQuantityLegumes}
                          onChangeText={name =>
                            this.setState({
                              SeedlingsfromOutsideQuantityLegumes: name
                            })
                          }
                          placeholder={
                            "Seedling Quantity Received (in No.) - Vegetables (Must be greater than 0 and less than 1000)"
                          }
                          secureTextEntry={false}
                          style={styles.input}
                          keyboardType="number-pad"
                        />
                      </View>
                    ) : null}
                  </View>
                  <View style={{ width: "100%" }}>
                    <TextInput
                      value={this.state.LegumesProduction}
                      onChangeText={name =>
                        this.setState({ LegumesProduction: name })
                      }
                      placeholder={
                        "Total Quantity (in Kg.) - Production (Must be greater than 0 and less than 1000)"
                      }
                      secureTextEntry={false}
                      style={styles.input}
                      keyboardType="number-pad"
                    />

                    <TextInput
                      value={this.state.LegumesConsumption}
                      onChangeText={name =>
                        this.setState({ LegumesConsumption: name })
                      }
                      placeholder={
                        "Total Quantity (in Kg) - Consumption (Must be greater than 0 and less than 1000)"
                      }
                      secureTextEntry={false}
                      style={styles.input}
                      keyboardType="number-pad"
                    />

                    <TextInput
                      value={this.state.LegumesSeed}
                      onChangeText={name =>
                        this.setState({ LegumesSeed: name })
                      }
                      placeholder={
                        "Total Quantity (in Kg) - Seed (Must be greater than 0 and less than 1000)"
                      }
                      secureTextEntry={false}
                      style={styles.input}
                      keyboardType="number-pad"
                    />

                    <TextInput
                      value={this.state.LegumesSale}
                      onChangeText={name =>
                        this.setState({ LegumesSale: name })
                      }
                      placeholder={
                        "Total Quantity (in Kg) - Sale (Must be greater than 0 and less than 1000)"
                      }
                      secureTextEntry={false}
                      style={styles.input}
                      keyboardType="number-pad"
                    />

                    <TextInput
                      value={this.state.AverageSalePriceLegumes}
                      onChangeText={name =>
                        this.setState({ AverageSalePriceLegumes: name })
                      }
                      placeholder={
                        "Average Sale Price (Rs / Kg) (Must be greater than 0 and less than 1000)"
                      }
                      secureTextEntry={false}
                      style={styles.input}
                      keyboardType="number-pad"
                    />
                  </View>
                </View>
              ) : null}
            </View>
            <View style={styles.radioBtnStyle}>
              <Text style={{ fontFamily: FONT_FAMILY }}>
                Mixed Crop - Do you wish to enter Mixed Crop Information
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
                      mixedChecked: "MixedYes",
                      mixed: "YES"
                    })
                  }
                >
                  <View
                    style={
                      this.state.mixedChecked === "MixedYes"
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
                      mixedChecked: "MixedNo",
                      mixed: "NO"
                    })
                  }
                >
                  <View
                    style={
                      this.state.mixedChecked === "MixedNo"
                        ? styles.activeRadion
                        : styles.inActiveRadion
                    }
                  />

                  <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>
                    NO
                  </Text>
                </TouchableOpacity>
              </View>
              {this.state.mixed == "YES" ? (
                <View style={{ width: "100%" }}>
                  <Text
                    style={{
                      fontFamily: FONT_FAMILY,
                      fontWeight: "bold",
                      fontSize: 15,
                      marginTop: 10
                    }}
                  >
                    Mixed Crop Information Entry
                  </Text>
                  <TextInput
                    value={this.state.mixed_crop_name}
                    onChangeText={name =>
                      this.setState({ mixed_crop_name: name })
                    }
                    placeholder={"Mixed Crop Name"}
                    secureTextEntry={false}
                    style={styles.input}
                  />
                  <TextInput
                    value={this.state.mixed_seed_variety}
                    onChangeText={name =>
                      this.setState({ mixed_seed_variety: name })
                    }
                    placeholder={"Mixed Seed Variety"}
                    secureTextEntry={false}
                    style={styles.input}
                  />
                  <TextInput
                    value={this.state.total_area_cultivated_mixed}
                    onChangeText={name =>
                      this.setState({ total_area_cultivated_mixed: name })
                    }
                    placeholder={
                      "Total Area Cultivated (Acre) - Mixed (Must be greater than 0 and less than 50)"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType="number-pad"
                  />
                  <TextInput
                    value={this.state.TARINA_supported_area_mixed}
                    onChangeText={name =>
                      this.setState({ TARINA_supported_area_mixed: name })
                    }
                    placeholder={
                      "TARINA Supported Area Cultivated (Acre) - Mixed (Must be greater than 0 and less than 50)"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType="number-pad"
                  />
                  <View style={styles.radioBtnStyle}>
                    <Text style={{ fontFamily: FONT_FAMILY }}>
                      Seed - Mixed Crop
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
                            seed_mixed_crop: "SeedMixedCropYes",
                            seed_mixed: "YES"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.seed_mixed_crop === "SeedMixedCropYes"
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
                            seed_mixed_crop: "SeedMixedCropNo",
                            seed_mixed: "NO"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.seed_mixed_crop === "SeedMixedCropNo"
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
                    {this.state.seed_mixed == "YES" ? (
                      <View style={{ width: "100%" }}>
                        <TextInput
                          value={this.state.seed_mixed_crop_form}
                          onChangeText={name =>
                            this.setState({ seed_mixed_crop_form: name })
                          }
                          placeholder={
                            "Seed Quantity Received (in Kg) - Mixed Crop (Must be greater than 0 and less than 50)"
                          }
                          secureTextEntry={false}
                          style={styles.input}
                          keyboardType="number-pad"
                        />
                      </View>
                    ) : null}
                  </View>
                  <View style={styles.radioBtnStyle}>
                    <Text style={{ fontFamily: FONT_FAMILY }}>
                      Seedlings from Cluster Nursery - Mixed Crop
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
                            Seedlings_from_Cluster_Nursery:
                              "SeedlingsfromClusterNurseryYes",
                            Seedlings_from_Cluster: "YES"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.Seedlings_from_Cluster_Nursery ===
                            "SeedlingsfromClusterNurseryYes"
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
                            Seedlings_from_Cluster_Nursery:
                              "SeedlingsfromClusterNurseryNo",
                            Seedlings_from_Cluster: "NO"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.Seedlings_from_Cluster_Nursery ===
                            "SeedlingsfromClusterNurseryNo"
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
                    {this.state.Seedlings_from_Cluster == "YES" ? (
                      <View style={{ width: "100%" }}>
                        <TextInput
                          value={this.state.Seedlings_from_Cluster_Form}
                          onChangeText={name =>
                            this.setState({ Seedlings_from_Cluster_Form: name })
                          }
                          placeholder={
                            "Seed Quantity Received (in Kg) - Mixed Crop (Must be greater than 0 and less than 50)"
                          }
                          secureTextEntry={false}
                          style={styles.input}
                          keyboardType="number-pad"
                        />
                      </View>
                    ) : null}
                  </View>
                  <View style={styles.radioBtnStyle}>
                    <Text style={{ fontFamily: FONT_FAMILY }}>
                      Seedlings from Outside Nursery - Mixed Crop
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
                            Seedlings_from_Outside_Nursery:
                              "SeedlingsfromOutsideNurseryYes",
                            Seedlings_from_Outside: "YES"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.Seedlings_from_Outside_Nursery ===
                            "SeedlingsfromOutsideNurseryYes"
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
                            Seedlings_from_Outside_Nursery:
                              "SeedlingsfromOutsideNurseryNo",
                            Seedlings_from_Outside: "NO"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.Seedlings_from_Outside_Nursery ===
                            "SeedlingsfromOutsideNurseryNo"
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
                    {this.state.Seedlings_from_Outside == "YES" ? (
                      <View style={{ width: "100%" }}>
                        <TextInput
                          value={this.state.Seedlings_from_Outside_Form}
                          onChangeText={name =>
                            this.setState({ Seedlings_from_Outside_Form: name })
                          }
                          placeholder={
                            "Seedling Quantity Received (in No.) - Mixed Crop (Must be greater than 0 and less than 1000)"
                          }
                          secureTextEntry={false}
                          style={styles.input}
                          keyboardType="number-pad"
                        />
                      </View>
                    ) : null}
                  </View>
                  <TextInput
                    value={this.state.seeding_subform1}
                    onChangeText={name =>
                      this.setState({ seeding_subform1: name })
                    }
                    placeholder={
                      "Total Quantity (in Kg.) - Production (Must be greater than 0 and less than 1000)"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType="number-pad"
                  />
                  <TextInput
                    value={this.state.seeding_subform2}
                    onChangeText={name =>
                      this.setState({ seeding_subform2: name })
                    }
                    placeholder={
                      "Total Quantity (in Kg) - Consumption (Must be greater than 0 and less than 1000)"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType="number-pad"
                  />
                  <TextInput
                    value={this.state.seeding_subform3}
                    onChangeText={name =>
                      this.setState({ seeding_subform3: name })
                    }
                    placeholder={
                      "Total Quantity (in Kg) - Seed (Must be greater than 0 and less than 1000)"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType="number-pad"
                  />
                  <TextInput
                    value={this.state.seeding_subform4}
                    onChangeText={name =>
                      this.setState({ seeding_subform4: name })
                    }
                    placeholder={
                      "Total Quantity (in Kg) - Sale (Must be greater than 0 and less than 1000)"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType="number-pad"
                  />
                  <TextInput
                    value={this.state.seeding_subform5}
                    onChangeText={name =>
                      this.setState({ seeding_subform5: name })
                    }
                    placeholder={
                      "Average Sale Price (Rs / Kg) (Must be greater than 0 and less than 1000)"
                    }
                    secureTextEntry={false}
                    style={styles.input}
                    keyboardType="number-pad"
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
                  <Text style={{ fontFamily: FONT_FAMILY, marginTop: 10 }}>
                    Support Information Entry
                  </Text>

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
                    <Text style={{ fontFamily: FONT_FAMILY }}>
                      Bio-Fertilizer
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
                            Bio_Fertilizer: "BioYes",
                            Bio: "YES"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.Bio_Fertilizer === "BioYes"
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
                            Bio_Fertilizer: "BioNo",
                            Bio: "NO"
                          })
                        }
                      >
                        <View
                          style={
                            this.state.Bio_Fertilizer === "BioNo"
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
                          value={this.state.bioformname}
                          onChangeText={name =>
                            this.setState({ bioformname: name })
                          }
                          placeholder={"Bio-Fertilizer Name"}
                          secureTextEntry={false}
                          style={styles.input}
                        />
                        <TextInput
                          value={this.state.bioform}
                          onChangeText={name =>
                            this.setState({ bioform: name })
                          }
                          placeholder={
                            "Bio-Fertilizer Quantity Received (gm) Must be greater than 0 and less than 1000"
                          }
                          secureTextEntry={false}
                          style={styles.input}
                          keyboardType="number-pad"
                        />
                      </View>
                    ) : null}
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
                    {this.state.Fertilizer == "YES" ? (
                      <View style={{ width: "100%" }}>
                        <TextInput
                          value={this.state.FertilizerCheckedformName}
                          onChangeText={name =>
                            this.setState({ FertilizerCheckedformName: name })
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
                          keyboardType="number-pad"
                        />
                      </View>
                    ) : null}
                  </View>
                  <View style={styles.radioBtnStyle}>
                    <Text style={{ fontFamily: FONT_FAMILY }}>
                      Plant Protection Chemicals / Pesticide
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
                          value={this.state.PesticideName}
                          onChangeText={name =>
                            this.setState({ PesticideName: name })
                          }
                          placeholder={
                            "Plant Protection Chemicals / Pesticide Name"
                          }
                          secureTextEntry={false}
                          style={styles.input}
                        />

                        <TextInput
                          value={this.state.Pesticideform}
                          onChangeText={name =>
                            this.setState({ Pesticideform: name })
                          }
                          placeholder={
                            "Plant Protection Chemicals / Pesticide Quantity Received (gm/ml) Must be greater than 0 and less than 1000"
                          }
                          secureTextEntry={false}
                          style={styles.input}
                          keyboardType="number-pad"
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
                          value={this.state.HerbicideformName}
                          onChangeText={name =>
                            this.setState({ HerbicideformName: name })
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
                            "Fertilizer Quantity Received (Kg) Must be greater than 0 and less than 100"
                          }
                          secureTextEntry={false}
                          style={styles.input}
                          keyboardType="number-pad"
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
                            this.setState({ Extensionform: name })
                          }
                          placeholder={
                            "Extension Support (in No.) Must be greater than 0 and less than 100"
                          }
                          secureTextEntry={false}
                          style={styles.input}
                          keyboardType="number-pad"
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
                          keyboardType="number-pad"
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
                          keyboardType="number-pad"
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
                  // alignItems: "flex-end",
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
        {/* </MagicMove.Scene> */}
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
)(CropDiversificationForm);
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
