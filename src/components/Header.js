import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './Header.module.css';
import { ReactComponent as IconCart } from '../assets/cart.svg'
import { ReactComponent as IconLogo } from '../assets/logo.svg'
import { useSelector } from 'react-redux';
import Cart from './Cart';

const Header = () => {

  const classIsActive = ({ isActive }) => isActive ? classes.linkAtivo : '';
  const cartData = useSelector(state => state.cart)
  return (
    <header className={classes.header}>
      <div className={`container ${classes.container}`}>
        <nav>
          <NavLink to='/' end className={classIsActive}>Home</NavLink>
          <NavLink to='/cardapio' className={classIsActive}>Cardapio</NavLink>
        </nav>
        <div className={classes.logo}>
          <IconLogo />  FoodApp
        </div>
        <div className={classes.cart}>
          <button className={`btn-style ${classes.btnCarrinho}`}>
            <span>Carrinho </span><IconCart />
            <span className={classes.itensCarrinho}>{cartData.totalItens}</span>
          </button>

          <Cart itensNoCarrinho={cartData.itens} />

        </div>
      </div>
    </header>
  )
}

export default Header