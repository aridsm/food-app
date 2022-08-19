import React from 'react'
import { useDispatch } from 'react-redux';
import classes from './ItemCart.module.css';
import { cartActions } from '../store/cartStore'
import { alertVisibility } from '../store/alertStore';

const ItemCart = ({ item }) => {


  const fixedPrecoItem = (valor) => Number(valor).toFixed(2).replace('.', ',');

  const aumentarQuantidade = () => {
    dispatch(cartActions.addOneItemToCart(item.id));
    dispatch(alertVisibility(`Adicionada 1 unidade de ${item.nome}`, 'ok'));
  }

  const diminuirQuantidade = () => {
    dispatch(cartActions.removeOneItemToCart(item.id))
    dispatch(alertVisibility(`Removida 1 unidade de "${item.nome}"`, 'bad'))
  }

  const dispatch = useDispatch();

  return (
    <li key={item.id} className={classes.itemCarrinho}>
      <div className={classes.img}>
        <img src={require(`../assets/${item.img}`)} alt={item.nome} />
      </div>
      <div className={classes.header}>
        <div className={classes.tituloEPreco}>
          <p className={classes.titulo}>{item.nome}</p>
          <p className={classes.unidade}>R$ {fixedPrecoItem(item.preco)}/cada</p>
        </div>
        <span className={classes.valor}>
          R$ {fixedPrecoItem(item.preco * item.quantidade)}
        </span>
      </div>
      <div className={classes.btnsEQtd}>
        <div className={classes.btn}>
          <button title='Diminuir de 1' onClick={diminuirQuantidade}>-</button>
          <button title='Adicionar mais 1' onClick={aumentarQuantidade}>+</button>
        </div>
        <span>qtd. {item.quantidade}</span>
      </div>
    </li>
  )
}

export default ItemCart