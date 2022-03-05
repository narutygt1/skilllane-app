import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectProps } from "@mui/material/Select";
import { useField } from "formik";
import FormHelperText from "@mui/material/FormHelperText";
import Typography from "@mui/material/Typography";

export default function GenderDrop(props: SelectProps) {
	const { label } = props;
	const [field, meta] = useField(props.name || "");
	const errorText = meta.error && meta.touched ? meta.error : "";
	const uxId = "gender-drop";

	return (
		<FormControl fullWidth error={errorText ? true : false}>
			<InputLabel id={uxId}>{label}</InputLabel>
			<Select size="small" labelId={uxId} label={label} {...field} {...props}>
				{initData.map((itm) => (
					<MenuItem value={itm.name} key={itm.name}>
						<Typography component="span">{itm.display}</Typography>
					</MenuItem>
				))}
			</Select>

			{errorText && <FormHelperText>{errorText}</FormHelperText>}
		</FormControl>
	);
}

interface IGender {
	name: string;
	display: string;
}

const initData: IGender[] = [
	{ name: "male", display: "ชาย" },
	{ name: "female", display: "หญิง" },
];
