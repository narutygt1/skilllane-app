import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserLayout from "../../core/UserLayout";
import AdminBox from "../../components/AdminBox";
import NotFound from "../../components/NotFound";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FormEdit from "./FormEdit";
import { ICategory } from "../../types/Category";
import { ICourse } from "../../types/Course";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export default function CourseEdit() {
	let navigate = useNavigate();
	let { courseId } = useParams();
	const myUser = useSelector((state: RootState) => state.user.myUser);
	const [course, setCourse] = useState<ICourse | null>(null);
	const [cats, setCategories] = useState<ICategory[]>([]);
	const [isLoading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		if (!courseId) return;

		async function FetchData() {
			const resCat = await fetch(process.env.REACT_APP_SERVICE_API + "/api/category").then((res) =>
				res.json()
			);
			resCat?.data && setCategories(resCat?.data);

			const resCourse = await fetch(process.env.REACT_APP_SERVICE_API + "/api/course/" + courseId).then(
				(res) => res.json()
			);
			resCourse?.data && setCourse(resCourse?.data);

			setLoading(false);
		}

		FetchData();
	}, [courseId]);

	return (
		<UserLayout>
			<Box>
				<AdminBox
					title="แก้ไขคอร์ส"
					startComponent={
						<Button
							variant="outlined"
							startIcon={<ArrowBackIcon />}
							sx={{ color: "#00532a", borderColor: "#00532a !important" }}
							onClick={() => navigate("/course")}>
							กลับ
						</Button>
					}>
					{isLoading ? (
						<CircularProgress sx={{ marginTop: 4 }} />
					) : course ? (
						<FormEdit value={course} type="edit" categories={cats} userId={myUser?.id || ""} />
					) : (
						<NotFound />
					)}
				</AdminBox>
			</Box>
		</UserLayout>
	);
}
