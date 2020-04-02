import React, { useState, useContext, useEffect, useMemo } from  'react';
import { Animated } from 'react-native'

export const useAnimation = () => useMemo(() => {
	const value = new Animated.Value(0);
	const animate = (inputRange, outputRange, toValue, duration = 300) => {
		Animated.timing(value, { toValue, duration, useNativeDriver: true }).start();
		return value.interpolate({ inputRange, outputRange });
	};
		return animate
}, []);