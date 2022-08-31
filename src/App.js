import {  BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Alert from "./components/Alert";
import Home from "./rotas/Home";
import Cardapio from "./rotas/Cardapio";
import NotFound from "./rotas/NotFound";
import Footer from "./components/Footer";
import Finalizar from "./rotas/Finalizar";
import { useSelector } from "react-redux";
import PedidoFinalizado from "./rotas/PedidoFinalizado";
import { useState } from "react";

function App() {

  const itensCarrinho = useSelector(state => state.cart.itens)

  const [compraFoiFinalizada, setCompraFoiFinalizada] = useState(false)

  const compraFinalizada = () => {
    setCompraFoiFinalizada(true)
  }

  return (
    <BrowserRouter basename="/food-app">
      <Alert />
      <Header />
      <main className="container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cardapio' element={<Cardapio />} />
          {itensCarrinho.length && <Route path='/finalizar-compra' element={<Finalizar compraFinalizada={compraFinalizada} />} />}
          {compraFoiFinalizada && <Route path='/finalizado' element={<PedidoFinalizado />} />}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App;
