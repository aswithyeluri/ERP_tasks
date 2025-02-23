// const mongoose = require("mongoose");

// const fileSchema = new mongoose.Schema({
//   fileType: {
//     type: String,
//     required: true,
//     enum: [
//       "files_Photo",
//       "files_Signature",
//       "files_10th",
//       "files_Inter",
//       "files_Diploma",
//       "files_Ug1",
//       "files_Ug2",
//       "files_Pg1",
//       "files_Pg2",
//     ], // Restricts to required 9 file types
//   },
//   originalName: {
//     type: String,
//     required: true,
//   },
//   storedName: {
//     type: String,
//     required: true,
//   },
//   path: {
//     type: String,
//     required: true,
//   },
//   size: {
//     type: Number,
//     required: true,
//   },
//   uploadedAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const userFilesSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true, // Ensures unique email
//   },
//   files: {
//     type: [fileSchema],
//     validate: {
//       validator: function (files) {
//         return files.length === 9; // Ensures exactly 9 files are uploaded
//       },
//       message: "Each user must upload exactly 9 files.",
//     },
//   },
// });

// // Export the model
// module.exports = mongoose.model("UserCertificates", userFilesSchema);

//new code
const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    fileType: {
        type: String,
        required: true,
        enum: [
            "files_Photo",
            "files_Signature",
            "files_10th",
            "files_Inter",
            "files_Diploma",
            "files_Ug1",
            "files_Ug2",
            "files_Pg1",
            "files_Pg2",
        ], // Restricts to required file types
    },
    originalName: {
        type: String,
        required: true,
    },
    storedName: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
    uploadedAt: {
        type: Date,
        default: Date.now,
    },
});

const userFilesSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, // Ensures unique email
    },
    programme: {
        type: String,
        required: true,
        enum: ["Undergraduation", "Postgraduation"], // Add other programmes as needed
    },
    files: {
        type: [fileSchema],
        validate: {
            validator: function (files) {
                const getRequiredFileCount = (programme) => {
                    if (programme === "Undergraduation") {
                        return 5; // Photo, Signature, 10th, Inter, Diploma
                    }
                    return 9; // All file types for other programmes
                };
                return files.length === getRequiredFileCount(this.programme);
            },
            message: (props) => {
                const requiredCount =
                    props.value.programme === "Undergraduation" ? 5 : 9;
                return `Each user must upload exactly ${requiredCount} files for their programme.`;
            },
        },
    },
});

// Export the model
module.exports = mongoose.model("UserCertificates", userFilesSchema);
