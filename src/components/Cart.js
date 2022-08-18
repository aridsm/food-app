import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { alertVisibility } from '../store/alertStore';
import { cartActions } from '../store/cartStore';
import classes from './Cart.module.css';
import ItemCart from './ItemCart';

const Cart = ({ itensNoCarrinho, closeCart, isCartShown }) => {


  const valorTotal = useSelector(state => state.cart.valorTotal);
  const dispatch = useDispatch()

  const fixValorTotal = Math.abs(valorTotal).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

  const navigate = useNavigate();

  const finalizarCompra = () => {
    closeCart();
    navigate('/finalizar-compra')
  }

  const removerTudo = () => {
    dispatch(cartActions.removeAll());
    dispatch(alertVisibility('A lista foi esvaziada.', 'bad'));
  }

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
      <button className='btn-style' onClick={finalizarCompra}>Finalizar compra</button>
    </div>
  </>

  if (!itensNoCarrinho.length) {
    carrinhoContent = <p className={classes.semItens}>Não há itens aqui.<br /> Comece adicionando itens no carrinho!</p>
  }

  return (
    <section className={`${classes.carrinho} ${isCartShown ? classes.shown : ''}`}>
      <div className={classes.header}>
        <p>Seu carrinho</p>
        {itensNoCarrinho.length ? <button onClick={removerTudo}>Esvaziar</button> : ''}
      </div>

      {carrinhoContent}

    </section>
  )
}

export default Cart