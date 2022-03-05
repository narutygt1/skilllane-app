import React from "react";
import { Link } from "react-router-dom";
import { Formik, FormikHelpers, FormikProps, Form, Field, FieldProps } from "formik";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

export default function Home() {
	return (
		<Box mt={10} mb={15}>
			<Typography variant="h1" fontSize={36} color="#00532a" mb={2}>
				เข้าสู่ระบบ
			</Typography>
			<Typography variant="subtitle1" fontSize={18} color="#979797" mb={2}>
				ยินดีต้อนรับเข้าสู่บัญชีผู้ใช้ SkillLane
			</Typography>
			<Box mx="auto" maxWidth={380}>
				<Formik
					initialValues={{
						username: "",
						password: "",
					}}
					onSubmit={(values, actions) => {
						console.log({ values, actions });
						alert(JSON.stringify(values, null, 2));
						actions.setSubmitting(false);
					}}>
					<Form>
						<Box sx={{ flexGrow: 1 }}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<Stack>
										<Typography variant="subtitle1" fontSize={18} color="#00532a" textAlign="left">
											อีเมล
										</Typography>
										<TextField
											name="username"
											variant="outlined"
											placeholder="example@domain.com"
											fullWidth
											size="small"
										/>
									</Stack>
								</Grid>
								<Grid item xs={12}>
									<Stack>
										<Typography variant="subtitle1" fontSize={18} color="#00532a" textAlign="left">
											รหัสผ่าน
										</Typography>
										<TextField name="password" variant="outlined" fullWidth size="small" />
									</Stack>
								</Grid>
								<Grid item xs={12}>
									<Box mt={2}>
										<Button variant="contained" style={{ backgroundColor: "#00532a" }} fullWidth size="large">
											เข้าสู่ระบบ
										</Button>
									</Box>
								</Grid>
							</Grid>
						</Box>
					</Form>
				</Formik>
			</Box>
			<Box mt={4}>
				<Link to="/register">
					<Typography variant="subtitle1" fontSize={18} color="#00532a">
						สมัครบัญชีผู้ใช้
					</Typography>
				</Link>
			</Box>
		</Box>
	);
}
