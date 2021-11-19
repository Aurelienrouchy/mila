import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

interface PhotosProps {
	width: number;
}

const Photos: FC<PhotosProps> = ({ width }) => {
	return (
		<View style={[styles.container, { width }]}>
			<Text>Photos</Text>
		</View>
	);
};

export default Photos;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#eee",
	},
});
