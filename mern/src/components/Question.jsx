/**
 * This component represents a single trivia question, displaying the question text,
 * options, and allowing the user to select an answer.
 * 
 * Props:
 * - index: The index of the current question.
 * - val: Object containing question data including question text, options, and correct answer.
 * - setIndex: Function to set the index of the next question.
 */

import React, { useContext, useEffect, useState } from 'react';
import Option from './shelves/Option';
import { UserContext } from '../contextApi';

export default function Question(props) {
    const [options, setOptions] = useState([]);
    const [userAnswer, setUserAnswer] = useState("");
    const [flag, setFlag] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const [answerIndex, setAnswerIndex] = useState(0);

    // Handle button click to navigate to next question or submit answer
    function onClick() {
        setFlag(!flag);
        if (flag) {
            let idx = props.index;
            idx += 1;
            // Check if user's answer is correct and update user's score
            if (userAnswer === props.val.correct_answer) {
                let temp = { ...user };
                temp.rightAnswers += 1;
                setUser(temp);
            }
            // Set index of the next question
            props.setIndex(idx);
        }
    }

    // Initialize options when question data changes
    useEffect(() => {
        let temp = [...props.val.incorrect_answers, props.val.correct_answer];
        temp.sort((a, b) => a.localeCompare(b)); // Sort alphabetically
        setOptions(temp);
        setUserAnswer(temp[answerIndex]);
    }, [props.val]);

    return (
        <div className="question-container">
            <h4>Question num {props.index + 1}</h4>
            <h6>Your score: {user.rightAnswers * 10}</h6>
            <h2>{props.val.question}</h2>
            <h6>Options:</h6>

            {/* Render options */}
            {options.map((txt, index) => {
                return <Option
                    val={{ txt, setUserAnswer, index, setAnswerIndex, flag }}
                    key={index}
                    color={flag && (txt === props.val.correct_answer) ? "lightgreen" : "white"}
                />
            })}

            {/* Render button to navigate to next question or submit answer */}
            <button onClick={onClick}> {flag ? "NEXT" : "Enter"} </button>
        </div>
    );
}
