import React from "react";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Text,
  View,
  ViewPropTypes,
  FlatList,
  Image,
  Platform,
  ImageBackground,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  //NetInfo,
  Button,
  ActivityIndicator
} from "react-native";
import DrawerItem from "./DrawerItem";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import {
  STATUS_BAR_COLOR,
  COMMON_GREEN_COLOR,
  FONT_FAMILY,
  FONT_FAMILY_BOLD,
  MODAL_BG_COLOR
} from "../../config/ConfigStyle";
import { onLogOut } from "../../actions/TTFormAction";
import {
  USER_PROFILE_IMAGE_API,
  USER_SEARCH,
  LOGIN_EMAIL,
  LOGIN_TIME
} from "../../config/Config";
import {
  clearLoginSession,
  getLoginSessionData,
  saveData,
  getSavedData
} from "../../business/common/AsyncStorage/AsyncStorageDB";
let data = {};

import NetInfo from "@react-native-community/netinfo";
// import DeviceInfo from 'react-native-device-info';
// import Shimmer from 'react-native-shimmer';
import moment from "moment";

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: STATUS_BAR_COLOR
  },
  textFontStyle: {
    color: "#fff",
    fontSize: 17,
    marginTop: 5,
    fontFamily: FONT_FAMILY_BOLD
  },
  text2nd: {
    color: "#fff",
    fontSize: 16,
    marginTop: 2,
    fontFamily: FONT_FAMILY
  }
});

class DrawerContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: "Dashboard",
      userName: "Login",
      mobile: "",
      datas: [],
      refresh: false,
      email: "getting info..."
    };
  }

  func_refreshComponent() {
    this.func_getAllUserData();

    this.setState({
      refresh: !this.state.refresh
    });
  }

  async componentWillMount() {
    //data = await getLoginSessionData();
    // this.func_getAllUserData();
    id = await getSavedData(LOGIN_EMAIL);
    this.setState({ email: id });
    this.renderData();
    //this.CheckConnectivity();
    //
    // debugger;
    // if(data.hasOwnProperty("user_id")){

    // }else{
    //     Actions.OtpLoginComponent();
    // }
  }
  async func_getAllUserData() {
    if (data.hasOwnProperty("vendor_type")) {
      if (data.vendor_type === "I" || data.vendor_type === "C") {
        this.setState({ selectedIndex: "" });
        await this.props.getGroupVendorDetails();
      }
    } else {
      this.setState({ selectedIndex: "UserSearchVendorComponent" });
      await this.props.getUserDetails();
    }
  }

  static propTypes = {
    name: PropTypes.string,
    sceneStyle: ViewPropTypes.style,
    title: PropTypes.string
  };

  renderData() {
    return (this.state.datas = [
      {
        name: "Dashboard",
        route: "Dashboard",
        icon: require("../../imgs/back.png"),
        bg: "#C5F442"
      },
      {
        name: "Log Data",
        route: "LogData",
        icon: require("../../imgs/back.png"),
        bg: "#C5F442"
      },
      {
        name: "Logout",
        route: "Logout",
        icon: require("../../imgs/back.png"),
        bg: "#C5F442"
      }
    ]);
  }

  static contextTypes = {
    drawer: PropTypes.object
  };

  // CheckConnectivity = () => {
  //   // For Android devices
  //   NetInfo.fetch().then(state => {
  //       console.log("Connection type", state.type);
  //       console.log("Is connected?", state.isConnected);
  //       alert(state.type)
  //       alert(state.isConnected)
  //     });
  // };

  handleFirstConnectivityChange = isConnected => {
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleFirstConnectivityChange
    );

    if (isConnected === false) {
      Alert.alert("You are offline!");
    } else {
      Alert.alert("You are online!");
    }
  };

  func_setSelectedIndex(indexName) {
    Actions.drawerClose();
    switch (indexName) {
      case "Dashboard":
        Actions.Dashboard();
        break;
      case "LogData":
        Actions.LogData();
        break;
      case "Logout":
        Alert.alert(
          "",
          "Are you sure you want to logout ?",
          [
            {
              text: "Maybe later",
              onPress: () => console.log("cancel"),
              style: "cancel"
            },
            { text: "Yes", onPress: () => this.cleareUserData() }
          ],
          { cancelable: true }
        );
        break;

      default:
        break;
    }

    this.setState({
      selectedIndex: indexName
    });
  }

  async cleareUserData() {
    let isConnection = this.props.is_connection;
    this.props.onLogOut(isConnection);
    //  await clearLoginSession();
  }
  renderRoutes() {
    return (
      <FlatList
        data={this.state.datas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <DrawerItem
            key={item.route}
            fromClass={this}
            selectedIndex={this.state.selectedIndex}
            route={item}
          />
        )} // key={item.routeno} route={item} navigate={this.props.navigation}
        extraData={this.state}
      />
    );
  }
  checkConnection() {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        console.log("Internet is connected");
      }
    });
  }

  //
  render() {
    // this.getUserRecord();
    // console.log("Action data " + this.props.base64_dataimg);
    return (
      <View style={{ flex: 1, backgroundColor: STATUS_BAR_COLOR }}>
        {/* <View style={{flex: 1, backgroundColor: "red", justifyContent: 'center', alignItems: 'center',}}><Text>image</Text></View>*/}

        <View style={styles.container}>
          <View
            style={{
              borderBottomColor: "#0f0",
              borderBottomWidth: 2,
              height: "20%",
              width: "100%",
              backgroundColor: "transparent",
              justifyContent: "center",
              alignItems: "flex-start"
            }}
          >
            {/* <Shimmer style={{position:'absolute', top:0,right:2}}>
              <Text style={{ color: '#fff', alignSelf: 'center', fontFamily: FONT_FAMILY,fontSize:11 }}>Version: DEMO{DeviceInfo.getVersion()}</Text>
            </Shimmer> */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "transparent"
              }}
            >
              <View
                style={{
                  flex: 0.3,
                  backgroundColor: "transparent",
                  justifyContent: "center",
                  alignItems: "flex-end"
                }}
              >
                <Image
                  resizeMode="stretch"
                  source={require("../../imgs/profile.png")}
                  style={{ height: 30, width: 30, borderRadius: 15 }}
                />
              </View>
              <View
                style={{
                  flex: 0.7,
                  backgroundColor: "transparent",
                  marginLeft: 10,
                  justifyContent: "center",
                  alignItems: "flex-start",
                  alignSelf: "center"
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 15,
                    color: "#fff",
                    fontFamily: FONT_FAMILY
                  }}
                >
                  {this.state.email}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 1, backgroundColor: "#af2e2f" }}>
            {this.renderRoutes()}
          </View>
        </View>
        <View
          style={[
            {
              width: "100%",
              height: 40,
              justifyContent: "center",
              alignItems: "center"
            },
            this.props.is_connection
              ? { backgroundColor: "#0f0" }
              : { backgroundColor: "#f00" }
          ]}
        >
          <Text style={{ fontFamily: FONT_FAMILY_BOLD, fontSize: 15 }}>
            {this.props.is_connection ? "Currently online" : "You are offline"}
          </Text>
        </View>
      </View>
    );
  }
  
  // func_renderUserDetails() {
  //     debugger;
  //     if (data.hasOwnProperty("vendor_type")) {
  //         if (data.vendor_type === "I" || data.vendor_type === "C") {
  //         //    if(this.props.base64_dataimg === ""){
  //         //     console.log("URL " + USER_PROFILE_IMAGE_API + this.props.groupvendor_profile)
  //         //     }
  //             return(
  //                 <ImageBackground resizeMode="stretch" source={{ uri:this.props.base64_dataimg }} style={{flex:1, justifyContent:'center', alignItems:'center' }}>
  //                 <View style={{height:'100%', width:'100%' ,justifyContent:'center', alignItems:'flex-start', backgroundColor:'rgba(0,0,0,0.7)'}}>
  //                 <TouchableWithoutFeedback style={{flex:1,justifyContent: 'flex-end', alignItems: 'flex-start', }} onPress={() => Actions.GroupVendorProfile({context:this})}>
  //                     <View style={{
  //                         justifyContent: 'flex-end',
  //                         alignItems: 'flex-start',
  //                         // height: 190,
  //                         height:'100%', width:'100%',
  //                         ...Platform.select({
  //                             ios: {
  //                                 width: 300,
  //                             },

  //                         })
  //                     }}>
  //                         {this.props.groupvendor_update_contact === '' ?
  //                         <ImageBackground resizeMode="stretch" source={require('../../imgs/drawer-header-background.png')} style={{height:'100%', width:'100%', justifyContent:'center', alignItems:'center' }}>
  //                             <Text style={{ color: COMMON_GREEN_COLOR, alignSelf: 'center', fontFamily: FONT_FAMILY }}>Getting info..</Text>
  //                         </ImageBackground> :
  //                         <TouchableOpacity style={{flex:1,height:'100%', width:'100%'}} onPress={() => Actions.GroupVendorProfile({context:this})}>
  //                             <View style={{flex:0.7, alignItems:'center', justifyContent:'center'}}>
  //                                 <View style={{borderRadius: 55, height: 105, width: 105, borderColor:MODAL_BG_COLOR, borderWidth:2, alignItems:'center', justifyContent:'center'}}>
  //                                     <Image source={{ uri:this.props.base64_dataimg }}
  //                                         resizeMode="cover"
  //                                         style={{ borderRadius: 50, height: 100, width: 100, borderWidth:2, borderColor:"white" }} />
  //                                 </View>
  //                             </View>
  //                             <View style={{ flex:0.3,alignItems:'center', justifyContent:'center', paddingLeft:10}}>

  //                                 <Text style={[styles.textFontStyle]}>{this.props.groupvendor_update_fullname === '' ? '' : this.props.groupvendor_update_fullname}</Text>
  //                                 <Text style={[styles.text2nd]}>{this.props.groupvendor_update_contact === '' ? '' : this.props.groupvendor_update_contact}</Text>

  //                             </View>
  //                             </TouchableOpacity>}
  //                     </View>
  //                 </TouchableWithoutFeedback>
  //                 </View>
  //                 </ImageBackground>

  //             )
  //         }
  //     } else {
  //         RNFetchBlob.config({
  //             fileCache: true
  //           })
  //             .fetch("GET", USER_PROFILE_IMAGE_API + this.props.update_profile)
  //             // the image is now dowloaded to device's storage
  //             .then(resp => {
  //                 debugger;
  //               // the image path you can use it directly with Image component
  //               imagePath = resp.path();
  //               return resp.readFile("base64");
  //             })
  //             .then(base64Data => {
  //                 debugger;
  //               // here's base64 encoded image
  //               this.props.setBase64ForUser(base64Data);
  //               imagePath = base64Data;
  //              // this.setState({refresh:!this.state.refresh})
  //               // remove the file from storage
  //               return fs.unlink(imagePath);
  //             });
  //         return (
  //             <ImageBackground resizeMode="stretch" source={{ uri:this.props.base64_dataimg }} style={{flex:1, justifyContent:'center', alignItems:'center' }}>
  //                 <View style={{height:'100%', width:'100%' ,justifyContent:'center', alignItems:'flex-start', backgroundColor:'rgba(0,0,0,0.7)'}}>

  //             <TouchableWithoutFeedback style={{justifyContent: 'flex-end', alignItems: 'flex-start', }} onPress={() => Actions.UserProfileComponent()}>
  //                 <View style={{
  //                     justifyContent: 'flex-end',
  //                     alignItems: 'flex-start',
  //                     //height: 190,
  //                     height:'100%', width:'100%',
  //                     ...Platform.select({
  //                         ios: {
  //                             width: 300,
  //                         },

  //                     }),
  //                 }}>
  //                     {this.props.update_contact === '' ?
  //                     <ImageBackground resizeMode="stretch" source={require('../../imgs/drawer-header-background.png')} style={{height:'100%', width:'100%', justifyContent:'center', alignItems:'center' }}>
  //                         <Text style={{ color: COMMON_GREEN_COLOR, alignSelf: 'center', fontFamily: FONT_FAMILY }}>Getting info..</Text>
  //                     </ImageBackground>
  //                  :
  //                  <TouchableOpacity style={{flex:1,height:'100%', width:'100%'}} onPress={() => Actions.UserProfileComponent()}>
  //                             <View style={{flex:0.7, alignItems:'center', justifyContent:'center'}}>
  //                                 <View style={{borderRadius: 55, height: 105, width: 105, borderColor:MODAL_BG_COLOR, borderWidth:2, alignItems:'center', justifyContent:'center'}}>
  //                                     <Image source={{ uri:this.props.profile_base64_user}}
  //                                         style={{ borderRadius: 35, height: 70, width: 70 }} />
  //                                 </View>
  //                             </View>
  //                             <View style={{ flex:0.3,alignItems:'center', justifyContent:'center', paddingLeft:10}}>

  //                             <Text style={[styles.textFontStyle]}>{this.props.update_fullname === '' ? '' : this.props.update_fullname}</Text>
  //                             <Text style={[styles.text2nd]}>{this.props.update_contact === '' ? '' : this.props.update_contact}</Text>
  //                             </View>
  //                     </TouchableOpacity>}
  //                 </View>
  //             </TouchableWithoutFeedback>
  //             </View>
  //             </ImageBackground>
  //         )
  //     }
  // }
}
const mapStateToProps = ({ formtt }) => {//
  // email:auth.state.email;
  const { is_connection, logoutLoading } = formtt;
  return { is_connection, logoutLoading };
};
export default connect(
  mapStateToProps,
  { onLogOut }
)(DrawerContent);
