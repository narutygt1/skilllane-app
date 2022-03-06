import Box from "@mui/material/Box";


interface FormEditProps {
    value?: any;
    type: "create" | "edit";
}

export default function FormEdit({ value, type }: FormEditProps) {
    return (
        <Box>
            Course {type}
        </Box>
    )
}