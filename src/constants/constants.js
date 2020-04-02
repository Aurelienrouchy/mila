import { getStatusBarHeight } from 'react-native-status-bar-height';

export const FIREBASE_CONFIG = {
	apiKey: "AIzaSyAG-kOrubvL1JBZ6AuBWpaOj3QShX80B-0",
	authDomain: "korben-2df48.firebaseapp.com",
	databaseURL: "https://korben-2df48.firebaseio.com",
	projectId: "korben-2df48",
	storageBucket: "korben-2df48.appspot.com",
	messagingSenderId: "236649452066",
	appId: "1:236649452066:web:9581fda23b6cd515a9707b"
};
export const FB_API_KEY = '713063225765638';

export const TOKEN_KEY = 'token';
export const USER_KEY = 'user';
export const keys = [TOKEN_KEY, USER_KEY]; 

export const HEADER_HEIGHT = 100; 
export const STATUS_BAR_HEIGHT = getStatusBarHeight();

export const profiles_next = [{
	picture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80',
	age: 18,
	fname: 'Lorie',
	lname: 'Prevost',
	desc: 'BLABA',
	gender: 'F',
}, {
	picture: '',
	age: 20,
	fname: 'Marie',
	lname: 'Billboard',
	desc: 'PROUT',
	gender: 'F',
}, {
	picture: require('./../../assets/photos/3.jpeg'),
	age: 28,
	fname: 'Sophie',
	lname: 'Martin',
	desc: 'BLABdsfghfyA',
	gender: 'F',
}, {
	picture: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80',
	age: 30,
	fname: 'Tiphaine',
	lname: 'Rouchy',
	desc: 'PROAAAUT',
	gender: 'F',
}];
export const profiles = [{
	id: 1,
	picture: require('./../../assets/photos/1.jpeg'),
	t: require('./../../assets/photos/1t.jpg'),
	age: 32,
	fname: 'Anais',
	lname: 'Lor',
	desc: 'LAIRS',
	gender: 'F',
	city: 'Paris',
	distance: 2,
	photos: []
}, {
	id: 2,
	picture: require('./../../assets/photos/2.jpeg'),
	t: require('./../../assets/photos/2t.jpg'),
	age: 21,
	fname: 'Odette',
	lname: 'Bidault',
	desc: 'PROUT c\'est PROUT',
	gender: 'F',
	city: 'Paris',
	distance: 2,
	photos: []
}, {
	id: 3,
	picture: require('./../../assets/photos/3.jpeg'),
	t: require('./../../assets/photos/3t.jpg'),
	age: 27,
	fname: 'Constance',
	lname: 'Pr',
	desc: 'Mais non',
	gender: 'F',
	city: 'Paris',
	distance: 2,
	photos: []
}, {
	id: 4,
	picture: require('./../../assets/photos/4.jpeg'),
	age: 19,
	fname: 'Aurelie',
	lname: 'Sarazin',
	desc: 'Aurelie la plus belle',
	gender: 'F',
	city: 'Paris',
	distance: 2,
	photos: []
}, {
	id: 5,
	picture: require('./../../assets/photos/5.jpeg'),
	age: 32,
	fname: 'Anais',
	lname: 'Lor',
	desc: 'LAIRS',
	gender: 'F',
	city: 'Paris',
	distance: 2,
	photos: []
}, {
	id: 6,
	picture: require('./../../assets/photos/6.jpeg'),
	age: 21,
	fname: 'Odette',
	lname: 'Bidault',
	desc: 'PROUT c\'est PROUT',
	gender: 'F',
	city: 'Paris',
	distance: 2,
	photos: []
}, {
	id: 7,
	picture: require('./../../assets/photos/7.jpeg'),
	age: 27,
	fname: 'Constance',
	lname: 'Pr',
	desc: 'Mais non',
	gender: 'F',
	city: 'Paris',
	distance: 2,
	photos: []
}, {
	id: 8,
	picture: require('./../../assets/photos/10.jpeg'),
	age: 19,
	fname: 'Aurelie',
	lname: 'Sarazin',
	desc: 'Aurelie la plus belle',
	gender: 'F',
	city: 'Paris',
	distance: 2,
	photos: []
}, {
	id: 9,
	picture: require('./../../assets/photos/9.jpeg'),
	age: 32,
	fname: 'Anais',
	lname: 'Lor',
	desc: 'LAIRS',
	gender: 'F',
	city: 'Paris',
	distance: 2,
	photos: []
}
// 	id: 10,
// 	picture: 'https://images.unsplash.com/photo-1488716820095-cbe80883c496?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1233&q=80',
// 	age: 21,
// 	fname: 'Odette',
// 	lname: 'Bidault',
// 	desc: 'PROUT c\'est PROUT',
// 	gender: 'F',
// 	city: 'Paris',
// 	distance: 2,
// 	photos: []
// }, {
// 	id: 11,
// 	picture: 'https://images.unsplash.com/photo-1495298599282-d8920eb5009b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80',
// 	age: 27,
// 	fname: 'Constance',
// 	lname: 'Pr',
// 	desc: 'Mais non',
// 	gender: 'F',
// 	city: 'Paris',
// 	distance: 2,
// 	photos: []
// }, {
// 	id: 12,
// 	picture: 'https://images.unsplash.com/photo-1551024739-78e9d60c45ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80',
// 	age: 19,
// 	fname: 'Aurelie',
// 	lname: 'Sarazin',
// 	desc: 'Aurelie la plus belle',
// 	gender: 'F',
// 	city: 'Paris',
// 	distance: 2,
// 	photos: []
// }
];