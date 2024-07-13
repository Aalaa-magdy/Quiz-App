import React from 'react'

const NextButton = ({newAnswer,dispatch,index,questionsCount}) => {
  if(!newAnswer) return null;
  if(index +1 < questionsCount){
    return (
      <div  style={{marginTop:'10px',textAlign:'end'}}>
         <button className="btn start-btn" onClick={()=>{dispatch({type:'nextQuestion'})}} >Next</button>
      </div>
    )
  }
  
  if(index +1 === questionsCount)
  {
    return (
      <div  style={{marginTop:'10px',textAlign:'end'}}>
         <button className="btn start-btn" onClick={()=>{dispatch({type:'finish'})}} >Finish</button>
      </div>
    )
  }
  
}

export default NextButton;