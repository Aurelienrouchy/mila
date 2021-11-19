import Constants from "expo-constants";
import React, { FC, useContext, useEffect, useRef } from "react";
import {
	View,
	StyleSheet,
	Text,
	ImageBackground,
	ScrollView,
	Dimensions,
} from "react-native";
import FastImage from "react-native-fast-image";

interface CardProps {
	user: any;
}

const { width, height } = Dimensions.get("window");

const Card: FC<any> = ({ user }) => {
	const scrollRef = useRef<ScrollView>(null);
	useEffect(
		() => scrollRef.current?.scrollTo({ x: 0, y: 0, animated: false }),
		[user.image]
	);

	return (
		<View style={styles.container}>
			<FastImage
				style={styles.image}
				source={{
					uri: user.image,
					headers: { Authorization: "someAuthToken" },
					priority: FastImage.priority.normal,
				}}
			/>
			<ScrollView ref={scrollRef} style={styles.scrollView}>
				<View style={styles.fakeView}>{}</View>
				<View style={styles.infosContaire}>
					<Text style={styles.name}>
						{user.name}, {user.age}
					</Text>
					<Text style={styles.bio}>{user.bio}</Text>
					{user.photos.map((photo: any, index: number) => (
						<FastImage
							key={index}
							style={styles.photos}
							source={{
								uri: photo.uri,
								headers: { Authorization: "someAuthToken" },
								priority: FastImage.priority.normal,
							}}
						/>
					))}
				</View>
			</ScrollView>
		</View>
	);
};

export default Card;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		overflow: "hidden",
		backgroundColor: "#B91",
		borderRadius: 20,
	},
	scrollView: {
		...StyleSheet.absoluteFillObject,
	},
	fakeView: {
		marginTop: height - (70 + Constants.statusBarHeight + 100),
	},
	image: {
		flex: 1,
		backgroundColor: "pink",
	},
	infosContaire: {
		position: "relative",
		zIndex: 2,
		width,
		borderRadius: 20,
		backgroundColor: "#FFF",
		padding: 20,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.32,
		shadowRadius: 15,

		elevation: 9,
	},
	name: {
		fontSize: 30,
		color: "#000",
		fontWeight: "bold",
		height: 100,
	},
	bio: {
		fontSize: 18,
		color: "#000",
		backgroundColor: "#ffccbfc2",
		padding: 20,
		borderRadius: 20,
		overflow: "hidden",
	},
	photos: {
		width: width - 40,
		height: width - 40,
		overflow: "hidden",
		borderRadius: 20,
		marginBottom: 20,
	},
});
