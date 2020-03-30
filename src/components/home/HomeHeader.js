import React, { useState, useMemo } from 'react';
import { 
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    ImageBackground,
    Dimensions
} from 'react-native';
import Animated from "react-native-reanimated";
import {STATUS_BAR_HEIGHT, HEADER_HEIGHT, profiles_next} from './../../constants/constants';
const {height, width} = Dimensions.get('screen');

const HomeHeader = ({
    navigation,
    miniatureStyle
}) => {

    return (
        <View style={styles.header}>

            <TouchableOpacity style={styles.header_icon_left}>
                <Image style={{width: '100%', height: '100%'}} source={require('./../../../assets/img/account.png')} />
            </TouchableOpacity>

            <Animated.View style={{ ...miniatureStyle, ...styles.miniature_container }}>
                <TouchableOpacity onPress={() => navigation.navigate('AdHome', {profile: profiles_next[0]})} style={styles.miniature}>
                    <ImageBackground style={styles.miniature} source={{uri: profiles_next[0].picture}} />
                </TouchableOpacity>
            </Animated.View>

            <TouchableOpacity style={styles.header_icon_right}>
                <Image style={{width: '70%', height: '70%'}} source={require('./../../../assets/img/conv.png')} />
            </TouchableOpacity>

        </View>
    )
};

const styles = StyleSheet.create({
    header: {
        width,
        height: HEADER_HEIGHT,
        marginTop: STATUS_BAR_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    header_icon_left: {
        position: 'absolute',
        left: 0,
        marginLeft: 20,
        width: 40,
        height: 40
    },
    header_icon_right: {
        position: 'absolute',
        right: 0,
        marginRight: 20,
        width: 40,
        height: 40
    },
    miniature_container: {
        borderRadius: 10,
        overflow: 'hidden'
    },
    miniature: {
        width: '100%',
        height: '100%',
        borderRadius: 10
    }
})

export default HomeHeader;
