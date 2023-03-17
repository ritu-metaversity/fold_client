import React from 'react'
import { useHistory } from 'react-router-dom';

function SignOut() {
    localStorage.clear();
    const history = useHistory("")
    history.push("./login")
}

export default SignOut