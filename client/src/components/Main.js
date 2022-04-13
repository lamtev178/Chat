import React, {useEffect} from 'react'
import {useDispatch } from 'react-redux';
import Header from './Header'
import Content from './Content'
import Footer from './Footer'
const axios = require('axios').default;

function Main(){
  function getUpdates(){
    getUsers()
    GetTopics()
    GetComments()
  }
    async function getUsers(){
    try{
      const response = await axios.get('http://localhost:8000/auth/users')
      dispatch({type:"GET_USERS", payload: response.data})
      console.log(response);
    }
    catch(error){
      alert(error.response.data.message)
    }
  }
    async function GetTopics(){
    try {
      const response = await axios.get('http://localhost:8000/alltopics/topic');
      dispatch({type: "GET_TOPICS", payload:response.data.reverse()}); 
      console.log(response);
    } catch (error) {
      alert(error.response.data.message)
    }
  }
    async function GetComments(){
    try {
      const response = await axios.get('http://localhost:8000/alltopics/comment');
      console.log(response);
      dispatch({type: "GET_COMMENTS", payload:response.data}) 
    } catch (error) {
      alert(error.response.data.message)
    }
  }
  useEffect( ()=>{
    setInterval(() => getUpdates(), 100000)
    getUpdates()
  }
  ,[])
  const dispatch= useDispatch()
 return(
  <>
    <Header />
    <div className='Container'>
      <Content />
    </div>
    <Footer />
  </>
 )
}

export default Main