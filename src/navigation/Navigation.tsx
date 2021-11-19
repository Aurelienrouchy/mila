import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Connection from "../screens/Connection";
import Register from "../screens/Register";
import Conversations from "../screens/Conversations";
import Profile from "../screens/Profile";
import { HomeContext, SIDE } from "../Providers/HomeProvider";
import Constants from "expo-constants";

const Stack = createNativeStackNavigator();

const Navigation = () => {
	const { side } = useContext(HomeContext);
	const state = { userToken: "token", isSignout: false };

	return (
		<View style={[styles.container]}>
			<NavigationContainer>
				<Stack.Navigator>
					{false ? (
						<>
							<Stack.Screen
								name="Connection"
								component={Connection}
								options={{
									headerShown: false,
									animationTypeForReplace: state.isSignout ? "pop" : "push",
								}}
							/>
							<Stack.Screen name="Register" component={Register} />
						</>
					) : (
						<>
							<Stack.Screen
								name="Home"
								component={Home}
								options={{
									headerShown: false,
								}}
							/>
							<Stack.Screen
								name="Conversations"
								component={Conversations}
								options={{
									headerShown: false,
								}}
							/>
							<Stack.Screen
								name="Profil"
								component={Profile}
								options={{
									headerShown: false,
								}}
							/>
						</>
					)}
				</Stack.Navigator>
			</NavigationContainer>
		</View>
	);
};

export default Navigation;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
