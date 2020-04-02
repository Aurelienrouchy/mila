import React, {useContext, useEffect, useState} from 'react';
import {Text, View, StyleSheet, Dimensions, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CountryPicker from 'react-native-country-picker-modal'

import SignInModal from './SignInModal.js';
import {confirmPhone} from './../../services/auth.js';
import {AuthContext} from './../../providers/auth.js';

const {height, width} = Dimensions.get('screen');

const SignIn = () => {
    const navigation = useNavigation();
    const auth = useContext(AuthContext);
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');
    const [codeIsCorrect, setCodeIsCorrect] = useState(false);
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [visible, setVisible] = useState(false);
    const [countryCode, setCountryCode] = useState('FR')
    const [callingCode, setCallingCode] = useState('33');
    const [error, setError] = useState(false);
    const [errorCode, setErrorCode] = useState(false);
    const [confirm, setConfirm] = useState(undefined);

    const onSelectCountry = country => {
        setCountryCode(country.cca2)
        setCallingCode(country.callingCode)
    }

    const verifiyPhoneNumer = async () => {
        try {
            const number = `+${callingCode}${phone}`;
            const confirmation = await confirmPhone(number);
            setConfirm(confirmation);
            setError(false);
            setModalIsVisible(true);
        } catch(err) {
            setError(true);
        }
    };

    const verifiyCode = async () => {
        try {
            await confirm.confirm(code);
            setErrorCode(false);
            setModalIsVisible(false);
            next();
        } catch(err) {
            setErrorCode(err);
        }
    };

    const next = () => {
        context.updateUserData({phone})
        navigation.navigate('Name');
    };

    return (
        <KeyboardAvoidingView behavior={Platform.Os == "ios" ? "padding" : "height"} style={{flex:1}}>
                <View style={style.main}>
                    <Text style={style.title}>What's your phone number ?</Text>
                    <View style={style.main_container}>
                        <View style={style.inputs_container}>
                            <TouchableOpacity onPress={() => setVisible(true)}>
                                <View style={style.calling_code_container}>
                                    <CountryPicker
                                        countryCode={countryCode}
                                        withFilter={true}
                                        withFlag={true}
                                        withFlagButton={!!(callingCode[0].length < 3)}
                                        withCallingCode={true}
                                        onSelect={onSelectCountry}
                                        visible={visible}
                                        onClose={() => setVisible(false)}
                                    />
                                    <Text style={style.callingCode}>+{callingCode}</Text>
                                </View>
                            </TouchableOpacity>
                            <View>
                                <TextInput
                                    style={style.input}
                                    placeholder="Phone number"
                                    placeholderTextColor="#D2D2D2"
                                    onChangeText={text => setPhone(text)}
                                    value={phone}
                                    keyboardType="number-pad"
                                />
                                {
                                    error && <Text style={style.info}>Invalid phone number</Text>
                                }
                            </View>
                        </View>
                        <TouchableOpacity onPress={verifiyPhoneNumer}>
                            <View style={style.button_valid} >
                                <Text style={style.button_valid_text}>Send code</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {
                        modalIsVisible &&  <SignInModal {...{code, errorCode, setCode, setModalIsVisible, verifiyCode, modalIsVisible}}/>
                    }                   
                </View>
        </KeyboardAvoidingView>
    )
};

export default SignIn;

const style = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: height / 8,
        paddingHorizontal: 30,
    },
    main_container: {
        flex: 1,
        marginTop : 100,
        alignItems: 'center'
    },
    info: { 
        fontSize: 12, 
        marginTop: 5, 
        color: 'red' 
    },
    title: {
        fontSize: 28,
        fontFamily: 'MADECoachella'
    },
    callingCode: {
        fontSize: 28,
        fontFamily: 'MADECoachella'
    },
    inputs_container: {
        marginBottom: 40,
        flexDirection: 'row'
    },
    calling_code_container: {
        borderBottomWidth: 2,
        height: 60,
        width: 100,
        fontSize: 28,
        color: '#FF7878',
        fontWeight: '700',
        marginRight: 20,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent:'center'
    },
    input: {
        borderBottomColor: '#000',
        borderBottomWidth: 2,
        height: 60,
        width: width - 180,
        fontSize: 28,
        color: '#FF7878',
        fontWeight: '700'
    },
    button_valid_container: {
        width: '100%',
        alignItems: 'center'
    },
    button_valid_text: {
       color: '#fff',
       fontSize: 24
    },
    button_valid: {
        height: 42,
        paddingHorizontal: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
    }
})
