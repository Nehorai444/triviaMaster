import React from 'react';

export default function Option(props) {

  const handleOptionClick = () => {
    if (!props.val.flag) {
      props.val.setUserAnswer(props.val.txt);
      props.val.setAnswerIndex(props.val.index);
    } else {
      alert("Too late");
    }
  };

  return (
    <div className='option' style={{ backgroundColor: props.color }}>
      <input disabled={props.val.flag} type="radio" name="answer"
        checked={props.val.isSelected}
        onClick={handleOptionClick} />
        
      <label>
        <p>{props.val.txt}</p>
      </label>
    </div>
  );
}
