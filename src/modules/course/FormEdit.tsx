import { useState } from "react";
import { ICourse } from "../../types/Course";
import { ICategory } from "../../types/Category";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MyTextField from "../../components/MyTextField";
import GenderDrop from "../../components/GenderDrop";
import CategoriesDrop from "../../components/CategoriesDrop";
import MyDateTimePicker from "../../components/MyDateTimePicker";
import MessageAlert from "../../components/MessageAlert";
import { Formik, Form } from "formik";
import * as Yup from "yup";

interface CustomICourse extends Omit<ICourse, "instructor" | "start_time" | "end_time"> {
	instructor?: string[];
	start_time: Date | null;
	end_time: Date | null;
}

interface FormEditProps {
	value?: any;
	categories: ICategory[];
	type: "create" | "edit";
}

export default function FormEdit({ value, type, categories }: FormEditProps) {
	const [msgAlert, setMsgAlert] = useState<JSX.Element | null>(null);
	const initValue: CustomICourse = {
		name: "",
		description: "",
		category: "mandatory",
		price: {
			price: 0,
			credit_price: 0,
		},
		image: "",
		subject: "",
		start_time: null,
		end_time: null,
		number_of_student: 0,
	};

	return (
		<>
			{msgAlert}
			<Box mt={4} mx="auto" maxWidth={380}>
				<Formik
					initialValues={initValue}
					validationSchema={Yup.object({
						name: Yup.string().required("กรุณากรอกชื่อคอร์ส"),
						description: Yup.string().required("กรุณากรอกรายละเอียด"),
						category: Yup.string().required("กรุณาเลือกหมวด"),
						subject: Yup.string().required("กรุณากรอกวิชา"),
						start_time: Yup.string().required("กรุณาเลือกเวลา"),
						end_time: Yup.string().required("กรุณาเลือกเวลา"),
						number_of_student: Yup.string().required("กรุณาระบุจำนวน"),
					})}
					onSubmit={(values, actions) => {
						if (type === "create") {
							new Promise((resolve: any) => {
								setTimeout(async () => {
									const response = await fetch(process.env.REACT_APP_SERVICE_API + "/api/course/add_item", {
										method: "POST",
										body: JSON.stringify({
											// id: value._id,
											// ...values,
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
						} else if (type === "edit") {
							new Promise((resolve: any) => {
								setTimeout(async () => {
									const response = await fetch(
										process.env.REACT_APP_SERVICE_API + "/api/course/update_item",
										{
											method: "POST",
											body: JSON.stringify({
												// id: value._id,
												// ...values,
											}),
											headers: {
												"Content-Type": "application/json",
											},
										}
									);

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
						}
					}}>
					{({ isSubmitting, values, errors, setFieldValue }) => (
						<Form>
							<Box sx={{ flexGrow: 1 }}>
								<Grid container spacing={2}>
									<Grid item xs={12}>
										<Stack>
											<Typography variant="subtitle1" fontSize={18} color="#00532a" textAlign="left">
												ชื่อคอร์ส
											</Typography>
											<MyTextField
												name="name"
												variant="outlined"
												placeholder="SkillLane"
												fullWidth
												size="small"
											/>
										</Stack>
									</Grid>
									<Grid item xs={12}>
										<Stack>
											<Typography variant="subtitle1" fontSize={18} color="#00532a" textAlign="left">
												ชื่อวิชา
											</Typography>
											<MyTextField
												name="subject"
												variant="outlined"
												placeholder="Software Engineer"
												fullWidth
												size="small"
											/>
										</Stack>
									</Grid>
									<Grid item xs={12}>
										<Stack>
											<Typography variant="subtitle1" fontSize={18} color="#00532a" textAlign="left">
												รายละเอียด
											</Typography>
											<MyTextField
												name="description"
												variant="outlined"
												multiline
												rows={4}
												fullWidth
												size="small"
											/>
										</Stack>
									</Grid>
									<Grid item xs={6}>
										<Stack>
											<Typography variant="subtitle1" fontSize={18} color="#00532a" textAlign="left">
												หมวดหมู่
											</Typography>
											<CategoriesDrop name="category" items={categories} />
										</Stack>
									</Grid>
									<Grid item xs={6}>
										<Stack>
											<Typography variant="subtitle1" fontSize={18} color="#00532a" textAlign="left">
												จำนวนนักเรียน
											</Typography>
											<MyTextField
												name="number_of_student"
												variant="outlined"
												type="number"
												fullWidth
												size="small"
											/>
										</Stack>
									</Grid>
									<Grid item xs={12}>
										<Stack>
											<Typography variant="subtitle1" fontSize={18} color="#00532a" textAlign="left">
												เวลาเริ่มต้น
											</Typography>
											<MyDateTimePicker
												key={JSON.stringify(values.start_time)}
												value={values.start_time}
												onChange={(v) => setFieldValue("start_time", v)}
											/>
										</Stack>
									</Grid>
									<Grid item xs={12}>
										<Stack>
											<Typography variant="subtitle1" fontSize={18} color="#00532a" textAlign="left">
												เวลาสิ้นสุด
											</Typography>
											<MyDateTimePicker
												key={JSON.stringify(values.end_time)}
												value={values.end_time}
												onChange={(v) => setFieldValue("end_time", v)}
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
												{type === "create" ? "สร้าง" : "บันทึก"}
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
