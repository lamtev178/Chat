import React from 'react'
import classes from './MyInput.module.css'

function MyInput({title, type, value, dark, onChange, isTitle,...props}){
  return(
    <>
    {isTitle ?
    <h3>{title}</h3> :
    null }
    {props.textarea ?
    <textarea
      style={props.style}
      type={type}
      onChange={onChange}
      value={value}
      placeholder={title}
      className={classes.input + ' ' +(dark ? classes.inputDark : null)}/> :
    <input
      style={props.style}
      type={type}
      onChange={onChange}
      value={value}
      placeholder={title}
      className={classes.input + ' ' +(dark ? classes.inputDark : null)}/>}
    </>
  )
}

export default MyInput
