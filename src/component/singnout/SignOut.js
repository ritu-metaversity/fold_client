import { useNavigate } from 'react-router-dom';

function SignOut() {
    const nav = useNavigate("")
    localStorage.clear();
    nav("/login")
}

export default SignOut