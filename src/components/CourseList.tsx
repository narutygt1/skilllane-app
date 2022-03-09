import { useNavigate } from "react-router-dom";
import { ICourse } from "../types/Course";
import CourseCard from "./CourseCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

interface CourseListProps {
	items: ICourse[];
	type: "view" | "edit";
	xs?: number;
	md?: number;
	lg?: number;
	xl?: number;
}

export default function CourseList({ items, type, xs = 12, md = 6, lg = 3, xl = 2.4 }: CourseListProps) {
	let navigate = useNavigate();

	const handlerClick = (id: string) => {
		if (type === "view") {
			navigate("/course/" + id);
		} else if (type === "edit") {
			navigate("/admin/course/" + id);
		}
	};

	return (
		<Box sx={{ flexGrow: 1 }} py={4} px={1}>
			<Grid container spacing={2} columnSpacing={1}>
				{items.map((itm) => (
					<Grid item xs={xs} md={md} lg={lg} xl={xl} key={(itm as any)._id}>
						<CourseCard value={itm} onClick={() => handlerClick((itm as any)._id)} />
					</Grid>
				))}
			</Grid>
		</Box>
	);
}
