import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import InputField from '../components/InputField'
import classes from './Finalizar.module.css';


const Finalizar = () => {

  const [cep, setCep] = useState('')
  const [cepError, setCepError] = useState(null)
  const [bairro, setBairro] = useState('')
  const [rua, setRua] = useState('')
  const [numero, setNumero] = useState('')
  const [complemento, setComplemento] = useState('')
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [cpfError, setCpfError] = useState(null);

  const itensCarrinho = useSelector(state => state.cart.itens)


  const validateCep = async () => {
    setCepError(null)
    try {
      const response = await fetch(`https://ws.apicep.com/cep/${cep}.json`);

      if (!response.ok) {
        setBairro('');
        setRua('');
        throw new Error('Cep invalido');
      }

      const enderecoData = await response.json();

      if (!enderecoData.ok) {
        setCepError(enderecoData.message)
        return;
      }

      if (enderecoData.city !== 'Rio de Janeiro') {
        setCepError('Este cep nao faz parte da cidade Rio de Janeiro');
        return
      }

      setBairro(enderecoData.district);
      setRua(enderecoData.address);

    } catch (err) {
      console.log(err);
    }
  }

  const validadeCpf = () => {
    const cpfRegex = /(?:\d{3}[.-]?){3}\d{2}/g
    if (!cpfRegex.test(cpf)) {
      setCpfError('CPF invalido');
      return;
    }
    setCpfError(null)
  }

  const submitAddress = (e) => {
    e.preventDefault();
    if (cep && bairro && rua && numero && cpf && nome && !cepError && !cpfError) {
      console.log('form VALIDO')
      return
    }
    console.log('form INVALIDO')
  }

  return (
    <div className={classes.finalizar}>
      <div className={classes.formField}>
        <h1>Para onde enviar?</h1>
        <section>
          <p className={classes.cidade}>Cidade: Rio de Janeiro</p>
          <form onSubmit={submitAddress}>
            <InputField name='cep' placeholder='Ex: 23587-545' value={cep} setValue={setCep} onBlur={validateCep} />
            <p className={classes.errorMessage}>{cepError}</p>
            <InputField name='bairro' placeholder='Jardim' value={bairro} setValue={setBairro} />
            <InputField name='rua' placeholder='Rua da Lagoa' value={rua} setValue={setRua} />
            <InputField name='numero' placeholder='123' value={numero} setValue={setNumero} />
            <InputField name='complemento' placeholder='apt. 101' value={complemento} setValue={setComplemento} />
            <InputField name='Seu nome' placeholder='Ex: Joao da Silva' value={nome} setValue={setNome} />
            <InputField name='CPF' placeholder='000.000.000-00' value={cpf} setValue={setCpf} onBlur={validadeCpf} />
            <p className={classes.errorMessage}>{cpfError}</p>
            <button className='btn-style'>Finalizar compra</button>
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
    </div>
  )
}

export default Finalizar