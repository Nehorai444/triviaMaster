import React from 'react'
import { UserContext } from '../contextApi'
import { useNavigate } from 'react-router-dom';
import { ApiRequests } from '../library/Utilities';

export default function Summary(props) {
    const nav = useNavigate();

    function onClick(user, setUser) {
        props.setFlag(!props.flag);
        let temp = { ...user }
        let grade = temp.rightAnswers * 10;
        temp.scores.push(grade);
        temp.rightAnswers = 0;
        console.log(temp.rightAnswers)
        ApiRequests.addGrade(temp.userName, grade)
            .then(res => { console.log(res) })
            .catch(err => { console.log(err) })
        setUser(temp);
        nav("/")
    }
    return (
        <div>
            <UserContext.Consumer>
                {(val) => {
                    return (
                        <div className="summary-container">
                            <h2>Hey, {val.user.userName}</h2>
                            <h4>Your score: {val.user.rightAnswers * 10}</h4>
                            <button onClick={() => { onClick(val.user, val.setUser) }}>Try again</button>
                        </div>

                    )
                }}
            </UserContext.Consumer>
        </div>
    )
}
