import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminBox from "../../components/AdminBox";
import UserLayout from "../../core/UserLayout";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FormEdit from "./FormEdit";
import { ICategory } from "../../types/Category";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export default function CreateCourse() {
	let navigate = useNavigate();
	const myUser = useSelector((state: RootState) => state.user.myUser);
	const [cats, setCategories] = useState<ICategory[]>([]);

	useEffect(() => {
		async function FetchData() {
			const resData = await fetch(process.env.REACT_APP_SERVICE_API + "/api/category").then((res) =>
				res.json()
			);

			resData?.data && setCategories(resData?.data);
		}

		FetchData();
	}, []);

	return (
		<UserLayout>
			<Box>
				<AdminBox
					title="สร้างคอร์สใหม่"
					startComponent={
						<Button
							variant="outlined"
							startIcon={<ArrowBackIcon />}
							sx={{ color: "#00532a", borderColor: "#00532a !important" }}
							onClick={() => navigate("/admin/course")}>
							กลับ
						</Button>
					}>
					<FormEdit type="create" categories={cats} userId={myUser?.id || ""} />
				</AdminBox>
			</Box>
		</UserLayout>
	);
}
