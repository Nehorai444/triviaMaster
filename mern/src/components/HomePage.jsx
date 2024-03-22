/**
 * This component represents the homepage of the application, displaying the user's last scores
 * and allowing them to start a new quiz.
 * 
 * Props:
 * - allQuestions: Array of all trivia questions.
 */

import React, { useContext, useEffect, useState } from 'react';
import AllQuestions from './AllQuestions';
import { useNavigate } from 'react-router-dom';
import { ApiRequests } from '../library/Utilities';
import { UserContext } from '../contextApi';

export default function HomePage(props) {
    const [index, setIndex] = useState(0);
    const [flag, setFlag] = useState(false);
    const [grades, setGrades] = useState([]);
    const myContext = useContext(UserContext);
    const nav = useNavigate();

    // Redirect to summary page when quiz ends
    useEffect(() => {
        if (index === 9) nav("/summary");
    }, [index]);

    // Fetch last grades on component mount
    useEffect(() => {
        ApiRequests.getLastGrades(myContext.user.userName)
            .then(res => {
                if (res.status === 1) setGrades(res.data.grades);
            })
            .catch(err => { console.log(err); });
    }, []);

    return (
        <div className="homepage-container">
            <h4>HomePage</h4>

            {/* Display last scores if available */}
            {grades && !flag && <p>Last scores:</p>}
            {!flag && grades.map((val, index) => {
                return <p key={index}>{val}%</p>;
            })}

            {/* Toggle between "HomePage" and "Start" button */}
            <button onClick={() => { setFlag(!flag); }}>
                {flag ? "HomePage" : "Start"}
            </button>

            {/* Render quiz questions if flag is set and index is not at the end */}
            {flag && index !== 9 && <AllQuestions index={index} setIndex={setIndex} allQuestions={props.allQuestions} />}
        </div>
    );
}
