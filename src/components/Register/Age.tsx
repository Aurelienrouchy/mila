import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

interface AgeProps {
	width: number;
}

const Age: FC<AgeProps> = ({ width }) => {
	return (
		<View style={[styles.container, { width }]}>
			<Text>Age</Text>
		</View>
	);
};

export default Age;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#900",
	},
});
