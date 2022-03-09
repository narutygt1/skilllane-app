import { useState } from "react";
import { useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SearchBox from "./SearchBox";
import MyDateTimePicker from "./MyDateTimePicker";
import { setCourseList } from "../redux/slices/Course";

export default function SearchCombo() {
	const dispatch = useDispatch();
	const [sName, setSearchName] = useState<string>("");
	const [sTime, setSearchTime] = useState<Date | null>(null);

	async function searchCourse() {
		const resData = await fetch(
			process.env.REACT_APP_SERVICE_API + "/api/course/search?name=" + sName + "&time=" + (sTime ? sTime.toISOString() : "")
		).then((res) => res.json());

		dispatch(setCourseList(resData?.data || []));
	}

	return (
		<Box display="flex" p={1} borderRadius={1} sx={{ flexGrow: 1, backgroundColor: "#fff" }}>
			<Grid container spacing={1}>
				<Grid item xs={12} sm={6}>
					<SearchBox fullWidth={true} onChange={(v) => setSearchName(v)} />
				</Grid>
				<Grid item xs={12} sm={3}>
					<MyDateTimePicker onChange={(v) => setSearchTime(v)} />
				</Grid>
				<Grid item xs={12} sm={3}>
					<Button
						variant="contained"
						disableElevation
						fullWidth
						sx={{ height: 40 }}
						onClick={() => searchCourse()}>
						ค้นหา
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
}
