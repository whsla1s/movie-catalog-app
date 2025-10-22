import React from 'react';
import { useWatchlist } from '../hooks/useWatchlist';
import WatchlistCard from '../components/WatchlistCard'; // Usaremos um Card dedicado para a remoção

// Componente Card específico para a lista de observação (src/components/WatchlistCard.js)
// Poderia ser o Card.js com modificações, mas um novo componente deixa mais limpo:
/*
import React from 'react';
import { Link } from 'react-router-dom';
import { useWatchlist } from '../hooks/useWatchlist';
import { FaTimes } from 'react-icons/fa';

const IMAGE_BASE_URL = process.env.REACT_APP_TMDB_IMAGE_BASE_URL;

const WatchlistCard = ({ item }) => {
    const { removeFromWatchlist } = useWatchlist();

    return (
        <div className="card watchlist-card">
            <Link to={`/details/${item.media_type}/${item.id}`}>
                <img 
                    src={item.poster_path ? `${IMAGE_BASE_URL}${item.poster_path}` : 'placeholder.jpg'} 
                    alt={item.title || item.name} 
                />
            </Link>
            <div className="card-info">
                <h3>{item.title}</h3>
                <p>({item.media_type === 'movie' ? 'Filme' : 'Série'})</p>
                <button 
                    onClick={() => removeFromWatchlist(item.id)} 
                    className="btn-remove-list"
                    title="Remover da Lista de Observação"
                >
                    <FaTimes /> Remover
                </button>
            </div>
        </div>
    );
};
export default WatchlistCard;
*/

const Watchlist = () => {
  const { watchlist } = useWatchlist();

  return (
    <section>
      <h1>Minha Lista de Observação</h1>
      
      {watchlist.length === 0 ? (
        <p className="empty-message">Sua lista está vazia. Adicione alguns filmes ou séries!</p>
      ) : (
        <div className="catalog-grid">
          {watchlist.map(item => (
            <WatchlistCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Watchlist;