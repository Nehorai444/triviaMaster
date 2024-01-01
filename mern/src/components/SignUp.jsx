import React, { useState } from 'react'
import { ApiRequests } from '../library/Utilities';
import { useNavigate } from 'react-router-dom';
export default function SignUp() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const nav = useNavigate();

    function onClick() {
        ApiRequests.addUser(userName, password).then(res => {
            res.status === 1 ? nav("/signIn") : setError(res.errors[0])
        }).catch(err => { console.log(err) })
    }
    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <input type="text" placeholder='Enter your email' onChange={e => { setUserName(e.target.value) }} />
            <input type="password" placeholder='Create a password' onChange={e => { setPassword(e.target.value) }} />
            <p style={{ color: "red" }}>{error}</p>
            <button onClick={onClick}>Sign Up</button>
        </div>

    )
}
