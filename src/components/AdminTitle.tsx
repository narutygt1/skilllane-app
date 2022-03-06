import Typography from "@mui/material/Typography";

interface AdminTitleProps {
	label: string;
}

export default function AdminTitle({ label }: AdminTitleProps) {
	return (
		<Typography variant="h5" fontWeight={600} sx={{ textTransform: "uppercase", color: "#00532a" }}>
			{label}
		</Typography>
	);
}
