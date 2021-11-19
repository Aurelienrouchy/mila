import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import React, { useContext, useEffect } from "react";
import {
	StyleSheet,
	View,
	Text,
	Dimensions,
	Image,
	Pressable,
	ScrollView,
} from "react-native";
import PhotoAndTimer from "../components/PhotoAndTimer";
import { HomeContext, SIDE } from "../Providers/HomeProvider";

const IconArrowWhite = require("./../../assets/icons/down-arrow.png");

interface ConversationsProps {}
const { width, height } = Dimensions.get("screen");

const Conversations = () => {
	const { side, data: matchs } = useContext(HomeContext);
	const navigation = useNavigation();

	return (
		<View style={[styles.container]}>
			<View style={[styles.header]}>
				<Pressable onPress={() => navigation.goBack()} style={styles.icon}>
					<Image source={IconArrowWhite} fadeDuration={0} style={styles.icon} />
				</Pressable>
				<Text style={styles.title}>Matchs</Text>
			</View>
			<View style={[styles.matchsContainer]}>
				<ScrollView
					style={[styles.matchs]}
					showsHorizontalScrollIndicator={false}
					horizontal
				>
					{matchs.map((match, index) => (
						<Pressable
							key={index}
							onPress={() => {}}
							style={({ pressed }) => [styles.match]}
						>
							<PhotoAndTimer pct={match.pctUntilDelete} uri={match.image} />
							<Text style={styles.matchName}>{match.name.slice(0, 10)}</Text>
						</Pressable>
					))}
				</ScrollView>
			</View>
			<View style={[styles.conversations]}>
				<View style={[styles.titleContainer]}>
					<Text style={styles.titleConversations}>Messages</Text>
				</View>
				<ScrollView showsVerticalScrollIndicator={false}>
					{matchs.map((match, index) => (
						<Pressable
							key={index}
							onPress={() => {}}
							style={styles.conversation}
						>
							<PhotoAndTimer pct={match.pctUntilDelete} uri={match.image} />

							<View style={[styles.infos]}>
								<View style={[styles.nameAndLastMessage]}>
									<Text style={styles.name}>{match.name}</Text>
									<Text>Trop cool la dernier</Text>
								</View>
								<View style={[styles.timeAndNotif]}>
									<Text>11:30</Text>
									<Text>1</Text>
								</View>
							</View>
						</Pressable>
					))}
				</ScrollView>
			</View>
		</View>
	);
};

export default Conversations;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#000",
		paddingTop: Constants.statusBarHeight,
	},
	header: {
		height: 70,
		width,
		paddingHorizontal: 30,
		alignItems: "center",
		flexDirection: "row",
	},
	title: {
		fontSize: 25,
		color: "#fff",
	},
	titleConversations: {
		fontSize: 25,
		color: "#000",
	},
	icon: {
		width: 25,
		height: 25,
		marginRight: 15,
	},
	matchsContainer: {
		height: 120,
		width,
		paddingTop: 26,
		backgroundColor: "#FFF",
		borderTopRightRadius: 20,
		borderTopLeftRadius: 20,
	},
	matchs: {
		height: 70,
		width,
		paddingLeft: 16,
	},
	match: {
		height: 74,
		width: 74,
		alignItems: "center",
		marginRight: 10,
	},
	matchName: {
		fontSize: 10,
		marginTop: 8,
	},
	conversations: {
		flex: 1,
		paddingHorizontal: 16,
		backgroundColor: "#FFF",
	},
	titleContainer: {
		marginLeft: 4,
		height: 60,
		justifyContent: "center",
	},
	conversation: {
		height: 74,
		alignItems: "center",
		flexDirection: "row",
		marginBottom: 10,
	},
	infos: {
		width: width - 108,
		flexDirection: "row",
	},
	nameAndLastMessage: {
		height: 64,
		paddingLeft: 10,
		width: (width - 108) * 0.7,
		justifyContent: "space-around",
	},
	timeAndNotif: {
		height: 64,
		paddingRight: 4,
		width: (width - 108) * 0.3,
		justifyContent: "space-around",
		alignItems: "flex-end",
	},
	name: {
		fontWeight: "bold",
	},
});
