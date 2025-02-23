import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import serverurl from "../constants/serverurl";
// import InternationalForm from "./irForm";

const Home = () => {
    const [userName, setUserName] = useState("");

    // Fetch /api/getuser and load user name
    useEffect(() => {
        const updateName = async () => {
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
                setUserName(
                    data.firstName + " " + data.lastName || "Unknown User"
                );
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        updateName();
    }, []);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column", // Stack children vertically
                justifyContent: "flex-start", // Align content to the top
                alignItems: "flex-start", // Align content to the left
                marginLeft: "100px",
                marginTop: "50px",
                height: "100vh",
                fontSize: "2rem",
                fontWeight: "bold",
            }}
        >
            <p style={{ marginBottom: "20px", 
                justifyContent: "center",
             }}>
                {" "}
                {/* Add margin below the paragraph */}
                Hello, {userName}, Welcome to Vignan University.
            </p>

            <Link
                to="/internationalform" // Use Link for client-side navigation
                style={{
                    color: "red",
                    fontWeight: "bold",
                    textDecoration: "none", // Remove underline
                    fontSize: "1.5rem", // Adjust font size if needed
                }}
            >
                &gt;&gt; International Admission Portal - Click Here
            </Link>
        </div>
    );
};

export default Home;
