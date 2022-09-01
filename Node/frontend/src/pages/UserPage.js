import {useState, useEffect, useContext} from 'react';
import { useParams } from 'react-router-dom';
import mainContext from '../context/mainContext';

const UserPage = () => {
    const { id } = useParams()
    const [error, setError] = useState('make an offer')
    const [openUser, setOpenUser] = useState({})
    const [nfts, setNFTS] = useState([])
    const [offer, setOffer] = useState({youget:[], iget:[]})
    const { user, myNFTS, socket } = useContext(mainContext)
    useEffect(()=>{
        const options = {
            method: 'GET',
            headers: {"content-type":"application/json"},
            credentials: 'include'
        }
        fetch(`http://localhost:4000/user/${id}`, options)
        .then(res => res.json())
        .then(data => {
            setOpenUser(data.user)
            setNFTS(data.nfts)
        })
    })
    function addToIGet(id){
        const item = nfts.find(x=>x._id===id)
        let newOffer = offer;
        if (newOffer.iget.find(x=>x._id===id)) console.log('item already added')
        else newOffer.iget.push(item)
        setOffer(newOffer)
    }
    function addToYouGet(id){
        const item = myNFTS.find(x=>x._id===id)
        let newOffer = offer;
        if (newOffer.youget.find(x=>x._id===id)) console.log('item already added')
        else newOffer.youget.push(item)
        setOffer(newOffer)
    }
    function returnMine(id){
        setOffer({iget: offer.iget, youget: offer.youget.filter(x=>x._id!==id)})
    }
    function returnHis(id){
        setOffer({iget: offer.iget.filter(x=>x._id!==id), youget: offer.youget})
    }
    function submitOffer(){
        let data = offer
        data.madeByName = user.username
        data.madeByID = user._id
        data.madeToName = openUser.username
        data.madeToID = openUser._id
        socket.emit('submitOffer', data)
        if (offer.iget.length===0 && offer.youget.length===0) return setError('offer is empty')
        const options = {
            method: 'POST',
            headers: {"content-type":"application/json"},
            body: JSON.stringify(data),
            credentials: 'include'
        }
        fetch(`http://localhost:4000/submitOffer`, options)
        .then(res => res.json())
        .then(res => {
            if (!res.error) return setError(res.status)
            setError('somethings wrong')
        })
        setOffer({youget:[], iget:[]})
    }

    return (
        <div className='UserPage'>
            <div className='top'>
                <div className='UserInfo'>
                    <div className='info'>
                        <h5>id: {openUser._id}</h5>
                        <h5>username: {openUser.username}</h5>
                    </div>
                    <div className='nftList'>
                        {nfts.length > 0 && nfts.map((nft, i) =>
                            <div onClick={()=>addToIGet(nft._id)} key={i} className='nft' style={{backgroundImage:`url(${nft.image})`, width: '100px', height: '100px', backgroundSize: 'cover', backgroundPosition:'center'}}></div>
                        )}
                    </div>
                </div>
                <div className='MySide'>
                    <div className='info'>
                        <h5>id: {user._id}</h5>
                        <h5>username: {user.username}</h5>
                    </div>
                    <div className='nftList'>
                        {myNFTS.length > 0 && myNFTS.map((nft, i) =>
                            <div onClick={()=>addToYouGet(nft._id)} key={i} className='nft' style={{backgroundImage:`url(${nft.image})`, width: '100px', height: '100px', backgroundSize: 'cover', backgroundPosition:'center'}}></div>
                        )}
                    </div>
                </div>
            </div>
            <div className='offer dFlex flexWrap'>
                <div className='youget dFlex flexWrap'>
                    {offer.youget.length > 0 && offer.youget.map((nft, i) =>
                        <div onClick={()=>returnMine(nft._id)} key={i} className='nft' style={{backgroundImage:`url(${nft.image})`, width: '100px', height: '100px', backgroundSize: 'cover', backgroundPosition:'center'}}></div>
                    )}
                </div>
                <div className='iget dFlex flexWrap'>
                    {offer.iget.length > 0 && offer.iget.map((nft, i) =>
                        <div onClick={()=>returnHis(nft._id)} key={i} className='nft' style={{backgroundImage:`url(${nft.image})`, width: '100px', height: '100px', backgroundSize: 'cover', backgroundPosition:'center'}}></div>
                    )}
                </div>
            </div>
            <button onClick={submitOffer}>Submit Offer</button>
            <h1>{error}</h1>
        </div>
    );
};

export default UserPage;