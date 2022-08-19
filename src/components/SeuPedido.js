import React from 'react'
import { useSelector } from 'react-redux';
import classes from './SeuPedido.module.css'

const SeuPedido = () => {

  const cartState = useSelector(state => state.cart);

  const fixValor = (valor) => Math.abs(valor).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

  return (
    <div className={classes.seuPedido}>
      <h2>Seu pedido</h2>
      <div className={classes.valorTotal}>
        <span>Valor total do pedido: </span>
        <span className={classes.valor}>{fixValor(cartState.valorTotal)}</span>
      </div>
      <ul>
        {cartState.itens.map(item =>
          <li key={item.id} className={classes.itemPedido}>
            <img src={require(`../assets/${item.img}`)} alt={item.nome} />
            <div className={classes.infos}>
              <p className={classes.nome}>{item.nome}</p>
              <p>{item.quantidade} x {fixValor(item.preco)}</p>
              <p className={classes.total}>Total: <span> {fixValor(item.quantidade * item.preco)}</span></p>
            </div>
          </li>
        )}
      </ul>
    </div>
  )
}

export default SeuPedido