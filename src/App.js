import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Alert from "./components/Alert";
import Home from "./rotas/Home";
import Cardapio from "./rotas/Cardapio";
import NotFound from "./rotas/NotFound";
import Footer from "./components/Footer";
import Finalizar from "./rotas/Finalizar";
import { useSelector } from "react-redux";
import PedidoFinalizado from "./rotas/PedidoFinalizado";

function App() {

  const itensCarrinho = useSelector(state => state.cart.itens)
  const alertIsShown = useSelector(state => state.alert.alertIsShown)
  return (
    <BrowserRouter>
      {alertIsShown && <Alert />}
      <Header />
      <main className="container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cardapio' element={<Cardapio />} />
          {itensCarrinho.length && <Route path='/finalizar-compra' element={<Finalizar />} />}
          <Route path='/finalizado' element={<PedidoFinalizado />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App;
