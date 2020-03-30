import React, { useState, useEffect } from  'react';
import { StyleSheet, View, Image, Animated, TouchableOpacity } from 'react-native'

const ProgressBotttom = ({num, nav, next, visible = true}) => {
    const [fadeAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(
        fadeAnim,
        {
            toValue: visible ? 1 : 0,
            duration: 300,
        }
        ).start();
    }, [visible])
    
    return (
        <View style={style.main}>
            <TouchableOpacity onPress={() => nav.goBack()}>
                <View style={style.button}>
                    <Image style={style.arrow} source={require('./../../../assets/img/arrow-left.png')} />
                </View>
            </TouchableOpacity>
            
            <View style={style.dots}>
                { Array(7).fill(0).map((numero, index) => (<View key={index} style={index + 1 == num ? style.current_dot : style.dot}></View>))}
            </View>
            <TouchableOpacity onPress={() => next()}>
                
                <Animated.View style={{opacity: fadeAnim, ...style.button, ...style.next}}>
                    <Image style={style.arrow} source={require('./../../../assets/img/arrow-right.png')} />
                </Animated.View>
            </TouchableOpacity>
        </View>
    )
};

export default ProgressBotttom;

const style = StyleSheet.create({
    main: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 70
    },
    dots: {
        width: '60%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#C4C4C4'
    },
    current_dot: {
        width: 20,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#000'
    },
    button: {
        width: 42,
        height: 42,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 21,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    next: {
        borderColor: '#000',
        backgroundColor: '#000'
    },
    arrow: {
        width: 18,
        height: 18
    }
})