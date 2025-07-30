import { useState } from 'react'
import './App.css'
import { SignupPage, LoginPage, LandingPage, About, Contact, MainPage, ForgetPassword , AdminPage } from './Components/index'
import { Route, Routes } from 'react-router-dom'
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
        <Route path='/admin-Pannel' element={<AdminPage/>}></Route>
      </Routes>
    </>
  )
}

export default App
