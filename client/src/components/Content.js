import React from 'react'
import Topics from './Topics'
import Messages from './Messages'
import Topic from './Topic'
import {Routes, Route} from 'react-router'

function Content(){
  return(
    <Routes>
      <Route path='/' element={<Topics />} />
      <Route path='/Messages' element={<Messages />} />
      <Route path='/:topicID' element={<Topic />} />
    </Routes>
  )
}
export default Content