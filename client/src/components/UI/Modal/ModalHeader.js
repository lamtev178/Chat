import React from 'react'
import classes from './MyModal.module.css'
import { BiX } from 'react-icons/bi';

function ModalHeader({children, onClick,  ...props}){
  return(
    <div className={classes.modalHeader}>
      {children}
      <BiX className='X' onClick={onClick}/>
    </div>
  )
}

export default ModalHeader