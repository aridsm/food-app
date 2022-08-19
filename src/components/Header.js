import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import classes from './Header.module.css';
import { ReactComponent as IconCart } from '../assets/cart.svg'
import { ReactComponent as IconLogo } from '../assets/logo.svg'
import { useSelector } from 'react-redux';
import Cart from './Cart';
import { ReactComponent as IconMenu } from '../assets/menu.svg'

const Header = () => {

  const classIsActive = ({ isActive }) => isActive ? classes.linkAtivo : '';
  const cartData = useSelector(state => state.cart);
  const [isCartShown, setIsCartShown] = useState(false);
  const refCart = useRef();
  const refMenu = useRef();
  const [isMenuShown, setIsMenuShown] = useState(true)

  const location = useLocation()

  const estaNaRotaFinalizar = location.pathname === '/finalizar-compra';

  const openCart = () => {
    setIsCartShown(true)
  }

  const closeCart = () => {
    setIsCartShown(false)
  }

  useEffect(() => {
    const checkPageWidth = () => {
      if (window.innerWidth <= 550) {
        setIsMenuShown(false)
      }
    }
    checkPageWidth()
    window.addEventListener('resize', checkPageWidth)
    return () => {
      window.removeEventListener('resize', checkPageWidth)
    }
  }, [])

  useEffect(() => {
    const closeMenus = (e) => {
      if (e.target !== refCart.current && !refCart.current.contains(e.target)) {
        setIsCartShown(false);
      }
      if (e.target !== refMenu.current && !refMenu.current.contains(e.target)) {
        setIsMenuShown(false)
      }
    }
    window.addEventListener('click', closeMenus);
    return () => {
      window.removeEventListener('click', closeMenus);
    }
  }, [])

  return (
    <header className={classes.header}>
      <div className={`container ${classes.container}`}>
        <nav className={isMenuShown ? classes.shown : ''}>
          <NavLink to='/' end className={classIsActive}>Home</NavLink>
          <NavLink to='/cardapio' className={classIsActive}>Cardápio</NavLink>
        </nav>
        <Link className={classes.logo} to='/'>
          <IconLogo />  FoodApp
        </Link>
        <button ref={refMenu} className={`${classes.menuBtn} ${isMenuShown ? classes.shown : ''}`} onClick={() => setIsMenuShown(true)}><IconMenu /></button>
        <div className={classes.cart} ref={refCart} >
          <button className={`btn-style ${classes.btnCarrinho} ${isCartShown ? classes.btnAtivo : ''}`} onClick={openCart} disabled={estaNaRotaFinalizar}>
            <span>Carrinho </span><IconCart />
            <span className={classes.itensCarrinho}>{cartData.totalItens}</span>
          </button>

          <Cart itensNoCarrinho={cartData.itens} closeCart={closeCart} isCartShown={isCartShown} />
        </div>

      </div>
    </header >
  )
}

export default Header