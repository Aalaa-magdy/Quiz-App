import React from 'react'
import '../App.css'
const Options = ({question,dispatch,newAnswer}) => {
  // console.log(question.options)
  const hasAnswered= newAnswer;
  const correctAnswer=question.correct_answer;
  return (
    <div>
      {question.answers.map((option)=>
        (<div key={option}>
          <button className={`btn btn-option ${hasAnswered?(correctAnswer===option ?'correct':newAnswer===option?'wrong':''):''}`} onClick={()=>dispatch({
            type: 'newAnswer',payload:option
          })}>{option}</button>
        </div>
      ))}
    </div>
  )
}

export default Options