import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AdminBox from "../../components/AdminBox";
import { useNavigate } from "react-router-dom";
import UserLayout from "../../core/UserLayout";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CourseList from "../../components/CourseList";
import CircularProgress from "@mui/material/CircularProgress";
import { ICourse } from "../../types/Course";
import { RootState } from "../../redux/store";

export default function Course() {
	let navigate = useNavigate();
	const myUser = useSelector((state: RootState) => state.user.myUser);
	const [isLoading, setLoading] = useState<boolean>(true);
	const [courseList, setCourseList] = useState<ICourse[]>([]);

	useEffect(() => {
		async function FetchData() {
			const resData = await fetch(
				process.env.REACT_APP_SERVICE_API + "/api/course/get_by_instructor?instructorId=" + myUser?.id
			).then((res) => res.json());

			setCourseList(resData?.data || []);
			setLoading(false);
		}

		FetchData();
	}, []);

	return (
		<UserLayout>
			<Box>
				<AdminBox
					title="คอร์สของคุณ"
					endComponent={
						<Button
							variant="contained"
							startIcon={<AddCircleIcon />}
							sx={{ backgroundColor: "#00532a !important" }}
							onClick={() => navigate("/admin/course/create")}>
							สร้าง
						</Button>
					}>
					{isLoading ? (
						<CircularProgress sx={{ marginTop: 4 }} />
					) : (
						<CourseList items={courseList} lg={4} xl={3} type="edit" />
					)}
				</AdminBox>
			</Box>
		</UserLayout>
	);
}
