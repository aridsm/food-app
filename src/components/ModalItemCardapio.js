import React, { useState } from 'react'
import Modal from '../modal/Modal'
import classes from './ModalItemCardapio.module.css'

const ModalItemCardapio = ({ item, onClose }) => {

  const [quantidadeItem, setQuantidadeItem] = useState(1);

  const preco = item.preco * quantidadeItem

  const aumentarQuantidade = () => {
    setQuantidadeItem(prevState => {
      return prevState + 1
    })
  }

  const diminuirQuantidade = () => {
    setQuantidadeItem(prevState => {
      if (prevState === 1) return prevState;
      return prevState - 1
    })
  }

  return (
    <Modal onClose={onClose}>
      <div className={classes.modal}>
        <div>
          <img src={require(`../assets/${item.img}`)} alt={item.nome} />
        </div>
        <div className={classes.infos}>
          <h2>{item.nome}</h2>
          <p className={classes.descricao}>{item.descricao}</p>
          <div className={classes.qtdPreco}>
            <span className={classes.preco}>
              <span>{quantidadeItem}x</span>
              R$ {item.preco.replace('.', ',')}
            </span>
            <div className={classes.qtd}>
              <button title='Diminuir de 1' onClick={diminuirQuantidade}>-</button>
              <button title='Adicionar mais 1' onClick={aumentarQuantidade}>+</button>
            </div>
          </div>

          <div className={classes.totalContainer}>
            <span>
              <p>Total</p>
              <div className={classes.total}>
                R$ {String(preco.toFixed(2)).replace('.', ',')}
              </div>
            </span>
            <button className='btn-style'>Adicionar ao carrinho</button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ModalItemCardapio