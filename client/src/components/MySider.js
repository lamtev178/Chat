import React, {useState} from "react";
import MyButton from './UI/Button/MyButton'
import MyInput from './UI/Input/MyInput'
import { useDispatch, useSelector } from 'react-redux';
import { BiX } from 'react-icons/bi';
const axios = require('axios').default;

function MySider(){
  const [theme, setTheme] = useState('')
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()
  const author = useSelector(state => state.isAuth.login)
  const [toggleSider,setToggleSider] = useState(false)
  async function handleSubmitTopic(event){
    event.preventDefault()
    try {
      const response = await axios.post('http://localhost:8000/alltopics/topic',{
        title: theme,
        description: message,
        author: author
      })
      console.log(response);
      dispatch({type:"POST_TOPICS", payload: {title:theme, description: message, author: author, _id:response.data.data._id}})
      setToggleSider(false)
    }
    catch (error) {
      alert('Ошибка',error.message);
    }
  }
  return(
    <>
    <div className={(toggleSider ? 'sider sider-active' : 'sider')}>
      <BiX style={{height:'30px', width:'30px', cursor: 'pointer', position:'absolute', right:'20px', top:'20px'}} onClick={() => setToggleSider(false)}/>
      <MyInput value={theme} title='Ваша тема' onChange={e => setTheme(e.target.value)}/>
      <MyInput value={message} title='Описание' textarea  onChange={e => setMessage(e.target.value)}/>
      <MyButton
        style={{marginTop:'30px'}}
        onClick={handleSubmitTopic}
      >
        Создать тему
      </MyButton>
    </div>
    <div className='siderButton'>
      <MyButton onClick={()=>setToggleSider(true)}>Написать тему</MyButton>
    </div>
    {toggleSider ? <div className="sider-backdrop"/> : null}
    </>
  )
}

export default MySider