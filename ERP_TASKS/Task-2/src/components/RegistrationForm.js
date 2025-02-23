import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobileNumber: "",
        dateOfBirth: "",
        country: "",
        category: "",
        course: "",
        program: "",
        specialization: "",
    });

    const courses = {
        "B.Tech": [
            "Computer Science",
            "Mechanical Engineering",
            "Electrical Engineering",
            "Civil Engineering",
        ],
        "M.Tech": [
            "Data Science",
            "Robotics",
            "Power Systems",
            "Structural Engineering",
        ],
        MBA: [
            "Finance",
            "Marketing",
            "Human Resources",
            "Operations Management",
        ],
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:5000/api/register",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            alert(response.data.message);
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            alert("Error occurred during registration.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div
                        className="card p-4"
                        style={{
                            border: "2px solid black",
                            borderRadius: "10px",
                        }}
                    >
                        <div className="mx-auto w-full">
                            <h2
                                className="text-center text-dark"
                                style={{
                                    fontFamily: "'DM Serif Display', serif",
                                    fontSize: "28px",
                                    display: "inline-block",
                                    borderBottom: "4px solid red",
                                }}
                            >
                                Student Registration
                            </h2>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            style={{ padding: "10px" }}
                        >
                            {/* First and Last Name */}
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label
                                        className="form-label"
                                        style={{
                                            fontFamily: "Roboto, sans-serif",
                                            fontSize: "15px",
                                        }}
                                    >
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                        style={{
                                            fontFamily: "Roboto, sans-serif",
                                            fontSize: "15px",
                                        }}
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label
                                        className="form-label"
                                        style={{
                                            fontFamily: "Roboto, sans-serif",
                                            fontSize: "15px",
                                        }}
                                    >
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                        style={{
                                            fontFamily: "Roboto, sans-serif",
                                            fontSize: "15px",
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Email and Mobile */}
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label
                                        className="form-label"
                                        style={{
                                            fontFamily: "Roboto, sans-serif",
                                            fontSize: "15px",
                                        }}
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        style={{
                                            fontFamily: "Roboto, sans-serif",
                                            fontSize: "15px",
                                        }}
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label
                                        className="form-label"
                                        style={{
                                            fontFamily: "Roboto, sans-serif",
                                            fontSize: "15px",
                                        }}
                                    >
                                        Mobile Number
                                    </label>
                                    <input
                                        maxLength={10}
                                        type="tel"
                                        className="form-control"
                                        name="mobileNumber"
                                        value={formData.mobileNumber}
                                        onChange={handleChange}
                                        required
                                        onInput={(e) => {
                                            e.target.value =
                                                e.target.value.replace(
                                                    /[^0-9]/g,
                                                    ""
                                                ); // Remove non-numeric characters
                                        }}
                                        pattern="\d*"
                                        style={{
                                            fontFamily: "Roboto, sans-serif",
                                            fontSize: "15px",
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Date of Birth and Country */}
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label
                                        className="form-label"
                                        style={{
                                            fontFamily: "Roboto, sans-serif",
                                            fontSize: "15px",
                                        }}
                                    >
                                        Date of Birth
                                    </label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="dateOfBirth"
                                        value={formData.dateOfBirth}
                                        onChange={handleChange}
                                        required
                                        style={{
                                            fontFamily: "Roboto, sans-serif",
                                            fontSize: "15px",
                                        }}
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label
                                        className="form-label"
                                        style={{
                                            fontFamily: "Roboto, sans-serif",
                                            fontSize: "15px",
                                        }}
                                    >
                                        Country
                                    </label>
                                    <select
                                        className="form-select"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        required
                                        style={{
                                            fontFamily: "Roboto, sans-serif",
                                            fontSize: "15px",
                                        }}
                                    >
                                        <option value="">Select Country</option>
                                        <option value="India">India</option>
                                        <option value="USA">Sudan</option>
                                        <option value="UK">Singapore</option>
                                    </select>
                                </div>
                            </div>

                            {/* Category and Program */}
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label
                                        className="form-label"
                                        style={{
                                            fontFamily: "Roboto, sans-serif",
                                            fontSize: "15px",
                                        }}
                                    >
                                        Category
                                    </label>
                                    <select
                                        className="form-select"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        required
                                        style={{
                                            fontFamily: "Roboto, sans-serif",
                                            fontSize: "15px",
                                        }}
                                    >
                                        <option value="">
                                            Select Category
                                        </option>
                                        <option value="General">General</option>
                                        <option value="OBC">OBC</option>
                                        <option value="SC/ST">SC/ST</option>
                                    </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label
                                        className="form-label"
                                        style={{
                                            fontFamily: "Roboto, sans-serif",
                                            fontSize: "15px",
                                        }}
                                    >
                                        Select Program
                                    </label>
                                    <select
                                        className="form-select"
                                        name="program"
                                        value={formData.program}
                                        onChange={handleChange}
                                        required
                                        style={{
                                            fontFamily: "Roboto, sans-serif",
                                            fontSize: "15px",
                                        }}
                                    >
                                        <option value="">Select Program</option>
                                        <option value="Undergraduation">
                                            Undergraduation
                                        </option>
                                        <option value="Graduation">
                                            Graduation
                                        </option>
                                    </select>
                                </div>
                            </div>

                            {/* Course and Specialization */}
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label
                                        className="form-label"
                                        style={{
                                            fontFamily: "Roboto, sans-serif",
                                            fontSize: "15px",
                                        }}
                                    >
                                        Select Course
                                    </label>
                                    <select
                                        className="form-select"
                                        name="course"
                                        value={formData.course}
                                        onChange={handleChange}
                                        required
                                        style={{
                                            fontFamily: "Roboto, sans-serif",
                                            fontSize: "15px",
                                        }}
                                    >
                                        <option value="">Select Course</option>
                                        {Object.keys(courses).map((course) => (
                                            <option key={course} value={course}>
                                                {course}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label
                                        className="form-label"
                                        style={{
                                            fontFamily: "Roboto, sans-serif",
                                            fontSize: "15px",
                                        }}
                                    >
                                        Select Specialization
                                    </label>
                                    <select
                                        className="form-select"
                                        name="specialization"
                                        value={formData.specialization}
                                        onChange={handleChange}
                                        required
                                        disabled={!formData.course}
                                        style={{
                                            fontFamily: "Roboto, sans-serif",
                                            fontSize: "15px",
                                        }}
                                    >
                                        <option value="">
                                            Select Specialization
                                        </option>
                                        {formData.course &&
                                            courses[formData.course].map(
                                                (specialization) => (
                                                    <option
                                                        key={specialization}
                                                        value={specialization}
                                                    >
                                                        {specialization}
                                                    </option>
                                                )
                                            )}
                                    </select>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="row justify-content-center mt-4">
                                <div className="col-6 text-center">
                                    <button
                                        type="submit"
                                        className="btn w-50"
                                        style={{
                                            fontFamily: "Roboto, sans-serif",
                                            fontSize: "20px",
                                            backgroundColor: "#FF3C00",
                                            color: "white",
                                        }}
                                    >
                                        Register
                                    </button>
                                </div>
                            </div>

                            <p
                                className="text-center mt-3"
                                style={{
                                    fontFamily: "Roboto, sans-serif",
                                    fontSize: "15px",
                                }}
                            >
                                Already have an account?{" "}
                                <a href="/login" style={{ color: "#FF3C00" }}>
                                    Login
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationForm;
