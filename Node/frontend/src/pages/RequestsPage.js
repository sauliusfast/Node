import { useEffect, useState, useContext } from 'react'
import mainContext from '../context/mainContext'

const RequestsPage = () => {
    const { socket, user } = useContext(mainContext)
    const [offers, setOffers] = useState([])
    useEffect(()=>{
        const options = {
            method: 'GET',
            headers: {"content-type":"application/json"},
            credentials: 'include'
        }
        fetch('http://localhost:4000/getOffers', options)
        .then(res => res.json())
        .then(data => {
            setOffers(data.offers)
        })
    },[])

    function reject(offer){
        
        const options = {
            method: 'POST',
            headers: {"content-type":"application/json"},
            body: JSON.stringify({offerID:offer._id}),
            credentials: 'include'
        }
        fetch('http://localhost:4000/rejectOffer', options)
        .then(res => res.json())
        .then(data => {
            setOffers(data.offers)
            socket.emit('requestStatus', user)
            let message = {}
            message.id = offer.madeByID
            message.message = `${offer.madeToName} has rejected your offer`
            socket.emit('alert', message)
        })
    }
    function accept(offer){
        const options = {
            method: 'POST',
            headers: {"content-type":"application/json"},
            body: JSON.stringify({offerID:offer._id}),
            credentials: 'include'
        }
        fetch('http://localhost:4000/acceptOffer', options)
        .then(res => res.json())
        .then(data => {
            setOffers(data.offers)
            socket.emit('requestStatus', user)
            socket.emit('acceptOffer', offer)
        })
    }
    return (
        <div className='RequestsPage'>
            {offers.map(offer=> 
                <div key={offer._id} className='offerCard'>
                <div className='container dFlex'>
                    <div className='requestSide flex1'>
                        <h3>{offer.madeByName} would get:</h3>
                        <div className='nftList dFlex flexWrap'>
                            {offer.iget.map((nft, i) =>
                                <div key={i} className='nft ' style={{backgroundImage:`url(${nft.image})`, width: '100px', height: '100px', backgroundSize: 'cover', backgroundPosition:'center'}}></div>
                            )}
                        </div>
                        <button onClick={()=>reject(offer)} >Reject Offer</button>
                    </div>
                    <div className='offerSide flex1'>
                        <h3>You would get:</h3>
                        <div className='nftList dFlex flexWrap'>
                            {offer.youget.map((nft, i) =>
                                <div key={i} className='nft ' style={{backgroundImage:`url(${nft.image})`, width: '100px', height: '100px', backgroundSize: 'cover', backgroundPosition:'center'}}></div>
                            )}
                        </div>
                        <button onClick={()=>accept(offer)}>Accet Offer</button>
                    </div>
                </div>
                </div>
            )}
        </div>
    );
};

export default RequestsPage;