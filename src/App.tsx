import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./modules/home";
import Login from "./modules/login";
import Register from "./modules/register";
import "./App.css";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

function App() {
	const myUser = useSelector((state: RootState) => state.myUser);

	useEffect(() => {
		localStorage.setItem("skilllane-user", JSON.stringify(myUser));
	}, [myUser]);

	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="login" element={<Login />} />
				<Route path="register" element={<Register />} />
			</Routes>
		</div>
	);
}

export default App;
