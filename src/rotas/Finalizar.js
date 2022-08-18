import React, { useEffect, useReducer } from 'react'
import { useSelector } from 'react-redux';
import InputField from '../components/InputField'
import classes from './Finalizar.module.css';

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
      error: ''
    },
    {
      nome: 'bairro',
      value: '',
      placeholder: 'Jardim',
      isValid: false
    },
    {
      nome: 'rua',
      value: '',
      placeholder: 'Rua da Lagoa',
      isValid: false
    },
    {
      nome: 'numero',
      value: '',
      placeholder: '176',
      isValid: false
    }, {
      nome: 'complemento',
      value: '',
      placeholder: 'apt. 101',
      isValid: true
    },
    {
      nome: 'nome',
      value: '',
      placeholder: 'Ana de Souza',
      isValid: false
    },
    {
      nome: 'cpf',
      value: '',
      placeholder: '000.000.000-00',
      isValid: false
    }
  ],
  formIsValid: false
}

const formReducer = (state, action) => {

  if (action.type === 'UPDATE_VALUE') {
    let newInputField = [...state.inputFields].map(input => {
      if (input.nome === action.inputName) {
        input.value = action.value;
      }
      return input;
    })

    if (action.inputName === 'cep') {
      newInputField = newInputField.map(input => {
        if (input.nome === 'cep') {
          input.blur = false;
        }
        return input;
      })
    }

    return { ...initialState, newInputField }
  }

  if (action.type === 'CHECK_VALIDITY') {
    const input = [...state.inputFields].find(input => input.nome === action.inputName);
    const inputValue = input.value;
    let isInputValid = inputValue.trim();
    let newInputField;

    if (action.inputName === 'cpf') {
      isInputValid = validateCpf(inputValue);
    }

    if (action.inputName === 'cep') {
      newInputField = [...state.inputFields].map(input => {
        if (input.nome === 'cep') {
          input.blur = true;
        }
        return input;
      })

      return { ...initialState, newInputField }
    }

    newInputField = [...state.inputFields].map(input => {
      if (input.nome === action.inputName) {
        input.isValid = !!isInputValid;
      }
      return input;
    })

    return { ...initialState, newInputField }
  }

  if (action.type === 'SEND_ERROR') {

    const newInputField = [...state.inputFields].map(input => {
      if (input.nome === 'cep') {
        input.error = action.error
      }
      return input;
    })

    return { ...initialState, newInputField }
  }

  return initialState
}


const Finalizar = () => {

  const [formState, dispatchForm] = useReducer(formReducer, initialState)

  const itensCarrinho = useSelector(state => state.cart.itens);

  const CEP = formState.inputFields.find(input => input.nome === 'cep');
  console.log(CEP.blur)
  useEffect(() => {

    if (CEP.blur) {
      const validateCep = async () => {

        let error = null;

        fetch(`https://ws.apicep.com/cep/${CEP.value}.json`)
          .then(r => r.json())
          .then(enderecoData => {
            if (!enderecoData.ok) {
              error = enderecoData.message;
              return;
            }

            if (enderecoData.city !== 'Rio de Janeiro') {
              error = 'Este cep nao faz parte da cidade Rio de Janeiro'
              return;
            }

            dispatchForm({ type: 'UPDATE_ADDRESS_DATA', bairro: enderecoData.district, rua: enderecoData.address })
          })
          .catch(err => {
            error = err
          })
        dispatchForm({ type: 'SEND_ERROR', error })
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


  return (
    <div className={classes.finalizar}>
      <div className={classes.formField}>
        <h1>Para onde enviar?</h1>
        <section>
          <p className={classes.cidade}>Cidade: Rio de Janeiro</p>
          <form onSubmit=''>
            {formState.inputFields.map(input =>
              <div key={input.nome}>
                <label htmlFor={input.nome}>{input.nome}</label>
                <input type='text' placeholder={input.placeholder} id={input.nome} name={input.nome} value={input.value} onChange={(e) => updateValue(e, input.nome)} onBlur={() => validateInput(input.nome)} />

              </div>)}
            <button className='btn-style'>Finalizar compra</button>
            {CEP.error}
          </form>
        </section>
      </div>
      <div className={classes.seuPedido}>
        <h2>Seu pedido</h2>
        <ul>
          {itensCarrinho.map(item =>
            <li key={item.id} className={classes.itemPedido}>
              <img src={require(`../assets/${item.img}`)} alt={item.nome} />
              <div className={classes.infos}>
                <p className={classes.nome}>{item.nome}</p>
                <p>{item.quantidade} x R$ {item.preco}</p>
                <p className={classes.total}>Total:  <span> R$ {item.quantidade * item.preco}</span></p>
              </div>
            </li>
          )}
        </ul>
      </div>
    </div >
  )
}

export default Finalizar