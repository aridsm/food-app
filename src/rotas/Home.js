import React from "react";
import classes from "./Home.module.css";
import { NavLink } from "react-router-dom";
import imgHome from "../assets/imghome.jpg";

const Home = () => {
  return (
    <div className={classes.home}>
      <div className={classes.container}>
        <div className={classes.txts}>
          <p>Bem vindo(a) ao FoodApp!</p>
          <h1>
            Lorem ipsum dolor <br /> sit amet
          </h1>
          <p className={classes.descricao}>
            Comida rápida e de <br /> qualidade!
          </p>

          <NavLink
            to="/cardapio"
            className={`btn-style ${classes.linkCardapio}`}
          >
            Conheça o Cardápio
          </NavLink>
        </div>
        <div className={classes.img}>
          <img
            src={imgHome}
            alt="visao de cima de uma bandeja com duas porçoes de batata frita e um hamburger"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
