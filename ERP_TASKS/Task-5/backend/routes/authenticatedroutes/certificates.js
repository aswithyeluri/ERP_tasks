// const express = require("express");
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// const router = express.Router();
// const UserCertificates = require("../../models/UserCertificates");

// // Configure multer storage engine to save files in the "uploads" folder.
// // This code automatically creates the folder if it doesn't exist.
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const uploadDir = path.join(__dirname, "../../uploads");

//         // Check if the directory exists, and if not, create it.
//         if (!fs.existsSync(uploadDir)) {
//             fs.mkdirSync(uploadDir, { recursive: true });
//         }
//         cb(null, uploadDir);
//     },
//     filename: (req, file, cb) => {
//         // Use a timestamp to ensure unique filenames.
//         cb(null, `${Date.now()}-${file.originalname}`);
//     },
// });

// const upload = multer({ storage });

// // Router to accept files only.
// router.post("/certificates", upload.any(), async (req, res) => {
//     try {
//         // req.files is an array of file objects from multer
//         const filesReceived = req.files.map((file) => ({
//             fileType: file.fieldname,
//             originalName: file.originalname,
//             storedName: file.filename,
//             path: file.path,
//             size: file.size,
//         }));
//         console.log(filesReceived);

//         // check if user exists
//         // if user exists, update files
//         const email = req.email;
//         console.log(email);
//         const usereFiles = await UserCertificates.findOne({ email });
//         if (usereFiles) {
//             // Update the files array
//             usereFiles.files = filesReceived;
//             await usereFiles.save();
//         } else {
//             // Create a new UserFiles document
//             await UserCertificates.create({ email, files: filesReceived });
//         }

//         // return success response

//         return res.status(200).json({
//             message: "Files uploaded successfully.",
//             files: filesReceived,
//         });
//     } catch (error) {
//         console.error("Error processing file upload:", error);
//         return res.status(500).json({
//             error: "Server error while processing files.",
//         });
//     }
// });

// module.exports = router;

// new code
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const UserCertificates = require("../../models/UserCertificates");

// Configure multer storage engine to save files in the "uploads" folder.
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, "../../uploads");
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });

// Router to accept files only.
router.post("/certificates", upload.any(), async (req, res) => {
    try {
        // Extract programme from request body
        const { programme } = req.body;
        const email = req.email;

        // Map received files
        const filesReceived = req.files.map((file) => ({
            fileType: file.fieldname,
            originalName: file.originalname,
            storedName: file.filename,
            path: file.path,
            size: file.size,
        }));

        console.log(filesReceived);

        // Define required file types based on programme
        const getRequiredFileTypes = (programme) => {
            const fullFileTypes = [
                "files_Photo",
                "files_Signature",
                "files_10th",
                "files_Inter",
                "files_Diploma",
                "files_Ug1",
                "files_Ug2",
                "files_Pg1",
                "files_Pg2",
            ];

            if (programme === "Undergraduation") {
                return fullFileTypes.filter(
                    (type) =>
                        ![
                            "files_Ug1",
                            "files_Ug2",
                            "files_Pg1",
                            "files_Pg2",
                        ].includes(type)
                );
            }
            return fullFileTypes;
        };

        const requiredFileTypes = getRequiredFileTypes(programme);

        // Validate uploaded files against required file types
        const uploadedFileTypes = filesReceived.map((file) => file.fileType);
        const missingFiles = requiredFileTypes.filter(
            (type) => !uploadedFileTypes.includes(type)
        );

        if (missingFiles.length > 0) {
            return res.status(400).json({
                error: `Missing required files: ${missingFiles.join(", ")}`,
            });
        }

        // Check if user exists
        let userFiles = await UserCertificates.findOne({ email });

        if (userFiles) {
            // Update the files array
            userFiles.files = filesReceived;
            await userFiles.save();
        } else {
            // Create a new UserFiles document
            await UserCertificates.create({ email, files: filesReceived });
        }

        // Return success response
        return res.status(200).json({
            message: "Files uploaded successfully.",
            files: filesReceived,
        });
    } catch (error) {
        console.error("Error processing file upload:", error);
        return res.status(500).json({
            error: "Server error while processing files.",
        });
    }
});

module.exports = router;
