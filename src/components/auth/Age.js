import React, { useState, useContext, useEffect } from  'react';
import { StyleSheet, View, TouchableOpacity, Dimensions, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ProgressBotttom from './ProgressBotton.js';
import {AuthContext} from './../../providers/auth.js';

const {height, width} = Dimensions.get('screen');

const Age = (props) => {
    const navigation = useNavigation();
    const context = useContext(AuthContext);
    const [isVisible, setIsVisible] = useState(false);
    const [age, setAge] = useState(null);
    const [day, setDay] = useState();
    const [month, setMonth] = useState(null);
    const [year, setYear] = useState(null);
    
    const next = () => {
        context.updateUserData({age})
        navigation.navigate('Connect');
    };

    useEffect(() => {
        const date = new Date();
        setDay(date.getUTCDate());
        setYear(date.getFullYear())
        setMonth(date.getUTCMonth())
    }, [])

    const onConfirm = (val) => {
        setAge(val);
        setDay(val.getUTCDate());
        setYear(val.getFullYear());
        setMonth(val.getUTCMonth());
        setIsVisible(!isVisible);
    };

    return (
        <View style={style.main}>
            <View style={style.inputs_container}>
                <Text style={style.title}>How old are you ?</Text>
                <View style={style.date_container}>
                    <TouchableOpacity style={style.button} onPress={() => setIsVisible(!isVisible)}>
                        <Text style={style.date}>{day}</Text>
                        <Text style={style.dash}> - </Text>
                        <Text style={style.date}>{month + 1}</Text>
                        <Text style={style.dash}> - </Text>
                        <Text style={style.date}>{year}</Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isVisible}
                        mode="date"
                        date={age || new Date()}
                        headerTextIOS=""
                        locale="fr_FR"
                        onConfirm={onConfirm}
                        onCancel={() => setIsVisible(false)}
                    />
                </View>
            </View>
            <ProgressBotttom num="4" nav={navigation} visible={!!age} next={next}/>
        </View>
    )
};

export default Age;

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
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 5,
        marginTop: height / 8,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#D2D2D2'
    },
    date: {
        fontSize: width / 7.5,
        color: '#FF7878',
    },
    dash: {
        fontSize: width / 7.5,
        color: '#D2D2D2',
    }
})