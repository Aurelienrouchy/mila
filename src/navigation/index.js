import React, {useContext, useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as RNLocalize from "react-native-localize";
import i18n from 'i18n-js';
import { Text, View } from 'react-native';
import {Font} from 'react-native-unimodules';

import Auth from './auth.js';
import Home from './home.js';
import {FIREBASE_CONFIG} from './../constants/constants'
import {AuthContext} from './../providers/auth.js';


const App = () => {
	const [hasUser, setHasUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [fontLoaded, setFontLoaded] = useState(true);
	const auth = useContext(AuthContext);

    useEffect(() => {
        init();
	}, []);

	const setI18n = () => {
		i18n.locale = RNLocalize.getLocales()[0].countryCode;
		i18n.fallbacks = true;
	};

    async function init() {
		setI18n();
        try {
            const { user } = await auth.getStorageUser();
			
            if (user) {
                //check if username exist
                let userid = !!(user.uuid);

                if (userid) {
					// TODO check in database
					// If true setIsUserExist(true);
					// else setIsUserExist(false);
				} else {
					setHasUser(false);
					setLoading(false);
				}

            } else {
				setHasUser(false);
				setLoading(false);
			}
        } catch (e) {
			setHasUser(false);
			setLoading(false);
        }
	};

	if(loading) {
		return (
			<View>
				<Text></Text>
			</View>
		);
	}

	return (
		<NavigationContainer>
			{(hasUser !== null) && hasUser ? (
				Auth()
			) : (
				Auth()
			)}
		</NavigationContainer>
	);
};

export default App;