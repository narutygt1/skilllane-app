import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { setCourseList } from "../../redux/slices/Course";
import CourseList from "../../components/CourseList";
import SearchCombo from "../../components/SearchCombo";
import CategoryTabs from "../../components/CategoryTabs";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { ICourse } from "../../types/Course";

export default function Home() {
	const dispatch = useDispatch();
	const courseList = useSelector((state: RootState) => state.course.courseList);
	const [isLoading, setLoading] = useState<boolean>(true);
	const [selectCat, setSelectCategory] = useState<string>("all");
	const [courseGroup, setCourseGroup] = useState<ICourse[]>([]);

	useEffect(() => {
		async function FetchData() {
			const resData = await fetch(process.env.REACT_APP_SERVICE_API + "/api/course/search").then((res) =>
				res.json()
			);

			dispatch(setCourseList(resData?.data || []));
			setLoading(false);
		}

		FetchData();
	}, []);

	useEffect(() => {
		if (selectCat !== "all") {
			const catFiller = courseList.filter((itm) => (itm.category as any).name === selectCat);
			setCourseGroup(catFiller);
		} else {
			setCourseGroup(courseList);
		}
	}, [courseList, selectCat]);

	return (
		<Box overflow="hidden">
			<Box position="relative">
				<CardMedia
					component="img"
					image="https://skilllane.s3-ap-southeast-1.amazonaws.com/tu/datascience/data_science_banner.jpg"
					alt="skilllane test"
					height={230}
				/>
				<Typography width="100%" position="absolute" top={76} variant="h3" color="#fff" fontSize={{ xs: 26, sm: 38 }} px={2}>
					ยินดีต้อนรับสู่ หลักสูตรออนไลน์
				</Typography>
			</Box>
			<Box mx="auto" maxWidth={1140} px={1}>
				<Box position="relative" top={-28} mx="auto" maxWidth={980} mb={6}>
					<SearchCombo />
				</Box>
				<Box>
					<Typography variant="h1" component="div" fontSize={{ xs: 28, md: 36 }} color="#4e4e4e" mb={3}>
						วิชาในหลักสูตร
					</Typography>
					<CategoryTabs value={selectCat} onChange={(v) => setSelectCategory(v)} />
				</Box>
				<Box>
					{isLoading ? (
						<CircularProgress sx={{ marginTop: 4 }} />
					) : (
						<CourseList items={courseGroup} type="view" />
					)}
				</Box>
			</Box>
		</Box>
	);
}
