import { useState, useEffect, useCallback } from 'react';
import { getPopular, searchMoviesOrTV, getMovieDetails } from '../utils/api';

export const useTMDB = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPopular = useCallback(async (type = 'movie') => {
    setLoading(true);
    try {
      const response = await getPopular(type);
      setData(response.data.results);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar populares.');
    } finally {
      setLoading(false);
    }
  }, []);

  const search = useCallback(async (query) => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await searchMoviesOrTV(query);
      setData(response.data.results.filter(item => item.media_type !== 'person')); // Filtra pessoas
      setError(null);
    } catch (err) {
      setError('Erro ao buscar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchPopular, search };
};

// Hook específico para detalhes (poderia estar aqui ou em uma função separada)
export const useDetails = (id, type) => {
    const [details, setDetails] = useState(null);
    // ... lógica para buscar detalhes usando getMovieDetails ...
    return { details, loading, error };
};