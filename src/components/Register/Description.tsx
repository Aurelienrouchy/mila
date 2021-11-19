import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

interface DescriptionProps {
	width: number;
}

const Description: FC<DescriptionProps> = ({ width }) => {
	return (
		<View style={[styles.container, { width }]}>
			<Text>Description</Text>
		</View>
	);
};

export default Description;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#090",
	},
});
