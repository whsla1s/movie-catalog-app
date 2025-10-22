import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Details from './pages/Details';
import Watchlist from './pages/Watchlist';
import './styles.css'; // Estilos globais

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:type/:id" element={<Details />} />
          <Route path="/watchlist" element={<Watchlist />} />
          {/* Opcional: Rota para 404 */}
        </Routes>
      </main>
    </Router>
  );
};

export default App;