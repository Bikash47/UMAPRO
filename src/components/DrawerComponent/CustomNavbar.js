import { Image, Platform, StyleSheet, Text, TouchableOpacity, View, Easing } from 'react-native'
import React from 'react'
import { Actions } from 'react-native-router-flux'
import { NAVIGATION_BAR_COLOR, STATUS_BAR_COLOR, FONT_FAMILY, FONT_FAMILY_BOLD, MODAL_BG_COLOR } from '../../config/ConfigStyle';
import * as Animatable from 'react-native-animatable';
// MyCustomTouchableOpacity = Animatable.createAnimatableComponent(TouchableOpacity);
MyCustomImage = Animatable.createAnimatableComponent(Image);

import * as MagicMove from "react-native-magic-move";

MyCustomTouchableOpacity = MagicMove.createMagicMoveComponent(TouchableOpacity);
export default class CustomNavbar extends React.Component {

    render() {
        return (
            <MagicMove.Scene debug={false} style={[styles.container]}>

                <MagicMove.View id={this.props.title} transition={MagicMove.Transition.flip} easing={Easing.inOut(Easing.ease)} style={[styles.container]}>
                    {this._renderLeft()}
                    {this._renderMiddle()}
                    {/* { this._renderRight() } */}
                </MagicMove.View>
            </MagicMove.Scene>
        )
    }
    _renderLeft() {
        return (
            <TouchableOpacity onPress={() => Actions.pop()}
                style={[styles.navBarItem, { flex: 0.1, paddingLeft: 10 }]}>
                <MyCustomImage animation="slideInLeft"
                    useNativeDriver resizeMode="contain" source={require('../../imgs/back.png')} style={{ width: 20, height: 60 }} />
            </TouchableOpacity>
        )
    }

    _renderMiddle() {
        return (
            <View style={[styles.navBarItem, { flex: 0.9, alignItems: "flex-start" }]}>
                <Text numberOfLines={1} style={{ fontSize: 15, color: MODAL_BG_COLOR, fontFamily: FONT_FAMILY_BOLD }}>{this.props.title}</Text>
            </View>
        )
    }

    _renderRight() {
        return (
            <View style={[styles.navBarItem, { flex: 0.2, justifyContent: 'flex-end' }]}>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        height: (Platform.OS === 'ios') ? 64 : 64,
        flexDirection: 'row',
        backgroundColor: STATUS_BAR_COLOR,
        width: '100%'
    },
    navBarItem: {
        flex: 1,
        justifyContent: 'center',
    }
});