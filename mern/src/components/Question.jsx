import React, { useContext, useEffect, useState } from 'react'
import Option from './shelves/Option';
import { UserContext } from '../contextApi';

export default function Question(props) {
    const [options, setOptions] = useState([]);
    const [userAnswer, setUserAnswer] = useState("");
    const [flag, setFlag] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const [answerIndex, setAnswerIndex] = useState(0);

    function onClick() {
        setFlag(!flag)
        if (flag) {
            let idx = props.index;
            idx += 1;
            if (userAnswer === props.val.correct_answer) {
                let temp = { ...user };
                temp.rightAnswers += 1;
                setUser(temp)
            }
            props.setIndex(idx)
        }
    }

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

            {options.map((txt, index) => {
                return <Option val={{ txt, setUserAnswer, index, setAnswerIndex, flag }} key={index}
                    color={flag && (txt === props.val.correct_answer) ? "lightgreen" : "white"} />
            })}

            <button onClick={onClick}> {flag ? "NEXT" : "Enter"} </button>
        </div>

    )
}
