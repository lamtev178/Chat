import React, {useContext} from 'react'
import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import {ThemeContext} from '../App'

function Account(){
const {login} = useParams() 
const {theme} = useContext(ThemeContext)
const user = useSelector(state => state.users.filter( user => user.login == login)[0])
const comments = useSelector(state => state.comments)
  return(
      <div className={theme ? "box-dark" : "box-light"}>
        <h1>Личная информация</h1>
        <h3>login : {user.login}</h3>
        <h3>Комментарии : {comments.filter(c => c.author === user.login).length}</h3>
        <h3>Подписки : {user.subscriptions.length === 0 ? "Подписок нет" :
         user.subscriptions.forEach(user => {return(
          user
        )})}</h3>
      </div>
  )
}
export default Account