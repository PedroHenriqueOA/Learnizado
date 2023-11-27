import { useEffect, useReducer } from "react";
import DateCounter from "./DateCounter";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";





// Define os estados inicias dos "states"
const initialState = {
  questions: [],

  status: "loading", 
  index: 0,
  answer: null,
  points: 0,
};







// Define os estados do Quiz, carregamento, pronto, ativo e finalizado
function reducer(state, action) {
  switch(action.type){
    case "dataReceived": // Quando recebe os dados é alterado para "ready"
      return{
        ...state,
        questions: action.payload,
        status: "ready",
      };
      case "dataFailed": //No caso de houver falha, dado não ser carregado propriamente
        return{
          ...state, status: "error",
      };
      case "start":
        return {...state, status:"active"
      };
      case "newAnswer":
        const question = state.questions.at(state.index);

      return{
        ...state, answer: action.payload,
        points: action.payload === question.correctOption ? state.points + question.points : state.points, 
      };
      case "nextQuestion":
        return  {...state, index: state.index + 1, answer: null};
    case "finish":
      return {...state,status: "finished"};
    case "restart":
      return{...initialState, questions: state.questions, status:"ready"};

      default:
      throw new Error("Action Unkown");
  };
};







export default function App (){

  // Usando useReducer hook para criar um State para que os dados sejam apresentados na tela
  const [{questions, status, index, answer, points}, dispatch] = useReducer (reducer, initialState);

  const numQuestions = questions.length; // Passa o tamanho do Array para numQuestions

  const maxPossiblePoints=questions.reduce((prev, cur)=>prev + cur.points ,0) 


  // Utilizando uma API falsa local para puxar as perguntas que serão apresentadas no Quiz
  useEffect(function () {
    fetch("http://localhost:4000/questions").then((res) => res.json()).then((data) =>dispatch({type: "dataReceived",payload: data})).catch((err) =>dispatch({type: "dataFailed"}));
  }, []);

  return (
    <div className="app">
      <Header />



      <Main> 
        {status==="loading" && <Loader/>} 
        {status==="error" && <Error/>}
        {status==="ready" && <StartScreen numQuestions = {numQuestions} dispatch={dispatch}/>}
        {status === "active" && (
          <>

        
          <Progress index={index} numQuestions={numQuestions}
          points={points} 
          maxPossiblePoints = {maxPossiblePoints}
          answer={answer} />

          <Question 
            question={questions[index]} 
            dispatch={dispatch} 
          answer={answer}
          />

        <NextButton dispatch={dispatch} answer={answer} numQuestions={numQuestions} index={index} />
        </> 
        )}

          {status==="finished" && ( <FinishScreen points={points} maxPossiblePoints={maxPossiblePoints} dispatch={dispatch}/>)}
      </Main>
      <Footer/>
    </div>
  );
}