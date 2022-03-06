import { useLocation } from "react-router";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const useAuth = () => {
	const myUser = useSelector((state: RootState) => state.myUser);
	return !!myUser;
};

const ProtectedRoutes = () => {
	const location = useLocation();
	const isAuth = useAuth();
	return isAuth ? <Outlet /> : <Navigate to="/" replace state={{ from: location }} />;
};

export default ProtectedRoutes;
