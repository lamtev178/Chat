import React, {useContext} from 'react'
import {useParams} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import MyButton from './UI/Button/MyButton'
import {ThemeContext} from '../App'

function Account({addSubscription}){
const {login} = useParams() 
const {theme} = useContext(ThemeContext)
const myUser = useSelector(state => state.isAuth.user)
const user = useSelector(state => state.users.filter( user => user.login == login)[0])

console.log(myUser.subscriptions, user.login);
const comments = useSelector(state => state.comments)
  return(
      <div className={theme ? "box-dark" : "box-light"}>
        <div className="justifyBetween">
          <h1>Личная информация</h1>
          {((myUser.login == user.login) ||  (myUser.subscriptions.indexOf(user.login) > -1)) ? null : 
            <MyButton onClick={() => addSubscription({login : myUser.login, subscription: user.login})}>
              Подписаться
            </MyButton>
          }
        </div>
        <h3>login : {user.login}</h3>
        <h3>Комментарии : {comments.filter(c => c.author === user.login).length}</h3>
        <h3>Подписки : {user.subscriptions.length === 0 ? "Подписок нет" :
            user.subscriptions.length
          }
        </h3>
      </div>
  )
}
export default Account