import React from 'react'
import { useSelector } from 'react-redux'
import classes from './Alert.module.css'

const Alert = () => {

  const alert = useSelector(state => state.alert);
  let classStatus = ''

  if (alert.type === 'ok') {
    classStatus = classes.ok
  }

  if (alert.type === 'bad') {
    classStatus = classes.bad
  }

  return (
    <div className={`${classes.alerta} ${classStatus}`}>
      {alert.message}
    </div>
  )
}

export default Alert