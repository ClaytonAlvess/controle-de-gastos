import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Categorias from './pages/Categorias/Categorias';
import Gastos from './pages/Gastos/Gastos';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/gastos" element={<Gastos />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
