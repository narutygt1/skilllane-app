import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

function a11yProps(keyName: string) {
	return {
		id: `tab-${keyName}`,
		"aria-controls": `tabpanel-${keyName}`,
	};
}

interface CategoryTabsProps {
	value?: string;
	onChange?: (value: string) => void;
}

export default function CategoryTabs({ value, onChange }: CategoryTabsProps) {
	const [localValue, setLocalValue] = useState<string>(value || "all");

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setLocalValue(newValue);
		onChange && onChange(newValue);
	};

	return (
		<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
			<Tabs
				value={localValue}
				onChange={handleChange}
				aria-label="category tabs"
				sx={{ "& .MuiTabs-flexContainer": { justifyContent: "center" } }}>
				<Tab
					value="all"
					label="ทั้งหมด"
					{...a11yProps("all")}
					sx={{ fontSize: { xs: 16, md: 20 }, width: "33.33%" }}
				/>
				<Tab
					value="mandatory"
					label="วิชาบังคับ"
					{...a11yProps("mandatory")}
					sx={{ fontSize: { xs: 16, md: 20 }, width: "33.33%" }}
				/>
				<Tab
					value="elective"
					label="วิชาเลือก"
					{...a11yProps("elective")}
					sx={{ fontSize: { xs: 16, md: 20 }, width: "33.33%" }}
				/>
			</Tabs>
		</Box>
	);
}
