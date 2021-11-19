import React, { FC } from "react";
import { Pressable, View, StyleSheet, Text, Dimensions } from "react-native";
import FastImage from "react-native-fast-image";

interface ButtonAddImageProps {
	onPress: () => void;
	imageUri: string;
}

const { width, height } = Dimensions.get("screen");

const ButtonAddImage: FC<ButtonAddImageProps> = ({ imageUri, onPress }) => {
	return (
		<View style={styles.container}>
			<Pressable onPress={onPress} style={styles.container}>
				{imageUri !== "" ? (
					<FastImage
						style={styles.image}
						source={{
							uri: imageUri || "",
							headers: { Authorization: "someAuthToken" },
							priority: FastImage.priority.normal,
						}}
					/>
				) : (
					<Text style={styles.textPlus}>+</Text>
				)}
			</Pressable>
		</View>
	);
};

export default ButtonAddImage;

const styles = StyleSheet.create({
	container: {
		width: (width - 90) / 3,
		height: (width - 90) / 3,
		borderRadius: 20,
		borderWidth: 2,
		overflow: "hidden",
		borderColor: "#000",
		justifyContent: "center",
		alignItems: "center",
	},
	image: {
		width: (width - 90) / 3,
		height: (width - 90) / 3,
		borderRadius: 20,
		overflow: "hidden",
	},
	textPlus: {
		fontSize: 30,
	},
});
