import { useParams, useNavigate } from "react-router-dom";
import UserLayout from "../../core/UserLayout";
import AdminBox from "../../components/AdminBox";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FormEdit from "./FormEdit";

export default function CourseEdit() {
	let navigate = useNavigate();
	let { courseId } = useParams();
	console.log(courseId);

	return (
		<UserLayout>
			<Box>
				<AdminBox
					title="แก้ไขคอร์ส"
					startComponent={
						<Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate("/course")}>
							กลับ
						</Button>
					}>
					<FormEdit type="edit" />
				</AdminBox>
			</Box>
		</UserLayout>
	);
}
