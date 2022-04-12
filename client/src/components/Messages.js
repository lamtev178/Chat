import React from 'react';

function Messages(){
  let ws = new WebSocket("ws://localhost:8000/message");
  ws.onopen = () => {
    console.log("Соединение установлено.");
  };
  ws.onerror = (error) => {
    console.log(error);
  };
  return(
    <h1>
      Comming soon...
    </h1>
  )
}
export default Messages