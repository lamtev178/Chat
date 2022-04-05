import React from 'react'
import classes from './MyButton.module.css'

function MyInput({children, onClick,...props}){
  return(
    <button style={props.style} onClick={onClick} className={classes.btn + " " + classes.btnPrimary}>{children}</button>
  )
}

export default MyInput