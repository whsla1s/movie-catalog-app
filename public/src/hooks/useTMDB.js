import { useState, useEffect, useCallback } from 'react';
// IMPORTANTE: Ajustamos a importação para usar 'getDetails' em vez de 'getMovieDetails'
import { getPopular, searchMoviesOrTV, getDetails } from '../utils/api'; 

// ----------------------------------------------------------------------------------
// HOOK PRINCIPAL: Lida com a busca e filmes/séries populares
// ----------------------------------------------------------------------------------
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
      // Filtra resultados que não sejam pessoas para focar em filmes/séries
      setData(response.data.results.filter(item => item.media_type !== 'person')); 
      setError(null);
    } catch (err) {
      setError('Erro ao buscar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchPopular, search };
};

// ----------------------------------------------------------------------------------
// HOOK ESPECÍFICO: Lida com o carregamento dos detalhes de um item
// ----------------------------------------------------------------------------------
export const useDetails = (id, type) => {
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true); // Começa carregando
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            if (!id || !type) return;

            setLoading(true);
            setError(null);

            try {
                // USA A FUNÇÃO 'getDetails' DO api.js
                const response = await getDetails(id, type); 
                setDetails(response.data);
            } catch (err) {
                setError('Erro ao carregar os detalhes do item.');
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id, type]); // Depende do ID e do Tipo de mídia

    return { details, loading, error };
};