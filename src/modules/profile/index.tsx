import { useEffect, useState } from "react";
import UserLayout from "../../core/UserLayout";
import FormEdit from "./FormEdit";
import AdminBox from "../../components/AdminBox";
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
			<AdminBox title="โปรไฟล์">
				{isLoading ? (
					<CircularProgress sx={{ marginTop: 4 }} />
				) : user ? (
					<FormEdit value={user} />
				) : (
					<NotFound />
				)}
			</AdminBox>
		</UserLayout>
	);
}
