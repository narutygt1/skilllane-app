import { ReactNode } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

interface UserLayoutProps {
	children: ReactNode;
}

export default function UserLayout({ children }: UserLayoutProps) {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<Grid container spacing={2}>
				<Grid item xs={4}>
					Menu
				</Grid>
				<Grid item xs={8}>
					{children}
				</Grid>
			</Grid>
		</Box>
	);
}
