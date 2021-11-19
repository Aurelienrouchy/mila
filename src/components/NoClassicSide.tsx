import React, { useContext, useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";
import { HomeContext, SIDE } from "../Providers/HomeProvider";
import Card from "./Card";
import CardForCreateNoClassicAd from "./NoClassicAd";
import Cards from "./Cards";

interface NoClassicSideProps {}

const adActive = false;

const { width, height } = Dimensions.get("screen");

const NoClassicSide = () => {
	const { side, data } = useContext(HomeContext);

	const translateY = useSharedValue(height);
	const animatedStyle = useAnimatedStyle(() => ({
		transform: [
			{
				translateY: translateY.value,
			},
		],
	}));

	useEffect(() => {
		translateY.value = withSpring(side === SIDE.CLASSIC ? height : 0, {
			damping: 15,
		});
	}, [side]);

	return (
		<Animated.View style={[styles.container, animatedStyle]}>
			{true ? <Cards data={data} /> : <CardForCreateNoClassicAd />}
		</Animated.View>
	);
};

export default NoClassicSide;

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
	},
});
