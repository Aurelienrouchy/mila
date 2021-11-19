import React, { useContext, useEffect, useState } from "react";
import {
	View,
	StyleSheet,
	Text,
	Dimensions,
	Pressable,
	Platform,
	TextInput,
} from "react-native";
import FastImage from "react-native-fast-image";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";
import * as ImagePicker from "expo-image-picker";
import { HomeContext, SIDE } from "../Providers/HomeProvider";
import ButtonAddImage from "./ButtonAddImage";

interface NoClassicAdProps {}

const { width, height } = Dimensions.get("screen");

const NoClassicAd = () => {
	const [images, setImages] = useState(["", "", ""]);
	const [bio, setBio] = useState("");
	const { side } = useContext(HomeContext);
	useEffect(() => {
		(async () => {
			if (Platform.OS !== "web") {
				const { status } =
					await ImagePicker.requestMediaLibraryPermissionsAsync();
				if (status !== "granted") {
					alert("Sorry, we need camera roll permissions to make this work!");
				}
			}
		})();
	}, []);

	const pickImage = async (index: number) => {
		let result: any = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		images[index] = result?.uri;

		if (!result.cancelled) {
			setImages([...images]);
		}
	};

	return (
		<Animated.View style={[styles.container]}>
			<Text style={styles.title}>TITLE</Text>
			<View style={styles.inputContainner}>
				<View style={styles.selectImageContainner}>
					{images.map((image, index) => (
						<ButtonAddImage
							key={index}
							onPress={() => pickImage(index)}
							imageUri={image}
						/>
					))}
				</View>
				<TextInput
					style={styles.input}
					onChangeText={() => {}}
					value={""}
					placeholder="useless placeholder"
					keyboardType="numeric"
				/>
				<View style={styles.bioContainner}>
					<TextInput
						style={[styles.input, styles.inputBio]}
						onChangeText={setBio}
						value={bio}
						placeholder="useless placeholder"
						keyboardType="numeric"
						multiline
						maxLength={500}
					/>
					<Text>{bio.length} / 500</Text>
				</View>
				<Pressable onPress={() => {}} style={styles.button}>
					<Text style={styles.buttonTitle}>Enjoy !</Text>
				</Pressable>
			</View>
		</Animated.View>
	);
};

export default NoClassicAd;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		borderRadius: 20,
		justifyContent: "space-between",
		padding: 30,
		paddingBottom: 60,
	},
	inputContainner: {},
	selectImageContainner: {
		height: (width - 90) / 3,
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 20,
	},
	title: {
		fontSize: 25,
	},
	bioContainner: {
		alignItems: "flex-end",
		marginBottom: 20,
	},
	input: {
		width: width - 60,
		height: 50,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: "#000",
		fontSize: 20,
		marginBottom: 20,
		paddingHorizontal: 10,
	},
	inputBio: {
		height: 25 * 6,
		marginBottom: 10,
	},
	button: {
		width: width - 60,
		height: 50,
		backgroundColor: "#000",
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonTitle: {
		fontSize: 20,
		color: "#FFF",
	},
});
