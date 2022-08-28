import React, { memo, useEffect, useState } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useInput from '../hooks/useInput'
import { alertVisibility } from '../store/alertStore'
import classes from './FormAddress.module.css'


const InputField = memo(({name, error, value, placeholder, setValue, setWasTouched, isValid, errorMessage}) => {

  const handleChange = ({target}) => {
    setWasTouched(false);
    setValue(target.value)
  }

  const classValidation = error ? classes.invalid : isValid ?  classes.valid : ''
 
  return (
     <div className={classes.inputField}>
          <label htmlFor={name}>{name}</label>
          <input type='text' placeholder={placeholder} id={name} name={name} value={value} onChange={handleChange} onBlur={() => setWasTouched(true)} className={classValidation} />
          {error && <p className={classes.alert}>{errorMessage || 'Valor inválido'}</p>}
    </div>
  )
})

const FormAddress = ({ compraFinalizada }) => {
  const regexCpf = /(?:\d{3}[.-]?){3}\d{2}/;

  const [cepErrorMessage, setCepErrorMessage] = useState(null)

  const {value: cep, isValid: cepIsValid, error: cepError, wasTouched: cepTouched, setValue: setCep, setWasTouched: setCepWasTouched} = useInput((value) => value.trim() !== '' && !cepErrorMessage);
  const {value: street, isValid: streetIsValid, error: streetError, setValue: setStreet, setWasTouched: setStreetWasTouched} = useInput((value) => value.trim() !== '');
  const {value: neighborhood, isValid: neighborhoodIsValid, error: neighborhoodError, setValue: setNeighborhood, setWasTouched: setNeighborhoodWasTouched} = useInput((value) => value.trim() !== '');
  const {value: num, isValid: numIsValid, error: numError, setValue: setNum,  setWasTouched: setNumWasTouched} = useInput((value) =>  value.trim() !== '');
  const {value: complemento, isValid: complementoIsValid, error: complementoError, setValue: setComplemento,  setWasTouched: setComplementoWasTouched} = useInput(() => true);
  const {value: nome, isValid: nomeIsValid, error: nomeError, setValue: setNome,  setWasTouched: setNomeWasTouched} = useInput((value) => value.trim() !== '');
  const {value: cpf, isValid: cpfIsValid, error: cpfError, setValue: setCpf,  setWasTouched: setCpfWasTouched} = useInput((value) => regexCpf.test(value));
 

  const cartState = useSelector(state => state.cart)

  const navigate = useNavigate();

  const dispatch = useDispatch()

   useEffect(() => {

    if (cepTouched) {
      const validateCep = async () => {

        let error;

        await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`)
          .then(r => r.json())
          .then(enderecoData => {
            if (enderecoData.city !== 'Rio de Janeiro') {
              error = 'Este cep não faz parte da cidade Rio de Janeiro'
              return;
            }
            setStreet(enderecoData.street);
            setNeighborhood(enderecoData.neighborhood)

          })
          .catch(err => {
            console.log(err)
          })
          setCepErrorMessage(error)
      }
      validateCep()
    }
  }, [cep, cepTouched, setNeighborhood, setStreet])


  const submitForm = (e) => {
    e.preventDefault();

    setCepWasTouched(true);
    setStreetWasTouched(true);
    setComplementoWasTouched(true);
    setNeighborhoodWasTouched(true);
    setNomeWasTouched(true);
    setCpfWasTouched(true);
    setNumWasTouched(true);

    if (cepIsValid && streetIsValid && complementoIsValid && neighborhoodIsValid && nomeIsValid && cpfIsValid && numIsValid) {
      compraFinalizada()
      navigate('/finalizado', { state: { nome, cartState } })
    } else { 
      dispatch(alertVisibility('Preencha o formulário corretamente.', 'bad'));
    }
  }

  return (
    <form onSubmit={submitForm} className={classes.form}>
      <InputField placeholder='23555-240' name='cep' value={cep} isValid={cepIsValid} error={cepError} setValue={setCep} setWasTouched={setCepWasTouched} errorMessage={cepErrorMessage}/>
      <InputField placeholder='Rua Tal' name='street' value={street} isValid={streetIsValid} error={streetError} setValue={setStreet} setWasTouched={setStreetWasTouched}/>
      <InputField placeholder='Bairro Tal' name='neighborhood' value={neighborhood}  isValid={neighborhoodIsValid} error={neighborhoodError} setValue={setNeighborhood} setWasTouched={setNeighborhoodWasTouched}/>
      <InputField placeholder='12' name='num' value={num} isValid={numIsValid} error={numError} setValue={setNum} setWasTouched={setNumWasTouched}/>
      <InputField placeholder='apt. 101' name='complemento' value={complemento} isValid={complementoIsValid} error={complementoError} setValue={setComplemento} setWasTouched={setComplementoWasTouched}/>
      <InputField placeholder='Ana Souza' name='nome' value={nome} isValid={nomeIsValid} error={nomeError} setValue={setNome} setWasTouched={setNomeWasTouched}/>
      <InputField placeholder='123.123.123-12' name='cpf' value={cpf} isValid={cpfIsValid} error={cpfError} setValue={setCpf} setWasTouched={setCpfWasTouched}/>
     
      <button className='btn-style'>Finalizar compra</button>
    </form>
  )
}

export default FormAddress