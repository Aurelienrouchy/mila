import React from 'react';
import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack';
import Home from '../components/home/Home.js';
import AdHome from '../components/home/AdHome.js';
import AdRegister from '../components/home/AdRegister.js';

const StackHome = createStackNavigator();

function HomeStack() {
    return (
        <StackHome.Navigator
            mode="modal"
            headerMode="none">
            <StackHome.Screen option={{
				transitionSpec: {
					duration: 0
				}
            }} name="Home"   component={Home} />
            <StackHome.Screen name="AdHome" component={AdHome} />
            <StackHome.Screen
                options={{
                    gestureDirection: 'horizontal',
                    cardStyleInterpolator: ({ current, next, layouts }) => {
                        return {
                          cardStyle: {
                            transform: [
                              {
                                translateX: current.progress.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: [layouts.screen.width, 0],
                                }),
                              },
                              {
                                rotate: current.progress.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: [1, 0],
                                }),
                              },
                              {
                                scale: next
                                  ? next.progress.interpolate({
                                      inputRange: [0, 1],
                                      outputRange: [1, 0.9],
                                    })
                                  : 1,
                              },
                            ],
                          },
                          overlayStyle: {
                            opacity: current.progress.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0, 0.5],
                            }),
                          },
                        };
                      },
                }} 
                name="AdRegister" 
                component={AdRegister} />
        </StackHome.Navigator>
    );
}

export default HomeStack;