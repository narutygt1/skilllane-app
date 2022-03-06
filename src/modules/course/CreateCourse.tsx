import { useNavigate } from "react-router-dom";
import AdminBox from "../../components/AdminBox";
import UserLayout from "../../core/UserLayout";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FormEdit from "./FormEdit";

export default function CreateCourse() {
	let navigate = useNavigate();

	return (
		<UserLayout>
			<Box>
				<AdminBox
					title="สร้างคอร์สใหม่"
					startComponent={
						<Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate("/course")}>
							กลับ
						</Button>
					}>
					<FormEdit type="create" />
				</AdminBox>
			</Box>
		</UserLayout>
	);
}
