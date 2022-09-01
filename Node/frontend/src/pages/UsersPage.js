import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const UsersPage = () => {
    const nav = useNavigate()
    const [ users, setUsers ] = useState([])
    useEffect(()=>{
        const options = {
            method: 'GET',
            headers: {"content-type":"application/json"},
            credentials: 'include'
        }
        fetch(`http://localhost:4000/users`, options)
        .then(res => res.json())
        .then(data => {
            setUsers(data.users)
        })
    }, [])
    return (
        <div className='UsersPage'>
            {users.map((user, i) => 
                <div onClick={()=>nav(`/user/${user._id}`)} key={i} className='userCard'>
                    <h5>id: {user._id}</h5>
                    <h5>name: {user.username}</h5>
                </div>
            )}
        </div>
    );
};

export default UsersPage;