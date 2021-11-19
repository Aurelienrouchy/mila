import React, { useContext } from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import { RegisterContext } from "../../Providers/RegisterProvider";

interface RegisterControlerProps {}

const RegisterControler = () => {
	const { nextView, previousView, currentIndex } = useContext(RegisterContext);

	return (
		<View style={styles.container}>
			<Pressable
				onPress={previousView}
				style={({ pressed }) => [
					{
						backgroundColor: pressed ? "rgb(210, 230, 255)" : "white",
					},
				]}
			>
				{({ pressed }) => <Text style={styles.text}>Prev</Text>}
			</Pressable>
			<Pressable
				onPress={nextView}
				style={({ pressed }) => [
					{
						backgroundColor: pressed ? "rgb(210, 230, 255)" : "white",
					},
				]}
			>
				{({ pressed }) => <Text style={styles.text}>Next{currentIndex}</Text>}
			</Pressable>
		</View>
	);
};

export default RegisterControler;

const styles = StyleSheet.create({
	container: {
		height: 70,
		paddingHorizontal: 30,
		flexDirection: "row",
		justifyContent: "space-between",
		backgroundColor: "blue",
	},
	text: {
		fontSize: 20,
	},
});
