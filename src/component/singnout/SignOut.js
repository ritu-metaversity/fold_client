import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SignOut() {
    const nav = useNavigate()

    useEffect(()=>{
    localStorage.clear();
    nav("/login")
    }, [])
    
    
}

export default SignOut
