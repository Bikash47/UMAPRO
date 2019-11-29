import React, {Component} from 'react';
import {View, Text, ScrollView, FlatList} from 'react-native';
import {Card, CardSection, Input, Button, ProgressBar} from "./common";
import {emailChanged, passwordChange, sampleApiCallWigh_Params, sampleApiCall} from '../actions'
import {connect} from 'react-redux';
//import {Movie1} from "../business/common/realmDB/Realm";


class ReduxSample extends Component {

    onEmailChange(text) {
        this.props.emailChanged(text);
    }

    onPaswordChange(text) {
        this.props.passwordChange(text);
    }

    onLoginPress() {
        const {email, password} = this.props;
        this.props.sampleApiCallWigh_Params({email, password});
    }


    onStopListGet() {

      //  this.props.allStops({});
        this.props.sampleApiCall({});
    }

    renderAlbums() {
        this.props.monitoredStopVisit({});
        this.props.monitordData.map(monitorDataList => monitorDataList.MonitoredStopVisit.map(monitorList =>
            <Text>{monitorList.RecordedAtTime}</Text>));

    }

   /* clearCache() {
        Movie1.deleteAll("TEST2");
        console.log("cache cleared");
        alert("cache cleared")
    */

    renderButton() {

    }

    render() {
        console.log("Email " + this.props.originList.length)
        this.props.monitordData.map(monitorDataList => monitorDataList.MonitoredStopVisit.map(monitorList => console.log("List Item" + monitorList.RecordedAtTime)));

        return (

            <Card>

                <CardSection>
                    <Input
                        label='Email'
                        placeholder='admin@gmail.com'
                        onChangeText={this.onEmailChange.bind(this)} // Because of callback we gonna bind the context
                        value={this.props.email}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label='Password'
                        placeholder='password'
                        onChangeText={this.onPaswordChange.bind(this)} // Because of callback we gonna bind the context
                        value={this.props.password}
                    />

                </CardSection>

                <CardSection>
                </CardSection>
                <CardSection>
                    <Button
                        onPress={this.onStopListGet.bind(this)}
                    >
                        Login
                    </Button>
                </CardSection>
                {this.renderButton()}


            </Card>

        );

    }
}

const mapStateToProps = ({auth}) => {
   // email:auth.state.email;
    const {email, password, resp, monitordData, loading, originList} = auth;
    return {email, password, resp, monitordData, loading, originList};
}

export default connect(mapStateToProps, {
    emailChanged,
    passwordChange,
    sampleApiCallWigh_Params,
    sampleApiCall
})(ReduxSample);