import React from 'react'

const Finalizar = () => {
  return (
    <div>
      <h1>Para onde enviar?</h1>
      <section>
        <p>Cidade: Rio de Janeiro</p>
        <form>
          <div>
            <label>CEP</label>
            <input type='text' name='cep' id='cep' placeholder='733913-434' />
          </div>
          <div>
            <label>Bairro</label>
            <input type='text' name='bairro' id='bairro' placeholder='Jardim' />
          </div>
          <div>
            <label>Rua</label>
            <input type='text' name='rua' id='rua' placeholder='Rua da Lagoa' />
          </div>
          <div>
            <label>Numero</label>
            <input type='text' name='numero' id='numero' placeholder='123' />
          </div>
          <div>
            <label>Complemento</label>
            <input type='text' name='complemento' id='complemento' placeholder='apt. 101' />
          </div>
          <div>
            <label>Referencia</label>
            <textarea name='referencia' id='referencia' placeholder='Perto da praça...' />
          </div>
          <button className='btn-style'>Finalizar compra</button>
        </form>
      </section>
    </div>
  )
}

export default Finalizar