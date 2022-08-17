import React from 'react';
import { useSelector } from 'react-redux';
import classes from './Cart.module.css';
import ItemCart from './ItemCart';

const Cart = ({ itensNoCarrinho }) => {


  const valorTotal = useSelector(state => state.cart.valorTotal);

  const fixValorTotal = Math.abs(valorTotal).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })

  let carrinhoContent = <>
    <ul className={classes.listaCarrinho}>
      {itensNoCarrinho.map(item =>
        <ItemCart item={item} key={item.id} />
      )}
    </ul>

    <div className={classes.finalizar}>
      <span className={classes.total}>
        Total: <br /><span>{fixValorTotal}</span>
      </span>
      <button className='btn-style'>Finalizar compra</button>
    </div>
  </>

  if (!itensNoCarrinho.length) {
    carrinhoContent = <p className={classes.semItens}>Não há itens aqui.<br /> Comece adicionando itens no carrinho!</p>
  }

  return (
    <section className={classes.carrinho}>
      <div className={classes.header}>
        <p>Seu carrinho</p>
        {itensNoCarrinho.length ? <button>Esvaziar</button> : ''}
      </div>

      {carrinhoContent}


    </section>
  )
}

export default Cart