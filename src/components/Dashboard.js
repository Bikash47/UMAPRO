import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    NetInfo,
    TouchableHighlight,
    ScrollView,
    RefreshControl,
    Image,
    ImageBackground,
    Dimensions,
    BackHandler,
    StatusBar, FlatList,
    Platform, AsyncStorage, Easing, TouchableNativeFeedback, PermissionsAndroid, ActivityIndicator
} from "react-native";
import { ProgressBar } from "./common";
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import RNExitApp from 'react-native-exit-app';
// import {GRIEVANCES, PROFILE,MYCARDS} from "../config/Config";
import Snackbar from 'react-native-snackbar';
import { FONT_FAMILY, FONT_FAMILY_BOLD, STATUS_BAR_COLOR } from '../config/ConfigStyle';
import * as Animatable from 'react-native-animatable';
import * as MagicMove from "react-native-magic-move";
import {clearHouseholdField } from "../actions/TTFormAction";

MyCustomTouchableOpacity = MagicMove.createMagicMoveComponent(TouchableOpacity);

class Dashboard extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress.bind(this));
    }
    componentDidMount() { }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress.bind(this));
    }
    onBackPress() {
        // debugger;
        if (Actions.currentScene === 'Dashboard') {
            Snackbar.show({
                title: 'Press EXIT to close the app',
                duration: Snackbar.LENGTH_SHORT,
                color: 'white',
                action: {
                    title: 'EXIT',
                    color: 'red',
                    onPress: () => {
                        RNExitApp.exitApp();
                    },
                },
            });

            return true;
        }
        return false;
    }

    func_stillWorking() {
        Snackbar.show({
            title: 'We are currently working on it',
            color: 'white',
            duration: Snackbar.LENGTH_SHORT,
            action: {
                title: 'EXIT',
                color: 'red',
                onPress: () => {
                    RNExitApp.exitApp();
                },
            },
        });
    }

    render() {
        debugger;
        console.log(this.props.logoutLoading);
        return (
            <MagicMove.Scene style={style.container} debug={false}>

                {!this.props.logoutLoading ? <View style={style.container}>
                    <StatusBar hidden={false} />
                    <ScrollView scrollEnabled={false}
                        contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Animatable.View animation="fadeInUpBig"
                            useNativeDriver
                            delay={500}
                            style={{
                                height: Dimensions.get("window").height - 120,
                                width: Dimensions.get("window").width - 40,
                                backgroundColor: STATUS_BAR_COLOR,
                            }}>
                            {/* 1st row */}
                            <View style={[style.Boxes, style.BoxesForRows]}>
                                <MagicMove.View style={style.separateBoxes} id="Crop Diversification" transition={MagicMove.Transition.morph} easing={Easing.inOut(Easing.ease)} >
                                    <TouchableOpacity onPress={() => Actions.CropDiversificationForm()} style={{
                                        flex: 1,
                                        backgroundColor: "transparent",
                                        // margin: 2,
                                        // borderRadius: 5,
                                        justifyContent: "center",
                                        alignItems: "center", padding: 20, backgroundColor: 'transparent'
                                    }}>

                                        <View style={style.separateInnerBox}>
                                            <View style={style.imageWrapper}>
                                                <Image
                                                    source={require("../imgs/crop.png")}//18604195555 1860500  PPR002402386980
                                                    style={style.Icons}
                                                />
                                            </View>
                                            <View style={style.textWrapper}>
                                                <Text style={style.TextStyle}>CD</Text>
                                            </View>
                                        </View>

                                    </TouchableOpacity>
                                </MagicMove.View>
                                <MagicMove.View id="Homestead Kitchen Garden" transition={MagicMove.Transition.morph} easing={Easing.inOut(Easing.ease)} style={style.separateBoxes}>
                                    <TouchableOpacity onPress={() => Actions.HomesteadKitchenGardenDataForm()} style={{
                                        flex: 1,
                                        backgroundColor: "transparent",
                                        // margin: 2,
                                        // borderRadius: 5,
                                        justifyContent: "center",
                                        alignItems: "center", padding: 20, backgroundColor: 'transparent'
                                    }}>

                                        <View style={style.separateInnerBox}>
                                            <View style={style.imageWrapper}>
                                                <Image
                                                    source={require("../imgs/hkg.png")}//18604195555 1860500  PPR002402386980
                                                    style={style.Icons}
                                                />
                                            </View>
                                            <View style={style.textWrapper}>
                                                <Text style={style.TextStyle}>HKG</Text>
                                            </View>
                                        </View>

                                    </TouchableOpacity>
                                </MagicMove.View>
                                <MagicMove.View id="Labour Saving Technology" transition={MagicMove.Transition.morph} easing={Easing.inOut(Easing.ease)}
                                    style={style.separateBoxes}>
                                    <TouchableOpacity onPress={() => Actions.LabourSavingTechnologyForm()} style={{
                                        flex: 1,
                                        backgroundColor: "transparent",
                                        // margin: 2,
                                        // borderRadius: 5,
                                        justifyContent: "center",
                                        alignItems: "center", padding: 20, backgroundColor: 'transparent'
                                    }}>

                                        <View style={style.separateInnerBox}>
                                            <View style={style.imageWrapper}>
                                                <Image
                                                    source={require("../imgs/labour-saving.png")}
                                                    style={style.Icons}
                                                />
                                            </View>
                                            <View style={style.textWrapper}>
                                                <Text style={style.TextStyle}>LST</Text>
                                            </View>
                                        </View>

                                    </TouchableOpacity>
                                </MagicMove.View>

                            </View>

                            {/* 2nd row */}

                            <View style={[style.Boxes, style.BoxesForRows]}>
                                <MagicMove.View id="Livestock Goatery" transition={MagicMove.Transition.morph} easing={Easing.inOut(Easing.ease)}
                                    style={style.separateBoxes}>
                                    <TouchableOpacity onPress={() => Actions.LivestockGoateryDataForm()} style={{
                                        flex: 1,
                                        backgroundColor: "transparent",
                                        // margin: 2,
                                        // borderRadius: 5,
                                        justifyContent: "center",
                                        alignItems: "center", padding: 20, backgroundColor: 'transparent'
                                    }}>
                                        <View style={style.separateInnerBox}>
                                            <View style={style.imageWrapper}>
                                                <Image source={require("../imgs/goateryUntitled-2.png")}
                                                    style={style.Icons}
                                                />
                                            </View>
                                            <View style={style.textWrapper}>
                                                <Text style={style.TextStyle}>LSG</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </MagicMove.View>

                                <MagicMove.View id="Livestock Poultry" transition={MagicMove.Transition.morph} easing={Easing.inOut(Easing.ease)} style={style.separateBoxes}>
                                    <TouchableOpacity onPress={() => Actions.LivestockPoultryForm()} style={{
                                        flex: 1,
                                        backgroundColor: "transparent",
                                        // margin: 2,
                                        // borderRadius: 5,
                                        justifyContent: "center",
                                        alignItems: "center", padding: 20, backgroundColor: 'transparent'
                                    }}>

                                        <View style={style.separateInnerBox}>
                                            <View style={style.imageWrapper}>
                                                <Image
                                                    source={require("../imgs/poultry.png")}
                                                    style={style.Icons}
                                                />
                                            </View>
                                            <View style={style.textWrapper}>
                                                <Text numberOfLines={1} style={style.TextStyle}>LSP</Text>
                                            </View>
                                        </View>

                                    </TouchableOpacity>
                                </MagicMove.View>
                                <MagicMove.View id="Livestock Diary" transition={MagicMove.Transition.morph} easing={Easing.inOut(Easing.ease)}
                                    style={style.separateBoxes}>
                                    <TouchableOpacity onPress={() => Actions.LivestockDiaryForm()} style={{
                                        flex: 1,
                                        backgroundColor: "transparent",
                                        // margin: 2,
                                        // borderRadius: 5,
                                        justifyContent: "center",
                                        alignItems: "center", padding: 20, backgroundColor: 'transparent'
                                    }}>

                                        <View style={style.separateInnerBox}>
                                            <View style={style.imageWrapper}>
                                                <Image
                                                    source={require("../imgs/dairy.png")}
                                                    style={style.Icons}
                                                />
                                            </View>
                                            <View style={style.textWrapper}>
                                                <Text style={style.TextStyle}>LSD</Text>
                                            </View>
                                        </View>

                                    </TouchableOpacity>
                                </MagicMove.View>
                            </View>


                            {/* 3rd row */}
                            <View style={[style.Boxes, style.BoxesForRows]}>
                                <MagicMove.View id="Post Harvest Loss Reduction" transition={MagicMove.Transition.morph} easing={Easing.inOut(Easing.ease)}
                                    style={style.separateBoxes}>
                                    <TouchableOpacity onPress={() => Actions.PostHarvestLossReductionForm()} style={{
                                        flex: 1,
                                        backgroundColor: "transparent",
                                        // margin: 2,
                                        // borderRadius: 5,
                                        justifyContent: "center",
                                        alignItems: "center", padding: 20, backgroundColor: 'transparent'
                                    }}>

                                        <View style={style.separateInnerBox}>
                                            <View style={style.imageWrapper}>
                                                <Image
                                                    source={require("../imgs/harvest-loss.png")}
                                                    style={style.Icons}
                                                />
                                            </View>
                                            <View style={style.textWrapper}>
                                                <Text style={style.TextStyle}>PHLR</Text>
                                            </View>
                                        </View>

                                    </TouchableOpacity>
                                </MagicMove.View>
                                <MagicMove.View id="Strengthening Women Leadership" transition={MagicMove.Transition.morph} easing={Easing.inOut(Easing.ease)}
                                    style={style.separateBoxes}>
                                    <TouchableOpacity onPress={() => Actions.StrengtheningWomenLeadershipForm()} style={{
                                        flex: 1,
                                        backgroundColor: "transparent",
                                        // margin: 2,
                                        // borderRadius: 5,
                                        justifyContent: "center",
                                        alignItems: "center", padding: 20, backgroundColor: 'transparent'
                                    }}>

                                        <View style={style.separateInnerBox}>
                                            <View style={style.imageWrapper}>
                                                <Image
                                                    source={require("../imgs/swl.png")}
                                                    style={style.Icons}
                                                />
                                            </View>
                                            <View style={style.textWrapper}>
                                                <Text style={style.TextStyle}>SWL</Text>
                                            </View>
                                        </View>

                                    </TouchableOpacity>
                                </MagicMove.View>
                                <MagicMove.View id="Training Tracking" transition={MagicMove.Transition.morph} easing={Easing.inOut(Easing.ease)}
                                    style={{
                                        flex: 1,
                                        backgroundColor: "rgba(255,255,255,0.2)",
                                        margin: 2,
                                        borderRadius: 5,
                                        justifyContent: "center",
                                        alignItems: "center", padding: 20, paddingTop: 0, paddingBottom: 0
                                    }}>
                                    <TouchableOpacity onPress={() => Actions.TrainingTrackingForm()} style={{
                                        flex: 1,
                                        backgroundColor: "transparent",
                                        // margin: 2,
                                        // borderRadius: 5,
                                        justifyContent: "center",
                                        alignItems: "center", padding: 20, backgroundColor: 'transparent'
                                    }}>

                                        <View style={style.separateInnerBox}>
                                            <View style={style.imageWrapper}>
                                                <Image
                                                    source={require("../imgs/training.png")}
                                                    style={style.Icons}
                                                />
                                            </View>
                                            <View style={style.textWrapper}>
                                                <Text style={style.TextStyle}>TT</Text>
                                            </View>
                                        </View>

                                    </TouchableOpacity>
                                </MagicMove.View>
                            </View>
                        </Animatable.View>
                    </ScrollView>

                </View> : <ActivityIndicator size="large" color="#ffffff" />}
            </MagicMove.Scene>

        );
    }
}
const mapStateToProps = ({ formtt }) => {
    // email:auth.state.email;
    const {
        logoutLoading
    } = formtt;
    return { logoutLoading };
};

const style = {
    container: {
        flex: 1,
        backgroundColor: '#af2e2f'
    },
    BackgroundImage: {
        flex: 1,
        alignSelf: "stretch",
        width: null,
        justifyContent: "center"
    },
    containerBody: {
        height: (Dimensions.get('window').height) - 80,
        margin: 30,
        justifyContent: "space-between",
    },
    Boxes: {
        flex: 1,
        backgroundColor: "rgba(255,255,255,0)"

    },
    BoxesForRows: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    separateBoxes: {
        flex: 1,
        backgroundColor: "rgba(255,255,255,0.2)",
        margin: 2,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center", padding: 20, paddingTop: 0, paddingBottom: 0
    },
    separateInnerBox: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center"
    },
    imageWrapper: { flex: 0.6, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'transparent' },
    textWrapper: { flex: 0.4, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'transparent' },
    Icons: {
        height: 50,
        width: 50

    },
    TextStyle: {
        marginTop: 5,
        color: "#fff",
        fontWeight: "400",
        fontSize: 15,
        fontFamily: FONT_FAMILY,
        textAlign: "center", marginHorizontal: 5
    },
    feedbackView: {
        flex: 1,
        backgroundColor: "rgba(255,255,255,0.2)",
        margin: 4,
        borderRadius: 5
    }
};
export default connect(mapStateToProps, { clearHouseholdField})(Dashboard);
//**Module Full Names */

// Crop Diversification
// Homestead Kitchen Garden Form
// Labour Saving Technology Form
// Livestock-Goatery Form
// Livestock-Polutry Form
// Livestock-Diary Form
// Post Harvest Loss Reduction Form
// Strengthening Women Leadership Form
// Training Ticket Form