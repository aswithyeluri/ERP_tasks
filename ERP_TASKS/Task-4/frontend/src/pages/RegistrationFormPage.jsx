import React from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import StudentRegistration from "../components/Form"

const RegistrationForm = () => {
  return (
    <>
        <Navbar />
        <StudentRegistration />
        <Footer/>
    </>
  )
}

export default RegistrationForm;