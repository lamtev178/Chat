import React from 'react'
import {useSelector} from 'react-redux'


function Friends(){
  const subscriptions = useSelector(state => state.isAuth.user.subscriptions)
  return(
    <>
      {subscriptions.length ? 
      subscriptions.map(user =>{
        return(
          <div className="topic">{user.name}</div>
        )
      }) : 
      <h1>Список друзей пуст.</h1>}
    </>
  )
}
export default Friends