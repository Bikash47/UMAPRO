import React, { useState, useEffect } from "react";
import {
  Scene,
  Router,
  Actions,
  Overlay,
  Drawer
} from "react-native-router-flux";
import "react-navigation-magic-move";
import { connect } from "react-redux";
import { connectionCheck, clearHouseholdField } from "./actions/TTFormAction";
import ReduxSample from "./components/ReduxSample";
import LoginComponent from "./components//LoginComponent";
import TrainingTrackingForm from "./components//TrainingTrackingForm";
import StrengtheningWomenLeadershipForm from "./components//StrengtheningWomenLeadershipForm";
import PostHarvestLossReductionForm from "./components/PostHarvestLossReductionForm";
import LivestockPoultryForm from "./components/LivestockPoultryForm";
import LivestockDiaryForm from "./components/LivestockDiaryForm";
import CropDiversificationForm from "./components//CropDiversificationForm";
import LabourSavingTechnologyForm from "./components/LabourSavingTechnologyForm";
import HomesteadKitchenGardenDataForm from "./components/HomesteadKitchenGardenDataForm";
import LivestockGoateryDataForm from "./components/LivestockGoateryDataForm";

import HouseholdSearch from "./components/HouseholdSearch";
import LogDataComponent from "./components/LogDataComponent";

import CustomNavbar from "./components/DrawerComponent/CustomNavbar";
import DrawerContent from "./components/DrawerComponent/DrawerContent";
import Drawer_NavBar from "./components/DrawerComponent/Drawer_NavBar";
import SplashScreen from "./SplashScreen";
import NetInfo from "@react-native-community/netinfo";
import { getSavedData } from "./business/common/AsyncStorage/AsyncStorageDB";
import Dashboard from "./components/Dashboard";
import { USER_SEARCH } from "./config/Config";

import * as MagicMove from "react-native-magic-move";

let savedData = {};

class RouterComponent extends React.Component {
  async componentWillMount() {
    // savedData = await getSavedData(USER_SEARCH);
    this.CheckConnectivity();
  }
  componentDidMount() {
    this.interval = setInterval(() => this.CheckConnectivity(), 1000);
  }
  CheckConnectivity = () => {
    // For Android devices
    NetInfo.fetch().then(state => {
      //alert(state.isConnected)
      // let isConnected = state.type;
      let isConnected = state.isConnected;

      this.props.connectionCheck(isConnected);
    });
  };

  render() {
    return (
      //initial is to show the initial screen on scene

      //Grouping this because of not showing the back button
      //sceneStyle={{paddingTop: 65,}}
      <MagicMove.Provider>
        {/* <View
          style={{ flex: 1 }}
        > */}
        {/* {this.showLoader()} */}
        <Router
          navigationBarStyle={{ backgroundColor: "#669966", elevation: 10 }}
          titleStyle={{
            fontFamily: "Pacifico-Regular",
            fontSize: 22,
            color: "#fff"
          }}
          navBarButtonColor={{ color: "#fff" }}
        >
          <Overlay key="overlay">
            <Scene
              key="main1"
              //    renderLeftButton={NavBar_BackButton}
              hideNavBar={false}
              navBar={CustomNavbar}
              //backButtonImage={{tintColor:'#ffffff'}}
            >
              {/*
                    <Scene key = "Page2" component = {Page2} title="Login"   initial/>
*/}
              <Scene
                key="LoginComponent"
                component={LoginComponent}
                title="Login"
                hideNavBar
              />
              <Scene
                key="Splash"
                component={SplashScreen}
                title="Splash"
                hideNavBar
                initial
              />
              <Scene
                key="HouseholdSearch"
                component={HouseholdSearch}
                title="House"
                hideNavBar
                //initial
                
              />
              <Scene
                key="TrainingTrackingForm"
                component={TrainingTrackingForm}
                title="Training Tracking"
                search="TrainingTrackingForm"
                //initial
              />
              <Scene
                key="StrengtheningWomenLeadershipForm"
                component={StrengtheningWomenLeadershipForm}
                title="Strengthening Women Leadership"
                search="StrengtheningWomenLeadershipForm"
                // initial
              />
              <Scene
                key="LivestockGoateryDataForm"
                component={LivestockGoateryDataForm}
                title="Livestock Goatery"
                search="LivestockGoateryDataForm"
                // initial
              />

              <Scene
                key="PostHarvestLossReductionForm"
                component={PostHarvestLossReductionForm}
                title="Post Harvest Loss Reduction"
                search="PostHarvestLossReductionForm"
                // initial
              />
              <Scene
                key="LivestockPoultryForm"
                component={LivestockPoultryForm}
                title="Livestock Poultry"
                search="LivestockPoultryForm"
                // initial
              />
              <Scene
                key="LivestockDiaryForm"
                component={LivestockDiaryForm}
                title="Livestock Diary"
                search="LivestockDiaryForm"
                // initial
              />
              <Scene
                key="CropDiversificationForm"
                component={CropDiversificationForm}
                title="Crop Diversification"
                search="CropDiversificationForm"
                //initial
              />
              <Scene
                key="LabourSavingTechnologyForm"
                component={LabourSavingTechnologyForm}
                title="Labour Saving Technology"
                search="CropDiversificationForm"
                // initial
              />
              <Scene
                key="HomesteadKitchenGardenDataForm"
                component={HomesteadKitchenGardenDataForm}
                title="Homestead Kitchen Garden"
                search="HomesteadKitchenGardenDataForm"
                // initial
              />

              <Drawer
                hideNavBar
                key="drawer"
                contentComponent={DrawerContent}
                // drawerImage={require('./imgs/menu.png')}
                navBar={Drawer_NavBar}
                drawerWidth={300}
              >
                <Scene
                  key="drawer"
                  // backButtonImage={require('./icons/back.png')}
                  hideNavBar={false}
                  rightTitle="Add"
                  //backButtonImage={{tintColor:'#ffffff'}}
                >
                  <Scene
                    key="Dashboard"
                    component={Dashboard}
                    title="Dashboard"
                    search="Dashboard"
                    //initial
                    onEnter={() => this.props.clearHouseholdField()}
                  />

                  <Scene
                    key="LogData"
                    component={LogDataComponent}
                    title="Log Data"
                    search="LogDataComponent"
                    //initial
                  />
                </Scene>
              </Drawer>
            </Scene>
          </Overlay>
        </Router>
      </MagicMove.Provider>
    );
  }
}

export default connect(
  null,
  { connectionCheck, clearHouseholdField }
)(RouterComponent);
