import React, { memo, useCallback, useState } from 'react'
import classes from './Cardapio.module.css'
import cardapio from '../cardapio-lista/cardapio'
import ModalItemCardapio from '../components/ModalItemCardapio';

  const ItemCategoria = memo(({categoria, trocarCategoria, categoriaSelecionada}) => {
    return  <li key={categoria}><button onClick={() => trocarCategoria(categoria)} className={categoria === categoriaSelecionada ? classes.btnAtivo : ''}>{categoria}</button></li>
  })

  const ItemCardapio = memo(({item, displayModal}) => {

    return  (
    <li className={classes.itemCardapio} onClick={() => displayModal(item)} tabIndex='0'>
    <img src={require(`../assets/${item.img}`)} alt={item.nome} />
    <div className={classes.info}>
      <p className={classes.nome}>{item.nome}</p>
      <p className={classes.descricao}>{item.descricao}</p>
      <div className={classes.preco}>R$ {item.preco.replace('.', ',')}</div>
    </div>
  </li>
  )}
  )


const Cardapio = () => {

  const categoriasCardapio = Object.keys(cardapio);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todas');
  const [pratoModal, setPratoModal] = useState(null)

  const displayModal = useCallback((prato) => {
    setPratoModal(prato);
  }, [])

  const closeModal = () => {
    setPratoModal(null);
  }

  const trocarCategoria = useCallback((categoria) => {
    setCategoriaSelecionada(categoria)
  }, [])

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
            <ItemCategoria key={categoria} categoria={categoria} trocarCategoria={trocarCategoria} categoriaSelecionada={categoriaSelecionada}/>
            )}
          </ul>
        </div>

        <ul className={classes.listaCardapio}>
          {cardapioFiltrado.map(item =>
            <ItemCardapio key={item.id} item={item} displayModal={displayModal}/>
          )}
        </ul>
      </div>
    </>
  )
}

export default Cardapio