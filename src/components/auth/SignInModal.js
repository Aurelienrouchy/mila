import React, {useContext, useEffect, useState} from 'react';
import {Text, View, StyleSheet, Dimensions, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
import {AuthContext} from './../../providers/auth.js';

const {height, width} = Dimensions.get('screen');

const SignInModal = ({setCode, modalIsVisible, verifiyCode, code, errorCode, setModalIsVisible}) => {


    const close = () => setModalIsVisible(false);

    return (
        <KeyboardAvoidingView
            behavior={Platform.Os == "ios" ? "position" : "height"} style={{flex:1}}>
            <Modal
                isVisible={modalIsVisible}
                useNativeDriver={true}
                swipeDirection={['up','down']}
                avoidKeyboard={true}
            >
                <View style={style.modal}>
                    <Text style={style.title}>Enter your verification code</Text>
                    <TextInput
                        style={{...style.modal_input, ...style.input}}
                        placeholder="Received code"
                        placeholderTextColor="#D2D2D2"
                        onChangeText={text => setCode(text)}
                        value={code}
                        keyboardType="number-pad"
                    />
                    {
                        errorCode && <Text style={style.info}>Invalid code</Text>
                    } 
                    <View style={style.buttons_container}>
                        <TouchableOpacity onPress={close}>
                            <Text style={style.button_change_text}>Change phone ?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={verifiyCode}>
                            <View style={style.button_valid} >
                                <Text style={style.button_valid_text}>Confirm</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    )
};

export default SignInModal;

const style = StyleSheet.create({
    info: { 
        fontSize: 12, 
        marginTop: 5, 
        color: 'red' 
    },
    title: {
        width: '100%',
        fontSize: 28,
        fontFamily: 'MADECoachella'
    },
    input: {
        borderBottomColor: '#000',
        borderBottomWidth: 2,
        fontSize: 28,
        color: '#FF7878',
        fontWeight: '700'
    },
    buttons_container: {
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 40
    },
    button_valid_text: {
       color: '#fff',
       fontSize: 24
    },
    button_change_text: {
       color: '#FF7878',
       fontSize: 14
    },
    button_valid: {
        height: 42,
        paddingHorizontal: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
    },
    modal: {
        backgroundColor: '#fff',
        height: 300,
        paddingVertical: 30,
        paddingHorizontal: 30,
        alignItems: 'center',
        borderRadius: 20,
    },
    modal_input: {
        textAlign: 'center',
        width: 200,
        marginTop: 40,
    }
})
