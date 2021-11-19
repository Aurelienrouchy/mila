import React, { createContext, FC, useRef, useState } from "react";
import { Dimensions, ScrollView } from "react-native";

interface defaultValueProps {
	currentIndex: number;
	nextView: () => void;
	previousView: () => void;
	scrollViewRef: any;
}

const NUMBER_OF_VIEWS = 6;

const width = Dimensions.get("window").width;
const defaultValue = {
	currentIndex: 0,
	nextView: () => {},
	previousView: () => {},
	scrollViewRef: () => {},
};

export const RegisterContext = createContext(defaultValue);

export const RegisterProvider: FC = ({ children }) => {
	const scrollViewRef = useRef<ScrollView>();
	const [state, setState] = useState<defaultValueProps>({
		...defaultValue,
		scrollViewRef,
	});

	const nextView = () => {
		const nextIndex =
			state.currentIndex < NUMBER_OF_VIEWS
				? state.currentIndex + 1
				: state.currentIndex;

		setState({
			...state,
			currentIndex: nextIndex,
		});

		scrollViewRef.current?.scrollTo({
			x: nextIndex * width,
			y: 0,
			animated: true,
		});
	};

	const previousView = () => {
		const nextIndex =
			state.currentIndex === 0 ? state.currentIndex : state.currentIndex - 1;

		setState({
			...state,
			currentIndex: nextIndex,
		});

		scrollViewRef.current?.scrollTo({
			x: nextIndex * width,
			y: 0,
			animated: true,
		});
	};

	return (
		<RegisterContext.Provider value={{ ...state, nextView, previousView }}>
			{children}
		</RegisterContext.Provider>
	);
};
