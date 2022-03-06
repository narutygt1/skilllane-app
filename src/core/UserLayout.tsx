import { ReactNode } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import AdminSidebar from "../components/AdminSidebar";

interface UserLayoutProps {
	children: ReactNode;
}

export default function UserLayout({ children }: UserLayoutProps) {
	return (
		<Box py={2} px={4} mt={6} sx={{ flexGrow: 1 }}>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={3}>
					<AdminSidebar />
				</Grid>
				<Grid item xs={12} sm={9}>
					<Paper variant="outlined" sx={{ minHeight: 300 }}>
						{children}
					</Paper>
				</Grid>
			</Grid>
		</Box>
	);
}
