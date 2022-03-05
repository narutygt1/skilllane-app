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
import GenderDrop from "../../components/GenderDrop";
import RoleDrop from "../../components/RoleDrop";
import BirthDatePicker from "../../components/BirthDatePicker";
import MessageAlert from "../../components/MessageAlert";

export default function Register() {
	const [msgAlert, setMsgAlert] = useState<JSX.Element | null>(null);

	return (
		<>
			{msgAlert}
			<Box mt={10} mb={15} p={2}>
				<Typography variant="h1" fontSize={{ xs: 28, sm: 36 }} color="#00532a" mb={2}>
					สมัครบัญชีผู้ใช้ด้วยอีเมล
				</Typography>
				<Typography variant="subtitle1" fontSize={18} color="#979797" mb={2}>
					กรุณากรอกข้อมูลให้ครบถ้วน
				</Typography>
				<Box mx="auto" maxWidth={380}>
					<Formik
						initialValues={{
							username: "",
							password: "",
							passwordConfirm: "",
							role: "student",
							firstname: "",
							lastname: "",
							nickname: "",
							gender: "male",
							birthday: null,
						}}
						validationSchema={Yup.object({
							username: Yup.string().required("กรุณากรอกอีเมล"),
							password: Yup.string().required("กรุณากรอกรหัสผ่าน"),
							passwordConfirm: Yup.string()
								.required("กรุณากรอกรหัสผ่าน")
								.test("passwordMatch", "รหัสผ่านไม่ตรงกัน กรุณากรอกใหม่อีกครั้ง", function (passwordConfirm) {
									return this.parent.password === passwordConfirm;
								}),
							firstname: Yup.string().required("กรุณากรอกชื่อจริง"),
							lastname: Yup.string().required("กรุณากรอกนามสกุล"),
							nickname: Yup.string().required("กรุณากรอกชื่อเล่น"),
							gender: Yup.string().required("กรุณาเลือกเพศ"),
							role: Yup.string().required("กรุณาเลือกประเภท"),
							birthday: Yup.string().required("กรุณาเลือกวันเกิด"),
						})}
						onSubmit={(values, actions) => {
							new Promise((resolve: any) => {
								setTimeout(async () => {
									const response = await fetch(process.env.REACT_APP_SERVICE_API + "/api/user/add_item", {
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
										setMsgAlert(<MessageAlert message={dataResult.message} severity="success" />);
										actions.resetForm();
									} else {
										setMsgAlert(<MessageAlert message={dataResult.message} severity="error" />);
									}

									resolve();
									actions.setSubmitting(false);
								}, 200);
							});
						}}>
						{({ isSubmitting, values, errors, setFieldValue }) => (
							<Form>
								{console.log(isSubmitting)}
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
											<Stack>
												<Typography variant="subtitle1" fontSize={18} color="#00532a" textAlign="left">
													ยืนยันรหัสผ่าน
												</Typography>
												<MyTextField
													name="passwordConfirm"
													type="password"
													variant="outlined"
													fullWidth
													size="small"
												/>
											</Stack>
										</Grid>
										<Grid item xs={12} sm={6}>
											<Stack>
												<Typography variant="subtitle1" fontSize={18} color="#00532a" textAlign="left">
													ประเภท
												</Typography>
												<RoleDrop name="role" />
											</Stack>
										</Grid>
										<Grid item xs={12} sm={6}></Grid>
										<Grid item xs={12} sm={6}>
											<Stack>
												<Typography variant="subtitle1" fontSize={18} color="#00532a" textAlign="left">
													ชื่อจริง
												</Typography>
												<MyTextField name="firstname" variant="outlined" fullWidth size="small" />
											</Stack>
										</Grid>
										<Grid item xs={12} sm={6}>
											<Stack>
												<Typography variant="subtitle1" fontSize={18} color="#00532a" textAlign="left">
													นามสกุล
												</Typography>
												<MyTextField name="lastname" variant="outlined" fullWidth size="small" />
											</Stack>
										</Grid>
										<Grid item xs={6}>
											<Stack>
												<Typography variant="subtitle1" fontSize={18} color="#00532a" textAlign="left">
													ชื่อเล่น
												</Typography>
												<MyTextField name="nickname" variant="outlined" fullWidth size="small" />
											</Stack>
										</Grid>
										<Grid item xs={6}>
											<Stack>
												<Typography variant="subtitle1" fontSize={18} color="#00532a" textAlign="left">
													เพศ
												</Typography>
												<GenderDrop name="gender" />
											</Stack>
										</Grid>
										<Grid item xs={12}>
											<Stack>
												<Typography variant="subtitle1" fontSize={18} color="#00532a" textAlign="left">
													วันเกิด
												</Typography>
												<BirthDatePicker
													key={JSON.stringify(values.birthday)}
													value={values.birthday}
													onChange={(v) => setFieldValue("birthday", v)}
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
				<Box display="flex" mt={4} justifyContent="center" flexWrap="wrap">
					<Typography variant="subtitle1" fontSize={18}>
						หากคุณมีบัญชีผู้ใช้งานแล้ว &nbsp;
					</Typography>
					<Link to="/login">
						<Typography variant="subtitle1" fontSize={18} color="#00532a">
							เข้าสู่ระบบ
						</Typography>
					</Link>
				</Box>
			</Box>
		</>
	);
}
