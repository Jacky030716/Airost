import React from 'react'
import Login from './components/Login'
import Register from './components/Register'
import ForgotPassword from './components/ForgotPassword'
import UserProfile from './components/UserProfile'
import Booking from './components/Booking'
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Test from './components/Test'
import './App.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />}/>
        <Route path='/forgotpassword' element={<ForgotPassword />}/>
        <Route path='/' element={<Home />}/>
        <Route path='/booking' element={<Booking />}/>
        <Route path='/test' element={<Test />} />
        <Route path='/user' element={<UserProfile />} />
      </Routes>
    </Router>
  )
}

export default App