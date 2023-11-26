import React from 'react'
import Login from './components/Login'
import Register from './components/Register'
import ForgotPassword from './components/ForgotPassword'
import Booking from './components/Booking'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Test from './components/Test'
import './App.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />}/>
        <Route path='/forgotpassword' element={<ForgotPassword />}/>
        <Route path='/booking' element={<Booking />}/>
        <Route path='/test' element={<Test />}></Route>
      </Routes>
    </Router>
  )
}

export default App