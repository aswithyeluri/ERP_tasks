const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// configure cors
const cors = require("cors");
require("dotenv").config();

// import the routes
const registeruser = require("./routes/registeruser");
const createuser = require("./routes/createuser");

const loginuser = require("./routes/loginuser");

// middleware

const authenticateToken = require("./middleware/authenticate");

// authenticated routes
const getuser = require("./routes/authenticatedroutes/getuser");
const addInternationalStudentInfo = require("./routes/authenticatedroutes/internationalstudentinfo");
const fileRouter = require("./routes/authenticatedroutes/certificates");

// Create express app
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors("*"));

mongoose.connect(
    "mongodb+srv://vignanuser:QasQik7m.m2C5Lw@vignanuniversitycluster.tr5ru.mongodb.net/211FA04369",
    { useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB");
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// routes
app.use("/api", registeruser);
app.use("/api", createuser);
app.use("/api", loginuser);

// authenticated routes
app.use("/api", authenticateToken, getuser);
app.use("/api", authenticateToken, addInternationalStudentInfo);
app.use("/api", authenticateToken, addInternationalStudentInfo);
app.use("/api", authenticateToken, fileRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
