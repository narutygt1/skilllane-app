import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CourseList from "../../components/CourseList";
import Box from "@mui/material/Box";

export default function Home() {
	return (
		<Box mx="auto" maxWidth={1140}>
			<main>
				<h2>Welcome to the homepage!</h2>
				<p>You can do this, I believe in you.</p>
			</main>
			<Box>
				<CourseList items={[]} />
			</Box>
		</Box>
	);
}
