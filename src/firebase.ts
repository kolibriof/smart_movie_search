import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyACkRrMyIsX2cRxYg39IOLp0kmJJjfBpgE",

	authDomain: "smart-movie-search-auth.firebaseapp.com",

	projectId: "smart-movie-search-auth",

	storageBucket: "smart-movie-search-auth.appspot.com",

	messagingSenderId: "700716246617",

	appId: "1:700716246617:web:1f652ef49141d7b1593348",

	measurementId: "G-YY9SP30CJ1",
	databaseURL:
		"https://smart-movie-search-auth-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
