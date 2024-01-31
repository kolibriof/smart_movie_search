import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";

export interface UserCredsProps {
	email: string;
	password: string;
}

interface MarkFilmProps {
	filmID: string;
	userID: string;
}

interface UserAuth {
	currentUser: [
		{
			id?: string | null;
			email?: string | null;
			favFilms?: [];
			likedFilms?: [];
		},
	];
	errorMessage: string;
}
const usersRef = collection(db, "users");

export const loginUser = createAsyncThunk(
	"userSlice/loginUser",
	async (props: UserCredsProps, thunkAPI) => {
		try {
			const response = await signInWithEmailAndPassword(
				auth,
				props.email,
				props.password,
			);

			if (response) {
				let userDetails = {
					id: response.user.uid,
					email: response.user.email || "EMAIL_ERROR",
				};
				return userDetails;
			}
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.code);
		}
	},
);

export const createUser = createAsyncThunk(
	"userSlice/createUser",
	async (props: UserCredsProps, thunkAPI) => {
		try {
			const response = await createUserWithEmailAndPassword(
				auth,
				props.email,
				props.password,
			);
			if (response) {
				let userDetails = {
					id: response.user.uid,
					email: response.user.email || "EMAIL_ERROR",
				};
				return userDetails;
			}
		} catch (error: any) {
			if (!error.message) {
				throw error;
			}
			return thunkAPI.rejectWithValue(error);
		}
	},
);

export const readDB = createAsyncThunk(
	"userSlice/readDB",
	async (id: string) => {
		try {
			const currentUserDocRef = doc(db, "users", id);
			const docSnap = await getDoc(currentUserDocRef);

			if (docSnap.exists()) {
				return docSnap.data();
			} else {
				let newUserData = { FavFilms: [], LikedFilms: [] };
				setDoc(doc(usersRef, id), newUserData);
				return newUserData;
			}
		} catch (error) {
			console.log(error);
		}
	},
);

export const addLikedFilm = createAsyncThunk(
	"userSlice/addLikedFilm",
	async (settings: MarkFilmProps) => {
		try {
			const currentUserDocRef = doc(db, "users", settings.userID);
			const docSnap = await getDoc(currentUserDocRef);
			if (docSnap.exists()) {
				setDoc(doc(usersRef, settings.userID), {
					...docSnap.data(),
					LikedFilms: [...docSnap.data().LikedFilms, settings.filmID],
				});
				return settings.filmID;
			} else {
				console.log("Films have not been added.");
			}
		} catch (error) {}
	},
);

export const addFavFilm = createAsyncThunk(
	"userSlice/addFavFilm",
	async (settings: MarkFilmProps) => {
		try {
			const currentUserDocRef = doc(db, "users", settings.userID);
			const docSnap = await getDoc(currentUserDocRef);
			if (docSnap.exists()) {
				setDoc(doc(usersRef, settings.userID), {
					...docSnap.data(),
					FavFilms: [...docSnap.data().FavFilms, settings.filmID],
				});
				return settings.filmID;
			} else {
				console.log("Films have not been added.");
			}
		} catch (error) {}
	},
);

const storedUser = localStorage.getItem("currentUser");
const parsedUser = storedUser ? JSON.parse(storedUser) : {};

const initialState: UserAuth = {
	currentUser: [
		{
			id: parsedUser.id || "",
			email: parsedUser.email || "",
			favFilms: parsedUser.favFilms || "",
			likedFilms: parsedUser.likedFilms || "",
		},
	],
	errorMessage: "",
};

export const userSlice = createSlice({
	initialState,
	name: "userSlice",
	reducers: {
		SignOutUser: (state) => {
			localStorage.removeItem("currentUser");
			state.currentUser[0] = {};
		},
	},
	extraReducers(builder) {
		builder
			.addCase(loginUser.fulfilled, (state, action) => {
				if (action.payload) {
					state.currentUser[0] = action.payload;
					if (!localStorage.getItem("currentUser")) {
						localStorage.setItem(
							"currentUser",
							JSON.stringify(state.currentUser[0]),
						);
					}
				}
			})

			.addCase(loginUser.pending, (state, action) => {
				console.log("Loading...");
			})
			.addCase(loginUser.rejected, (state, action) => {
				if (typeof action.payload === "string") {
					switch (action.payload) {
						case "auth/invalid-email":
							state.errorMessage = "The email is invalid.";
							break;
						case "auth/missing-password":
							state.errorMessage = "Please enter the password.";
							break;
						case "auth/invalid-credential":
							state.errorMessage = "The password is incorrect.";
							break;
						case "auth/too-many-requests":
							state.errorMessage = "Too many requests. Please try later.";
							break;
						default:
							state.errorMessage = action.payload;
							break;
					}
				}
			})
			.addCase(createUser.fulfilled, (state, action) => {
				if (action.payload) {
					state.currentUser[0] = action.payload;
				}
			})
			.addCase(createUser.pending, (state, action) => {
				console.log("Loading...");
			})
			.addCase(createUser.rejected, (state, action) => {
				if (typeof action.payload === "string") {
					state.errorMessage = action.payload;
				}
			})
			.addCase(readDB.fulfilled, (state, action) => {
				state.currentUser[0].favFilms = action.payload!.FavFilms;
				state.currentUser[0].likedFilms = action.payload!.LikedFilms;
				localStorage.setItem(
					"currentUser",
					JSON.stringify(state.currentUser[0]),
				);
			})
			.addCase(addFavFilm.fulfilled, (state, action) => {
				//@ts-ignore
				state.currentUser[0].favFilms?.push(action.payload);
			})
			.addCase(addLikedFilm.fulfilled, (state, action) => {
				//@ts-ignore
				state.currentUser[0].likedFilms?.push(action.payload);
			});
	},
});

export const { SignOutUser } = userSlice.actions;
export default userSlice.reducer;
