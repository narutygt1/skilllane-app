import { useState } from "react";
import { IUser } from "../../types/User";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MyTextField from "../../components/MyTextField";
import GenderDrop from "../../components/GenderDrop";
import RoleDrop from "../../components/RoleDrop";
import MyDatePicker from "../../components/MyDatePicker";
import MessageAlert from "../../components/MessageAlert";
import { Formik, Form } from "formik";
import * as Yup from "yup";

interface FormEditProps {
	value: IUser;
}

export default function FormEdit({ value }: FormEditProps) {
	const [msgAlert, setMsgAlert] = useState<JSX.Element | null>(null);

	return (
		<>
			{msgAlert}
			<Box mt={4} mx="auto" maxWidth={380}>
				<Formik
					initialValues={{
						username: value.username,
						firstname: value.firstname,
						lastname: value.lastname,
						nickname: value.nickname,
						gender: value.gender,
						role: value.role.name,
						birthday: value.birthday,
					}}
					validationSchema={Yup.object({
						username: Yup.string().required("กรุณากรอกอีเมล"),
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
								const response = await fetch(process.env.REACT_APP_SERVICE_API + "/api/user/update_item", {
									method: "POST",
									body: JSON.stringify({
										id: value._id,
										...values,
									}),
									headers: {
										"Content-Type": "application/json",
									},
								});

								const dataResult = await response.json();
								if (response.status === 200) {
									setMsgAlert(<MessageAlert message={dataResult.message} severity="success" />);
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
												disabled
											/>
										</Stack>
									</Grid>
									<Grid item xs={12} sm={6}>
										<Stack>
											<Typography variant="subtitle1" fontSize={18} color="#00532a" textAlign="left">
												ประเภท
											</Typography>
											<RoleDrop name="role" disabled />
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
											<MyDatePicker
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
												บันทึก
											</Button>
										</Box>
									</Grid>
								</Grid>
							</Box>
						</Form>
					)}
				</Formik>
			</Box>
		</>
	);
}
