import { useHistory } from 'react-router-dom';

function SignOut() {
    const history = useHistory("")
    localStorage.clear();
    history.push("/login")
}

export default SignOut