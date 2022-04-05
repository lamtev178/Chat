import React from 'react'
import {useSelector, useDispatch} from 'react-redux'

function Account(){
const user = useSelector(state => state.isAuth.user)
const comments = useSelector(state => state.comments)
console.log(user);
  return(
    <div className="Container Mt-5">
      <div className="topic">
        <h1>Личная информация</h1>
        <h3>login : {user.login}</h3>
        <h3>Комментарии : {comments.filter(c => c.author === user.login).length}</h3>
      </div>
    </div>
  )
}
export default Account