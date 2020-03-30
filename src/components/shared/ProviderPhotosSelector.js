import React, { useState, useContext, useEffect } from  'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, TouchableOpacity, Dimensions, TouchableWithoutFeedback, Text } from 'react-native'
import {AuthContext} from './../../providers/auth.js';
import Modal from "react-native-modal";

const {height, width} = Dimensions.get('screen');

const Connect = ({isVisible, setVisible, providers, afterClose, onClickProvider}) => {
    const navigation = useNavigation();
    const context = useContext(AuthContext);
    const visible_providers = providers.filter(v => v.connected);

    return (
        <Modal 
            isVisible={isVisible}
            style={style.modal}
            onModalHide={afterClose}
            useNativeDriver={true}
            onBackdropPress={() => setVisible(false)}>
            <View style={style.main}>
                <View style={style.buttons_container}>
                    { visible_providers.map((provider, index) => { 
                        return provider.connected && 
                            <TouchableOpacity 
                                key={index} 
                                style={{
                                    ...style.button,
                                    borderBottomWidth: index + 1 !== visible_providers.length ? 1 : 0 
                                }} 
                                onPress={() => onClickProvider(provider.name)}>
                                <Text style={style.text}>{ provider.name }</Text>
                            </TouchableOpacity>
                        }
                    )}
                </View>
                <TouchableOpacity style={style.cancel} onPress={() => setVisible(false)}>
                    <Text style={style.text}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
};

export default Connect;

const style = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end'
    },
    buttons_container: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#000',
        marginBottom: 20
    },
    button: {
        height: 50,
        borderBottomColor: '#E4E4E4',
        borderBottomWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 18
    },
    cancel: {
        width: '100%',
        backgroundColor: '#fff',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#000',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backdrop: {
        backgroundColor: 'blue',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10000000000
    }
})