import React from 'react'
import Options from './Options'
const Question = ({question,dispatch,newAnswer}) => {
  return (
    <div>
       <h2>{question.question}</h2>
       <Options question={question} dispatch={dispatch} newAnswer={newAnswer}/>
    </div>
  )
}

export default Question