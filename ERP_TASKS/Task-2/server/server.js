const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// MongoDB connection string
const mongoURI =
    // place your cluster
    "";
mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Define a schema
const registrationSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobileNumber: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    country: { type: String, required: true },
    category: { type: String, required: true },
    course: { type: String, required: true },
    program: { type: String, required: true },
    specialization: { type: String, required: true },
});

// Create a model and explicitly specify the collection name
const Registration = mongoose.model(
    "Registration",
    registrationSchema,
    "student_registration"
);

// Initialize Express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Registration route
app.post("/api/register", async (req, res) => {
    try {
        const existingUser = await Registration.findOne({
            email: req.body.email,
        });

        if (existingUser) {
            return res
                .status(400)
                .send({ message: "User already has an account" });
        }

        const newUser = new Registration(req.body);
        await newUser.save();

        res.status(201).send({ message: "Registered successfully" });
    } catch (error) {
        console.error("Error during registration:", error.message);
        res.status(500).send({ message: "Error occurred during registration" });
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);
