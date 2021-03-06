/**
 * Created by lyan2 on 16/10/2.
 */
import React, { Component } from 'react';
import {
    Flex,
    InteractionManager,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TouchableOpacity,
    Image,
} from 'react-native';
import Icon from '../../../node_modules/react-native-vector-icons/FontAwesome';

var closeIcon = <Icon style={{color:'#9b9b9b'}} size={16} name="close" />;
var checkIcon = <Icon style={{color:'#9b9b9b'}} size={16} name="check" />;

export default class ConfirmBar extends Component {
    constructor(props) {
        super(props);

        this._onCancelPressed = this.props.onCancel || this._onCancelPressed;
        this._onConfirmPressed = this.props.onConfirm || this._onConfirmPressed;

        this.state = {
            title: props.title
        }
    }

    _onCancelPressed() {

    }

    _onConfirmPressed() {

    }

    render() {
        return (
            <View style={styles.bar}>
                <TouchableHighlight onPress={this._onCancelPressed}>
                    {closeIcon}
                </TouchableHighlight>
                <Text style={styles.barTitle}>{this.state.title}</Text>
                <TouchableHighlight onPress={this._onConfirmPressed}>
                    {checkIcon}
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = {
    bar : {
        flexDirection: 'row',
        backgroundColor: '#ccc',
        height: 30,
        alignItems: 'center',
        paddingHorizontal: 10
    },
    barTitle: {
        flex: 1,
        textAlign: 'center'
    }
}
