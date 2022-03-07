import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserLayout from "../../core/UserLayout";
import AdminBox from "../../components/AdminBox";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FormEdit from "./FormEdit";
import { ICategory } from "../../types/Category";

export default function CourseEdit() {
	let navigate = useNavigate();
	let { courseId } = useParams();
	const [cats, setCategories] = useState<ICategory[]>([]);
	const [isLoading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		async function FetchData() {
			const resData = await fetch(process.env.REACT_APP_SERVICE_API + "/api/category").then((res) =>
				res.json()
			);

			resData?.data && setCategories(resData?.data);
			setLoading(false);
		}

		FetchData();
	}, []);

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
					<FormEdit type="edit" categories={[]} />
				</AdminBox>
			</Box>
		</UserLayout>
	);
}
