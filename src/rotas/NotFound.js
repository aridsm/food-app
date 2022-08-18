import React from 'react'
import classes from './NotFound.module.css'

const NotFound = () => {
  return (
    <div className={classes.notFound}>
      <div className={classes.sub}>Sentimos muito...</div>
      <div>Esta pagina não existe ou não esta disponível.</div>
    </div>
  )
}

export default NotFound