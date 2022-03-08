import AdminBox from "../../components/AdminBox";
import { useNavigate } from "react-router-dom";
import UserLayout from "../../core/UserLayout";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CourseList from "../../components/CourseList";

export default function Course() {
	let navigate = useNavigate();

	return (
		<UserLayout>
			<Box>
				<AdminBox
					title="คอร์สของคุณ"
					endComponent={
						<Button
							variant="contained"
							startIcon={<AddCircleIcon />}
							onClick={() => navigate("/course/create")}>
							สร้าง
						</Button>
					}>
					<CourseList items={[]} lg={4} xl={3} />
				</AdminBox>
			</Box>
		</UserLayout>
	);
}
