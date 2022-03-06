import UserLayout from "../../core/UserLayout";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import FormEdit from "./FormEdit";
import AdminTitle from "../../components/AdminTitle";

export default function Profile() {
	return (
		<UserLayout>
			<Box py={2}>
				<AdminTitle label="Profile" />
			</Box>
			<Divider />
			<Box pt={4} pb={6}>
				<FormEdit />
			</Box>
		</UserLayout>
	);
}
