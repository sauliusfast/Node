import { useRef, useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import mainContext from '../context/mainContext';
const LoginPage = () => {
    const { login, setLogin, setUser } = useContext(mainContext)
    const nav = useNavigate();
    const usernameL = useRef()
    const usernameR = useRef()
    const passwordL = useRef()
    const passwordR1 = useRef()
    const passwordR2 = useRef()
    const [error, setError] = useState('Identify yourself!')

    function loginBtn(){
        const user = {
            username: usernameL.current.value,
            password: passwordL.current.value
        }
        const options = {
            method: 'POST',
            headers: {"content-type":"application/json"},
            body: JSON.stringify(user),
            credentials: 'include'
        }
        fetch('http://localhost:4000/login', options)
        .then(res => res.json())
        .then(data => {
            if (!data.error) {
                setLogin(true)
                setUser(data.user)
                nav('/profile')
            } else {
                setError(data.error)
            }
        })
    }
    function register(){
        if (passwordR1.current.value!==passwordR2.current.value) return setError('passwords dont match')
        const user = {
            username: usernameR.current.value,
            password: passwordR1.current.value
        }
        const options = {
            method: 'POST',
            headers: {"content-type":"application/json"},
            body: JSON.stringify(user),
            credentials: 'include'
        }
        fetch('http://localhost:4000/register', options)
        .then(res => res.json())
        .then(data => {
            if (data.error) setError(data.error)
            else setError('Success!')
        })
    }
        
        return (
        <div className='LoginPage'>
            <div className='login'>
                login
                <input onKeyDown={e=>e.key==='Enter' && loginBtn()} ref={usernameL} type='text' autoFocus placeholder='username' defaultValue='Petras'/>
                <input ref={passwordL} type='text' placeholder='password' defaultValue='petras'/>
                <button onClick={loginBtn} >Login</button>
            </div><br/>
            <div className='register'>
                register
                <input ref={usernameR} type='text' placeholder='username'/>
                <input ref={passwordR1} type='text' placeholder='password'/>
                <input ref={passwordR2} type='text' placeholder='password'/>
                <button onClick={register}>Register</button>
            </div>
            <h1>{error}</h1>
        </div>
    );
};

export default LoginPage;