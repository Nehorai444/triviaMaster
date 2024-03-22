/**
 * This component represents the sign-up page of the application, allowing users to create a new account.
 */

import React, { useState } from 'react';
import { ApiRequests } from '../library/Utilities';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const nav = useNavigate();

    // Handle button click to attempt user registration
    function onClick() {
        ApiRequests.addUser(userName, password)
            .then(res => {
                // Navigate to sign-in page if registration is successful, otherwise display error
                res.status === 1 ? nav("/signIn") : setError(res.errors[0]);
            })
            .catch(err => { console.log(err); });
    }

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <input type="text" placeholder='Enter your email' onChange={e => { setUserName(e.target.value); }} />
            <input type="password" placeholder='Create a password' onChange={e => { setPassword(e.target.value); }} />
            <p style={{ color: "red" }}>{error}</p>
            <button onClick={onClick}>Sign Up</button>
        </div>
    );
}
