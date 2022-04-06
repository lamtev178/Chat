import React from 'react'
import classes from './MyInput.module.css'

function MyInput({title, type, value, dark, onChange,...props}){
  return(
    <>
    <h4 >{title}</h4>
    {props.textarea ? 
    <textarea 
      style={props.style} 
      type={type} 
      onChange={onChange} 
      value={value} 
      placeholder={title} 
      className={classes.input + ' ' +(dark ? classes.inputDark : null)}/> :
    <input 
      type={type} 
      onChange={onChange} 
      value={value} 
      placeholder={title} 
      className={classes.input + ' ' +(dark ? classes.inputDark : null)}/>}
    </>
  )
}

export default MyInput