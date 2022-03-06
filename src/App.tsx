import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./modules/home";
import Login from "./modules/login";
import Register from "./modules/register";
import Profile from "./modules/profile";
import Course from "./modules/course";
import "./App.css";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import ProtectedLoggedInRoutes from "./core/ProtectedLoggedInRoutes";
import ProtectedRoutes from "./core/ProtectedRoutes";

function App() {
	const myUser = useSelector((state: RootState) => state.myUser);

	useEffect(() => {
		localStorage.setItem("skilllane-user", JSON.stringify(myUser));
	}, [myUser]);

	return (
		<div className="App">
			<Routes>
				<Route element={<ProtectedLoggedInRoutes />}>
					<Route path="/" element={<Login />} />
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
				</Route>

				<Route element={<ProtectedRoutes />}>
					<Route path="home" element={<Home />} />
					<Route path="profile" element={<Profile />} />
					<Route path="course" element={<Course />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
