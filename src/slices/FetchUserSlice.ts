import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";

export interface UserCredsProps {
	email: string;
	password: string;
}

interface UserAuth {
	currentUser: [
		{
			id: string;
			email: string;
			favFilms?: [];
			likedFilms?: [];
		},
	];
}

export const loginUser = createAsyncThunk(
	"userSlice/loginUser",
	async (props: UserCredsProps) => {
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
		} catch (error) {
			console.log("THE ERROR IS FOLLOWING" + error);
		}
	},
);

export const createUser = createAsyncThunk(
	"userSlice/createUser",
	async (props: UserCredsProps) => {
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
		} catch (error) {
			console.log("THE ERROR IS FOLLOWING" + error);
		}
	},
);

const initialState: UserAuth = {
	currentUser: [
		{
			id: "",
			email: "",
		},
	],
};

export const userSlice = createSlice({
	initialState,
	name: "userSlice",
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(loginUser.fulfilled, (state, action) => {
				if (action.payload) {
					state.currentUser[0] = action.payload;
				}
				console.log(action.payload);
			})

			.addCase(loginUser.pending, (state, action) => {
				console.log("Loading...");
			})
			.addCase(loginUser.rejected, (state, action) => {
				console.log("Something went wrong as fuck");
				console.log(action.error);
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
				console.log("Something went wrong as fuck");
				console.log(action.error);
			});
	},
});

export const {} = userSlice.actions;
export default userSlice.reducer;
