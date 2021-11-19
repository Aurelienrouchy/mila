import React, { createContext, FC, useRef, useState } from "react";
import { Dimensions, ScrollView } from "react-native";

export enum SIDE {
	CLASSIC = "classic",
	NO_CLASSIC = "no-classic",
}

interface defaultValueProps {
	side: SIDE;
	toggleSide: () => void;
	data: any;
}

const defaultValue = {
	side: SIDE.CLASSIC,
	toggleSide: () => {},
	data: [
		{
			id: "1",
			name: "Steph",
			age: 21,
			image:
				"https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1727&q=80",
			photos: [
				{
					id: 1,
					uri: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1727&q=80",
				},
				{
					id: 2,
					uri: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1727&q=80",
				},
				{
					id: 3,
					uri: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1727&q=80",
				},
			],

			bio: "I will be the semicolons to your code",
			pctUntilDelete: 43,
		},
		{
			id: "2",
			name: "Laure",
			age: 21,
			image:
				"https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3174&q=80",
			photos: [
				{
					id: 1,
					uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3174&q=80",
				},
				{
					id: 2,
					uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3174&q=80",
				},
				{
					id: 3,
					uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3174&q=80",
				},
			],
			bio: "A dude with a rocket is looking for a gal with fuel",
			pctUntilDelete: 23,
		},
		{
			id: "3",
			name: "Marie",
			age: 21,
			image:
				"https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3174&q=80",
			photos: [
				{
					id: 1,
					uri: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3174&q=80",
				},
				{
					id: 2,
					uri: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3174&q=80",
				},
				{
					id: 3,
					uri: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3174&q=80",
				},
			],
			bio: "A dude with a rocket is looking for a gal with fuel",
			pctUntilDelete: 89,
		},
		{
			id: "4",
			name: "Claudia",
			age: 21,
			image:
				"https://images.unsplash.com/photo-1583002083769-0bd781675d2f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3174&q=80",
			photos: [
				{
					id: 1,
					uri: "https://images.unsplash.com/photo-1583002083769-0bd781675d2f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3174&q=80",
				},
				{
					id: 2,
					uri: "https://images.unsplash.com/photo-1583002083769-0bd781675d2f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3174&q=80",
				},
				{
					id: 3,
					uri: "https://images.unsplash.com/photo-1583002083769-0bd781675d2f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3174&q=80",
				},
			],
			bio: "A dude with a rocket is looking for a gal with fuel",
			pctUntilDelete: 2,
		},
		{
			id: "5",
			name: "Steph",
			age: 21,
			image:
				"https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1727&q=80",
			photos: [
				{
					id: 1,
					uri: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1727&q=80",
				},
				{
					id: 2,
					uri: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1727&q=80",
				},
				{
					id: 3,
					uri: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1727&q=80",
				},
			],

			bio: "I will be the semicolons to your code",
			pctUntilDelete: 74,
		},
		{
			id: "6",
			name: "Laure",
			age: 21,
			image:
				"https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3174&q=80",
			photos: [
				{
					id: 1,
					uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3174&q=80",
				},
				{
					id: 2,
					uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3174&q=80",
				},
				{
					id: 3,
					uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3174&q=80",
				},
			],
			bio: "A dude with a rocket is looking for a gal with fuel",
			pctUntilDelete: 92,
		},
		{
			id: "7",
			name: "Marie",
			age: 21,
			image:
				"https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3174&q=80",
			photos: [
				{
					id: 1,
					uri: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3174&q=80",
				},
				{
					id: 2,
					uri: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3174&q=80",
				},
				{
					id: 3,
					uri: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3174&q=80",
				},
			],
			bio: "A dude with a rocket is looking for a gal with fuel",
			pctUntilDelete: 54,
		},
		{
			id: "8",
			name: "Claudia",
			age: 21,
			image:
				"https://images.unsplash.com/photo-1583002083769-0bd781675d2f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3174&q=80",
			photos: [
				{
					id: 1,
					uri: "https://images.unsplash.com/photo-1583002083769-0bd781675d2f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3174&q=80",
				},
				{
					id: 2,
					uri: "https://images.unsplash.com/photo-1583002083769-0bd781675d2f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3174&q=80",
				},
				{
					id: 3,
					uri: "https://images.unsplash.com/photo-1583002083769-0bd781675d2f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3174&q=80",
				},
			],
			bio: "A dude with a rocket is looking for a gal with fuel",
			pctUntilDelete: 20,
		},
	],
};

export const HomeContext = createContext(defaultValue);

export const HomeProvider: FC = ({ children }) => {
	const [state, setState] = useState<defaultValueProps>(defaultValue);

	const toggleSide = () =>
		setState({
			...state,
			side: state.side === SIDE.CLASSIC ? SIDE.NO_CLASSIC : SIDE.CLASSIC,
		});

	return (
		<HomeContext.Provider value={{ ...state, toggleSide }}>
			{children}
		</HomeContext.Provider>
	);
};
