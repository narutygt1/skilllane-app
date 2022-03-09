import { ReactNode } from "react";
import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import ProfileMenu from "../components/ProfileMenu";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface AppLayoutProps {
	children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
	const myUser = useSelector((state: RootState) => state.user.myUser);
	let navigate = useNavigate();

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" color="inherit">
				<Toolbar>
					<Box width="100%" display="flex" alignContent="center">
						<Box sx={{ img: { width: 140, height: 44 }, a: { display: "flex", height: 44 } }}>
							<Link to="/">
								<img src="https://resource.skilllane.com/images/Logo/logo.png" alt="skilllane-test" />
							</Link>
						</Box>
						<Box ml="auto" my="auto">
							<Box>
								<Stack direction="row" spacing={1} flexWrap="wrap">
									{!myUser && (
										<Button
											variant="outlined"
											style={{ color: "#00532a", borderColor: "#00532a" }}
											onClick={() => navigate(`/login`)}>
											<Typography component="span">เข้าสู่ระบบ</Typography>
										</Button>
									)}
									{!myUser && (
										<Button
											variant="contained"
											style={{ backgroundColor: "#00532a" }}
											onClick={() => navigate(`/register`)}>
											<Typography component="span">สมัครสมาชิก</Typography>
										</Button>
									)}
									<ProfileMenu />
								</Stack>
							</Box>
						</Box>
					</Box>
				</Toolbar>
			</AppBar>
			<Box>{children}</Box>
		</Box>
	);
}
