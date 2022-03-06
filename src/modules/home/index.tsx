import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export default function Home() {
	const myUser = useSelector((state: RootState) => state.myUser);
	let navigate = useNavigate();

	if (!myUser) {
		navigate("/login", { replace: true });
	}

	return (
		<>
			<main>
				<h2>Welcome to the homepage!</h2>
				<p>You can do this, I believe in you.</p>
			</main>
		</>
	);
}
