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

export interface DeleteMovieProps extends MarkFilmProps {
	type: "fav" | "liked";
	currentFilms: {
		FavFilms: string[];
		LikedFilms: string[];
	};
}

interface UserAuth {
	currentUser: [
		{
			id: string;
			email: string;
			favFilms: string[];
			likedFilms: string[];
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
					favFilms: [],
					likedFilms: [],
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
	async (settings: MarkFilmProps, { rejectWithValue }) => {
		try {
			const currentUserDocRef = doc(db, "users", settings.userID);
			const docSnap = await getDoc(currentUserDocRef);
			if (docSnap.exists()) {
				setDoc(doc(usersRef, settings.userID), {
					...docSnap.data(),
					LikedFilms: [...docSnap.data().LikedFilms, settings.filmID],
				});
			} else {
				console.log("Films have not been added.");
			}
		} catch (error) {
			rejectWithValue(error);
		}
	},
);

export const deleteMovieFrom = createAsyncThunk(
	"userSlice/deleteMovieFrom",
	async (settings: DeleteMovieProps) => {
		const currentUserDocRef = doc(db, "users", settings.userID);
		const docSnap = await getDoc(currentUserDocRef);
		if (settings.type === "fav") {
			const tempFavArray = settings.currentFilms.FavFilms.filter(
				(i) => i !== settings.filmID,
			);
			try {
				if (docSnap.exists()) {
					setDoc(doc(usersRef, settings.userID), {
						...docSnap.data(),
						FavFilms: tempFavArray,
					});
				}
				const upToDateSnap = await getDoc(currentUserDocRef);
				return upToDateSnap.data();
			} catch (error) {
				console.log("Liked film was not deleted");
			}
		}
		if (settings.type === "liked") {
			const tempLikedArray = settings.currentFilms.LikedFilms.filter(
				(i) => i !== settings.filmID,
			);
			try {
				if (docSnap.exists()) {
					setDoc(doc(usersRef, settings.userID), {
						...docSnap.data(),
						LikedFilms: tempLikedArray,
					});
				}
				const upToDateSnap = await getDoc(currentUserDocRef);
				return upToDateSnap.data();
			} catch (error) {
				console.log("Liked film was not deleted");
			}
		}
	},
);

export const addFavFilm = createAsyncThunk(
	"userSlice/addFavFilm",
	async (settings: MarkFilmProps, { rejectWithValue }) => {
		try {
			const currentUserDocRef = doc(db, "users", settings.userID);
			const docSnap = await getDoc(currentUserDocRef);
			if (docSnap.exists()) {
				setDoc(doc(usersRef, settings.userID), {
					...docSnap.data(),
					FavFilms: [...docSnap.data().FavFilms, settings.filmID],
				});
			} else {
				console.log("Films have not been added.");
			}
		} catch (error) {
			rejectWithValue(error);
		}
	},
);

const storedUser = localStorage.getItem("currentUser");
const parsedUser = storedUser ? JSON.parse(storedUser) : {};

const initialState: UserAuth = {
	currentUser: [
		{
			id: parsedUser.id || "",
			email: parsedUser.email || "",
			favFilms: parsedUser.favFilms || [],
			likedFilms: parsedUser.likedFilms || [],
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
			state.currentUser[0] = {
				id: "",
				email: "",
				favFilms: [],
				likedFilms: [],
			};
		},
	},
	extraReducers(builder) {
		builder
			.addCase(loginUser.fulfilled, (state, action) => {
				if (action.payload) {
					state.errorMessage = "";
					state.currentUser[0] = {
						...state.currentUser[0],
						id: action.payload.id,
						email: action.payload.email,
					};
					if (!localStorage.getItem("currentUser")) {
						localStorage.setItem(
							"currentUser",
							JSON.stringify(state.currentUser[0]),
						);
					}
				}
			})

			.addCase(loginUser.pending, () => {
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
							state.errorMessage = "Credentials error. Please try again.";
							break;
						case "auth/too-many-requests":
							state.errorMessage = "Too many requests. Please try later.";
							break;
						default:
							state.errorMessage = "Credentials error.";
							break;
					}
				}
			})
			.addCase(createUser.fulfilled, (state, action) => {
				if (action.payload) {
					state.errorMessage = "";
					state.currentUser[0] = {
						...state.currentUser[0],
						id: action.payload.id,
						email: action.payload.email,
					};
				}
				if (!localStorage.getItem("currentUser")) {
					localStorage.setItem(
						"currentUser",
						JSON.stringify(state.currentUser[0]),
					);
				}
			})
			.addCase(createUser.pending, () => {
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
			.addCase(deleteMovieFrom.fulfilled, (state, action) => {
				if (action.payload) {
					if (action.payload!.FavFilms.length === 0) {
						state.currentUser[0].favFilms = [];
					}
					if (action.payload!.LikedFilms.length === 0) {
						state.currentUser[0].likedFilms = [];
					}
					state.currentUser[0].favFilms = action.payload!.FavFilms;
					state.currentUser[0].likedFilms = action.payload!.LikedFilms;
				}
			});
	},
});

export const { SignOutUser } = userSlice.actions;
export default userSlice.reducer;
