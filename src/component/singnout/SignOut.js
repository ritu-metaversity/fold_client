import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthorAPI } from '../../apis/AuthorAPI';


function SignOut(props) {
    const nav = useNavigate()
    useEffect(()=>{
    localStorage.clear();
    AuthorAPI.LOGOUT();
    nav("/login")
    },[])
    props.statusMsgForLogout(false)
    
}

export default SignOut
