import React from 'react'
import classes from './MyButton.module.css'

function MyInput({children,isAuth=true, onClick,...props}){
  return(
    <button style={props.style} disabled={!isAuth} onClick={onClick} className={classes.btn + " " + classes.btnPrimary}>{children}</button>
  )
}

export default MyInput