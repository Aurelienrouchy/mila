import React, { useState, useMemo, useEffect } from 'react';
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
import { Asset } from 'react-native-unimodules';
import Animated from "react-native-reanimated";
import {STATUS_BAR_HEIGHT, HEADER_HEIGHT, profiles_next as profilesX, profiles, profiles_next} from './../../constants/constants';
import Cards from './Cards.js'
import HomeHeader from './HomeHeader.js'

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

function cacheImages(images) {
    return images.map(image => {
      if (typeof image === 'string') {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
  }

const Home = ({navigation}) => {
    const [isReady, setIsReady] = useState(false);
    const {
        onScroll,
        onScrollBeginDrag,
        onScrollEndDrag,
        translateY,
        miniatureStyle
    } = useMemo(() => {
        const startHeight = ((HEADER_HEIGHT - 50) / 2) + 50;
        
        const Y = new Value(0);
        const beginY = new Value(0);
        const isDrag = new Value(0);
        const miniHeight = new Value(0);
        const translateYValue = new Value(0);
        
        const clock = new Clock(0);
        const clockY = new Clock(0);

        const onScroll = event([{ nativeEvent: { contentOffset: {y: Y}}}],{useNativeDriver: true});
        const onScrollBeginDrag = event([{ nativeEvent: { contentOffset: {y: beginY}}}],{useNativeDriver: true});
        const onScrollEndDrag = () => isDrag.setValue(0);
        
        const startAnimation = cond(
            and(greaterThan(abs(Y), startHeight), eq(isDrag, 0)),
            1,
            0
        );

        const translateY = cond(
            and(lessThan(beginY, 10), lessThan(Y, 0)),
            cond(
                eq(startAnimation, 0),
                [
                    set(translateYValue, runSpring(clockY, translateYValue, (height - startHeight))),
                    translateYValue
                ],
                set(translateYValue, multiply(abs(Y), 1.5))
            )
        );

        const miniatureHeight = cond(
            greaterThan(abs(Y), startHeight),
            [
                cond(
                    greaterThan(translateY, width / 2),
                    cond(
                        eq(miniHeight, sub(height, startHeight)),
                        call([Y], () => setAnimated(true)),
                        [
                            runSpring(
                                clock,
                                miniHeight,
                                sub(height, startHeight)
                            )
                        ]
                    ),
                    set(miniHeight, diffClamp(sub(translateY, startHeight), 50, height))
                ),
            ],
            [
                set(miniHeight, diffClamp(50, 50, height))
            ],
        );

        const miniatureY = cond(
            greaterThan(translateY, startHeight),
            [
                add(divide(translateY, 2), 37)
            ],
            [
                translateY
            ]
        );
        const miniatureWidth = cond(
            greaterThan(translateY, startHeight),
            [
                diffClamp(sub(translateY, startHeight), 50, width)
            ],
            [
                diffClamp(50, 50, height)
            ]
        );

        const miniatureStyle = {
            transform: [
                {translateY: miniatureY}
            ], 
            width: 50,
            height:  miniatureHeight
        };

        return {
            onScroll,
            onScrollBeginDrag,
            onScrollEndDrag,
            translateY,
            miniatureStyle
        }
    }, []);

    const switchMode = () => {
        const profile = profiles_next[0];
        navigation.navigate('AdHome', {profile})
    };

    const loadAssetsAsync = async () => {
        const imageAssets = await cacheImages(profiles.map(p => p.picture));
        console.log(imageAssets)
        await Promise.all(imageAssets);
    };

    // if (!isReady) {
    //     return (
    //       <AppLoading
    //         startAsync={loadAssetsAsync}
    //         onFinish={() => setIsReady(true)}
    //         onError={console.warn}
    //       />
    //     );
    // }
  
    return (
        <View style={styles.container}>
            <HomeHeader miniatureStyle={miniatureStyle} />
            <Animated.View style={{
                transform: [
                    {translateY}
                ],
                ...styles.cards
            }}>
                <Cards
                    onScroll={onScroll} 
                    onScrollBeginDrag={onScrollBeginDrag}
                    onScrollEndDrag={onScrollEndDrag}
                    profiles={profiles} />
            </Animated.View>
        </View>
    )
    
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
	},
    cards: {
        flex: 1
    }
})

export default Home;
