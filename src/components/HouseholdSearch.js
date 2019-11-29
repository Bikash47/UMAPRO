import React, { Component } from "react";
import {
  Alert,
  Button,
  TextInput,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import {
  housldSearch,
  getSearchData,
  setHouseholdField
} from "../actions/TTFormAction";
import { Actions } from "react-native-router-flux";
import { Card, CardSection } from "./common";
class HouseholdSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaderIndicator: true
    };
  }
  async componentWillMount() {
    if (this.props.form_data.length == 0) {
      await this.props.getSearchData();
      if (this.props.form_data.length > 0) {
        this.setState({ loaderIndicator: false });
      } else {
        this.setState({ loaderIndicator: true });
      }
    } else {
      this.setState({ loaderIndicator: false });
    }
  }
  render() {
    let arr = this.props.form_data;
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <View
          style={{
            width: "100%",
            height: 60,
            backgroundColor: "#FFF",
            elevation: 5,
            flexDirection: "row"
          }}
        >
          <TouchableOpacity
            style={{
              marginLeft: 5,
              width: 30,
              height: "100%",
              padding: 5,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row"
            }}
            onPress={() => Actions.pop()}
          >
            <Image
              style={{ width: 30, height: 20 }}
              source={require("../imgs/left.png")}
            />
          </TouchableOpacity>
          <TextInput
            //value={this.state.password}
            onChangeText={text => this.props.housldSearch(text, arr)}
            placeholder={"Select Household"}
            secureTextEntry={false}
            style={styles.input}
          />
        </View>
        {this.func_renderContent()}
      </View>
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
      return this.getFlatList();
    }
  }
  getFlatList() {
    debugger;
    let formData = this.props.form_data;
    debugger;
    return (
      <FlatList
        data={
          this.props.serch_data.length == 0
            ? this.props.form_data
            : this.props.serch_data
        }
        renderItem={({ item }) => (
          <Card>
            <CardSection>
              <TouchableOpacity
                onPress={() => {
                  this.props.setHouseholdField(item);
                  Actions.pop();
                }}
              >
                <Text>{item.nameserch}</Text>
              </TouchableOpacity>
            </CardSection>
          </Card>
        )}
      />
    );
  }
}
const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 44,
    padding: 10,
    // borderWidth: 0.5,
    borderColor: "#ccc",
    //borderRadius: 5,
    //  marginBottom: 10,
    marginTop: 6
  }
});
const mapStateToProps = ({ formtt }) => {
  // email:auth.state.email;
  const { serch_data, form_data } = formtt;
  return { serch_data, form_data };
};
export default connect(
  mapStateToProps,
  { housldSearch, getSearchData, setHouseholdField }
)(HouseholdSearch);
