import React, { useContext, useEffect, useState } from 'react'
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

  useEffect(() => {
    if (index === 9) nav("/summary")
  }, [index]);

  useEffect(() => {
    ApiRequests.getLastGrades(myContext.user.userName).then(res => {
      if (res.status === 1) setGrades(res.data.grades) //continue
    }).catch(err => { console.log((err)) })
  }, [])
  return (
    <div className="homepage-container">
      <h4>HomePage</h4>

      {grades && !flag && <p>Last scores:</p>}
      {!flag && grades.map((val, index) => {
        return <p key={index}>{val}%</p>
      })}

      <button onClick={() => { setFlag(!flag) }}>
        {flag ? "HomePage" : "Start"}
      </button>

      {flag && index !== 9 && <AllQuestions index={index} setIndex={setIndex} allQuestions={props.allQuestions} />}
    </div>

  )
}
