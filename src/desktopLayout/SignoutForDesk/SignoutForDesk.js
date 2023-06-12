import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthorAPI } from '../../apis/AuthorAPI';

const SignoutForDesk = (props) => {
    const nav = useNavigate()

    useEffect(()=>{
    localStorage.clear();
    nav("/login")
    }, [])
    props.statusMassege(false)

}

export default SignoutForDesk