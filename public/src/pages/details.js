import React from 'react';
import { useParams } from 'react-router-dom';
import { useDetails } from '../hooks/useTMDB'; // Assumindo que você colocou o useDetails lá
import { useWatchlist } from '../hooks/useWatchlist';
import Spinner from '../components/Spinner';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const IMAGE_BASE_URL = process.env.REACT_APP_TMDB_IMAGE_BASE_URL;

const Details = () => {
  // 1. Obter o ID e Tipo da URL
  const { id, type } = useParams();
  
  // 2. Buscar Detalhes
  const { details, loading, error } = useDetails(id, type);
  
  // 3. Integração com Watchlist
  const { addToWatchlist, removeFromWatchlist, isItemInWatchlist } = useWatchlist();
  
  if (loading) return <Spinner />;
  if (error) return <p className="error-message">{error}</p>;
  if (!details) return <p className="not-found">Item não encontrado.</p>;

  // Prepara o objeto para a Watchlist
  const itemForWatchlist = {
    id: details.id,
    title: details.title || details.name,
    poster_path: details.poster_path,
    media_type: type,
  };
  
  const inWatchlist = isItemInWatchlist(details.id);

  const handleToggleWatchlist = () => {
    if (inWatchlist) {
      removeFromWatchlist(details.id);
    } else {
      addToWatchlist(itemForWatchlist);
    }
  };

  return (
    <div className="details-container">
      <div className="poster-area">
        <img 
          src={details.poster_path ? `${IMAGE_BASE_URL}${details.poster_path}` : '/placeholder.jpg'}
          alt={details.title || details.name}
          className="details-poster"
        />
      </div>
      <div className="info-area">
        <h1>{details.title || details.name}</h1>
        <p className="tagline">{details.tagline}</p>

        <div className="details-actions">
          <span className="rating">⭐ {details.vote_average.toFixed(1)}</span>
          <button onClick={handleToggleWatchlist} className={`btn-watchlist ${inWatchlist ? 'remove' : 'add'}`}>
            {inWatchlist ? <FaHeart /> : <FaRegHeart />}
            {inWatchlist ? ' Remover da Lista' : ' Adicionar à Lista'}
          </button>
        </div>

        <p className="overview">
          <strong>Sinopse:</strong> {details.overview || "Nenhuma sinopse disponível."}
        </p>

        <p><strong>Tipo:</strong> {type === 'movie' ? 'Filme' : 'Série'}</p>
        <p><strong>Lançamento:</strong> {details.release_date || details.first_air_date}</p>
        <p>
          <strong>Gêneros:</strong> 
          {details.genres && details.genres.map(g => g.name).join(', ')}
        </p>
        
        {details.runtime && <p><strong>Duração:</strong> {details.runtime} minutos</p>}
        {details.number_of_episodes && <p><strong>Episódios:</strong> {details.number_of_episodes}</p>}
      </div>
    </div>
  );
};

export default Details;