import React, { useState, useContext, useEffect } from  'react';
import { StyleSheet, View, TouchableOpacity, Dimensions, Animated, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import {Permissions, ImagePicker} from 'react-native-unimodules';

import ProgressBotttom from './ProgressBotton.js';
import {AuthContext} from './../../providers/auth.js';
import {useAnimation} from './../../hooks/useAnimation.js';

const {height, width} = Dimensions.get('screen');

const ProviderPhotosSelector = (props) => {
    const navigation = useNavigation();
    const context = useContext(AuthContext);
    const [facebook, setFacebook] = useState(context.state.user.provider && context.state.user.provider.providerId === 'facebook.com');
    const [instagram, setInstagram] = useState(false);
    const [camera, setCamera] = useState(false);
    const BGFacebook = useAnimation()([0, 1], ['rgb(255, 255, 255)', 'rgb(0, 0, 0)'], facebook ? 1 : 0);
    const BGIstagram = useAnimation()([0, 1], ['rgb(255, 255, 255)', 'rgb(0, 0, 0)'], instagram ? 1 : 0);
    const BGCamera = useAnimation()([0, 1], ['rgb(255, 255, 255)', 'rgb(0, 0, 0)'], camera ? 1 : 0);

    const next = () => {
        const providers = [{
            name: 'facebook',
            connected: !!facebook
        }, {
            name: 'instagram',
            connected: !!instagram
        }, {
            name: 'camera',
            connected: !!camera
        }]
        context.updateUserData();
        navigation.navigate('ChoosePhotos', providers);
    };

    useEffect(() => {
        ckeckCameraPermission();
    }, []);

    const ckeckCameraPermission = async () => {
        try {
            const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
            if (status === 'granted') setCamera(true);
        } catch(err) {
            throw new Error('CAMERA_ROLL permission not granted');
        }
    };

    const ckeckFacebookPermission = async () => {
        try {
            const { granted } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
            if (granted) setCamera(!camera);
        } catch(err) {
            throw new Error('CAMERA_ROLL permission not granted');
        }
    };

    const connect = async type => {
        switch (type) {
            case 'facebook':
                
                break;
            case 'instagram':
                setInstagram(!instagram)
                break;
            case 'camera':
                try{
                    const {status} = await Permissions.getAsync(Permissions.CAMERA_ROLL);
                    if(status === 'granted') break;
                    const { granted } = await ImagePicker.requestCameraRollPermissionsAsync();
                    if (granted) setCamera(!camera);
                } catch(err) {
                    throw new Error('CAMERA_ROLL permission not granted');
                }
                break;
        
            default:
                break;
        }
    };

    return (
        <View style={style.main}>
            <View style={style.inputs_container}>
                <Text style={style.title}>Connect your...</Text>
                <View style={style.connect_container}>
                    <TouchableOpacity onPress={() => connect('facebook')}>
                        <Animated.View style={{backgroundColor: BGFacebook,...style.button}}>
                            <Text style={{color: facebook ? '#FFF': '#000', ...style.provider}}>Facebook</Text>
                            <Text style={{color: facebook ? '#FFF': '#000', ...style.dash}}> + </Text>
                        </Animated.View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => connect('instagram')}>
                        <Animated.View style={{backgroundColor: BGIstagram,...style.button}}>
                            <Text style={{color: instagram ? '#FFF': '#000', ...style.provider}}>Instagram</Text>
                            <Text style={{color: instagram ? '#FFF': '#000', ...style.dash}}> + </Text>
                        </Animated.View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => connect('camera')}>
                        <Animated.View style={{backgroundColor: BGCamera,...style.button}}>
                            <Text style={{color: camera ? '#FFF': '#000', ...style.provider}}>Camera</Text>
                            <Text style={{color: camera ? '#FFF': '#000', ...style.dash}}> + </Text>
                        </Animated.View>
                    </TouchableOpacity>
                </View>
            </View>
            <ProgressBotttom num="5" nav={navigation} next={next}/>
        </View>
    )
};

export default ProviderPhotosSelector;

const style = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: height / 8,
        paddingHorizontal: 30,
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 24,
        fontFamily: 'coachellaregular'
    },
    connect_container: {
        justifyContent: 'center',
        marginTop: height / 8
    },
    button: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 18,
        marginVertical: 15,
        alignItems: 'center',
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: 20
    },
    provider: {
        fontSize: 18
    }
})