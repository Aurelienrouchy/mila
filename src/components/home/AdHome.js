import React, { useState, useMemo } from 'react';
import { 
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Text,
    Dimensions,
    ImageBackground,
    Button,
    ScrollView
} from 'react-native';
import Animated from "react-native-reanimated";

import {STATUS_BAR_HEIGHT, HEADER_HEIGHT, profiles, profiles_next} from './../../constants/constants';
import Cards from './Cards.js'

const {
    block,
    add,
    sub,
    multiply,
    neq,
    divide,
    spring,
    cond,
    eq,
    abs,
    event,
    lessThan,
    greaterThan,
    and,
    call,
    set,
    clockRunning,
    startClock,
    stopClock,
    Clock,
    decay,
    diffClamp,
    Value,
    concat,
    interpolate,
    Extrapolate,
  } = Animated;

  function runSpring(clock, value, dest) {
    const state = {
      finished: new Value(0),
      velocity: new Value(0),
      position: new Value(0),
      time: new Value(0),
    };
  
    const config = {
      damping: 40,
      mass: 2,
      stiffness: 100,
      overshootClamping: false,
      restSpeedThreshold: 1,
      restDisplacementThreshold: 0.5,
      toValue: new Value(0),
    };
  
    return [
      cond(clockRunning(clock), 0, [
        set(state.finished, 0),
        set(state.velocity, 0),
        set(state.position, value),
        set(config.toValue, dest),
        startClock(clock),
      ]),
      spring(clock, state, config),
      cond(state.finished, stopClock(clock)),
      state.position,
    ];
  }
const {height, width} = Dimensions.get('screen');
const toRadians = angle => angle * (Math.PI / 180);
const rotatedWidth = width * Math.sin(toRadians(90 - 15)) + height * Math.sin(toRadians(15));


const AdHome = ({navigation}) => {
    const [animated, setAnimated] = React.useState(false);

    const {
        onScroll,
        onScrollBeginDrag,
        miniatureTranslateY,
        translateY,
        Y,
        miniaturePhotoWidth,
        miniaturePhotoHeight
    } = useMemo(() => {
        const startHeight = ((HEADER_HEIGHT - 50) / 2) + 50;
        const Y = new Value(0);
        const NY = new Value(0);
        const onScroll = event([{ nativeEvent: { contentOffset: {y: Y}}}],{useNativeDriver: true});
        const onScrollBeginDrag = event([{ nativeEvent: { contentOffset: {y: NY}}}],{useNativeDriver: true});
        
        const translateY = multiply(
            cond(
                and(lessThan(NY, 10), lessThan(Y, 0)), 
                multiply(abs(Y), 1.5)
        ), 1.5);
        
        const miniaturePhotoHeight = cond(
            greaterThan(translateY, startHeight),
            [
                cond(
                    greaterThan(translateY, width / 2), 
                    call([Y], () => setAnimated(true))
                ),
                diffClamp(sub(translateY, startHeight), 50, height)
            ],
            [
                call([Y], () => setAnimated(false)),
                diffClamp(50, 50, height)
            ]
        );
        const miniatureTranslateY = cond(
            greaterThan(translateY, startHeight),
            [
                add(divide(translateY, 2), 37)
            ],
            [
                translateY
            ]
        );
        const miniaturePhotoWidth = cond(
            greaterThan(translateY, startHeight),
            [
                diffClamp(sub(translateY, startHeight), 50, width)
            ],
            [
                diffClamp(50, 50, height)
            ]
        );

        

        return {
            onScroll,
            onScrollBeginDrag,
            translateY,
            Y,
            miniatureTranslateY,
            miniaturePhotoWidth,
            miniaturePhotoHeight,
        }
    }, []);

    const switchMode = () => {
        const profile = profiles_next[0];
        navigation.navigate('Home', {profile})
    };

    React.useEffect(() => {
        navigation.addListener('transitionStart', e => {
            console.log('eee',e)
            
        });
        
        const subscribe = navigation.addListener('transitionEnd', e => {
            console.log(e)
          });
      
        
      }, [navigation]);

    Animated.useCode(
        () => (
            animated && block(
                // set(miniatureTranslateY, 400)
                call([], switchMode)
            )
        ), 
        [animated]
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.header_icon_left}>
                    <Image style={{width: '100%', height: '100%'}} source={require('./../../../assets/img/account.png')} />
                </TouchableOpacity>
                <Animated.View
                    style={{
                        transform: [
                            {translateY: miniatureTranslateY}
                        ], 
                        width: miniaturePhotoWidth,
                        height:  miniaturePhotoHeight,
                       
                        ...styles.miniature_container
                    }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Home', {profile: profiles[0]})} style={styles.miniature}>
                        <ImageBackground 
                            style={styles.miniature} 
                            source={{uri: profiles[0].picture}} 
                        />
                    </TouchableOpacity>
                </Animated.View>
                <TouchableOpacity style={styles.header_icon_right}>
                    <Image style={{width: '70%', height: '70%'}} source={require('./../../../assets/img/conv.png')} />
                </TouchableOpacity>
            </View>
            
            <Animated.View style={{
                transform: [
                    {translateY: translateY}
                ],
                ...styles.cards
            }}>
                <Cards
                    onScroll={onScroll} 
                    onScrollBeginDrag={onScrollBeginDrag} 
                    profiles={profiles_next} />
            </Animated.View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
	},
    header: {
        width,
        height: HEADER_HEIGHT,
        marginTop: STATUS_BAR_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    header_icon_left: {
        position: 'absolute',
        left: 0,
        marginLeft: 20,
        width: 40,
        height: 40
    },
    cards: {
        flex: 1
    },
    header_icon_right: {
        position: 'absolute',
        right: 0,
        marginRight: 20,
        width: 40,
        height: 40
    },
    miniature_container: {
        borderRadius: 10,
        overflow: 'hidden'
    },
    miniature: {
        width: '100%',
        height: '100%',
        borderRadius: 10
    }
})

export default AdHome;
