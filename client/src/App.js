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
      dispatch({type: "GET_TOPICS", payload:response.data}) 
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  async function Login(e){
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:8000/auth/login', {
        login:e.target[0].value,
        password:e.target[1].value
      });
      console.log(response);
      dispatch({type:"LOGIN_IN", payload:response.data.login})
    } catch (error) {
      alert('Ошибка',error.message);
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

  return (
    <>
      {isAuth.isAuth ? <Main /> : <LoginForm onSubmit={Login}/>}
    </>
  );
}

export default App;
