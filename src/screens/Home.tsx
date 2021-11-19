import React, { useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
	Extrapolate,
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";
import ClassicSide from "../components/ClassicSide";
import HeaderHome from "../components/HeaderHome";
import NoClassicSide from "../components/NoClassicSide";
import { HomeContext, SIDE } from "../Providers/HomeProvider";
import Constants from "expo-constants";

interface HomeProps {}

const Home = () => {
	const { side } = useContext(HomeContext);
	const progressValue = useSharedValue(0);
	const rStyle = useAnimatedStyle(
		() => ({
			backgroundColor: interpolateColor(
				progressValue.value,
				[0, 1],
				["#FFF", "#000"]
			),
		}),
		[]
	);

	useEffect(() => {
		progressValue.value = withSpring(side === SIDE.CLASSIC ? 0 : 1, {
			damping: 13,
		});
	}, [side]);

	return (
		<Animated.View style={[styles.container, rStyle]}>
			<HeaderHome progressValue={progressValue} />
			<View style={styles.homeContainer}>
				<ClassicSide />
				<NoClassicSide />
			</View>
		</Animated.View>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: Constants.statusBarHeight,
	},
	homeContainer: {
		flex: 1,
		zIndex: 2,
	},
});
