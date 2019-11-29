import React, { Component } from "react";
import {
    View,
    TextInput,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
    Picker,
    ActivityIndicator, BackHandler, BackAndroid
} from "react-native";
import { Radio } from "native-base";
import { STATUS_BAR_COLOR, FONT_FAMILY_BOLD, FONT_FAMILY } from '../config/ConfigStyle';
import DatePicker from "react-native-datepicker";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { onSaveData, clearHouseholdField } from '../actions/TTFormAction';
import Snackbar from 'react-native-snackbar';
import * as Animatable from 'react-native-animatable';
import { func_validateNumbersInForms } from '../business/common/CommonFunctions';

class LivestockDiaryForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: "radio2",
            training: "No",
            trainingImpatredByOther: "",
            checkedTraining: "",
            trainingImpartedBy: "",

            checked2: "radio22",
            extensionSupport: "No",
            noOfExtensionSupport: "",
            purposeExtensionSupport: "",
            noOfPoultryReceivedExtensionSupport: "",

            checked3: "radio222",
            medicineSupport: "No",
            medicineQuantity: "",
            medicineName: "",
            noOfPoultryReceivedMedicine: "",

            checked4: "radio2222",
            dewormingSupport: "No",
            dewormingQuantity: "",
            dewormingName: "",
            noOfPoultryReceivedDeworming: "",

            checked5: "radio22222",
            vaccinationSupport: "No",
            vaccinationQuantity: "",
            vaccinationName: "",
            noOfPoultryReceivedVaccination: "",

            checked6: "radio222222",
            impFeedSupport: "No",
            impFeedQuantity: "",
            impFeedName: "",
            noOfAnimalsReceivedImpFeed: "",

            checked7: "radio2222222",
            otherSupport: "No",
            otherQuantity: "",
            otherName: "",
            noOfAnimalsReceivedOther: "",

            fodderCultivated: "",

            checked8: "",
            typeOfLinkage: "",

            formtype1: "",
            formtype2: "",

            agencyName: "",
            linkPurpose: "",
            date: "",

            checked9: "radio222222222",
            poultryShed: "No",
            impShedQuantity: "",
            impShedName: "",
            noOfAnimalsRecieveShedSupport: "",

            checked10: "radio2222222222",
            inseminationSupport: "No",
            artificialInseminationName: "",
            noOfanimalsReceivedArtificialInseminationRepeat: "",
            noOfanimalsReceivedArtificialInseminationFirstTime: "",

            checked11: "radio22222222222",
            fodderCultivationSupport: "No",
            quantityOfFodder: "",
            nameOfFodder: "",

            checked12: "radio222222222222",
            fodderSupport: "No",
            fodderSupportQuantity: "",
            impFodderName: "",
            noOfAnimalsRecieveFodderSupport: ""
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    func_ShowAlert(msg) {
        Snackbar.show({
            title: msg,
            color: 'white',
            duration: Snackbar.LENGTH_SHORT,
        });
    }
    handleBackButtonClick() {
        Actions.pop()
        return true;
    }
    async onLogClick() {
        if (!this.props.house_hold.hasOwnProperty("nameserch")) {
            this.func_ShowAlert("Select Household ")
        } else if (this.state.date == "") {
            this.func_ShowAlert("Select Date ")
        } else if (func_validateNumbersInForms(0, 200, this.state.noOfExtensionSupport)) {
            this.func_ShowAlert("No. of Extension Support must be greater than 0 and less than 200")
        } else if (func_validateNumbersInForms(0, 200, this.state.noOfPoultryReceivedExtensionSupport)) {
            this.func_ShowAlert("No. of Animals received Extension Support must be greater than 0 and less than 200")
        } else if (func_validateNumbersInForms(0, 200, this.state.medicineQuantity)) {
            this.func_ShowAlert("No. of Medicine Quantity must be greater than 0 and less than 200")
        } else if (func_validateNumbersInForms(0, 200, this.state.noOfPoultryReceivedMedicine)) {
            this.func_ShowAlert("No. of Animals received Medicine Support must be greater than 0 and less than 200")
        } else if (func_validateNumbersInForms(0, 200, this.state.dewormingQuantity)) {
            this.func_ShowAlert("No. of Deworming Quantity must be greater than 0 and less than 200")
        } else if (func_validateNumbersInForms(0, 200, this.state.noOfPoultryReceivedDeworming)) {
            this.func_ShowAlert("No. of Animals received Deworming Support must be greater than 0 and less than 200")
        } else if (func_validateNumbersInForms(0, 200, this.state.vaccinationQuantity)) {
            this.func_ShowAlert("No. of Vaccination Quantity must be greater than 0 and less than 200")
        } else if (func_validateNumbersInForms(0, 200, this.state.noOfPoultryReceivedVaccination)) {
            this.func_ShowAlert("No. of Animals received Vaccination Support must be greater than 0 and less than 200")
        } else if (func_validateNumbersInForms(0, 200, this.state.noOfanimalsReceivedArtificialInseminationFirstTime)) {
            this.func_ShowAlert("No. of Animals received Artificial Insemination Support First Time must be greater than 0 and less than 200")
        } else if (func_validateNumbersInForms(0, 200, this.state.noOfanimalsReceivedArtificialInseminationRepeat)) {
            this.func_ShowAlert("No. of Animals received Artificial Insemination Support Repeat must be greater than 0 and less than 200")
        } else if (func_validateNumbersInForms(0, 200, this.state.impFeedQuantity)) {
            this.func_ShowAlert("No. of Improved Feed Quantity must be greater than 0 and less than 200")
        } else if (func_validateNumbersInForms(0, 200, this.state.noOfAnimalsReceivedImpFeed)) {
            this.func_ShowAlert("No. of Animals received Improved Feed Support must be greater than 0 and less than 200")
        } else if (func_validateNumbersInForms(0, 200, this.state.fodderSupportQuantity)) {
            this.func_ShowAlert("No. of Improved Fodder Quantity must be greater than 0 and less than 200")
        } else if (func_validateNumbersInForms(0, 200, this.state.noOfAnimalsRecieveFodderSupport)) {
            this.func_ShowAlert("No. of Animals received Improved Fodder Support must be greater than 0 and less than 200")
        } else if (func_validateNumbersInForms(0, 200, this.state.poultryShed)) {
            this.func_ShowAlert("No. of Improved Shed Quantity must be greater than 0 and less than 200")
        } else if (func_validateNumbersInForms(0, 200, this.state.noOfAnimalsRecieveShedSupport)) {
            this.func_ShowAlert("No. of Animals received Improved Shed Support must be greater than 0 and less than 200")
        } else if (func_validateNumbersInForms(0, 200, this.state.otherQuantity)) {
            this.func_ShowAlert("No. of Others Quantity must be greater than 0 and less than 200")
        } else if (func_validateNumbersInForms(0, 200, this.state.noOfAnimalsReceivedOther)) {
            this.func_ShowAlert("No. of Animals received Other Support must be greater than 0 and less than 200")
        } else if (func_validateNumbersInForms(0, 200, this.state.fodderCultivated)) {
            this.func_ShowAlert("No. of Fodder Cultivated must be greater than 0 and less than 200")
        } else {
            let forSaveData = {
                logged_date: this.state.date,
                hh_id: this.props.house_hold.id,
                farmer_type: this.state.formtype1 == "Farmer Type" ? "" : this.state.formtype1,
                farmer_status: this.state.formtype2 == "Farmer Status" ? "" : this.state.formtype2,
                traning_provided: this.state.training,
                training_imparted_by: this.state.trainingImpartedBy,
                training_imparted_by_others_value: this.state.trainingImpatredByOther,
                extension_support: this.state.extensionSupport,
                no_of_extension_support_given: this.state.noOfExtensionSupport,
                purpose_of_extension_support_given: this.state.purposeExtensionSupport,
                no_of_animals_rec_extension_support: this.state.noOfPoultryReceivedExtensionSupport,
                medicine_support: this.state.medicineSupport,
                medicine_quantity: this.state.medicineQuantity,
                medicine_name: this.state.medicineName,
                no_of_animals_rec_medicine_support: this.state.noOfPoultryReceivedMedicine,
                deworming_support: this.state.dewormingSupport,
                deworming_quantity: this.state.dewormingQuantity,
                deworming_name: this.state.dewormingName,
                no_of_animals_rec_deworming_support: this.state.noOfPoultryReceivedDeworming,

                vaccination_support: this.state.vaccinationSupport,
                vaccination_quantity: this.state.vaccinationQuantity,
                vaccination_name: this.state.vaccinationName,
                no_of_animals_rec_vaccination_support: this.state.noOfPoultryReceivedVaccination,

                artificial_insemination_support: this.state.inseminationSupport,
                artificial_insemination_name: this.state.artificialInseminationName,
                no_of_animals_rec_art_ins_ftime_support: this.state.noOfanimalsReceivedArtificialInseminationFirstTime,
                no_of_animals_rec_art_ins_repeat_support: this.state.noOfanimalsReceivedArtificialInseminationRepeat,

                fodder_cultivation_support: this.state.fodderCultivationSupport,
                fodder_cultivation_quantity: this.state.quantityOfFodder,
                fodder_cultivation_name: this.state.nameOfFodder,

                improved_feed_support: this.state.impFeedSupport,
                improved_feed_quantity: this.state.impFeedQuantity,
                improved_feed_name: this.state.impFeedName,
                no_of_animals_rec_imp_feed_support: this.state.noOfAnimalsReceivedImpFeed,

                improved_fodder_support: this.state.fodderSupport,
                improved_fodder_quantity: this.state.fodderSupportQuantity,
                improved_fodder_name: this.state.impFodderName,
                no_of_animals_rec_imp_fodder_support: this.state.noOfAnimalsRecieveFodderSupport,

                improved_shed_support: this.state.poultryShed,
                improved_shed_quantity: this.state.impShedQuantity,
                improved_shed_name: this.state.impShedName,
                no_of_animals_rec_imp_shed_support: this.state.noOfAnimalsRecieveShedSupport,

                others_support: this.state.otherSupport,
                others_quantity: this.state.otherQuantity,
                others_name: this.state.otherName,
                no_of_animals_rec_others_support: this.state.noOfAnimalsReceivedOther,
                fodder_cultivated: this.state.fodderCultivated,
                type_of_linkages: this.state.typeOfLinkage,
                agency_linked_with: this.state.agencyName,
                linkage_purpose: this.state.linkPurpose,
                logged_from: 'MOBILE_APP',
                op: 'add_lsd_data'
            };
            let isConnection = this.props.is_connection;
            await this.props.onSaveData(forSaveData, isConnection);
            this.setState({
                checked: "radio2",
                training: "No",
                trainingImpatredByOther: "",
                checkedTraining: "",
                trainingImpartedBy: "",

                checked2: "radio22",
                extensionSupport: "No",
                noOfExtensionSupport: "",
                purposeExtensionSupport: "",
                noOfPoultryReceivedExtensionSupport: "",

                checked3: "radio222",
                medicineSupport: "No",
                medicineQuantity: "",
                medicineName: "",
                noOfPoultryReceivedMedicine: "",

                checked4: "radio2222",
                dewormingSupport: "No",
                dewormingQuantity: "",
                dewormingName: "",
                noOfPoultryReceivedDeworming: "",

                checked5: "radio22222",
                vaccinationSupport: "No",
                vaccinationQuantity: "",
                vaccinationName: "",
                noOfPoultryReceivedVaccination: "",

                checked6: "radio222222",
                impFeedSupport: "No",
                impFeedQuantity: "",
                impFeedName: "",
                noOfAnimalsReceivedImpFeed: "",

                checked7: "radio2222222",
                otherSupport: "No",
                otherQuantity: "",
                otherName: "",
                noOfAnimalsReceivedOther: "",

                fodderCultivated: "",

                checked8: "",
                typeOfLinkage: "",

                formtype1: "",
                formtype2: "",

                agencyName: "",
                linkPurpose: "",
                date: "",

                checked9: "radio222222222",
                poultryShed: "No",
                impShedQuantity: "",
                impShedName: "",
                noOfAnimalsRecieveShedSupport: "",

                checked10: "radio2222222222",
                inseminationSupport: "No",
                artificialInseminationName: "",
                noOfanimalsReceivedArtificialInseminationRepeat: "",
                noOfanimalsReceivedArtificialInseminationFirstTime: "",

                checked11: "radio22222222222",
                fodderCultivationSupport: "No",
                quantityOfFodder: "",
                nameOfFodder: "",

                checked12: "radio222222222222",
                fodderSupport: "No",
                fodderSupportQuantity: "",
                impFodderName: "",
                noOfAnimalsRecieveFodderSupport: ""
            })
            this.props.clearHouseholdField();
        }
    }
    render() {
        return (
            <ScrollView keyboardShouldPersistTaps={"always"} style={{ backgroundColor: "#fff" }}>
                <View
                    style={{
                        flex: 1,
                        flexDirection: "column",
                        backgroundColor: "#fff",
                        padding: 10,
                        paddingBottom: 0,

                    }}
                >
                    <Animatable.View
                        animation="fadeInDownBig"
                        useNativeDriver
                        delay={500} style={{
                            flex: 1,
                            flexDirection: "column",
                            backgroundColor: "#fff",
                            padding: 5,
                            borderRadius: 5
                        }}>

                        <TouchableOpacity
                            style={styles.input}
                            onPress={() => Actions.HouseholdSearch()}
                        >
                            <Text
                                //value={this.state.username}
                                //onChangeText={username => this.setState({ username })}
                                placeholder={"Select Household"}
                                ellipsizeMode='tail'
                                numberOfLines={2}
                                style={{
                                    width: "100%",
                                    height: 44,
                                    fontFamily: FONT_FAMILY,
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
                                <Picker.Item
                                    label="Demo"
                                    value="Demo"
                                />
                                <Picker.Item
                                    label="Diversified / Influened"
                                    value="Diversified / Influened" />
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
                                <Picker.Item label="General Participant" value="General Participant" />
                            </Picker>
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 6, justifyContent: 'space-between' }}>
                            <Text style={{ fontFamily: FONT_FAMILY }}>Training</Text>
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
                                        this.setState({ checked: "radio1", training: "Yes" })
                                    }
                                >
                                    <View
                                        style={
                                            this.state.checked === "radio1"
                                                ? styles.activeRadion
                                                : styles.inActiveRadion
                                        }
                                    />

                                    <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>YES</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{ flexDirection: "row", marginLeft: 10 }}
                                    onPress={() =>
                                        this.setState({ checked: "radio2", training: "No" })
                                    }
                                >
                                    <View
                                        style={
                                            this.state.checked === "radio2"
                                                ? styles.activeRadion
                                                : styles.inActiveRadion
                                        }
                                    />

                                    <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>NO</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {this.state.checked == "radio1" ? (
                            <View style={{ flexDirection: "row", marginTop: 6, justifyContent: 'space-between' }}>
                                <Text style={{ fontFamily: FONT_FAMILY }}>Training Imparted By</Text>
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
                                            this.setState({ checkedTraining: "radio1CheckedTraining", trainingImpartedBy: "TARINA" })
                                        }
                                    >
                                        <View
                                            style={
                                                this.state.checkedTraining === "radio1CheckedTraining"
                                                    ? styles.activeRadion
                                                    : styles.inActiveRadion
                                            }
                                        />

                                        <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>TARINA</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={{ flexDirection: "row", marginLeft: 10 }}
                                        onPress={() =>
                                            this.setState({ checkedTraining: "radio2checkedTraining", trainingImpartedBy: "Others" })
                                        }
                                    >
                                        <View
                                            style={
                                                this.state.checkedTraining === "radio2checkedTraining"
                                                    ? styles.activeRadion
                                                    : styles.inActiveRadion
                                            }
                                        />

                                        <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>Others</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : null}
                        {this.state.checkedTraining == "radio2checkedTraining" && this.state.checked == "radio1" ? (
                            <View style={{ flexDirection: "column", marginTop: 6 }}>
                                <TextInput
                                    value={this.state.trainingImpatredByOther}
                                    onChangeText={name => this.setState({ trainingImpatredByOther: name })}
                                    placeholder={"Training Imparted By Other"}
                                    secureTextEntry={false}
                                    style={styles.input}
                                />
                            </View>
                        ) : null}
                        <View style={{ flexDirection: "row", marginTop: 6, justifyContent: 'space-between' }}>
                            <Text style={{ fontFamily: FONT_FAMILY }}>Extension Support</Text>
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
                                        this.setState({ checked2: "radio11", extensionSupport: "Yes" })
                                    }
                                >
                                    <View
                                        style={
                                            this.state.checked2 === "radio11"
                                                ? styles.activeRadion
                                                : styles.inActiveRadion
                                        }
                                    />

                                    <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>YES</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{ flexDirection: "row", marginLeft: 10 }}
                                    onPress={() =>
                                        this.setState({ checked2: "radio22", extensionSupport: "No" })
                                    }
                                >
                                    <View
                                        style={
                                            this.state.checked2 === "radio22"
                                                ? styles.activeRadion
                                                : styles.inActiveRadion
                                        }
                                    />

                                    <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>NO</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {this.state.checked2 == "radio11" ? (
                            <View style={{ flexDirection: "column", marginTop: 6 }}>
                                <TextInput
                                    value={this.state.noOfExtensionSupport}
                                    onChangeText={name => this.setState({ noOfExtensionSupport: name })}
                                    placeholder={"No. of Extension Support Given"}
                                    secureTextEntry={false}
                                    keyboardType="number-pad"
                                    style={styles.input}
                                />
                                <Text style={{ fontFamily: FONT_FAMILY, fontSize: 11 }}>(Must be greater than 0 and less than 200)</Text>
                            </View>
                        ) : null}
                        {this.state.checked2 == "radio11" ? (
                            <View style={{ flexDirection: "column", marginTop: 6 }}>
                                <TextInput
                                    value={this.state.purposeExtensionSupport}
                                    onChangeText={name => this.setState({ purposeExtensionSupport: name })}
                                    placeholder={"Purpose. of Extension Support Given"}
                                    secureTextEntry={false}
                                    style={styles.input}
                                />
                            </View>
                        ) : null}
                        {this.state.checked2 == "radio11" ? (
                            <View style={{ flexDirection: "column", marginTop: 6 }}>
                                <TextInput
                                    value={this.state.noOfPoultryReceivedExtensionSupport}
                                    onChangeText={name => this.setState({ noOfPoultryReceivedExtensionSupport: name })}
                                    placeholder={"No. of animals received Extension Support"}
                                    secureTextEntry={false}
                                    keyboardType="number-pad"
                                    style={styles.input}
                                />
                                <Text style={{ fontFamily: FONT_FAMILY, fontSize: 11 }}>(Must be greater than 0 and less than 200)</Text>
                            </View>
                        ) : null}

                        <View style={{ flexDirection: "row", marginTop: 6, justifyContent: 'space-between' }}>
                            <Text style={{ fontFamily: FONT_FAMILY }}>Medicine Support</Text>
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
                                        this.setState({ checked3: "radio111", medicineSupport: "Yes" })
                                    }
                                >
                                    <View
                                        style={
                                            this.state.checked3 === "radio111"
                                                ? styles.activeRadion
                                                : styles.inActiveRadion
                                        }
                                    />

                                    <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>YES</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{ flexDirection: "row", marginLeft: 10 }}
                                    onPress={() =>
                                        this.setState({ checked3: "radio222", medicineSupport: "No" })
                                    }
                                >
                                    <View
                                        style={
                                            this.state.checked3 === "radio222"
                                                ? styles.activeRadion
                                                : styles.inActiveRadion
                                        }
                                    />

                                    <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>NO</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {this.state.checked3 == "radio111" ? (
                            <View style={{ flexDirection: "column", marginTop: 6 }}>
                                <TextInput
                                    value={this.state.medicineQuantity}
                                    onChangeText={name => this.setState({ medicineQuantity: name })}
                                    placeholder={"Medicine Quantity"}
                                    secureTextEntry={false}
                                    keyboardType="number-pad"
                                    style={styles.input}
                                />
                                <Text style={{ fontFamily: FONT_FAMILY, fontSize: 11 }}>(Must be greater than 0 and less than 200)</Text>
                            </View>
                        ) : null}
                        {this.state.checked3 == "radio111" ? (
                            <View style={{ flexDirection: "column", marginTop: 6 }}>
                                <TextInput
                                    value={this.state.medicineName}
                                    onChangeText={name => this.setState({ medicineName: name })}
                                    placeholder={"Medicine Name"}
                                    secureTextEntry={false}
                                    style={styles.input}
                                />
                            </View>
                        ) : null}
                        {this.state.checked3 == "radio111" ? (
                            <View style={{ flexDirection: "column", marginTop: 6 }}>
                                <TextInput
                                    value={this.state.noOfPoultryReceivedMedicine}
                                    onChangeText={name => this.setState({ noOfPoultryReceivedMedicine: name })}
                                    placeholder={"No. of animals received Medicine"}
                                    secureTextEntry={false}
                                    keyboardType="number-pad"
                                    style={styles.input}
                                />
                                <Text style={{ fontFamily: FONT_FAMILY, fontSize: 11 }}>(Must be greater than 0 and less than 200)</Text>
                            </View>
                        ) : null}

                        <View style={{ flexDirection: "row", marginTop: 6, justifyContent: 'space-between' }}>
                            <Text style={{ fontFamily: FONT_FAMILY }}>Deworming Support</Text>
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
                                        this.setState({ checked4: "radio1111", dewormingSupport: "Yes" })
                                    }
                                >
                                    <View
                                        style={
                                            this.state.checked4 === "radio1111"
                                                ? styles.activeRadion
                                                : styles.inActiveRadion
                                        }
                                    />

                                    <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>YES</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{ flexDirection: "row", marginLeft: 10 }}
                                    onPress={() =>
                                        this.setState({ checked4: "radio2222", dewormingSupport: "No" })
                                    }
                                >
                                    <View
                                        style={
                                            this.state.checked4 === "radio2222"
                                                ? styles.activeRadion
                                                : styles.inActiveRadion
                                        }
                                    />

                                    <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>NO</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {this.state.checked4 == "radio1111" ? (
                            <View style={{ flexDirection: "column", marginTop: 6 }}>
                                <TextInput
                                    value={this.state.dewormingQuantity}
                                    onChangeText={name => this.setState({ dewormingQuantity: name })}
                                    placeholder={"Deworming Quantity"}
                                    secureTextEntry={false}
                                    keyboardType="number-pad"
                                    style={styles.input}
                                />
                                <Text style={{ fontFamily: FONT_FAMILY, fontSize: 11 }}>(Must be greater than 0 and less than 200)</Text>
                            </View>
                        ) : null}
                        {this.state.checked4 == "radio1111" ? (
                            <View style={{ flexDirection: "column", marginTop: 6 }}>
                                <TextInput
                                    value={this.state.dewormingName}
                                    onChangeText={name => this.setState({ dewormingName: name })}
                                    placeholder={"Deworming Name"}
                                    secureTextEntry={false}
                                    style={styles.input}
                                />
                            </View>
                        ) : null}
                        {this.state.checked4 == "radio1111" ? (
                            <View style={{ flexDirection: "column", marginTop: 6 }}>
                                <TextInput
                                    value={this.state.noOfPoultryReceivedDeworming}
                                    onChangeText={name => this.setState({ noOfPoultryReceivedDeworming: name })}
                                    placeholder={"No. of animals received Deworming Support"}
                                    secureTextEntry={false}
                                    keyboardType="number-pad"
                                    style={styles.input}
                                />
                                <Text style={{ fontFamily: FONT_FAMILY, fontSize: 11 }}>(Must be greater than 0 and less than 200)</Text>
                            </View>
                        ) : null}

                        <View style={{ flexDirection: "row", marginTop: 6, justifyContent: 'space-between' }}>
                            <Text style={{ fontFamily: FONT_FAMILY }}>Vaccination Support</Text>
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
                                        this.setState({ checked5: "radio11111", vaccinationSupport: "Yes" })
                                    }
                                >
                                    <View
                                        style={
                                            this.state.checked5 === "radio11111"
                                                ? styles.activeRadion
                                                : styles.inActiveRadion
                                        }
                                    />

                                    <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>YES</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{ flexDirection: "row", marginLeft: 10 }}
                                    onPress={() =>
                                        this.setState({ checked5: "radio22222", vaccinationSupport: "No" })
                                    }
                                >
                                    <View
                                        style={
                                            this.state.checked5 === "radio22222"
                                                ? styles.activeRadion
                                                : styles.inActiveRadion
                                        }
                                    />

                                    <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>NO</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {this.state.checked5 == "radio11111" ? (
                            <View style={{ flexDirection: "column", marginTop: 6 }}>
                                <TextInput
                                    value={this.state.vaccinationQuantity}
                                    onChangeText={name => this.setState({ vaccinationQuantity: name })}
                                    placeholder={"Vaccination Quantity"}
                                    secureTextEntry={false}
                                    keyboardType="number-pad"
                                    style={styles.input}
                                />
                                <Text style={{ fontFamily: FONT_FAMILY, fontSize: 11 }}>(Must be greater than 0 and less than 200)</Text>
                            </View>
                        ) : null}
                        {this.state.checked5 == "radio11111" ? (
                            <View style={{ flexDirection: "column", marginTop: 6 }}>
                                <TextInput
                                    value={this.state.vaccinationName}
                                    onChangeText={name => this.setState({ vaccinationName: name })}
                                    placeholder={"Vaccination Name"}
                                    secureTextEntry={false}
                                    style={styles.input}
                                />
                            </View>
                        ) : null}
                        {this.state.checked5 == "radio11111" ? (
                            <View style={{ flexDirection: "column", marginTop: 6 }}>
                                <TextInput
                                    value={this.state.noOfPoultryReceivedVaccination}
                                    onChangeText={name => this.setState({ noOfPoultryReceivedVaccination: name })}
                                    placeholder={"No. of animals received Vaccination Support"}
                                    secureTextEntry={false}
                                    keyboardType="number-pad"
                                    style={styles.input}
                                />
                                <Text style={{ fontFamily: FONT_FAMILY, fontSize: 11 }}>(Must be greater than 0 and less than 200)</Text>
                            </View>
                        ) : null}

                        <View style={{ flexDirection: "column", marginTop: 6, justifyContent: 'space-between' }}>
                            <Text style={{ fontFamily: FONT_FAMILY }}>Artificial Insemination Support</Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    width: "100%",
                                    justifyContent: "flex-start",
                                    alignItems: "flex-end",
                                    marginVertical: 3
                                }}
                            >
                                <TouchableOpacity
                                    style={{ flexDirection: "row" }}
                                    onPress={() =>
                                        this.setState({ checked10: "radio1111111111", inseminationSupport: "Yes" })
                                    }
                                >
                                    <View
                                        style={
                                            this.state.checked10 === "radio1111111111"
                                                ? styles.activeRadion
                                                : styles.inActiveRadion
                                        }
                                    />

                                    <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>YES</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{ flexDirection: "row", marginLeft: 10 }}
                                    onPress={() =>
                                        this.setState({ checked10: "radio2222222222", inseminationSupport: "No" })
                                    }
                                >
                                    <View
                                        style={
                                            this.state.checked10 === "radio2222222222"
                                                ? styles.activeRadion
                                                : styles.inActiveRadion
                                        }
                                    />

                                    <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>NO</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {this.state.checked10 == "radio1111111111" ? (
                            <View style={{ flexDirection: "column", marginTop: 6 }}>
                                <TextInput
                                    value={this.state.artificialInseminationName}
                                    onChangeText={name => this.setState({ artificialInseminationName: name })}
                                    placeholder={"Artificial Insemination Name"}
                                    secureTextEntry={false}
                                    style={styles.input}
                                />
                            </View>
                        ) : null}
                        {this.state.checked10 == "radio1111111111" ? (
                            <View style={{ flexDirection: "column", marginTop: 6 }}>
                                <TextInput
                                    value={this.state.noOfanimalsReceivedArtificialInseminationFirstTime}
                                    onChangeText={name => this.setState({ noOfanimalsReceivedArtificialInseminationFirstTime: name })}
                                    placeholder={"No. of animals received Artificial Insemination(First Time)"}
                                    secureTextEntry={false}
                                    keyboardType="number-pad"
                                    style={styles.input}
                                />
                                <Text style={{ fontFamily: FONT_FAMILY, fontSize: 11 }}>(Must be greater than 0 and less than 200)</Text>
                            </View>
                        ) : null}
                        {this.state.checked10 == "radio1111111111" ? (
                            <View style={{ flexDirection: "column", marginTop: 6 }}>
                                <TextInput
                                    value={this.state.noOfanimalsReceivedArtificialInseminationRepeat}
                                    onChangeText={name => this.setState({ noOfanimalsReceivedArtificialInseminationRepeat: name })}
                                    placeholder={"No. of animals received Artificial Insemination(Repeat)"}
                                    secureTextEntry={false}
                                    keyboardType="number-pad"
                                    style={styles.input}
                                />
                                <Text style={{ fontFamily: FONT_FAMILY, fontSize: 11 }}>(Must be greater than 0 and less than 200)</Text>
                            </View>
                        ) : null}

                        <View style={{ flexDirection: "column", marginTop: 6, justifyContent: 'space-between' }}>
                            <Text style={{ fontFamily: FONT_FAMILY }}>Fodder Cultivation Support</Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    width: "100%",
                                    justifyContent: "flex-start",
                                    alignItems: "flex-end",
                                    marginVertical: 3
                                }}
                            >
                                <TouchableOpacity
                                    style={{ flexDirection: "row" }}
                                    onPress={() =>
                                        this.setState({ checked11: "radio11111111111", fodderCultivationSupport: "Yes" })
                                    }
                                >
                                    <View
                                        style={
                                            this.state.checked11 === "radio11111111111"
                                                ? styles.activeRadion
                                                : styles.inActiveRadion
                                        }
                                    />

                                    <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>YES</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{ flexDirection: "row", marginLeft: 10 }}
                                    onPress={() =>
                                        this.setState({ checked11: "radio22222222222", fodderCultivationSupport: "No" })
                                    }
                                >
                                    <View
                                        style={
                                            this.state.checked11 === "radio22222222222"
                                                ? styles.activeRadion
                                                : styles.inActiveRadion
                                        }
                                    />

                                    <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>NO</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {this.state.checked11 == "radio11111111111" ? (
                            <View style={{ flexDirection: "column", marginTop: 6 }}>
                                 <TextInput
                                    value={this.state.nameOfFodder}
                                    onChangeText={name => this.setState({ nameOfFodder: name })}
                                    placeholder={"Name of Fodder"}
                                    secureTextEntry={false}
                                    style={styles.input}
                                />
                            </View>
                        ) : null}
                        {this.state.checked11 == "radio11111111111" ? (
                            <View style={{ flexDirection: "column", marginTop: 6 }}>
                                <TextInput
                                    value={this.state.quantityOfFodder}
                                    onChangeText={name => this.setState({ quantityOfFodder: name })}
                                    placeholder={"Quantity of Fodder"}
                                    secureTextEntry={false}
                                    keyboardType="number-pad"
                                    style={styles.input}
                                />
                            </View>
                        ) : null}

                        <View style={{ flexDirection: "column", marginTop: 6, justifyContent: 'space-between' }}>
                            <Text style={{ fontFamily: FONT_FAMILY }}>Improved Feed Support</Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    width: "100%",
                                    justifyContent: "flex-start",
                                    alignItems: "flex-end",
                                    marginVertical: 3
                                }}
                            >
                                <TouchableOpacity
                                    style={{ flexDirection: "row" }}
                                    onPress={() =>
                                        this.setState({ checked6: "radio111111", impFeedSupport: "Yes" })
                                    }
                                >
                                    <View
                                        style={
                                            this.state.checked6 === "radio111111"
                                                ? styles.activeRadion
                                                : styles.inActiveRadion
                                        }
                                    />

                                    <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>YES</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{ flexDirection: "row", marginLeft: 10 }}
                                    onPress={() =>
                                        this.setState({ checked6: "radio222222", impFeedSupport: "No" })
                                    }
                                >
                                    <View
                                        style={
                                            this.state.checked6 === "radio222222"
                                                ? styles.activeRadion
                                                : styles.inActiveRadion
                                        }
                                    />

                                    <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>NO</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {this.state.checked6 == "radio111111" ? (
                            <View style={{ flexDirection: "column", marginTop: 6 }}>
                                <TextInput
                                    value={this.state.impFeedQuantity}
                                    onChangeText={name => this.setState({ impFeedQuantity: name })}
                                    placeholder={"Improved Feed Quantity"}
                                    secureTextEntry={false}
                                    keyboardType="number-pad"
                                    style={styles.input}
                                />
                                <Text style={{ fontFamily: FONT_FAMILY, fontSize: 11 }}>(Must be greater than 0 and less than 200)</Text>
                            </View>
                        ) : null}
                        {this.state.checked6 == "radio111111" ? (
                            <View style={{ flexDirection: "column", marginTop: 6 }}>
                                <TextInput
                                    value={this.state.impFeedName}
                                    onChangeText={name => this.setState({ impFeedName: name })}
                                    placeholder={"Improved Feed Name"}
                                    secureTextEntry={false}
                                    style={styles.input}
                                />
                            </View>
                        ) : null}
                        {this.state.checked6 == "radio111111" ? (
                            <View style={{ flexDirection: "column", marginTop: 6 }}>
                                <TextInput
                                    value={this.state.noOfAnimalsReceivedImpFeed}
                                    onChangeText={name => this.setState({ noOfAnimalsReceivedImpFeed: name })}
                                    placeholder={"No. of animals received Improved Feed Support"}
                                    secureTextEntry={false}
                                    keyboardType="number-pad"
                                    style={styles.input}
                                />
                                <Text style={{ fontFamily: FONT_FAMILY, fontSize: 11 }}>(Must be greater than 0 and less than 200)</Text>
                            </View>
                        ) : null}

                        <View style={{ flexDirection: "column", marginTop: 6, justifyContent: 'space-between' }}>
                            <Text style={{ fontFamily: FONT_FAMILY }}>Improved Fodder Support</Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    width: "100%",
                                    justifyContent: "flex-start",
                                    alignItems: "flex-end",
                                    marginVertical: 3
                                }}
                            >
                                <TouchableOpacity
                                    style={{ flexDirection: "row" }}
                                    onPress={() =>
                                        this.setState({ checked12: "radio111111111111", fodderSupport: "Yes" })
                                    }
                                >
                                    <View
                                        style={
                                            this.state.checked12 === "radio111111111111"
                                                ? styles.activeRadion
                                                : styles.inActiveRadion
                                        }
                                    />

                                    <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>YES</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{ flexDirection: "row", marginLeft: 10 }}
                                    onPress={() =>
                                        this.setState({ checked12: "radio222222222222", fodderSupport: "No" })
                                    }
                                >
                                    <View
                                        style={
                                            this.state.checked12 === "radio222222222222"
                                                ? styles.activeRadion
                                                : styles.inActiveRadion
                                        }
                                    />

                                    <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>NO</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {this.state.checked12 == "radio111111111111" ? (
                            <View style={{ flexDirection: "column", marginTop: 6 }}>
                                <TextInput
                                    value={this.state.fodderSupportQuantity}
                                    onChangeText={name => this.setState({ fodderSupportQuantity: name })}
                                    placeholder={"Improved Fodder Quantity"}
                                    secureTextEntry={false}
                                    keyboardType="number-pad"
                                    style={styles.input}
                                />
                                <Text style={{ fontFamily: FONT_FAMILY, fontSize: 11 }}>(Must be greater than 0 and less than 200)</Text>
                            </View>
                        ) : null}
                        {this.state.checked12 == "radio111111111111" ? (
                            <View style={{ flexDirection: "column", marginTop: 6 }}>
                                <TextInput
                                    value={this.state.impFodderName}
                                    onChangeText={name => this.setState({ impFodderName: name })}
                                    placeholder={"Improved Fodder Name"}
                                    secureTextEntry={false}
                                    style={styles.input}
                                />
                            </View>
                        ) : null}
                        {this.state.checked12 == "radio111111111111" ? (
                            <View style={{ flexDirection: "column", marginTop: 6 }}>
                                <TextInput
                                    value={this.state.noOfAnimalsRecieveFodderSupport}
                                    onChangeText={name => this.setState({ noOfAnimalsRecieveFodderSupport: name })}
                                    placeholder={"No. of animals received Improved Fodder Support"}
                                    secureTextEntry={false}
                                    keyboardType="number-pad"
                                    style={styles.input}
                                />
                                <Text style={{ fontFamily: FONT_FAMILY, fontSize: 11 }}>(Must be greater than 0 and less than 200)</Text>
                            </View>
                        ) : null}

                        <View style={{ flexDirection: "column", marginTop: 6, justifyContent: 'space-between' }}>
                            <Text style={{ fontFamily: FONT_FAMILY }}>Improved Shed Support</Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    width: "100%",
                                    justifyContent: "flex-start",
                                    alignItems: "flex-end",
                                    marginVertical: 3
                                }}
                            >
                                <TouchableOpacity
                                    style={{ flexDirection: "row" }}
                                    onPress={() =>
                                        this.setState({ checked9: "radio111111111", poultryShed: "Yes" })
                                    }
                                >
                                    <View
                                        style={
                                            this.state.checked9 === "radio111111111"
                                                ? styles.activeRadion
                                                : styles.inActiveRadion
                                        }
                                    />

                                    <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>YES</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{ flexDirection: "row", marginLeft: 10 }}
                                    onPress={() =>
                                        this.setState({ checked9: "radio222222222", poultryShed: "No" })
                                    }
                                >
                                    <View
                                        style={
                                            this.state.checked9 === "radio222222222"
                                                ? styles.activeRadion
                                                : styles.inActiveRadion
                                        }
                                    />

                                    <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>NO</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {this.state.checked9 == "radio111111111" ? (
                            <View style={{ flexDirection: "column", marginTop: 6 }}>
                                <TextInput
                                    value={this.state.impShedQuantity}
                                    onChangeText={name => this.setState({ impShedQuantity: name })}
                                    placeholder={"Improved Shed Quantity"}
                                    secureTextEntry={false}
                                    keyboardType="number-pad"
                                    style={styles.input}
                                />
                                <Text style={{ fontFamily: FONT_FAMILY, fontSize: 11 }}>(Must be greater than 0 and less than 200)</Text>
                            </View>
                        ) : null}
                        {this.state.checked9 == "radio111111111" ? (
                            <View style={{ flexDirection: "column", marginTop: 6 }}>
                                <TextInput
                                    value={this.state.impShedName}
                                    onChangeText={name => this.setState({ impShedName: name })}
                                    placeholder={"Improved Shed Name"}
                                    secureTextEntry={false}
                                    style={styles.input}
                                />
                            </View>
                        ) : null}
                        {this.state.checked9 == "radio111111111" ? (
                            <View style={{ flexDirection: "column", marginTop: 6 }}>
                                <TextInput
                                    value={this.state.noOfAnimalsRecieveShedSupport}
                                    onChangeText={name => this.setState({ noOfAnimalsRecieveShedSupport: name })}
                                    placeholder={"No. of animals received Improved Shed Support"}
                                    secureTextEntry={false}
                                    keyboardType="number-pad"
                                    style={styles.input}
                                />
                                <Text style={{ fontFamily: FONT_FAMILY, fontSize: 11 }}>(Must be greater than 0 and less than 200)</Text>
                            </View>
                        ) : null}


                        <View style={{ flexDirection: "row", marginTop: 6, justifyContent: 'space-between' }}>
                            <Text style={{ fontFamily: FONT_FAMILY }}>Others Support</Text>
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
                                        this.setState({ checked7: "radio1111111", otherSupport: "Yes" })
                                    }
                                >
                                    <View
                                        style={
                                            this.state.checked7 === "radio1111111"
                                                ? styles.activeRadion
                                                : styles.inActiveRadion
                                        }
                                    />

                                    <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>YES</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{ flexDirection: "row", marginLeft: 10 }}
                                    onPress={() =>
                                        this.setState({ checked7: "radio2222222", otherSupport: "No" })
                                    }
                                >
                                    <View
                                        style={
                                            this.state.checked7 === "radio2222222"
                                                ? styles.activeRadion
                                                : styles.inActiveRadion
                                        }
                                    />

                                    <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>NO</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {this.state.checked7 == "radio1111111" ? (
                            <View style={{ flexDirection: "column", marginTop: 6 }}>
                                <TextInput
                                    value={this.state.otherQuantity}
                                    onChangeText={name => this.setState({ otherQuantity: name })}
                                    placeholder={"Others Quantity"}
                                    secureTextEntry={false}
                                    keyboardType="number-pad"
                                    style={styles.input}
                                />
                                <Text style={{ fontFamily: FONT_FAMILY, fontSize: 11 }}>(Must be greater than 0 and less than 200)</Text>
                            </View>
                        ) : null}
                        {this.state.checked7 == "radio1111111" ? (
                            <View style={{ flexDirection: "column", marginTop: 6 }}>
                                <TextInput
                                    value={this.state.otherName}
                                    onChangeText={name => this.setState({ otherName: name })}
                                    placeholder={"Others Name"}
                                    secureTextEntry={false}
                                    style={styles.input}
                                />
                            </View>
                        ) : null}
                        {this.state.checked7 == "radio1111111" ? (
                            <View style={{ flexDirection: "column", marginTop: 6 }}>
                                <TextInput
                                    value={this.state.noOfAnimalsReceivedOther}
                                    onChangeText={name => this.setState({ noOfAnimalsReceivedOther: name })}
                                    placeholder={"No. of animals received Other Support"}
                                    secureTextEntry={false}
                                    keyboardType="number-pad"
                                    style={styles.input}
                                />
                                <Text style={{ fontFamily: FONT_FAMILY, fontSize: 11 }}>(Must be greater than 0 and less than 200)</Text>
                            </View>
                        ) : null}


                        <View style={{ flexDirection: "column", marginTop: 6 }}>
                            <TextInput
                                value={this.state.fodderCultivated}
                                onChangeText={name => this.setState({ fodderCultivated: name })}
                                placeholder={"Fodder Cultivated(in Acres)"}
                                secureTextEntry={false}
                                keyboardType="number-pad"
                                style={styles.input}
                            />
                            <Text style={{ fontFamily: FONT_FAMILY, fontSize: 11 }}>(Must be greater than 0 and less than 200)</Text>
                        </View>

                        <View style={{ flexDirection: "column", marginTop: 6 }}>
                            <Text style={{ fontFamily: FONT_FAMILY, marginHorizontal: 8 }}>Types of Linkages</Text>
                            <View
                                style={{
                                    flexDirection: "column",
                                    width: "100%",
                                    justifyContent: "space-around",
                                     marginTop: 15
                                }}
                            >
                                <TouchableOpacity
                                    style={{ flexDirection: "row" ,marginLeft: 10}}
                                    onPress={() =>
                                        this.setState({ checked8: "radio11111111", typeOfLinkage: "Financial" })
                                    }
                                >
                                    <View
                                        style={
                                            this.state.checked8 === "radio11111111"
                                                ? styles.activeRadion
                                                : styles.inActiveRadion
                                        }
                                    />

                                    <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>Financial</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={{ flexDirection: "row", marginLeft: 10 }}
                                    onPress={() =>
                                        this.setState({ checked8: "radio22222222", typeOfLinkage: "Capacity Strengthening – Market" })
                                    }
                                >
                                    <View
                                        style={
                                            this.state.checked8 === "radio22222222"
                                                ? styles.activeRadion
                                                : styles.inActiveRadion
                                        }
                                    />

                                    <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>Capacity Strengthening – Market</Text>
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
                                        this.setState({ checked8: "radio33333333", typeOfLinkage: "InputResources" })
                                    }
                                >
                                    <View
                                        style={
                                            this.state.checked8 === "radio33333333"
                                                ? styles.activeRadion
                                                : styles.inActiveRadion
                                        }
                                    />

                                    <Text style={{ marginLeft: 5, fontFamily: FONT_FAMILY }}>Input Resources</Text>
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
)(LivestockDiaryForm);
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