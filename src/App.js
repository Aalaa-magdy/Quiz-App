import Header from './components/Header';
import Main from './components/Main';
import { useEffect ,useReducer} from 'react';
import Loading from './components/Loading';
import Error from './components/Error';
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import NextButton from './components/NextButton';
import Progress from './components/Progress';
import FinishScreen from './components/FinishScreen';
import Timer from './components/Timer';
const initialState={
  questions:[],
  status:"loading",//loading,ready,error,acitve,finished
  index:0,
  newAnswer:null,
  points:0,
  secondsRemaining:10
};
function reducer(state,action){
  switch(action.type){
    case'dataReceived':
    return{...state,questions:action.payload,status:"ready"};
    case'dataFailed':
    return{...state,status:"error"}
    case 'start':
      return {...state,status:"active",secondsRemaining: state.questions.length * 30};
    case 'newAnswer':
      return {...state,newAnswer:action.payload}
    case 'nextQuestion':
      const question=state.questions[state.index];
      let points=state.points;
      if(question.correct_answer===state.newAnswer){
        points = points+question.points;
      }
      return {...state,index:state.index+1,newAnswer:null,points}
    case 'finish':
      return {...state,status:"finished"}
    case 'restart':
      return{...initialState,status:'ready',questions:state.questions}
    case 'timer':
      return {...state,secondsRemaining:state.secondsRemaining - 1 ,status:state.secondsRemaining === 0? 'finished':state.status}
    default:
      return state;
  }
}
function App() {

  const [state,dispatch]=useReducer(reducer,initialState);
  const  questionsCount=state.questions.length;
  const maxPoints= state.questions.reduce((acc,curr)=>acc+curr.points,0);
  useEffect (()=>{
  try{
    fetch("http://localhost:9001/questions")
    .then((res)=>res.json())
    .then((data)=>dispatch({type:'dataReceived',payload:data}))
  }
  catch(error){
    dispatch({type:'dataFailed'}) // Error handling in production code.  This is just for demonstration purposes.  In a real-world application, you should handle errors gracefully.  For example, you could display an error message to the user.  Here, we're just logging the error to the console.  In a production environment, you'd want to log errors to a server or a logging service.  In a real-world application, you'd also want to handle errors differently based on the type of error, such as displaying a user-friendly error message or retrying the request.  The fetch API doesn't throw errors when it fails, so we're using a try-catch block to handle the error.  In a production application, you'd also want to handle errors differently based on the type of error, such as displaying a user-friendly error message or retrying the request.  The fetch API doesn't throw errors when it fails
  }

  },[])
  return (
    <div className="container">
       <Header/>
       <Main>
         {state.status==="loading"&&<Loading/>}
         {state.status==="error"&&<Error/>}
         {state.status==="ready"&&<StartScreen questionsCount={questionsCount} dispatch={dispatch}/>}
         {state.status==="active"&&
         <>
         <Progress questionsCount={questionsCount} index={state.index} points={state.points} maxPoints={maxPoints}/>
         <Question question={state.questions[state.index]} dispatch={dispatch} newAnswer={state.newAnswer}/>
         <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <Timer seconds={state.secondsRemaining} dispatch={dispatch}/>
         <NextButton newAnswer={state.newAnswer} dispatch={dispatch} index={state.index} questionsCount={questionsCount}/>
         </div>
         </>
         }
         {state.status==="finished"&&<FinishScreen points={state.points} maxPoints={maxPoints} dispatch={dispatch} />}
       </Main>
    </div>
  );
}

export default App;
