import React, { FC, useContext, useEffect, useState } from "react";
import { Dimensions, View, StyleSheet, Text } from "react-native";
import Animated, {
	interpolate,
	runOnJS,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import Card from "./Card";
import { HomeContext, SIDE } from "../Providers/HomeProvider";

interface CardsProps {}

const { width, height } = Dimensions.get("window");

const ROTATION_ANGLE = 60;
const DISTANCE_FROM_SIDE = (width / 100) * 20;

const Cards: FC<any> = ({ data, renderItem, onSwipeRight, onSwipeLeft }) => {
	const { side } = useContext(HomeContext);

	const [currentIndex, setCurrentIndex] = useState(0);
	const [nextIndex, setNextIndex] = useState(currentIndex + 1);

	const currentProfile = data[currentIndex];
	const nextProfile = data[nextIndex];

	const hiddenTranslateX = 2 * width;

	const translateX = useSharedValue(0);

	const rotate = useDerivedValue(
		() =>
			interpolate(
				translateX.value,
				[0, hiddenTranslateX],
				[0, ROTATION_ANGLE / 2]
			) + "deg"
	);
	const cardStyle = useAnimatedStyle(() => ({
		transform: [
			{
				translateX: translateX.value,
			},
			{
				rotate: rotate.value,
			},
		],
	}));

	const nextCardStyle = useAnimatedStyle(() => ({
		transform: [
			{
				scale: interpolate(
					translateX.value,
					[-hiddenTranslateX, 0, hiddenTranslateX],
					[1, 0.9, 1]
				),
			},
		],
		opacity: interpolate(
			translateX.value,
			[-hiddenTranslateX, 0, hiddenTranslateX],
			[1, 0.8, 1]
		),
	}));

	const gestureHandler = useAnimatedGestureHandler({
		onStart: (_, context) => {
			context.startX = translateX.value;
		},
		onActive: (event, context) => {
			translateX.value = context.startX + event.translationX;
		},
		onEnd: (event) => {
			if (Math.abs(event.velocityX) > 300) {
				translateX.value = withSpring(
					hiddenTranslateX * Math.sign(event.velocityX),
					{ damping: 100, stiffness: 1000 },
					() => runOnJS(setCurrentIndex)(currentIndex + 1)
				);

				return;
			}

			translateX.value = withSpring(0);
			return;
			// const onSwipe = event.velocityX > 0 ? () => {} : () => {};
			// onSwipe && runOnJS(onSwipe)();
		},
	});

	useEffect(() => {
		translateX.value = 0;

		setNextIndex(currentIndex + 1);
	}, [translateX, currentIndex]);

	return (
		<View style={styles.container}>
			{nextProfile && (
				<View style={styles.nextCardContainer}>
					<Animated.View style={[styles.animatedCard, nextCardStyle]}>
						<Card user={nextProfile} />
					</Animated.View>
				</View>
			)}

			{currentProfile && (
				<PanGestureHandler onGestureEvent={gestureHandler}>
					<Animated.View style={[styles.animatedCard, cardStyle]}>
						<Card user={currentProfile} />
					</Animated.View>
				</PanGestureHandler>
			)}
		</View>
	);
};

export default Cards;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	animatedCard: {
		flex: 1,
		width: "100%",
		overflow: "hidden",
		borderRadius: 20,
	},
	nextCardContainer: {
		...StyleSheet.absoluteFillObject,
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
