import React, { useEffect, useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { alertVisibility } from '../store/alertStore'
import classes from './FormAddress.module.css'

const validateCpf = (cpf) => {
  const regexCpf = /(?:\d{3}[.-]?){3}\d{2}/
  return regexCpf.test(cpf)
}

const initialState = {
  inputFields: [
    {
      nome: 'cep',
      value: '',
      placeholder: '00000-000',
      isValid: false,
      blur: false,
      error: '',
    },
    {
      nome: 'bairro',
      value: '',
      placeholder: 'Jardim',
      isValid: false,
      blur: false,
    },
    {
      nome: 'rua',
      value: '',
      placeholder: 'Rua da Lagoa',
      isValid: false,
      blur: false,
    },
    {
      nome: 'numero',
      value: '',
      placeholder: '176',
      isValid: false,
      blur: false,
    }, {
      nome: 'complemento',
      value: '',
      placeholder: 'apt. 101',
      isValid: true,
      blur: false,
    },
    {
      nome: 'nome',
      value: '',
      placeholder: 'Ana de Souza',
      isValid: false,
      blur: false,
    },
    {
      nome: 'cpf',
      value: '',
      placeholder: '000.000.000-00',
      isValid: false,
      blur: false,
    }
  ],
  formIsValid: false
}

const formReducer = (state, action) => {

  if (action.type === 'UPDATE_VALUE') {
    let newInputField = [...state.inputFields].map(input => {
      if (input.nome === action.inputName) {
        input.value = action.value;
        input.blur = false
      }
      return input;
    })

    return { ...initialState, inputFields: newInputField }
  }

  if (action.type === 'CHECK_VALIDITY') {
    const input = [...state.inputFields].find(input => input.nome === action.inputName);
    const inputValue = input.value;
    let isInputValid = inputValue.trim();

    if (action.inputName === 'cpf') {
      isInputValid = validateCpf(inputValue);
    }

    const newInputField = [...state.inputFields].map(input => {
      if (input.nome === action.inputName) {
        input.blur = true;
        if (input.nome !== 'cep' && input.nome !== 'complemento') {
          input.isValid = !!isInputValid;
        }
      }

      return input;
    })

    const formValidity = newInputField.every(input => input.isValid);

    return { formIsValid: formValidity, inputFields: newInputField }
  }

  if (action.type === 'SEND_ERROR') {

    const newInputField = [...state.inputFields].map(input => {
      if (input.nome === 'cep') {
        input.error = action.error;
        if (action.error) {
          input.isValid = false
        }
      }
      return input;
    })

    const formValidity = newInputField.every(input => input.isValid);
    return { formIsValid: formValidity, inputFields: newInputField }
  }

  if (action.type === 'UPDATE_ADDRESS_DATA') {
    const bairroInput = [...state.inputFields].find(input => input.nome === 'bairro');
    const ruaInput = [...state.inputFields].find(input => input.nome === 'rua');

    const newBairroValue = { ...bairroInput, value: action.bairro };
    const newRuaValue = { ...ruaInput, value: action.rua };

    const newInputField = [...state.inputFields].map(input => {
      if (input.nome === 'bairro') {
        input = newBairroValue;
        input.isValid = true;
        input.blur = true

      }
      if (input.nome === 'rua') {
        input = newRuaValue;
        input.isValid = true
        input.blur = true
      }
      if (input.nome === 'cep') {
        input.isValid = true
      }
      return input;
    })

    return { ...initialState, inputFields: newInputField }

  }

  if (action.type === 'SUBMIT') {

    const newInputField = state.inputFields.map(input => {
      input.blur = true;
      return input;
    })

    return { ...initialState, inputFields: newInputField }

  }

  return initialState
}

const FormAddress = ({ finalizarCompra }) => {
  const [formState, dispatchForm] = useReducer(formReducer, initialState);
  const dispatch = useDispatch()

  const cartState = useSelector(state => state.cart)

  const CEP = formState.inputFields.find(input => input.nome === 'cep');
  const nome = formState.inputFields.find(input => input.nome === 'nome').value;

  const navigate = useNavigate();

  useEffect(() => {

    if (CEP.blur) {
      const validateCep = async () => {

        let error;

        await fetch(`https://brasilapi.com.br/api/cep/v1/${CEP.value}`)
          .then(r => r.json())
          .then(enderecoData => {
            if (enderecoData.city !== 'Rio de Janeiro') {
              error = 'Este cep nao faz parte da cidade Rio de Janeiro'
              return;
            }

            dispatchForm({ type: 'UPDATE_ADDRESS_DATA', bairro: enderecoData.neighborhood, rua: enderecoData.street })
          })
          .catch(err => {
            console.log(err)
          })
        dispatchForm({ type: 'SEND_ERROR', error: error })
      }
      validateCep()
    }
  }, [CEP.blur, CEP.value])


  const updateValue = (e, inputName) => {
    dispatchForm({ type: 'UPDATE_VALUE', value: e.target.value, inputName })
  }

  const validateInput = (inputName) => {
    dispatchForm({ type: 'CHECK_VALIDITY', inputName })
  }

  const submitForm = (e) => {
    e.preventDefault();
    dispatchForm({ type: 'SUBMIT' })
    if (formState.formIsValid) {
      finalizarCompra()
      navigate('/finalizado', { state: { nome, cartState } })
    } else {
      dispatch(alertVisibility('Por favor, preencha seus dados corretamente.', 'bad'))
    }
  }


  return (
    <form onSubmit={submitForm} className={classes.form}>
      {formState.inputFields.map(input =>
        <div key={input.nome} className={classes.inputField}>
          <label htmlFor={input.nome}>{input.nome}</label>
          <input type='text' placeholder={input.placeholder} id={input.nome} name={input.nome} value={input.value} onChange={(e) => updateValue(e, input.nome)} onBlur={() => validateInput(input.nome)} className={!input.isValid && input.blur ? classes.invalid : input.isValid && input.blur ? classes.valid : ''} />
          {(!input.isValid && input.blur) && <p className={classes.alert}>{input.error || 'Valor inválido'}</p>}
        </div>)}
      <button className='btn-style'>Finalizar compra</button>
    </form>
  )
}

export default FormAddress