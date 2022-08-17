import React, { useState } from 'react'
import classes from './Cardapio.module.css'
import cardapio from '../cardapio-lista/cardapio'
import ModalItemCardapio from '../components/ModalItemCardapio';

const Cardapio = () => {

  const categoriasCardapio = Object.keys(cardapio);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todas');
  const [pratoModal, setPratoModal] = useState(null)

  const displayModal = (prato) => {
    setPratoModal(prato);
  }

  const closeModal = () => {
    setPratoModal(null);
  }

  const trocarCategoria = (categoria) => {
    setCategoriaSelecionada(categoria)
  }

  let cardapioFiltrado = cardapio[categoriaSelecionada];

  if (!cardapio[categoriaSelecionada]) {
    const todosItensCardapio = [];
    Object.values(cardapio).forEach(lista => {
      todosItensCardapio.push(...lista)
    })
    cardapioFiltrado = todosItensCardapio;
  }

  return (
    <>
      {pratoModal && <ModalItemCardapio item={pratoModal} onClose={closeModal} />}
      <div className={classes.cardapio}>
        <h1>Cardápio</h1>

        <div className={classes.categorias}>
          <p>Categorias</p>
          <ul className={classes.listaCategorias}>
            <li><button onClick={() => trocarCategoria('Todas')} className={'Todas' === categoriaSelecionada ? classes.btnAtivo : ''}>Todas</button></li>
            {categoriasCardapio.map(categoria =>
              <li key={categoria}><button onClick={() => trocarCategoria(categoria)} className={categoria === categoriaSelecionada ? classes.btnAtivo : ''}>{categoria}</button></li>
            )}
          </ul>
        </div>

        <ul className={classes.listaCardapio}>
          {cardapioFiltrado.map(prato =>
            <li key={prato.id} className={classes.itemCardapio} onClick={() => displayModal(prato)}>
              <img src={require(`../assets/${prato.img}`)} alt={prato.nome} />
              <div className={classes.info}>
                <p className={classes.nome}>{prato.nome}</p>
                <p className={classes.descricao}>{prato.descricao}</p>
                <div className={classes.preco}>R$ {prato.preco.replace('.', ',')}</div>
              </div>
            </li>
          )}
        </ul>
      </div>
    </>
  )
}

export default Cardapio