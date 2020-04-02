import React, { useState, useEffect, useContext } from  'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View, TextInput, Dimensions, Text } from 'react-native'
import ProgressBotttom from './ProgressBotton.js';
import {AuthContext} from './../../providers/auth.js';

const {height, width} = Dimensions.get('screen');

const Name = (props) => {
    const navigation = useNavigation();
    const context = useContext(AuthContext);

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [info, setInfo] = useState('');
    
    const next = () => {
        context.updateUserData({ lname: lastname,fname: firstname})
        navigation.navigate('Gender', 'gender');
    };

    useEffect(() => {
        const i =   firstname.length < 3 && firstname.length !== 0 ? 'Min 3' : 
                        firstname.length > 50 ? 'Max 50' :
                            firstname.length < 1 ? 'Required' : '';
        setInfo(i);
    }, [firstname])

    return (
        <View style={style.main}>
            <View style={style.inputs_container}>
                <Text style={style.title}>What's your name ?</Text>
                <TextInput
                    style={style.input}
                    placeholder="Fisrt name"
                    placeholderTextColor="#D2D2D2"
                    onChangeText={text => setFirstname(text)}
                    value={firstname}/>
                <Text style={style.info}>{info}</Text>
                <TextInput
                    style={style.input}
                    placeholder="Last name"
                    placeholderTextColor="#D2D2D2"
                    onChangeText={text => setLastname(text)}
                    value={lastname}/>
            </View>
            <ProgressBotttom num="1" nav={navigation} visible={!!!info} next={next}/>
        </View>
    )
};

export default Name;

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
        fontFamily: 'MADECoachella'
    },
    info: { 
        fontSize: 12, 
        marginTop: 5, 
        color: 'red' 
    },
    input: {
        borderBottomColor: '#000',
        borderBottomWidth: 2,
        height: 60,
        marginTop: 20,
        fontSize: 28,
        color: '#FF7878',
        fontWeight: '700'
    }
})