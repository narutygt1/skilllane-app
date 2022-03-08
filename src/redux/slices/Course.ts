import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICourse } from "../../types/Course";

const initialState: { courseList: ICourse[] } = {
	courseList: [],
};

export const courseSlice = createSlice({
	name: "courseList",
	initialState,
	reducers: {
		setCourseList: (state, action: PayloadAction<ICourse[]>) => {
			state.courseList = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setCourseList } = courseSlice.actions;

export default courseSlice.reducer;
