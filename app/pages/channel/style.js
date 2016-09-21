'use strict';

import React from 'react';
import {Dimensions,StyleSheet} from 'react-native';

var {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    toolbar: {
        height: 38,
        width: width*2
    }
});

export default styles