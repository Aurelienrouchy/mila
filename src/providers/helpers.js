import {AsyncStorage} from 'react-native';
import {TOKEN_KEY, USER_KEY} from './../constants/constants.js';

// export const setAuthorization = token => {
// 	// Apply authorization token to every request if logged in
// 	if (!token) delete axios.defaults.headers.common['Authorization'];
// 	else axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// };

export const getStorageData = async () => {
try {
    let token = await AsyncStorage.getItem(TOKEN_KEY);
    let user = await AsyncStorage.getItem(USER_KEY);

    if(token !== null && user !== null) {
		 return {token, user:JSON.parse(user)};
	} else {
    	return null
	}
} catch (error) {
    throw new Error(error)
}
};

export const setStorageData = async (data) => {
    try {
        if(!data) {
			await AsyncStorage.multiRemove(keys);
		} else {
            let {token, user} = data;
            let data_ = [[USER_KEY, JSON.stringify(user)], [TOKEN_KEY, token]];
            await AsyncStorage.multiSet(data_);
        }
    } catch (error) {
        throw new Error(error)
    }
};