import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom'
import { cartActions } from '../store/cartStore';
import classes from './PedidoFinalizado.module.css'

const PedidoFinalizado = () => {

  const location = useLocation();
  const nome = location.state.nome;
  const cartState = location.state.cartState;
  const dispatch = useDispatch();

  const fixValor = (valor) => Math.abs(valor).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

  useEffect(() => {
    dispatch(cartActions.removeAll())
  }, [dispatch])

  return (
    <div className={classes.finalizado}>
      <h1>Olá, {nome}! Sua compra foi finalizada!</h1>
      <p className={classes.seuPedido}>Seu pedido:</p>
      <ul className={classes.listaPedidos}>
        {cartState.itens.map(item =>
          <li key={item.nome}>
            <p className={classes.itemNome}>{item.nome}</p>
            <div>{item.quantidade} x {fixValor(item.preco)}</div>
            <div className={classes.total}>Total: {fixValor(item.quantidade * item.preco)}</div>
          </li>)}
      </ul>
      <div className={classes.totalPedido}>
        Valor total da compra: <span>{fixValor(cartState.valorTotal)}</span>
      </div>
      <p className={classes.agradecer}>Agradecemos por comprar conosco!</p>
    </div>
  )
}

export default PedidoFinalizado