/**
 * Created by lyan2 on 16/8/2.
 */
import React, { Component } from 'react';
import {
    CameraRoll,
    Dimensions,
    Image,
    Navigator,
    Platform,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import Toolbar from '../../components/toolbar';
//import ToolbarFilter from '../../components/toolbar/ToolbarFilter';
import PhoneLib from '../../components/camera/PhoneLib';
import StoreActions from '../../constants/actions';
import PhotoEditPage from './PhotoEditPage';
import ImageButton from '../../components/toolbar/ImageButton';
const arrowImg = require('../../assets/header/arrow.png');
import styles from './style';

class SelectPhotoPage extends Component {
    constructor(props, context) {
        super(props);

        this.state = {
            showToolbarFilter: false
        };

        this.cameraOptions = {
            title: '选择照片',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        this.phoneLibOptions = {
            title: '选择照片',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        }
    }

    _onPressCamera() {
        // The first arg is the options object for customization (it can also be null or omitted for default options),
        // Launch Camera:
        ImagePicker.launchCamera(this.cameraOptions, (response)  => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                // You can display the image using either data...
                const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

                // or a reference to the platform specific asset location
                if (Platform.OS === 'ios') {
                    const source = {uri: response.uri.replace('file://', ''), isStatic: true};
                } else {
                    const source = {uri: response.uri, isStatic: true};
                }

                this.setState({
                    avatarSource: source
                });
            }
        });
    }

    _onPressImageLib() {
        // More info on all the options is below in the README...just some common use cases shown here
        var options = {
            title: 'Select Avatar',
            customButtons: {
                'Choose Photo from Facebook': 'fb',
            },
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        // Open Image Library:
        ImagePicker.launchImageLibrary(this.phoneLibOptions, (response)  => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                // You can display the image using either data...
                const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

                // or a reference to the platform specific asset location
                if (Platform.OS === 'ios') {
                    const source = {uri: response.uri.replace('file://', ''), isStatic: true};
                } else {
                    const source = {uri: response.uri, isStatic: true};
                }

                this.setState({
                    avatarSource: source
                });
            }
        });
    }
    
    _onPressImage(imageNode) {
        console.log(imageNode);

        this.setState({
            avatarSource: imageNode.image
        });
    }

    _getFirstImage(data) {
        if (data != null) {
            let assets = data.edges;
            if (assets.length > 0) {
                this.setState({avatarSource: assets[0].node.image});
            }
        }
    }

    _onCancel() {
        const { navigator } = this.props;

        if(navigator) {
            navigator.pop();
        }
    }

    _onContinue() {
        const { navigator, dispatch } = this.props;

        dispatch({type:StoreActions.ADD_NOTE_PHOTO, photo: this.state.avatarSource});

        if(navigator) {
            navigator.push({
                name: 'PhotoEditPage',
                component: PhotoEditPage,
                params: {photo:this.state.avatarSource}
            })
        }
    }

    _showFilter() {
        this.setState({showToolbarFilter: true});
    }

    componentDidMount() {
        var fetchParams: Object = {
            first: 1,
            groupTypes: 'SavedPhotos',
            assetType: "Photos"
        };

        if (Platform.OS === 'android') {
            // not supported in android
            delete fetchParams.groupTypes;
        }

        CameraRoll.getPhotos(fetchParams)
            .then((data) => this._getFirstImage(data), (e) => logError(e));
    }

    render() {
        let {height, width} = Dimensions.get('window');
        
        return (
            <View style={styles.container}>
                <Toolbar
                    title="所有照片"
                    onTitlePress = {this._onPressImageLib.bind(this)}
                    navigator={this.props.navigator}
                    hideDrop={true}
                    rightText='继续'
                    rightImgPress={this._onContinue.bind(this)}
                    />
                <View>
                    <Image source={this.state.avatarSource} style={styles.uploadAvatar} width={width} height={200} />
                </View>
                <PhoneLib ref={(component) => this.phoneLib = component} navigator={this.props.navigator} onPressCamera={this._onPressCamera} onPressImage={this._onPressImage.bind(this)} />

            </View>
        );
    }
}

// get selected photos from store.state object.
function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(SelectPhotoPage);