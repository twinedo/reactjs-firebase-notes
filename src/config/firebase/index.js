import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyAgGF9eLyb0azKm2eYBpgonAKghR8mZpkU',
	authDomain: 'simple-notes-firebase-96613.firebaseapp.com',
	projectId: 'simple-notes-firebase-96613',
	storageBucket: 'simple-notes-firebase-96613.appspot.com',
	messagingSenderId: '928756318345',
	appId: '1:928756318345:web:130174eeaa54bc489d0658',
	measurementId: 'G-Q6S66KSN3T',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();
export const database = firebase.database();

export default firebase;
