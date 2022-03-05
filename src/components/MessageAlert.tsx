import Alert from "@mui/material/Alert";

interface MessageAlertProps {
	message: string;
	severity: "error" | "warning" | "info" | "success";
}

export default function MessageAlert({ message, severity }: MessageAlertProps) {
	return <Alert severity={severity}>{message}</Alert>;
}
