import React, { useContext, useState } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import Name from "../components/Register/Name";
import Gender from "../components/Register/Gender";
import Preference from "../components/Register/Preference";
import Age from "../components/Register/Age";
import Photos from "../components/Register/Photos";
import Description from "../components/Register/Description";
import RegisterControler from "../components/Register/RegisterControler";
import { RegisterContext } from "../Providers/RegisterProvider";

interface RegisterProps {}

const width = Dimensions.get("window").width;

const Register = () => {
	const { currentIndex, scrollViewRef } = useContext(RegisterContext);

	return (
		<View style={styles.container}>
			<ScrollView
				style={styles.scrollView}
				ref={scrollViewRef}
				horizontal
				scrollEnabled={false}
				showsHorizontalScrollIndicator={false}
			>
				<Name width={width} />
				<Gender width={width} />
				<Preference width={width} />
				<Age width={width} />
				<Photos width={width} />
				<Description width={width} />
			</ScrollView>
			<RegisterControler />
		</View>
	);
};

export default Register;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "red",
	},
	scrollView: {
		backgroundColor: "brown",
	},
});
