import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import MyInput from './UI/Input/MyInput'
const axios = require('axios')

function Friends(){
  const [login, setLogin] = useState([])
  const [search, setSearch] = useState('')
  const users = useSelector(state => state.users)
  
  useEffect(()=>{
    setLogin(users.filter(user => user.login.startsWith(search)))
  },[search])
  function handeChange(e){
    setSearch(e.target.value)
  }

  const subscriptions = useSelector(state => state.isAuth.user.subscriptions)
  return(
    <>
      <MyInput dark value={search} title="Поиск по логину" onChange={handeChange} />
      { !search ? ( subscriptions.length != 0 ?
      subscriptions.map(user =>{
        return(
          <div key={user._id} className="box">{user.name}</div>
        )
      }) :       
      <h5 style ={{marginTop:'30px'}}>Список ваших подписок пуст.</h5>) : 
      login.map(user =>{
        return(
          <div key={user._id} className='box'>
            <h2>{user.login}</h2>
          </div>
        )
      })
      }
    </>
  )
}
export default Friends