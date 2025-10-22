import React from 'react';
import { Link } from 'react-router-dom';
import { useWatchlist } from '../hooks/useWatchlist';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const IMAGE_BASE_URL = process.env.REACT_APP_TMDB_IMAGE_BASE_URL;

const Card = ({ item }) => {
  const { addToWatchlist, removeFromWatchlist, isItemInWatchlist } = useWatchlist();
  
  const mediaType = item.media_type || (item.title ? 'movie' : 'tv');
  const inWatchlist = isItemInWatchlist(item.id);

  const handleToggleWatchlist = () => {
    if (inWatchlist) {
      removeFromWatchlist(item.id);
    } else {
      addToWatchlist({
        id: item.id,
        title: item.title || item.name,
        poster_path: item.poster_path,
        media_type: mediaType,
      });
    }
  };

  return (
    <div className="card">
      <Link to={`/details/${mediaType}/${item.id}`}>
        <img 
          src={item.poster_path ? `${IMAGE_BASE_URL}${item.poster_path}` : 'placeholder.jpg'} 
          alt={item.title || item.name} 
        />
      </Link>
      <div className="card-info">
        <h3>{item.title || item.name}</h3>
        <button onClick={handleToggleWatchlist} className="watchlist-btn">
          {inWatchlist ? <FaHeart color="red" /> : <FaRegHeart />}
        </button>
      </div>
    </div>
  );
};

export default Card;