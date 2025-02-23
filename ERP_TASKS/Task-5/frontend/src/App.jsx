import { useEffect, useState } from 'react'
import {  Routes,Route } from 'react-router-dom'

// unauthenticated routes
import RegistrationForm from './pages/RegistrationFormPage'
import PasswordPage from './pages/PasswordPage'
import StudentLoginPage from './pages/Studentloginpage'

// authenticated routes
import Homepage from './pages/Homepage'
import InternationalFormPage from './pages/InternationalFormPage'
import AboutPage from './pages/AboutPage'
import CertificatePage from './pages/CertificatePage'

function App() {
  const [token,setToken] = useState();
  useEffect(() => {
    setToken(localStorage.getItem('token'))
  }, [])
  if(!token){
    return (
      <>
        <Routes>
          <Route path="/" element={<RegistrationForm />} />
          <Route path="/setpassword" element={<PasswordPage />} />
          <Route path = "/login" element = {<StudentLoginPage />} />
        </Routes>
      </>
    )
  }

  return (
    <>
    <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/internationalform" element={<InternationalFormPage />} />
          <Route path='/personal-information' element={<AboutPage />} />
          <Route path='/certificates' element={<CertificatePage />} />
        </Routes>
    </>
        
  )
}

export default App
