import React from "react";
import { View, StyleSheet } from "react-native";

interface ProfileProps {}

const Profile = () => {
	return <View style={[styles.container]}></View>;
};

export default Profile;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "blue",
	},
});
