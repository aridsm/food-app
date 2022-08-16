import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './Header.module.css';
import {ReactComponent as IconCart} from '../assets/cart.svg'
import {ReactComponent as IconLogo} from '../assets/logo.svg'

const Header = () => {

  const classIsActive = ({ isActive }) => isActive ? classes.linkAtivo : '';

  return (
    <header className={classes.header}>
      <div className={`container ${classes.container}`}>
      <nav>
        <NavLink to='/' end className={classIsActive}>Home</NavLink>
        <NavLink to='/cardapio' className={classIsActive}>Cardapio</NavLink>
      </nav>
      <div className={classes.logo}>
      <IconLogo/>  FoodApp
      </div>
      <div className={classes.cart}>
        <button className={`btn-style ${classes.btnCarrinho}`}>
          <span>Carrinho </span><IconCart />
          <span className={classes.itensCarrinho}>0</span>
        </button>
        <section className={classes.carrinho}>
          <h2>Seu carrinho</h2>
          <button>Esvaziar</button>
          <ul>
            Lista itens carrinho
          </ul>
          <div>
            <span>
              Total: R$ 67,22
            </span>
            <button>Finalizar compra</button>
          </div>
        </section>
      </div>
      </div>
    </header>
  )
}

export default Header