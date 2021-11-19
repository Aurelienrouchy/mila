import React, { useContext, useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";
import { HomeContext, SIDE } from "../Providers/HomeProvider";
import Card from "./Card";
import Cards from "./Cards";

interface ClassicSideProps {}

const { width, height } = Dimensions.get("screen");

const ClassicSide = () => {
	const { side, data } = useContext(HomeContext);

	const translateY = useSharedValue(0);
	const animatedStyle = useAnimatedStyle(() => ({
		transform: [
			{
				translateY: translateY.value,
			},
		],
	}));

	useEffect(() => {
		translateY.value = withSpring(side === SIDE.CLASSIC ? 0 : height, {
			damping: 15,
		});
	}, [side]);

	return (
		<Animated.View style={[styles.container, animatedStyle]}>
			<Cards data={data.reverse()} />
		</Animated.View>
	);
};

export default ClassicSide;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width,
		height,
	},
});
