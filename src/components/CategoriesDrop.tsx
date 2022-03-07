import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectProps } from "@mui/material/Select";
import { useField } from "formik";
import FormHelperText from "@mui/material/FormHelperText";
import Typography from "@mui/material/Typography";
import { ICategory } from "../types/Category";

export default function CategoriesDrop(props: SelectProps & { items: ICategory[] }) {
	const { items, ...rest } = props;
	const [field, meta] = useField(rest.name || "");
	const errorText = meta.error && meta.touched ? meta.error : "";
	const uxId = "categories-drop";

	return (
		<FormControl fullWidth error={errorText ? true : false}>
			<InputLabel id={uxId}>{rest.label}</InputLabel>
			<Select size="small" labelId={uxId} label={rest.label} {...field} {...rest}>
				{items.map((itm) => (
					<MenuItem value={itm.name} key={itm.name}>
						<Typography component="span">{itm.display}</Typography>
					</MenuItem>
				))}
			</Select>

			{errorText && <FormHelperText>{errorText}</FormHelperText>}
		</FormControl>
	);
}
