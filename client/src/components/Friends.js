import React, {useState, useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import MyInput from './UI/Input/MyInput'
import MyButton from './UI/Button/MyButton'
import {ThemeContext} from '../App'
const axios = require('axios')

function Friends({addSubscription}){
  const {theme} = useContext(ThemeContext)
  const [login, setLogin] = useState([])
  const [search, setSearch] = useState('')
  const myUser = useSelector(state => state.isAuth.user)
  const users = useSelector(state => state.users)


  useEffect(()=>{
    setLogin(users.filter(user => user.login.startsWith(search) && myUser.login !== user.login))
  },[search])
  function handeChange(e){
    setSearch(e.target.value)
  }
  const subscriptions = useSelector(state => state.isAuth.user.subscriptions)
  return(
    <>
      <MyInput dark={theme ? true : null} value={search} title="Поиск по логину" onChange={handeChange} />
      { !search ? ( subscriptions.length !== 0 ?
      subscriptions.map(login =>{
        return(
          <Link to={`/users/${login}`} key={login} style={{textDecoration:'none'}}>
            <div className={theme ? "box-dark box-darkHover" : "box-light box-lightHover"}>
              <h2>{login}</h2>
            </div>
          </Link>
        )
      }) :
      <h5 style ={{marginTop:'30px'}}>Список ваших подписок пуст.</h5>) :
      login.map(user =>{
        return(
            <div key={user._id} className={"justifyBetween " + (theme ? "box-dark " : "box-light ")}>
              <Link to={`/users/${user.login}`} key={user._id} style={{textDecoration:'none'}}>
                <h2>{user.login}</h2>
              </Link>
              {subscriptions.indexOf(user.login) === -1 ?
                <MyButton onClick={() => addSubscription({login : myUser.login, subscription: user.login})}>Подписаться</MyButton> :
                null
              }
            </div>
        )
      })
      }
    </>
  )
}
export default Friends
