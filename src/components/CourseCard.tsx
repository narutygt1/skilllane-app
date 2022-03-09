import { MouseEventHandler } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import Stack from "@mui/material/Stack";
import Hidden from "@mui/material/Hidden";
import { styled } from "@mui/material/styles";
import { ICourse } from "../types/Course";
import { IUser } from "../types/User";

const CustomCardActionArea = styled(CardActionArea)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	"& .MuiCardContent-root": {
		padding: 10,
	},
	[theme.breakpoints.down("md")]: {
		flexDirection: "row",
		"& .MuiCardMedia-root": {
			display: "flex",
			width: "30%",
		},
		"& .MuiCardContent-root": {
			display: "flex",
			flexDirection: "column",
			width: "70%",
		},
	},
}));

const TitleBox = styled(Box)(({ theme }) => ({
	marginTop: 10,
	[theme.breakpoints.down("md")]: {
		marginTop: 14,
		"& .course-title": {
			overflow: "hidden",
			textOverflow: "ellipsis",
			whiteSpace: "nowrap",
		},
	},
}));

const ListBox = styled(Box)(({ theme }) => ({
	marginTop: 10,
	marginBottom: 24,
	[theme.breakpoints.down("md")]: {
		marginTop: 2,
		marginBottom: 2,
	},
}));

const PriceBox = styled(Box)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-end",
}));

interface CourseCardProps {
	value: ICourse;
	onClick?: MouseEventHandler<any>;
}

export default function CourseCard({ value, onClick }: CourseCardProps) {

	const instructor: IUser | null =  value.instructor.length > 0 ? value.instructor[0] as any : null;
	const instName = instructor ? `${instructor.firstname} ${instructor.lastname}` : "";

	return (
		<Card sx={{ height: "100%" }} onClick={onClick}>
			<CustomCardActionArea>
				<CardMedia component="img" image={value.image} alt="skilllane test" />
				<CardContent>
					<TitleBox>
						<Typography
							className="course-title"
							gutterBottom
							variant="h2"
							component="div"
							fontSize={{ xs: 12 ,sm: 14}}
							overflow="hidden"
							color="#00532a"
							textAlign="left">
							{value.name}
						</Typography>
					</TitleBox>

					<ListBox>
						<List dense disablePadding>
							<ListItem disablePadding sx={{ "& *": { fontSize: 14 } }}>
								<Hidden mdDown>
									<ListItemAvatar sx={{ minWidth: 20, marginRight: 2 }}>
										<Avatar
											src="https://resource.skilllane.com/users/images/001/166/364/mlist/Untitled.png"
											sx={{ width: 20, height: 20 }}>
											<PersonIcon />
										</Avatar>
									</ListItemAvatar>
								</Hidden>
								<ListItemText primary={instName} />
							</ListItem>
							<Hidden mdDown>
								<ListItem disablePadding sx={{ "& *": { fontSize: 14 } }}>
									<ListItemAvatar sx={{ minWidth: 20, marginRight: 2 }}>
										<Avatar
											src="https://resource.skilllane.com/users/images/001/149/067/mlist/1200px-Emblem_of_Thammasat_University.svg.png"
											sx={{ width: 20, height: 20 }}>
											<PersonIcon />
										</Avatar>
									</ListItemAvatar>
									<ListItemText primary="มหาวิทยาลัยธรรมศาสตร์" />
								</ListItem>
							</Hidden>
						</List>
					</ListBox>

					<PriceBox>
						<Stack direction="row" spacing={0} alignItems="center" marginLeft="auto">
							<Typography variant="body2" width={70} fontSize={14} color="#57a267">
								1,500 บาท
							</Typography>
							<Typography variant="body2" width={70} fontSize={10} textAlign="right">
								ไม่เก็บหน่วยกิต
							</Typography>
						</Stack>
						<Stack direction="row" spacing={0} alignItems="center">
							<Typography variant="body2" width={70} fontSize={14} color="#57a267">
								4,500 บาท
							</Typography>
							<Typography variant="body2" width={70} fontSize={10} textAlign="right">
								เก็บหน่วยกิต
							</Typography>
						</Stack>
					</PriceBox>
				</CardContent>
			</CustomCardActionArea>
		</Card>
	);
}
