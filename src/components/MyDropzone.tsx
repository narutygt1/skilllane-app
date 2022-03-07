import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Field, FieldProps, useFormikContext } from "formik";
import axios from "axios";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

interface MyDropzoneProps {
	name: string;
}

export default function MyDropzone({ name }: MyDropzoneProps) {
	const { setFieldValue } = useFormikContext();
	const { acceptedFiles, fileRejections, getRootProps, getInputProps } = useDropzone({
		accept: "image/jpeg,image/png",
	});

	useEffect(() => {
		saveHandler(acceptedFiles);
	}, [acceptedFiles]);

	const acceptedFileItems = acceptedFiles.map((file: File) => (
		<ListItem
			key={file.name}
			secondaryAction={
				<IconButton edge="end" aria-label="delete" onClick={() => deleteHandler(file)}>
					<DeleteIcon />
				</IconButton>
			}>
			<ListItemText primary={file.name} />
		</ListItem>
	));

	async function saveHandler(files: File[]) {
		if (!files[0]) return;
		if (files[0].name === "") return;

		const formData = new FormData();
		formData.append("file", files[0]);
		const response = await axios.post(process.env.REACT_APP_SERVICE_API + "/api/file/save", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		if (response.status === 200) {
			// value: response.data?.filePath
			setFieldValue(name, response.data?.filePath);
		}
	}

	async function deleteHandler(file: File) {
		if (!file) return;
		if (file.name === "") return;

		const formData = new FormData();
		formData.append("file", file);
		const response = await axios.post(process.env.REACT_APP_SERVICE_API + "/api/file/delete", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});

		if (response.status === 200) {
			// value: ""
			setFieldValue(name, "");
			const indFile = acceptedFiles.findIndex((itm) => itm.name === file.name);
			if (indFile !== -1) {
				acceptedFiles.splice(indFile, 1);
			}
		}
	}

	return (
		<section className="container">
			<Box
				sx={{
					color: "#bdbdbd",
					backgroundColor: "#fafafa",
					borderStyle: "dashed",
					borderColor: "#eeeeee",
					borderRadius: 2,
					borderWidth: 2,
					padding: "20px 4px",
				}}>
				<div {...getRootProps({ className: "dropzone" })} style={{ cursor: "pointer" }}>
					<input {...getInputProps()} />
					<p>Click to select files</p>
					<em>(Only *.jpeg and *.png images will be accepted)</em>
				</div>
			</Box>
			{acceptedFileItems && acceptedFileItems.length > 0 && (
				<aside>
					<h4>Accepted files</h4>
					<List dense>{acceptedFileItems}</List>
				</aside>
			)}
		</section>
	);
}
