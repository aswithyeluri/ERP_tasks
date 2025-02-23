import React, { useState, useRef, useEffect } from "react";
import { FaEye, FaTrash, FaDownload, FaUpload, FaEdit } from "react-icons/fa";
import serverurl from "../constants/serverurl";

const fileOptionsOrder = [
    "Photo",
    "Signature",
    "10th",
    "Inter",
    "Diploma",
    "Ug1",
    "Ug2",
    "Pg1",
    "Pg2",
];

const FileUploadComponent = () => {
    const [selectedFileType, setSelectedFileType] = useState("");
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [studentDetails, setStudentDetails] = useState({
        name: "John Doe",
        branch: "Computer Science",
        phone: "+1 234 567 890",
        programme: "Undergraduation",
    });
    const [editingIndex, setEditingIndex] = useState(null);
    const editInputRef = useRef(null);

    const getFileOptions = (programme) => {
        if (programme === "Undergraduation") {
            // Exclude Ug1, Ug2, Pg1, Pg2 for Undergraduation
            return fileOptionsOrder.filter(
                (option) => !["Ug1", "Ug2", "Pg1", "Pg2"].includes(option)
            );
        }
        return fileOptionsOrder; // Return all options for other programmes
    };

    useEffect(() => {
        const getuser = async () => {
            try {
                const response = await fetch(`${serverurl}/api/getuser`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch user");
                }

                const data = await response.json();
                console.log(data);
                setStudentDetails({
                    name:
                        data.firstName + " " + data.lastName || "Unknown User",
                    branch: data.specialization,
                    phone: data.mobile,
                    programme: data.program,
                });
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        getuser();
    }, []);

    // Helper function to validate file type and size
    const validateFile = (file, type) => {
        if (type === "Photo" || type === "Signature") {
            if (!file.type.match(/image\/(jpeg|jpg|png)/)) {
                alert(
                    "Only JPG/PNG images are allowed for Photo and Signature"
                );
                return false;
            }
            if (file.size > 1048576) {
                alert("File size exceeds 1MB limit for Photo/Signature");
                return false;
            }
        } else {
            if (file.type !== "application/pdf") {
                alert("Only PDF files are allowed for certificates");
                return false;
            }
        }
        return true;
    };

    // Handle uploading a new file from the dropdown selection
    const handleFileUpload = (event) => {
        if (event.target.files.length > 0 && selectedFileType) {
            const file = event.target.files[0];
            if (!validateFile(file, selectedFileType)) return;

            setUploadedFiles([
                ...uploadedFiles,
                { type: selectedFileType, name: file.name, fileObject: file },
            ]);
            setSelectedFileType("");
        }
    };

    // Handle reupload (edit) for an existing file
    const handleFileEdit = (event) => {
        if (event.target.files.length > 0 && editingIndex !== null) {
            const file = event.target.files[0];
            const fileType = uploadedFiles[editingIndex].type;
            if (!validateFile(file, fileType)) return;

            const updatedFiles = [...uploadedFiles];
            updatedFiles[editingIndex] = {
                type: fileType,
                name: file.name,
                fileObject: file,
            };
            setUploadedFiles(updatedFiles);
            setEditingIndex(null);
        }
    };

    const handleDelete = (index) => {
        setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
    };

    // When Edit is clicked, set the editing index and trigger the hidden file input
    const handleEdit = (index) => {
        setEditingIndex(index);
        if (editInputRef.current) {
            editInputRef.current.click();
        }
    };

    // Function to view (open) the file using a Blob URL
    const handleViewFile = (index) => {
        const file = uploadedFiles[index].fileObject;
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL, "_blank");
    };

    // Function to download the file from the local state
    const handleDownloadFile = (index) => {
        const file = uploadedFiles[index].fileObject;
        const fileURL = URL.createObjectURL(file);
        const a = document.createElement("a");
        a.href = fileURL;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        // Revoke the object URL after a short delay to free up resources
        setTimeout(() => URL.revokeObjectURL(fileURL), 1000);
    };

    // On submit, check that all required files are uploaded. Otherwise, alert.
    // const handleSubmit = async () => {
    //     const isAllFilesUploaded = fileOptionsOrder.every((option) =>
    //         uploadedFiles.some((file) => file.type === option)
    //     );

    //     if (!isAllFilesUploaded) {
    //         alert("Please upload all required files");
    //         return;
    //     }

    const handleSubmit = async () => {
        const filteredFileOptions = getFileOptions(studentDetails.programme);

        const isAllFilesUploaded = filteredFileOptions.every((option) =>
            uploadedFiles.some((file) => file.type === option)
        );

        if (!isAllFilesUploaded) {
            alert("Please upload all required files");
            return;
        }

        const formData = new FormData();

        // Append student details
        Object.entries(studentDetails).forEach(([key, value]) => {
            formData.append(key, value);
        });
        formData.append("collection", "certificates_student");

        // Append files
        uploadedFiles.forEach((file) => {
            formData.append(`files_${file.type}`, file.fileObject);
        });

        try {
            const response = await fetch(`${serverurl}/api/certificates`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                method: "POST",
                body: formData,
            });
            if (response.ok) {
                alert("All files uploaded successfully!");
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("Error uploading files");
        }
    };

    return (
        <div className="container my-4 vh-100">
            {/* Student Details Section */}
            <h3 className="mb-3">Student Details</h3>
            <div className="row mb-3">
                <div className="col-md-6">
                    <div className="form-control-plaintext mb-3">
                        <strong>Name:</strong> {studentDetails.name}
                    </div>
                    <div className="form-control-plaintext mb-3">
                        <strong>Branch:</strong> {studentDetails.branch}
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-control-plaintext mb-3">
                        <strong>Phone:</strong> {studentDetails.phone}
                    </div>
                    <div className="form-control-plaintext">
                        <strong>Programme:</strong> {studentDetails.programme}
                    </div>
                </div>
            </div>

            {/* File Upload Section */}
            <h3 className="mb-3">Photo, Signature, & Certificates Uploads</h3>
            <div className="row mb-3">
                <div className="col-md-6">
                    {/* <select
                        className="form-control"
                        value={selectedFileType}
                        onChange={(e) => setSelectedFileType(e.target.value)}
                    >
                        <option value="">Select File Type</option>
                        {fileOptionsOrder
                            .filter(
                                (option) =>
                                    !uploadedFiles.some(
                                        (file) => file.type === option
                                    )
                            )
                            .map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                    </select> */}

                    <select
                    className="form-control"
                        value={selectedFileType}
                        onChange={(e) => setSelectedFileType(e.target.value)}
                    ><option value="">Select File Type</option>
                        {getFileOptions(studentDetails.programme)
                            .filter(
                                (option) =>
                                    !uploadedFiles.some(
                                        (file) => file.type === option
                                    )
                            )
                            .map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                    </select>
                </div>
            </div>

            {selectedFileType && (
                <div className="row mb-3">
                    <div className="col-md-6 d-flex align-items-center">
                        <strong className="me-3">
                            {selectedFileType} (
                            {selectedFileType === "Photo" ||
                            selectedFileType === "Signature"
                                ? ".jpg, .png, 1MB"
                                : ".pdf"}
                            )
                        </strong>
                        <label className="btn btn-danger d-flex align-items-center mb-0">
                            <FaUpload className="me-2" />
                            Upload
                            <input
                                type="file"
                                accept={
                                    selectedFileType === "Photo" ||
                                    selectedFileType === "Signature"
                                        ? "image/jpeg, image/png"
                                        : "application/pdf"
                                }
                                className="d-none"
                                onChange={handleFileUpload}
                            />
                        </label>
                    </div>
                </div>
            )}

            {uploadedFiles.length > 0 && (
                <div className="row">
                    <div className="col-md-8">
                        <table className="table table-bordered table-hover">
                            <thead className="table-light">
                                <tr>
                                    <th>File Type</th>
                                    <th>File Name</th>
                                    <th style={{ width: "200px" }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {uploadedFiles.map((file, index) => (
                                    <tr key={index}>
                                        <td>{file.type}</td>
                                        <td>{file.name}</td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-primary me-2"
                                                onClick={() =>
                                                    handleViewFile(index)
                                                }
                                            >
                                                <FaEye />
                                            </button>
                                            <button
                                                className="btn btn-sm btn-warning me-2"
                                                onClick={() =>
                                                    handleEdit(index)
                                                }
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                className="btn btn-sm btn-danger me-2"
                                                onClick={() =>
                                                    handleDelete(index)
                                                }
                                            >
                                                <FaTrash />
                                            </button>
                                            <button
                                                className="btn btn-sm btn-success"
                                                onClick={() =>
                                                    handleDownloadFile(index)
                                                }
                                            >
                                                <FaDownload />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Hidden file input for editing/reupload */}
            <input
                type="file"
                style={{ display: "none" }}
                ref={editInputRef}
                onChange={handleFileEdit}
                accept={
                    editingIndex !== null &&
                    (uploadedFiles[editingIndex].type === "Photo" ||
                        uploadedFiles[editingIndex].type === "Signature")
                        ? "image/jpeg, image/png"
                        : "application/pdf"
                }
            />

            <button
                className="btn btn-primary"
                style={{
                    zIndex: "1",
                    fontFamily: "Roboto, sans-serif",
                    fontSize: "18px",
                    backgroundColor: "#FF3C00",
                    color: "white",
                }}
                onClick={handleSubmit}
            >
                Submit
            </button>
        </div>
    );
};

export default FileUploadComponent;
