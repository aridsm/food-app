import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import classes from './Header.module.css';
import { ReactComponent as IconCart } from '../assets/cart.svg'
import { ReactComponent as IconLogo } from '../assets/logo.svg'
import { useSelector } from 'react-redux';
import Cart from './Cart';

const Header = () => {

  const classIsActive = ({ isActive }) => isActive ? classes.linkAtivo : '';
  const cartData = useSelector(state => state.cart);
  const [isCartShown, setIsCartShown] = useState(false);
  const refCart = useRef()

  const openCart = () => {
    setIsCartShown(true)
  }

  const closeCart = () => {
    setIsCartShown(false)
  }

  useEffect(() => {
    const closeCart = (e) => {
      if (e.target !== refCart.current && !refCart.current.contains(e.target)) {
        setIsCartShown(false);
        console.log(e.target, refCart.current)
      }
    }
    window.addEventListener('click', closeCart);
    return () => {
      window.removeEventListener('click', closeCart);
    }
  }, [])


  return (
    <header className={classes.header}>
      <div className={`container ${classes.container}`}>
        <nav>
          <NavLink to='/' end className={classIsActive}>Home</NavLink>
          <NavLink to='/cardapio' className={classIsActive}>Cardápio</NavLink>
        </nav>
        <div className={classes.logo}>
          <IconLogo />  FoodApp
        </div>
        <div className={classes.cart} ref={refCart} >
          <button className={`btn-style ${classes.btnCarrinho} ${isCartShown ? classes.btnAtivo : ''}`} onClick={openCart}>
            <span>Carrinho </span><IconCart />
            <span className={classes.itensCarrinho}>{cartData.totalItens}</span>
          </button>

          <Cart itensNoCarrinho={cartData.itens} closeCart={closeCart} isCartShown={isCartShown} />

        </div>
      </div>
    </header>
  )
}

export default Header