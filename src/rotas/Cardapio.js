import React, { useState } from 'react'
import classes from './Cardapio.module.css'
import cardapio from '../cardapio-lista/cardapio'

const Cardapio = () => {

  const categoriasCardapio = Object.keys(cardapio);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('hamburguer')

  return (
    <div className={classes.cardapio}>
      <h1>Cardápio</h1>

      <div className={classes.categorias}>
        <p>Categorias</p>
        <ul className={classes.listaCategorias}>
          <li><button>Todas</button></li>
          {categoriasCardapio.map(categoria =>
          <li key={categoria}><button>{categoria}</button></li>
          )}
        </ul>
      </div>

      <ul className={classes.listaCardapio}>
          {cardapio[categoriaSelecionada].map(prato => 
            <li key={prato.nome} className={classes.itemCardapio}>
              <img src={require(`../assets/${prato.img}`)} alt={prato.nome}/>
              <div className={classes.info}>
                <p className={classes.nome}>{prato.nome}</p>
                <p className={classes.descricao}>{prato.descricao}</p>
                <div className={classes.preco}>R$ {prato.preco.replace('.', ',')}</div>
              </div>
            </li>
            )}
      </ul>
    </div>
  )
}

export default Cardapio