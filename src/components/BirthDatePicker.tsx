import * as React from "react";
import thLocale from "date-fns/locale/th";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";

interface BirthDatePickerProps {
	value?: Date | null;
	label?: string;
	onChange?: (value: Date | null) => void;
}

export default function BirthDatePicker({ value, label, onChange }: BirthDatePickerProps) {
	const [localValue, setLocalValue] = React.useState<Date | null>(value || null);

	React.useEffect(() => {
		onChange && onChange(localValue);
	}, [localValue]);

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns} locale={thLocale}>
			<DatePicker
				label={label}
				value={localValue}
				onChange={(newValue) => setLocalValue(newValue)}
				renderInput={(params) => <TextField {...params} size="small" fullWidth />}
			/>
		</LocalizationProvider>
	);
}
