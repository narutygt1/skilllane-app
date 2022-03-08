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
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import Stack from "@mui/material/Stack";


export default function CourseCard() {
	return (
		<Card>
			<CardActionArea>
				<CardMedia
					component="img"
					image="https://d2evv1y2d8aswp.cloudfront.net/courses/highlight_imgs/000/001/689/large_webp/PYTHON_660x390_1646039564.webp"
					alt="skilllane test"
				/>
				<CardContent>
					<Box>
						<Typography
							gutterBottom
							variant="h2"
							component="div"
							fontSize={14}
							overflow="hidden"
							color="#00532a"
							textAlign="left">
							Python for Data Science ไพธอนสำหรับงานวิทยาศาสตร์ข้อมูล
						</Typography>
					</Box>

					<Box mb={2}>
						<List dense>
							<ListItem disablePadding sx={{ "& *": { fontSize: 14 } }}>
								<ListItemAvatar sx={{ minWidth: 20, marginRight: 2 }}>
									<Avatar
										src="https://resource.skilllane.com/users/images/001/166/364/mlist/Untitled.png"
										sx={{ width: 20, height: 20 }}>
										<PersonIcon />
									</Avatar>
								</ListItemAvatar>
								<ListItemText primary="ผศ. ดร.ศราวุธ แรมจันทร์" />
							</ListItem>
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
						</List>
					</Box>

					<Box display="flex" flexDirection="column" alignItems="flex-end">
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
					</Box>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
