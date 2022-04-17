import React from 'react'
import classes from './MyModal.module.css'

function MyModal({toggle, children}){
  return(
    <>
    <div className={classes.modal + ' ' + (toggle ? classes.active : '')} >
      <div className={classes.modalContent}>
        {children}
      </div>
    </div>
    <div className={classes.modalBackdrop + ' ' + (toggle ? classes.active : '')} ></div>
    </>
  )
}

export default MyModal