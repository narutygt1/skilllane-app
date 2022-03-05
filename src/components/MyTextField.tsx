import TextField, { TextFieldProps } from "@mui/material/TextField";
import { Field, FieldProps } from "formik";
import Box from "@mui/material/Box";

export default function MyTextField(props: TextFieldProps) {
	return (
		<Box sx={{ "& .MuiFormHelperText-root": { fontSize: 14, marginLeft: 0 } }}>
			<Field name={props.name}>
				{({ field, form, meta }: FieldProps) => (
					<TextField
						{...props}
						{...field}
						helperText={meta.error && meta.touched ? meta.error : ""}
						error={!!(meta.error && meta.touched ? meta.error : "")}
					/>
				)}
			</Field>
		</Box>
	);
}
