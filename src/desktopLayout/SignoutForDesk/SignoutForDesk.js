import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthorAPI } from '../../apis/AuthorAPI';

const SignoutForDesk = () => {
    const nav = useNavigate()

    useEffect(()=>{
    localStorage.clear();
    nav("/login")
    AuthorAPI.LOGOUT();
    }, [])
}

export default SignoutForDesk