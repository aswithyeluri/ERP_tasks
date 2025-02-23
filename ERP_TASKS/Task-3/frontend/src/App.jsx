import { useEffect, useState } from 'react'
import {  Routes,Route } from 'react-router-dom'

import RegistrationForm from './pages/RegistrationFormPage'
import PasswordPage from './pages/PasswordPage'
import StudentLoginPage from './pages/Studentloginpage'

import Homepage from './pages/Homepage'

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
          <Route path="/passwordpage" element={<PasswordPage />} />
          <Route path = "/loginpage" element = {<StudentLoginPage />} />
        </Routes>
      </>
    )
  }

  return (
    <>
    <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
    </>
        
  )
}

export default App
