import React from 'react'
import { useSelector } from 'react-redux'
import classes from './Alert.module.css'

const Alert = () => {

  const alert = useSelector(state => state.alert);
  const alertIsShown = useSelector(state => state.alert.alertIsShown)

  let classStatus = ''

  if (alert.type === 'ok') {
    classStatus = classes.ok
  }

  if (alert.type === 'bad') {
    classStatus = classes.bad
  }

  const styles = `${alertIsShown ? classes.alertShown : ''} ${classStatus} ${classes.alerta}`

  return (
    <div className={styles}>
      {alert.message}
    </div>
  )
}

export default Alert