import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contextApi';

export default function Welcome(props) {

    const nav = useNavigate()
    return (
        <div className="welcome-container">
            <h2>Welcome</h2>
            <button onClick={() => { nav("/signIn") }}>Sign In</button>
            <button onClick={() => { nav("/signUp") }}>Sign Up</button>
        </div>

    )
}
