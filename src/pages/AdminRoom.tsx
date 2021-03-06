import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router';

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useRoom } from '../hooks/useRoom';


import '../styles/AdminRoom.scss';


import '../styles/room.scss';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import { useHistory } from 'react-router-dom';

type Question ={
  id:string;
  author:{
    name:string;
    avatar:string;
  }
  content:string;
  isAnswered: boolean;
  isHighlighted:boolean;
  }



type RoomParams ={
  id:string;
}



export function AdminRoom(){
//const {user} = useAuth();
const history = useHistory()
const params = useParams<RoomParams>();
const roomId = params.id;

const {title,questions} = useRoom(roomId)

async function handleEndRoom(){
  await database.ref(`rooms/${roomId}`).update({
   endedAt:new Date(),

  })

  history.push('/');
}

async function handleDeleteQuestion(questionId:string){
  if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')){
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
  }
}

async function handleCheckQuestionAsAnswered(questionId:string) {
  await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
   isAnswered:true,

  })
}

async function handleHighlightQuestion(questionId:string) {
  await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
    isHighlighted:true,
  })

  }


return ( 
<div id="page-room">
<header>
<div className="content">
<img src={logoImg} alt="Letmeask"/>
<RoomCode code={params.id}/>
<button className="terminate" onClick={handleEndRoom}>Encerrar Sala</button>
</div>
</header>
<main>
  <form >
  <div className="room-title">
<h1>Sala {title}</h1>
{questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
</div>
 <div className="question-list">
 {questions.map(questions =>{
   return(
   <Question
   key={questions.id}
   content={questions.content}
   author={questions.author}
   isAnswered={questions.isAnswered}
   isHighlighted={questions.isHighlighted}
   >
     {!questions.isAnswered && (
       <>
         <button
         type ="button"
         onClick={() => handleCheckQuestionAsAnswered(questions.id) }
        >
          <img src={checkImg} alt="Marcar peregunta como respondida"/>
        </button>
   
        <button
         type ="button"
         onClick={() => handleHighlightQuestion(questions.id) }
        >
          <img src={answerImg} alt="Dar destaque à pergunta"/>
        </button>
         </>
     )}

     <button
      type ="button"
      onClick={() => handleDeleteQuestion(questions.id) }
     >
       <img src={deleteImg} alt="Remover pergunta"/>
     </button>
    </Question>
   );

 })}
</div>
</form>
</main>
</div>
);
}

