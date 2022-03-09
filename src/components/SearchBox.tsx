import { useState, useEffect } from "react";
import { useDebounce } from "../lib/use-debounce";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

interface SearchBoxProps {
	onChange?: (value: string) => void;
	fullWidth?: boolean;
}

export default function SearchBox({ onChange, fullWidth = false }: SearchBoxProps) {
	const [localValue, setLocalValue] = useState<string>("");
	const debouncedValue = useDebounce(localValue, 200);

	useEffect(() => {
		onChange && onChange(localValue);
	}, [debouncedValue]);

	return (
		<TextField
			id="search-box"
			placeholder="ค้นหาคอร์สเรียน..."
			size="small"
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<SearchIcon />
					</InputAdornment>
				),
			}}
			fullWidth={fullWidth}
			variant="outlined"
			onChange={(e) => setLocalValue(e.target.value)}
		/>
	);
}
