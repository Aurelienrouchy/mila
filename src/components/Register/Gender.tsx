import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

interface GenderProps {
	width: number;
}

const Gender: FC<GenderProps> = ({ width }) => {
	return (
		<View style={[styles.container, { width }]}>
			<Text>gender</Text>
		</View>
	);
};

export default Gender;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#120",
	},
});
