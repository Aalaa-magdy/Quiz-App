import React from 'react'
import '../App.css'
const FinishScreen = ({points,maxPoints,dispatch}) => {
  return (
    <div>
    <div className="finish">You Scored {points } of {maxPoints}</div>
    <div>
       <button className="btn start-btn" style={{marginTop:'10px', textAlign:'end'}} onClick={()=>dispatch({type:'restart'})}>Restart Quiz</button>
    </div>
    </div>
  )
}

export default FinishScreen