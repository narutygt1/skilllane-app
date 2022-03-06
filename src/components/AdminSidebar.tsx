import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import LogoutIcon from "@mui/icons-material/Logout";
import { setMyUser } from "../redux/slices/User";
import { setAuthToken } from "../lib/auth";

const data = [
	{ icon: <PersonIcon />, label: "Profile", link: "/profile" },
	{ icon: <SchoolIcon />, label: "Course", link: "/course" },
];

const FireNav = styled(List)<{ component?: React.ElementType }>({
	"& .MuiListItemButton-root": {
		paddingLeft: 24,
		paddingRight: 24,
	},
	"& .MuiListItemIcon-root": {
		minWidth: 0,
		marginRight: 16,
	},
	"& .MuiSvgIcon-root": {
		fontSize: 20,
	},
});

export default function CustomizedList() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const signOut = () => {
		dispatch(setMyUser(null));
		setAuthToken("");
	};

	return (
		<Box sx={{ display: "flex", justifyContent: "center" }}>
			<ThemeProvider
				theme={createTheme({
					components: {
						MuiListItemButton: {
							defaultProps: {
								disableTouchRipple: true,
							},
						},
					},
					palette: {
						mode: "dark",
						primary: { main: "rgb(102, 157, 246)" },
						background: { paper: "rgb(5, 30, 52)" },
					},
				})}>
				<Paper elevation={0} sx={{ width: "100%", maxWidth: 275 }}>
					<FireNav component="nav">
						<ListItemButton component="a" href="#customized-list">
							<ListItemText
								sx={{ my: 0 }}
								primary="My Account"
								primaryTypographyProps={{
									fontSize: 20,
									fontWeight: "medium",
									letterSpacing: 0,
								}}
							/>
						</ListItemButton>
						<Divider />
						<Box pt={2} pb={10}>
							{data.map((item) => (
								<ListItemButton
									key={item.label}
									sx={{ py: 0, minHeight: 32, color: "rgba(255,255,255,.8)" }}
									onClick={() => navigate(item.link)}>
									<ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
									<ListItemText
										primary={item.label}
										primaryTypographyProps={{ fontSize: 14, fontWeight: "medium" }}
									/>
								</ListItemButton>
							))}
							<ListItemButton sx={{ py: 0, minHeight: 32, color: "rgba(255,255,255,.8)" }} onClick={signOut}>
								<ListItemIcon sx={{ color: "inherit" }}>
									<LogoutIcon />
								</ListItemIcon>
								<ListItemText
									primary="Logout"
									primaryTypographyProps={{ fontSize: 14, fontWeight: "medium" }}
								/>
							</ListItemButton>
						</Box>
					</FireNav>
				</Paper>
			</ThemeProvider>
		</Box>
	);
}
