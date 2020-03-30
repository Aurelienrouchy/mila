import React, {useContext, useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Auth from './auth.js';
import Home from './home.js';
import {FIREBASE_CONFIG} from './../constants/constants'
import {AuthContext} from './../providers/auth.js';
import { Text } from 'react-native';
import {Font} from 'react-native-unimodules';

const App = () => {
	const [isUserExist, setIsUserExist] = useState(null);
	const [fontLoaded, setFontLoaded] = useState(true);
	const auth = useContext(AuthContext);

    useEffect(() => {
		// loadFonts();
        initialize();
	}, []);
	
	// async function loadFonts() {
	// 	await Font.loadAsync({
	// 		'coachellaregular': require('./../../assets/fonts/coachellaregular.otf'),
	// 	});
	// 	setFontLoaded(true);
	// }

    async function initialize() {
        try {
            const { user } = await auth.getAuthState();
			
            if (user) {
                //check if username exist
                let userid = !!(user.uuid);

                if (userid) {
					// TODO check in database
					// If true setIsUserExist(true);
					// else setIsUserExist(false);
				} else setIsUserExist(false);

            } else setIsUserExist(false);
        } catch (e) {
            setIsUserExist(false);
        }
	};

	if (!fontLoaded) {
		return (
			<Text>Loading...</Text>
		); 
	}

	return (
		<NavigationContainer>
			{(isUserExist !== null) && isUserExist ? (
				Auth()
			) : (
				Auth()
			)}
		</NavigationContainer>
	);
};

export default App;