import React from 'react'
import Question from './Question'
export default function AllQuestions(props) {
  return (
    <div>
      {props.allQuestions.length > 0 && <Question val={props.allQuestions[props.index]} index={props.index} setIndex={props.setIndex} />}
    </div>
  )
}
