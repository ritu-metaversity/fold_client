import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function SignOut(props) {
    const nav = useNavigate()
    useEffect(()=>{
    localStorage.clear();
    nav("/m/login")
    },[])

    props.statusMsgForLogout(false)
    
}

export default SignOut
