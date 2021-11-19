import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

interface NameProps {
	width: number;
}

const Name: FC<NameProps> = ({ width }) => {
	return (
		<View style={[styles.container, { width }]}>
			<Text>Name</Text>
		</View>
	);
};

export default Name;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "green",
	},
});
