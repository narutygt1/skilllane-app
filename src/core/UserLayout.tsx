import { ReactNode } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AdminSidebar from "../components/AdminSidebar";

interface UserLayoutProps {
	children: ReactNode;
}

export default function UserLayout({ children }: UserLayoutProps) {
	return (
		<Box mt={8} sx={{ flexGrow: 1 }}>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={4}>
					<AdminSidebar />
				</Grid>
				<Grid item xs={12} sm={8}>
					{children}
				</Grid>
			</Grid>
		</Box>
	);
}
