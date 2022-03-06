import { ReactNode } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import AdminTitle from "./AdminTitle";

interface AdminBoxProps {
	title: string;
	startComponent?: JSX.Element;
	endComponent?: JSX.Element;
	children: ReactNode;
}

export default function AdminBox({ title, startComponent, endComponent, children }: AdminBoxProps) {
	return (
		<Box>
			<Box position="relative" display="flex" py={2}>
				{startComponent && (
					<Box position="absolute" left={16}>
						{startComponent}
					</Box>
				)}

				{title && (
					<Box mx="auto">
						<AdminTitle label={title} />
					</Box>
				)}

				{endComponent && (
					<Box position="absolute" right={16}>
						{endComponent}
					</Box>
				)}
			</Box>
			<Divider />
			<Box pb={6}>{children}</Box>
		</Box>
	);
}
