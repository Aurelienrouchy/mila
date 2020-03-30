import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthProvider from './../providers/auth.js';
import Name from '../components/auth/Name';
import SignIn from '../components/auth/SignIn';
import GenderAndPrefer from '../components/auth/GenderAndPrefer.js';
import Age from '../components/auth/Age.js';
import Connect from '../components/auth/Connect.js';
import ChoosePhotos from '../components/auth/ChoosePhotos.js';

const StackAuth = createStackNavigator();

function AuthStack() {
	return (
		<AuthProvider>
			<StackAuth.Navigator initialRouteName="SignIn" headerMode="none">
				<StackAuth.Screen name="SignIn" component={SignIn} />
				<StackAuth.Screen name="Name" component={Name} />
				<StackAuth.Screen name="Gender" component={GenderAndPrefer} />
				<StackAuth.Screen name="Prefer" component={GenderAndPrefer} />
				<StackAuth.Screen name="Age" component={Age} />
				<StackAuth.Screen name="Connect" component={Connect} />
				<StackAuth.Screen name="ChoosePhotos" component={ChoosePhotos} />
			</StackAuth.Navigator>
		</AuthProvider>
	);
};

export default AuthStack;