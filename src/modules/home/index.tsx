import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CourseList from "../../components/CourseList";
import SearchCombo from "../../components/SearchCombo";
import CategoryTabs from "../../components/CategoryTabs";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function Home() {
	return (
		<Box>
			<CardMedia
				component="img"
				image="https://skilllane.s3-ap-southeast-1.amazonaws.com/tu/datascience/data_science_banner.jpg"
				alt="skilllane test"
			/>
			<Box mx="auto" maxWidth={1140}>
				<Box position="relative" top={-28} mx="auto" maxWidth={980} mb={6}>
					<SearchCombo />
				</Box>
				<Box>
					<Typography variant="h1" component="div" fontSize={{ xs: 30, md: 36 }} color="#4e4e4e" mb={3}>
						วิชาในหลักสูตร
					</Typography>
					<CategoryTabs />
				</Box>
				<Box>
					<CourseList items={[]} />
				</Box>
			</Box>
		</Box>
	);
}
