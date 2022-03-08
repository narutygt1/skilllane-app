import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SearchBox from "./SearchBox";
import MyDateTimePicker from "./MyDateTimePicker";

export default function SearchCombo() {
	return (
		<Box display="flex" p={1} borderRadius={1} sx={{ flexGrow: 1, backgroundColor: "#fff" }}>
			<Grid container spacing={1}>
				<Grid item xs={12} sm={6}>
					<SearchBox fullWidth={true} />
				</Grid>
				<Grid item xs={12} sm={3}>
					<MyDateTimePicker />
				</Grid>
				<Grid item xs={12} sm={3}>
					<Button variant="contained" disableElevation fullWidth sx={{ height: 40 }}>
						ค้นหา
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
}
