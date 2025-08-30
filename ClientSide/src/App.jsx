import { useState } from 'react'
import './App.css'
import { SignupPage, LoginPage, LandingPage, About, Contact, MainPage, ForgetPassword, AdminPage, ResetPassword , HRPage} from './Components/index'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import AppliedJobs from './Components/AppliedJobs';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/' element={<LandingPage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/signup' element={<SignupPage />}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/mainpage' element={<MainPage/>}></Route>
        <Route path='/forgot-password' element={<ForgetPassword/>}></Route>
        <Route path='/adminPanel' element={<AdminPage/>}></Route>
        <Route path='/ResetPassword' element={<ResetPassword/>}></Route>
        <Route path='/HrPage' element={<HRPage/>}></Route>
        <Route path='/applied' element={<AppliedJobs/>}></Route>
      </Routes>

      <ToastContainer />
    </>
  )
}

export default App
