import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

interface PreferenceProps {
	width: number;
}

const Preference: FC<PreferenceProps> = ({ width }) => {
	return (
		<View style={[styles.container, { width }]}>
			<Text>Preference</Text>
		</View>
	);
};

export default Preference;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#aaa",
	},
});
