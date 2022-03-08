import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserAuth } from "../../types/User";

const initialLocalStorage = () => {
	const localData = typeof window !== "undefined" ? localStorage.getItem("skilllane-user") : null;
	return localData ? (localData !== "undefined" ? JSON.parse(localData) : null) : null;
};

const initialState: { myUser: IUserAuth | null } = {
	myUser: initialLocalStorage(),
};

export const myUserSlice = createSlice({
	name: "myUser",
	initialState,
	reducers: {
		setMyUser: (state, action: PayloadAction<IUserAuth | null>) => {
			state.myUser = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setMyUser } = myUserSlice.actions;

export default myUserSlice.reducer;
