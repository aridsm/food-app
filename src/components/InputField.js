import React from 'react';
import classes from './InputField.module.css'

const InputField = (props) => {

  const updateValue = (e) => {
    props.setValue(e.target.value)
  }
  return (
    <div className={classes.inputField}>
      <label>{props.name}</label>
      <input type='text' name={props.name} id={props.name} placeholder={props.placeholder} value={props.value} onChange={updateValue} {...props} />
    </div>
  )
}

export default InputField