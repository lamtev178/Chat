import React, {useState, useEffect, useContext} from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import MyInput from './UI/Input/MyInput'
import {ThemeContext} from '../App'
const axios = require('axios')

function Friends(){
  const {theme} = useContext(ThemeContext)
  const [login, setLogin] = useState([])
  const [search, setSearch] = useState('')
  const myLogin = useSelector(state => state.isAuth.user.login)
  const users = useSelector(state => state.users)
  
  useEffect(()=>{
    setLogin(users.filter(user => user.login.startsWith(search) && myLogin !== user.login))
  },[search])
  function handeChange(e){
    setSearch(e.target.value)
  }

  const subscriptions = useSelector(state => state.isAuth.user.subscriptions)
  return(
    <>
      <MyInput dark={theme ? true : null} value={search} title="Поиск по логину" onChange={handeChange} />
      { !search ? ( subscriptions.length != 0 ?
      subscriptions.map(user =>{
        return(
          <div key={user._id} className={theme ? "box-dark box-darkHover" : "box-light box-lightHover"}>{user.name}</div>
        )
      }) :       
      <h5 style ={{marginTop:'30px'}}>Список ваших подписок пуст.</h5>) : 
      login.map(user =>{
        return(
          <Link to={`/users/${user.login}`} key={user._id} style={{textDecoration:'none'}}>
            <div key={user._id} className={theme ? "box-dark box-darkHover" : "box-light box-lightHover"}>
              <h2>{user.login}</h2>
            </div>
          </Link>
        )
      })
      }
    </>
  )
}
export default Friends