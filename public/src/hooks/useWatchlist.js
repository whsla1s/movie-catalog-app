import { useState, useEffect } from 'react';

const WATCHLIST_KEY = 'tmdb_watchlist';

export const useWatchlist = () => {
  // Inicializa o estado com o que está no Local Storage
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const localData = localStorage.getItem(WATCHLIST_KEY);
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Erro ao carregar Local Storage:", error);
      return [];
    }
  });

  // Salva no Local Storage sempre que a lista muda
  useEffect(() => {
    try {
      localStorage.setItem(WATCHLIST_KEY, JSON.stringify(watchlist));
    } catch (error) {
      console.error("Erro ao salvar no Local Storage:", error);
    }
  }, [watchlist]);

  const addToWatchlist = (item) => {
    if (!watchlist.some(w => w.id === item.id)) {
      setWatchlist(prev => [...prev, item]);
    }
  };

  const removeFromWatchlist = (itemId) => {
    setWatchlist(prev => prev.filter(item => item.id !== itemId));
  };

  const isItemInWatchlist = (itemId) => {
    return watchlist.some(item => item.id === itemId);
  };

  return { watchlist, addToWatchlist, removeFromWatchlist, isItemInWatchlist };
};