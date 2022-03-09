import { useState, useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { useField, useFormikContext } from "formik";
import axios from "axios";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

interface MyDropzoneProps {
	name: string;
}

export default function MyDropzone({ name }: MyDropzoneProps) {
	const { setFieldValue } = useFormikContext();
	const [field] = useField(name);
	const { acceptedFiles, fileRejections, getRootProps, getInputProps } = useDropzone({
		accept: "image/jpeg,image/png",
		multiple: false,
	});
	const [initFile, setInitFile] = useState<File[]>([]);
	const initFilename = getFilename(field.value);

	const acceptedFileItems = initFile.map((file: File) => (
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

	useEffect(() => {
		if (!initFilename) {
			setInitFile([]);
			return;
		}

		const toDataURL = (url: string) =>
			fetch(url)
				.then((response) => response.blob())
				.then(
					(blob) =>
						new Promise((resolve, reject) => {
							const reader = new FileReader();
							reader.onloadend = () => resolve(reader.result);
							reader.onerror = reject;
							reader.readAsDataURL(blob);
						})
				);

		const dataURLtoFile = (dataurl: any, filename: any) => {
			var arr = dataurl.split(","),
				mime = arr[0].match(/:(.*?);/)[1],
				bstr = atob(arr[1]),
				n = bstr.length,
				u8arr = new Uint8Array(n);
			while (n--) {
				u8arr[n] = bstr.charCodeAt(n);
			}
			return new File([u8arr], filename, { type: mime });
		};

		if (initFilename.length > 0) {
			toDataURL(field.value).then((dataUrl) => {
				var fileData = dataURLtoFile(dataUrl, initFilename);
				setInitFile([fileData]);
			});
		}
	}, [initFilename]);

	useEffect(() => {
		saveHandler(acceptedFiles);
		setInitFile(acceptedFiles);
	}, [acceptedFiles]);

	function getFilename(fileUrl: string): string {
		const strSlice = fileUrl.split("/");
		const fName = strSlice[strSlice.length - 1];
		return fName;
	}

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
		if (file.type === "application/xml") {
			setFieldValue(name, "");
			setInitFile([]);
		}

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
			setInitFile([]);

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
