import { useEffect, useState } from "react";
import UserLayout from "../../core/UserLayout";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import FormEdit from "./FormEdit";
import AdminTitle from "../../components/AdminTitle";
import NotFound from "../../components/NotFound";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { IUser } from "../../types/User";

export default function Profile() {
	const myUser = useSelector((state: RootState) => state.myUser);
	const [user, setUser] = useState<IUser | null>(null);
	const [isLoading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		async function FetchData() {
			const resData = await fetch(process.env.REACT_APP_SERVICE_API + "/api/user/" + myUser?.id).then((res) =>
				res.json()
			);

			resData?.data && setUser(resData?.data);
			setLoading(false);
		}

		FetchData();
	}, [myUser]);

	return (
		<UserLayout>
			<Box py={2}>
				<AdminTitle label="Profile" />
			</Box>
			<Divider />
			<Box pb={6}>
				{isLoading ? <CircularProgress /> : user ? <FormEdit value={user} /> : <NotFound />}
			</Box>
		</UserLayout>
	);
}
