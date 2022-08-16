import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./rotas/Home";
import Cardapio from "./rotas/Cardapio";
import NotFound from "./rotas/NotFound";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cardapio' element={<Cardapio />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App;
