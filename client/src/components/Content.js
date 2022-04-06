import React from 'react'
import Topics from './Topics'
import Messages from './Messages'
import Account from './Account'
import Friends from './Friends'
import Topic from './Topic'
import {Routes, Route} from 'react-router'
const axios = require('axios')

function Content(){
  async function addSubscription({login, subscription}){
    console.log(login, subscription);
    try {
    const response = await axios.post('http://localhost:8000/auth/addsub',{
      login:login,
      subscription:subscription
    })
    console.log(response);
    } catch (error) {
        alert(error.response.data.message)
    }
  }
  return(
    <Routes>
      <Route path='/' element={<Topics />} />
      <Route path='/Messages' element={<Messages />} />
      <Route path='/users/:login' element={<Account addSubscription={addSubscription}/>} />
      <Route path='/Friends' element={<Friends addSubscription={addSubscription}/>} />
      <Route path='/:topicID' element={<Topic />} />
    </Routes>
  )
}
export default Content