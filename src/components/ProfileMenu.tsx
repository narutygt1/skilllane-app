import * as React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { setMyUser } from "../redux/slices/User";
import { setAuthToken } from "../lib/auth";

export default function ProfileMenu() {
	let navigate = useNavigate();
	const dispatch = useDispatch();
	const myUser = useSelector((state: RootState) => state.myUser);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const signOut = () => {
		dispatch(setMyUser(null));
		setAuthToken("");
		handleClose();
	};

	if (!myUser) return null;

	return (
		<Box>
			<Button
				id="basic-button"
				aria-controls={open ? "basic-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				onClick={handleClick}
				endIcon={<KeyboardArrowDownIcon />}
				sx={{ color: "#00532a" }}>
				{myUser.firstname}
			</Button>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}>
				<MenuItem onClick={() => navigate("/profile")}>My account</MenuItem>
				<MenuItem onClick={signOut}>Logout</MenuItem>
			</Menu>
		</Box>
	);
}
