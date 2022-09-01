import userEvent from '@testing-library/user-event';
import { useContext, useEffect, useState } from 'react';
import mainContext from '../context/mainContext';

const ProfilePage = () => {
    const { login, user, setMyNFTS } = useContext(mainContext)
    const [ nfts, setNFTS ] = useState([])
    useEffect(()=>{
        const options = {
            method: 'GET',
            headers: {"content-type":"application/json"},
            credentials: 'include'
        }
        if (user) fetch(`http://localhost:4000/nftList/${user._id}`, options)
        .then(res => res.json())
        .then(data => {
            setMyNFTS(data.nfts)
            setNFTS(data.nfts)
        })
    }, [user])

    return (
        <div className='ProfilePage'>
            <div className='info'>
                {user && 
                    <>
                        <h5>id: {user._id}</h5>
                        <h5>username: {user.username}</h5>
                        <h5>password: {user.password}</h5>
                    </>
                }
            </div>
            <div className='nftList dFlex flexWrap'>
                {nfts.length > 0 && nfts.map((nft, i) =>
                    <div key={i} className='nft' style={{backgroundImage:`url(${nft.image})`, width: '100px', height: '100px', backgroundSize: 'cover', backgroundPosition:'center'}}></div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;