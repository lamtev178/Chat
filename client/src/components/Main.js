import React, {useEffect} from 'react'
import {useDispatch, useSelector } from 'react-redux';
import Header from './Header'
import Content from './Content'
import Footer from './Footer'
import {getUsers, getTopics, getComments} from '../redux/ActionCreator'
const axios = require('axios').default;

function Main(){
  const dispatch= useDispatch()
  const auth = useSelector(state => state.isAuth) || []
  function getUpdates(){
    dispatch(getUsers())
    dispatch(getTopics())
    dispatch(getComments())
  }
  let ws = new WebSocket("ws://localhost:8000/ws?token="+localStorage.getItem('Token'));
  ws.onopen = () => {
    console.log("Соединение установлено.");
  };
  ws.onerror = (event) => {
    console.log("WebSocket error received: ", event);
  }
  ws.onmessage = (data) =>{
    const mess = JSON.parse(data.data);
    console.log(mess);
    dispatch({type: "POST_MESSAGE", payload: {data : mess}})
  }
  function handleSendMess(data){
    ws.send(JSON.stringify(data))
  }
  useEffect( ()=>{
    setInterval(() => getUpdates(), 100000)
    getUpdates()
  }
  ,[])
 return(
  <>
    <Header />
    <div className='Container' style={{paddingTop:"100px"}}>
      <Content handleSendMess={handleSendMess}/>
    </div>
    <Footer />
  </>
 )
}

export default Main
