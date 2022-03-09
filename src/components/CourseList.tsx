import { ICourse } from "../types/Course";
import CourseCard from "./CourseCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

interface CourseListProps {
	items: ICourse[];
	xs?: number;
	md?: number;
	lg?: number;
	xl?: number;
}

export default function CourseList({ items, xs = 12, md = 6, lg = 3, xl = 2.4 }: CourseListProps) {
	return (
		<Box sx={{ flexGrow: 1 }} py={4} px={1}>
			<Grid container spacing={2} columnSpacing={1}>
				{items.map((itm) => (
					<Grid item xs={xs} md={md} lg={lg} xl={xl} key={(itm as any)._id}>
						<CourseCard value={itm} />
					</Grid>
				))}
			</Grid>
		</Box>
	);
}
