// import auth from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
//import "firebase/auth";
import {FB_API_KEY} from './../constants/constants.js';
import { AuthContext } from './../providers/auth.js'
// import * as Facebook from 'expo-facebook';

// export const signWithFacebook = async () => {
//     try {
//         await Facebook.initializeAsync(FB_API_KEY);
//         const {
//             type,
//             token,
//             expires,
//             permissions,
//             declinedPermissions,
//         } = await Facebook.logInWithReadPermissionsAsync({
//             permissions: ['public_profile', 'user_photos'],
//         });
        
//         if (type === 'success') {
//             const credential = firebase.auth.FacebookAuthProvider.credential(token);
//             try {
//                 const res = await firebase.auth().signInWithCredential(credential);
//                 console.log(res)
//                 // TODO Check if in database 
//                 // If true got home
//                 if(res.user) {
//                     let user = { ...res.user.providerData[0], firebaseUid: res.user.uid };
//                     return user
//                 } else return null
//             } catch(err) {
//                 throw new Error(err)
//             }
//         }
//     } catch (err) {
//         throw new Error(err)
//     }
// }

export const signWithFacebook = async () => {}

export const signWithGoogle = () => {
    // console.log('sss')
    // const provider = new firebase.auth.GoogleAuthProvider();

    // firebase.auth().signInWithPopup(provider)
};

export const signWithMail = () => ({});

export const signWithPhone = async (phone, code) => {
    console.log(phone, code)
    const confirmation = await auth().signInWithPhoneNumber(`${phone}`);

    try {
        console.log(await confirmation.confirm(code))
        await confirmation.confirm(code); // User entered code
        // Successful login - onAuthStateChanged is triggered
      } catch (e) {
        console.error(e); // Invalid code
      }
};