import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const[questions,setquestion]=useState([])
  const[currentIndex,setindex]=useState(0)
  const[result,setresult]=useState(false)
  const[select,setselect]=useState(false)
  const[score,setscore]=useState(0)
const[pass,setpass]=useState("pass")


useEffect(function (){
  fetchquection()

},[])
 function fetchquection()
 {
  fetch('https://the-trivia-api.com/v2/questions')
  .then(res=>res.json())
  .then(res=>{
    res.map(function(item){
      item.options=[item.correctAnswer,...item.incorrectAnswers]
shuffle(item.options)

    })
    setquestion(res)
    console.log(res)

  })
 }


 function Next()
 {
setselect(false)
  setindex(currentIndex+1)
  if(currentIndex===questions.length-1)
  {
    setresult(true)
  }
 }
 
function Restart()
{
  setresult(false)
  setindex(0)
  setscore(0)

}
function change(){
  setselect()
}
function checkanswer(item){
if(item===questions[currentIndex].correctAnswer)
{

  setscore(score+1)

 
  
}
  
}


function shuffle(array) {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}



 if (!questions.length) {
  return <div>loading..</div>
}

  return (
    <div className="App">
      <header className="App-header">

 {/* <h1>QUIZ APP</h1>


 <button onClick={start}>Start Quiz</button> */}


      <h2 className='heading'>Quiz Application</h2>
{!result?<div>

   <h3 id='question'>Q{currentIndex + 1 }){questions[currentIndex].question.text}</h3>
   {questions[currentIndex].options.map(function(item)
   {
    return <div id=''> <p id='option'> <input  name='same'  type='radio' value={item} checked={select} onChange={change} onClick={()=>checkanswer(item)} />){item}</p></div>
    


   })}

   

    <button id='next' onClick={Next}>Next</button>
</div>

:<div>

  <h1 id='score'>your score  {(score/questions.length)*100}% </h1>

<button id='restart' onClick={Restart}>Restart</button></div>}  



 
 
</header>
    </div>
  );
}

export default App;
