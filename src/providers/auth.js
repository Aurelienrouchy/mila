import React, { useMemo, useContext, useReducer } from 'react';
import { USER_KEY } from '../constants/constants.js'
import { AsyncStorage } from 'react-native';
import reducer, { initialState, MERGE_USER } from "../reducers/auth.js";

const AuthContext = React.createContext(AuthProvider);

function AuthProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState || {});

    // // Get Auth state
    // const getAuthState = async () => {
    //     try {
    //         //GET DATA
    //         let data = await getStorageData();

    //         if (data) await handleLogin(data);
    //         else await handleLogout(data);

    //         return data;
    //     } catch (error) {
    //         throw new Error(error);
    //     }
    // };

    const updateUserData = (data, set = false) => {
        const {user} = set ? initialState : state;
        const merged_user = {...user, ...data};
        dispatch({type: MERGE_USER, user: merged_user});
    };

    const getUserData = () => initialState.user;

    const getStorageUser = async () => {
        try {
            const user = await AsyncStorage.getItem(USER_KEY);
    
            if (user !== null) return JSON.parse(user);
            else return null;
    
        } catch (error) {
            throw new Error(error)
        }
    };

    const setStorageUser = async (user) => {
        try {
            await AsyncStorage.setItem(USER_KEY, user);
            dispatch({type: SET_USER, user});
        } catch (err) {
            throw new Error(err);
        }
    };

    const updateStorageUser = async (user) => {
        try {
            await AsyncStorage.mergeItem(USER_KEY, JSON.stringify(user))
        } catch (err) {
            throw new Error(error);
        }
    };

    const value = useMemo(() => {
        return {
            state,
            getStorageUser,
            getUserData,
            setStorageUser,
            updateUserData, 
            updateStorageUser,
            
        };
    }, [state]);

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
}
export { AuthContext };
export default AuthProvider;