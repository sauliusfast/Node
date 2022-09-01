import './App.css'
import { useState } from 'react'
import mainContext from './context/mainContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RequestsPage from './pages/RequestsPage'
import ProfilePage from './pages/ProfilePage'
import UploadPage from './pages/UploadPage'
import LoginPage from './pages/LoginPage'
import UsersPage from './pages/UsersPage'
import UserPage from './pages/UserPage'
import NavBar from './components/NavBar'

import io from 'socket.io-client'
const socket = io.connect('http://localhost:4000')

function App() {
  const [login, setLogin] = useState()
  const [user, setUser] = useState()
  const [myNFTS, setMyNFTS] = useState()
  const hooks = {
    login,
    setLogin,
    user,
    setUser,
    myNFTS, 
    setMyNFTS,
    socket
  }
  return (
    <div className='App'>
      <mainContext.Provider value={hooks}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<LoginPage />}/>
            <Route path="/profile" element={<ProfilePage />}/>
            <Route path="/requests" element={<RequestsPage />}/>
            <Route path="/upload" element={<UploadPage />}/>
            <Route path="/users" element={<UsersPage />}/>
            <Route path="/user/:id" element={<UserPage />}/>
          </Routes>
        </BrowserRouter>
      </mainContext.Provider>
    </div>
  );
}

export default App
