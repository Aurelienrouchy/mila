import React, {useContext, useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {signWithPhone} from './../../services/auth.js';
import {AuthContext} from './../../providers/auth.js';

const SignIn = () => {
    const navigation = useNavigation();
    const context = useContext(AuthContext);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');


    const verifiyPhoneNumer = async () => {
        await signWithPhone(phoneNumber, code);
        // if(!user_provider) return
        // else {
        //     const user = {
        //         provider: user_provider,
        //         device: {
        //             brand: Device.brand,
        //             manufacturer: Device.manufacturer,
        //             modelName: Device.modelName,
        //             osName: Device.osName,
        //             osVersion: Device.osVersion
        //         },
        //         guid: Constants.installationId,
        //     };
        //     context.updateUserData(user, true);
        //     navigation.navigate('Name', user.provider);
        // }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.Os == "ios" ? "padding" : "height"}
            style={style.main} >
            <View style={style.buttons_container}>
                <TextInput
                    style={style.input}
                    placeholder="Phone number"
                    placeholderTextColor="#D2D2D2"
                    onChangeText={text => setPhoneNumber(text)}
                    value={phoneNumber}/>
                <TextInput
                    style={style.input}
                    placeholder="Code"
                    placeholderTextColor="#D2D2D2"
                    onChangeText={text => setCode(text)}
                    value={code}/>
                <TouchableOpacity style={style.buttons} onPress={verifiyPhoneNumer}>
                    <Text>Verify your phone</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
};

export default SignIn;

const style = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column-reverse'
    },
    buttons_container: {
        marginBottom: 150,
        alignItems: 'center'
    },
    buttons: {
        width: '90%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: 20
    },
    input: {
        borderBottomColor: '#000',
        borderBottomWidth: 2,
        height: 60,
        marginTop: 20,
        fontSize: 28,
        color: '#FF7878',
        fontWeight: '700'
    },
    text_mail: {
        fontSize: 14
    },
    text_buttons: {
        fontSize: 18
    }
})
