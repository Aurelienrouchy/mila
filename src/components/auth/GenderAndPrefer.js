import React, { useState, useContext, useEffect, useMemo } from  'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View, TouchableOpacity, Text, Image, Dimensions, Animated } from 'react-native'
import ProgressBotttom from './ProgressBotton.js';
import {AuthContext} from '../../providers/auth.js';
import { useAnimation } from '../../hooks/useAnimation.js';

const {height, width} = Dimensions.get('screen');

const GenderAndPrefer = () => {
    const { params: type } = useRoute();
    const navigation = useNavigation();
    const context = useContext(AuthContext);
    const [gender, setGender] = useState(context.state.user[type]);
    const [woman, setWoman] = useState(null)
    const [men, setMen] = useState(null);
    const BGF = useAnimation()([0, 1], ['rgb(255, 255, 255)', 'rgb(0, 0, 0)'], gender === 'F' ? 1 : 0);
    const BGM = useAnimation()([0, 1], ['rgb(255, 255, 255)', 'rgb(0, 0, 0)'], gender === 'M' ? 1 : 0);
    
    const next = () => {
        context.updateUserData({[type]: gender})
        navigation.navigate(type === 'gender' ? 'Prefer' : 'Age', type === 'gender' ? 'prefer' : '');
    };

    useEffect(() => {
        setWoman(gender === 'F' ? require('./../../../assets/img/woman-reverse.png') : require('./../../../assets/img/woman.png'));
        setMen(gender === 'M' ? require('./../../../assets/img/men-reverse.png') : require('./../../../assets/img/men.png'));
    }, [gender]);

    return (
        <View style={style.main}>
            <View style={style.inputs_container}>
                <Text style={style.title}>{ `What's your ${type} ?`}</Text>
                <View style={style.buttons_container}>
                    <TouchableOpacity onPress={() => setGender('F')}>
                        <View style={style.button}>
                            <Animated.View style={{backgroundColor: BGF, ...style.button_black}}>
                                <Image style={style.image} source={woman} />
                            </Animated.View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setGender('M')}>
                        <View style={style.button}>
                            <Animated.View style={{backgroundColor: BGM, ...style.button_black}}>
                                <Image style={style.image} source={men} />
                            </Animated.View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <ProgressBotttom num={type === 'gender' ? '2' : '3'} nav={navigation} visible={!!gender} next={next}/>
        </View>
    )
};

export default GenderAndPrefer;

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
        fontFamily: 'coachellaregular',
        marginBottom: 20
    },
    buttons_container: {
        alignItems: 'center',
    },
    button_black: {
        width: height - height / 4 * 3 - 20,
        height: height - height / 4 * 3 - 20,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: height - height / 4 * 3,
        height: height - height / 4 * 3,
        marginVertical: 10,
        borderWidth: 1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '80%',
        height: '80%'
    }
})