import React from 'react';
import classes from './Cart.module.css';

const Cart = ({ itensNoCarrinho }) => {

  console.log(itensNoCarrinho.map(item =>
    <li key={item.id}>
      <img src={require(`../assets/${item.img}`)} alt={item.nome} />

    </li>
  ))

  return (
    <section className={classes.carrinho}>
      <div className={classes.header}>
        <p>Seu carrinho</p>
        <button>Esvaziar</button>
      </div>

      <ul className={classes.listaCarrinho}>
        {itensNoCarrinho.map(item =>
          <li key={item.id}>{item.nome}</li>
        )}
      </ul>

      <div>
        <span>
          Total: R$ 67,22
        </span>
        <button>Finalizar compra</button>
      </div>
    </section>
  )
}

export default Cart