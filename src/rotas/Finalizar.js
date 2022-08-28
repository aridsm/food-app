import React from 'react'
import FormAddress from '../components/FormAddress';
import SeuPedido from '../components/SeuPedido';
import classes from './Finalizar.module.css';


const Finalizar = ({ compraFinalizada }) => {

  return (
    <div className={classes.finalizar}>
      <div className={classes.formField}>
        <h1>Para onde enviar?</h1>
        <section>
          <p className={classes.cidade}>Cidade: Rio de Janeiro</p>
          <FormAddress compraFinalizada={compraFinalizada} />
        </section>
      </div>
      <SeuPedido />
    </div>
  )
}

export default Finalizar