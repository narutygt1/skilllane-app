import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";
import { ICourse } from "../types/Course";
import NotFound from "../components/NotFound";

interface DescriptionDetailProps {
	title: string;
	content: string;
}

const DescriptionDetail = ({ title, content }: DescriptionDetailProps) => {
	return (
		<Box>
			<Typography fontWeight={700} mt={2}>
				{title}
			</Typography>
			<Typography>{content}</Typography>
		</Box>
	);
};

interface PriceBoxProps {
	price: string;
	buttonLabel: string;
	variant: "outlined" | "contained";
}

const PriceBox = ({ price, buttonLabel, variant }: PriceBoxProps) => {
	return (
		<Box display="flex" height="100%" border={1}>
			<Stack margin="0 auto" p={1}>
				<Box mt={3} mb={2}>
					<Typography variant="h4">{price}</Typography>
				</Box>

				<Box mb={2}>
					<Button variant={variant} size="large">
						{buttonLabel}
					</Button>
				</Box>
				<Grid container spacing={1}>
					<Grid item xs={2}>
						<CheckIcon fontSize="small" />
					</Grid>
					<Grid item xs={10}>
						<Typography variant="body2" fontSize={14} textAlign="left">
							สามารถเรียนที่ไหน เมื่อไหร่ก็ได้ตลอดชีพ
						</Typography>
					</Grid>
					<Grid item xs={2}>
						<CheckIcon fontSize="small" />
					</Grid>
					<Grid item xs={10}>
						<Typography variant="body2" fontSize={14} textAlign="left">
							เนื้อหาทั้งหมด 37 วิดีโอ ความยาวรวมกัน 8 ชั่วโมง 0 นาที
						</Typography>
					</Grid>
				</Grid>
			</Stack>
		</Box>
	);
};

export default function CourseDetails() {
	let { courseId } = useParams();
	const [course, setCourse] = useState<ICourse | null>(null);
	const [isLoading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		async function FetchData() {
			const resData = await fetch(process.env.REACT_APP_SERVICE_API + "/api/course/" + courseId).then((res) =>
				res.json()
			);
			resData?.data && setCourse(resData?.data);
			setLoading(false);
		}

		FetchData();
	}, [courseId]);

	if (isLoading) return <CircularProgress sx={{ marginTop: 4 }} />;

	if (!course) return <NotFound />;

	return (
		<Box overflow="hidden">
			<Box position="relative">
				<CardMedia
					component="img"
					image="https://resource.skilllane.com/banner_academic/tu_banner.png"
					alt="skilllane test"
					height={250}
				/>
				<Box mx="auto" maxWidth={1140}>
					<Box width="100%" px={1} position="absolute" top="50%" sx={{ transform: "translateY(-50%)" }}>
						<Box mb={2}>
							<Stack
								flexDirection="row"
								alignItems="center"
								sx={{ "& img": { objectFit: "contain", height: 14 } }}>
								<img src="https://resource.skilllane.com/tu/icon-tuxsa.png" alt="" />
								<Typography variant="h2" fontSize={16} color="#d13434" ml={1}>
									หลักสูตรปริญญาโทออนไลน์
								</Typography>
							</Stack>
						</Box>

						<Box mb={2}>
							<Typography variant="h2" fontSize={{ xs: 16, sm: 30 }} color="#676767" textAlign="left">
								{course.name}
							</Typography>
						</Box>
						<Box display="flex" mr="auto">
							<Button
								size="small"
								variant="outlined"
								sx={{
									border: "1px solid #555",
									color: "#555",
									fontSize: { xs: 10, sm: 12 },
									"&:hover": {
										color: "#fff",
										backgroundColor: "#00532a",
										borderColor: "#00532a",
									},
								}}>
								{course.subject}
							</Button>
						</Box>
					</Box>
				</Box>
			</Box>

			<Box mt={2} mb={2} mx="auto" maxWidth={1140} px={1}>
				<Box mb={2}>
					<div role="presentation">
						<Breadcrumbs aria-label="breadcrumb">
							<Link underline="hover" color="inherit" href="/home">
								Home
							</Link>
							<Typography color="text.primary">{course.name}</Typography>
						</Breadcrumbs>
					</div>
				</Box>
				<Box sx={{ flexGrow: 1 }} mb={2}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<CardMedia component="img" image={course.image} alt="skilllane test" />
						</Grid>
						<Grid item xs={12} sm={3}>
							<PriceBox price="1,500 บาท" buttonLabel="ชำระเงินเรียนไม่เก็บหน่วยกิต" variant="outlined" />
						</Grid>
						<Grid item xs={12} sm={3}>
							<PriceBox price="4,500 บาท" buttonLabel="ชำระเงินเรียนเก็บหน่วยกิต" variant="contained" />
						</Grid>
					</Grid>
				</Box>
				<Box>
					<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
						<Tabs value={0}>
							<Tab label="รายละเอียด" sx={{ fontSize: 20 }} />
						</Tabs>
					</Box>
					<Box sx={{ p: 3 }} textAlign="left">
						<Typography>{course.description}</Typography>
						<DescriptionDetail title="หมวดหมู่" content={(course.category as any).display} />
						<DescriptionDetail title="จำนวนนักเรียน" content={course.number_of_student.toString()} />
						<DescriptionDetail
							title="ผู้สอน"
							content={`${(course.instructor[0] as any).firstname} ${(course.instructor[0] as any).lastname}`}
						/>
						<DescriptionDetail title="เริ่มสอน" content={new Date(course.start_time).toLocaleString()} />
						<DescriptionDetail title="สอนถึง" content={new Date(course.end_time).toLocaleString()} />
					</Box>
				</Box>
			</Box>
		</Box>
	);
}
