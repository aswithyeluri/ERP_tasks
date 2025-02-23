import { useEffect, useState } from "react";
// import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import RegistrationForm from "./pages/RegistrationFormPage";
import PasswordPage from "./pages/PasswordPage";
import StudentLoginPage from "./pages/Studentloginpage";

import Homepage from "./pages/Homepage";
import InternationalForm from "./pages/InternationalForm";
import AboutPage from "./pages/Aboutpage";

function App() {
    const [token, setToken] = useState();
    useEffect(() => {
        setToken(localStorage.getItem("token"));
    }, []);
    if (!token) {
        return (
            <>
                <Routes>
                    <Route path="/" element={<RegistrationForm />} />
                    <Route path="/passwordpage" element={<PasswordPage />} />
                    <Route path="/login" element={<StudentLoginPage />} />
                </Routes>
            </>
        );
    }

    return (
        <>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route
                    path="/internationalform"
                    element={<InternationalForm />}
                />
                <Route path="/about" element={<AboutPage />} />
            </Routes>
        </>
    );
}

export default App;
