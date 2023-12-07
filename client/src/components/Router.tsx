import React, { useState, useEffect } from 'react'
import Topics from '../pages/Topics'
import Chat from '../pages/Chat'
import Messages from '../pages/Messages'
import Account from '../pages/Account'
import Friends from '../pages/Friends'
import Topic from '../pages/Topic'
import LoginForm from '../pages/LoginInForm'
import { Routes, Route } from 'react-router'
import { useAppSelector } from '~/hooks/useAppSelector'

function Router() {

  const { user } = useAppSelector(state => state.users)
  const [checkedState, setCheckedState] = useState(
    new Array(user.subscriptions.length).fill(false)
  )

  return (
    <div className="routesPadding">
      <div className="content">
        <Routes>
          <Route path='/topics' element={<Topics />} />
          <Route path='/messages' element={<Messages />} />
          <Route path='/users/:login' element={<Account />} />
          <Route path='/friends' element={<Friends />} />
          <Route path='/messages/chat/:chatID' element={<Chat />} />
          <Route path='/:topicID' element={<Topic />} />
          <Route path='/' element={<LoginForm />} />
        </Routes>
      </div>
    </div>
  )
}
export default Router
