import React from 'react'
import classes from './MyModal.module.css'

function ModalBody({children, ...props}){
  return(
    <div className={classes.modalBody}>
      {children}
    </div>
  )
}

export default ModalBody