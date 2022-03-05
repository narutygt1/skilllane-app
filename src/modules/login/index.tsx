import { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MyTextField from "../../components/MyTextField";
import MessageAlert from "../../components/MessageAlert";
import { useDispatch } from "react-redux";
import { setMyUser } from "../../redux/slices/User";
import { setAuthToken } from "../../lib/auth";

export default function Login() {
	const dispatch = useDispatch();
	const [msgAlert, setMsgAlert] = useState<JSX.Element | null>(null);

	return (
		<>
			{msgAlert}
			<Box mt={10} mb={15} p={2}>
				<Typography variant="h1" fontSize={{ xs: 28, sm: 36 }} color="#00532a" mb={2}>
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
						validationSchema={Yup.object({
							username: Yup.string().required("กรุณากรอกอีเมล"),
							password: Yup.string().required("กรุณากรอกรหัสผ่าน"),
						})}
						onSubmit={(values, actions) => {
							new Promise((resolve: any) => {
								setTimeout(async () => {
									const response = await fetch(process.env.REACT_APP_SERVICE_API + "/api/auth/signin", {
										method: "POST",
										body: JSON.stringify({
											...values,
										}),
										headers: {
											"Content-Type": "application/json",
										},
									});

									const dataResult = await response.json();
									if (response.status === 200) {
										const resUserAuth = dataResult.data.user as any;
										const resToken = dataResult.data.token as any;
										dispatch(setMyUser(resUserAuth));
										setAuthToken(resToken);
										actions.resetForm();
									} else {
										setMsgAlert(<MessageAlert message={dataResult.message} severity="error" />);
									}

									resolve();
									actions.setSubmitting(false);
								}, 200);
							});
						}}>
						{({ isSubmitting, values, errors }) => (
							<Form>
								<Box sx={{ flexGrow: 1 }}>
									<Grid container spacing={2}>
										<Grid item xs={12}>
											<Stack>
												<Typography variant="subtitle1" fontSize={18} color="#00532a" textAlign="left">
													อีเมล
												</Typography>
												<MyTextField
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
												<MyTextField
													name="password"
													type="password"
													variant="outlined"
													fullWidth
													size="small"
												/>
											</Stack>
										</Grid>
										<Grid item xs={12}>
											<Box mt={2}>
												<Button
													type="submit"
													disabled={isSubmitting}
													variant="contained"
													style={{ backgroundColor: "#00532a" }}
													fullWidth
													size="large">
													เข้าสู่ระบบ
												</Button>
											</Box>
										</Grid>
									</Grid>
								</Box>
							</Form>
						)}
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
		</>
	);
}
