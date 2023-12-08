import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home'
import Register from './Register'
import Login from './Login'
import ForgotPassword from './ForgotPassword'
import UserProfile from './UserProfie'
import Logout from './Logout'
import Booking from './Booking'

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/userprofile' element={<UserProfile />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/booking' element={<Booking />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
