import { useRef, useContext, useState } from 'react';
import mainContext from '../context/mainContext';

const UploadPage = () => {
    const { login, setLogin, user, setUser } = useContext(mainContext)
    const input1 = useRef()
    const [error, setError] = useState('')
    function upload(){
        const options = {
            method: 'POST',
            headers: {"content-type":"application/json"},
            body: JSON.stringify({image:input1.current.value}),
            credentials: 'include'
        }
        fetch('http://localhost:4000/nftUpload', options)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if (!data.error) {
                setError(data.status)
                input1.current.value = ''
            } else {
                setError(data.error)
            }
        })
    }
    return (
        <div className='UploadPage'>
            Upload your NFTs here:
            <input autoFocus onKeyDown={e=> e.key==='Enter' && upload()} ref={input1} type='text' placeholder='nft url'/>
            <button onClick={upload} >Upload</button>
            <h1>{error}</h1>
        </div>
    );
};

export default UploadPage;