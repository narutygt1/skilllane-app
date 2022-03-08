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
	onChange?: (value: string) => void;
}

export default function CategoryTabs({ onChange }: CategoryTabsProps) {
	const [value, setValue] = useState<string>("all");

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
		onChange && onChange(newValue);
	};

	return (
		<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
			<Tabs
				value={value}
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
