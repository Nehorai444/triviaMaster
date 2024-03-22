/**
 * This component represents the login page of the application, allowing users to log in
 * with their credentials and select a difficulty level for the quiz.
 * 
 * Props:
 * - difficulty: Current difficulty level selected by the user.
 * - setDifficulty: Function to set the difficulty level.
 * - setFlag: Function to set a flag indicating whether the difficulty level has been selected.
 */

import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contextApi';
import { ApiRequests } from '../library/Utilities';

export default function Login(props) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const nav = useNavigate();
    const { setUser } = useContext(UserContext);

    const levelsArr = ["Easy", "Medium", "Hard"];

    function onClick() {
        // Check if difficulty level is selected
        if (!props.difficulty) {
            setError("Please select difficulty level");
            return;
        }

        // Attempt login with provided credentials
        ApiRequests.login(userName, password)
            .then(res => {
                if (res.status === 1) {
                    // Set user context and navigate to homepage
                    setUser({ userName });
                    nav("/");
                } else {
                    setError(res.errors[0]);
                }
            })
            .catch(err => {
                setError("An error occurred while trying to log in");
                console.error(err);
            });
    }

    // Handle radio button change to set difficulty level
    function handleChange(level) {
        props.setDifficulty(level);
        props.setFlag(true);
    }

    return (
        <div className="login-container">
            <h2>Login</h2>
            <input type="text" placeholder='Enter username' onChange={e => { setUserName(e.target.value) }} />
            <input type="password" placeholder='Enter password' onChange={e => { setPassword(e.target.value) }} />
            <div id="difficultiesDiv">
                {/* Render radio buttons for difficulty levels */}
                {levelsArr.map((val, index) => {
                    return (
                        <div key={index} className='difficultyDiv'>
                            <input type="radio" name="difficulty" onChange={() => { handleChange(val) }} />
                            <label>
                                <p>{val}</p>
                            </label>
                        </div>
                    )
                })}
            </div>
            <p style={{ color: "red" }}>{error}</p>
            <button onClick={onClick}>Enter</button>
        </div>
    );
}
