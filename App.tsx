import Constants from "expo-constants";
import React from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import Navigation from "./src/navigation/Navigation";
import { HomeProvider } from "./src/Providers/HomeProvider";
import { RegisterProvider } from "./src/Providers/RegisterProvider";

export default function App() {
	return (
		<RegisterProvider>
			<HomeProvider>
				<Navigation />
			</HomeProvider>
		</RegisterProvider>
	);
}
