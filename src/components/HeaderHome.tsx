import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import React, { FC, useContext } from "react";
import { Pressable, View, Text, StyleSheet, Image } from "react-native";
import FastImage from "react-native-fast-image";
import Animated, {
	Extrapolate,
	interpolate,
	interpolateColor,
	useAnimatedStyle,
} from "react-native-reanimated";
import { HomeContext, SIDE } from "../Providers/HomeProvider";

const IconConversationBlack = require("./../../assets/icons/bulle.png");
const IconConversationWhite = require("./../../assets/icons/bulleWhite.png");
const IconProfilBlack = require("./../../assets/icons/profil.png");
const IconProfilWhite = require("./../../assets/icons/profilWhite.png");

interface HeaderHomeProps {
	progressValue: any;
}

const HeaderHome: FC<HeaderHomeProps> = ({ progressValue }) => {
	const { toggleSide, side } = useContext(HomeContext);
	const navigation = useNavigation();

	const imageStyle = useAnimatedStyle(() => ({
		transform: [
			{ scale: interpolate(progressValue.value, [0, 0.5, 1], [1, 0.3, 1]) },
		],
		opacity: interpolate(progressValue.value, [0, 0.5, 1], [1, 0, 1]),
	}));

	return (
		<Animated.View style={[styles.container]}>
			<Pressable
				onPress={() => navigation.navigate("Profil")}
				style={({ pressed }) => [styles.buttons]}
			>
				<Image
					source={side === SIDE.CLASSIC ? IconProfilBlack : IconProfilWhite}
					fadeDuration={0}
					style={styles.icon}
				/>
			</Pressable>
			<Animated.View style={[styles.imageContainer, imageStyle]}>
				<Pressable
					onPress={toggleSide}
					style={({ pressed }) => [styles.buttons]}
				>
					<FastImage
						style={styles.image}
						source={{
							uri:
								side === SIDE.CLASSIC
									? "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1727&q=80"
									: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1887&q=80",
							headers: { Authorization: "someAuthToken" },
							priority: FastImage.priority.normal,
						}}
					/>
				</Pressable>
			</Animated.View>

			<Pressable
				onPress={() => navigation.navigate("Conversations")}
				style={({ pressed }) => [styles.buttons]}
			>
				<Image
					source={
						side === SIDE.CLASSIC
							? IconConversationBlack
							: IconConversationWhite
					}
					fadeDuration={0}
					style={styles.icon}
				/>
			</Pressable>
		</Animated.View>
	);
};

export default HeaderHome;

const styles = StyleSheet.create({
	container: {
		height: 70,
		zIndex: 1,
		paddingHorizontal: 30,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	text: {
		fontSize: 20,
	},
	buttons: {
		justifyContent: "center",
		alignItems: "center",
	},
	imageContainer: {
		width: 50,
		height: 50,
		borderRadius: 10,
		overflow: "hidden",
		marginTop: 10,
		borderColor: "#fff",
		borderWidth: 1,
	},
	icon: {
		width: 35,
		height: 35,
	},
	image: {
		width: "100%",
		height: "100%",
	},
});
