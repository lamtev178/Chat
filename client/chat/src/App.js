import './App.css';
import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/LoginInForm'
import Main from './components/Main'
const axios = require('axios').default;

function App() {
    async function GetTopics(){
    try {
      const response = await axios.get('http://localhost:8000/alltopics/topic');
      console.log(response);
      dispatch({type: "GET_TOPICS", payload:response.data}) 
    } catch (error) {
      console.error(error);
    }
  }
    async function GetComments(){
    try {
      const response = await axios.get('http://localhost:8000/alltopics/comment');
      console.log(response);
      dispatch({type: "GET_COMMENTS", payload:response.data}) 
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(async ()=>{
    GetComments()
    GetTopics()
  }
  ,[])
  const dispatch= useDispatch()
  const isAuth = useSelector(state => state.isAuth)
  function onSubmit(e){
    e.preventDefault()
    console.log(e.target[0].value, e.target[1].value);
  }
  return (
    <>
      {isAuth.isAuth ? <Main /> : <LoginForm onSubmit={() => dispatch({type:"LOGIN_IN"}) }/>}
    </>
  );
}

export default App;
