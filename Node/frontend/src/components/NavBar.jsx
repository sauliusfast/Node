import { useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import mainContext from '../context/mainContext';
const NavBar = () => {
    const [requests, setRequests] = useState(0)
    const { login, setLogin, setUser, socket, user } = useContext(mainContext)
    const nav = useNavigate();
    useEffect(()=>{
        if (login) socket.emit('requestStatus', user);
        socket.on('requestStatus', data => {
            setRequests(data)
        });
        socket.on('alert', data => alert(data))
    }, [user])
    useEffect(()=>{
        const options = {
            method: 'GET',
            headers: {"content-type":"application/json"},
            credentials: 'include'
        }
        fetch('http://localhost:4000/autoLogin', options)
        .then(res => res.json())
        .then(data => {
            if (data.user) {
                setLogin(true)
                setUser(data.user)
            }
        })
    }, [])
    function logout(){
        const options = {
            method: 'GET',
            headers: {"content-type":"application/json"},
            credentials: 'include'
        }
        fetch('http://localhost:4000/logout', options)
        .then(res => res.json())
        .then(data => {
            setLogin(false)
            nav('/')
        })
    }
    return (
        <div className='NavBar'>
            {login ? <h1 onClick={logout}>Logout</h1> : <h1 onClick={()=>nav('/')}>Login</h1>}
            {login && 
                <>
                    <h1 onClick={()=>nav('/profile')}>Profile</h1>
                    <h1 onClick={()=>nav('/users')}>Users</h1>
                    <h1 onClick={()=>nav('/upload')}>Upload</h1>
                    <h1 onClick={()=>nav('/requests')}>Requests({requests})</h1>
                </>}
        </div>
    );
};

export default NavBar;