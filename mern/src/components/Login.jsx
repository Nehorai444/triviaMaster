import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contextApi';
import { ApiRequests } from '../library/Utilities';

export default function Login(props) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const nav = useNavigate();
    const { user, setUser } = useContext(UserContext)

    const levelsArr = ["Easy", "Medium", "Hard"];

    function onClick() {
        if (!props.difficulty) {
            setError("Please select difficult level");
            return
        }
        let temp = { ...user };
        temp.userName = userName;
        ApiRequests.login(userName, password).then(res => {
            if (res.status === 1) {
                setUser(temp);
                nav("/");
            } else setError(res.errors[0])
        })
    }

    function handleChange(level) {
        props.setDifficulty(level);
        props.setFlag(true);
    }

    return (
        <div className="login-container">
            <h2>Login</h2>
            <input type="text" placeholder='Enter username' onChange={e => { setUserName(e.target.value) }} />
            <input type="text" placeholder='Enter password' onChange={e => { setPassword(e.target.value) }} />
            <div id="difficultiesDiv">
                {levelsArr.map((val, index) => {
                    return (
                        <div key={index} className='difficultyDiv'>
                            <input type="radio" name="answer" onChange={() => { handleChange(val) }} />
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

    )
}
