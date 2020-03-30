import React, { useState, useContext, useEffect } from  'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, TouchableOpacity, Text, Animated } from 'react-native'
import ProgressBotttom from './ProgressBotton.js';
import {AuthContext} from './../../providers/auth.js';

const Prefer = (props) => {
    const navigation = useNavigation();
    const context = useContext(AuthContext);
    const [prefer, setPrefer] = useState(null);
    
    const next = () => {
        context.updateUserData({prefer})
        navigation.navigate('Age');
    };

    useEffect(() => Animated.timing(opacity, {toValue: prefer ? 1 : 0, duration: 300}).start(), [prefer]);
    useEffect(() => Animated.timing(opacity, {toValue: prefer ? 1 : 0, duration: 300}).start(), [prefer]);

    return (
        <View style={style.main}>
            <View style={style.inputs_container}>
                <Text style={style.title}>What's your gender ?</Text>
                <View style={style.buttons_container}>
                    <TouchableOpacity onPress={() => setPrefer('F')}>
                        <View style={style.button}>
                            <Animated.View style={{opacity,...style.button_black}}>
                                <Image style={style.image} source={require('./../../../assets/img/woman.png')} />
                            </Animated.View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setPrefer('M')}>
                        <View style={style.button}>
                            <Animated.View style={{opacity, ...style.button_black}}>
                                <Image style={style.image} source={require('./../../../assets/img/men.png')} />
                            </Animated.View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <ProgressBotttom num="3" nav={navigation} visible={!!gender} next={next}/>
        </View>
    )
};

export default Prefer;

const style = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 150,
        paddingHorizontal: 30,
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 24,
        fontFamily: 'coachellaregular'
    },
    
})