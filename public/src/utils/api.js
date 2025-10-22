import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = process.env.REACT_APP_TMDB_BASE_URL;

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'pt-BR', // Personalização de acordo com o pedido em português
  },
});

export const searchMoviesOrTV = (query, type = 'multi') => {
  // O tipo 'multi' busca por filmes, séries e pessoas
  return tmdb.get(`/search/${type}`, { params: { query } });
};

export const getMovieDetails = (id, type = 'movie') => {
  return tmdb.get(`/${type}/${id}`);
};

export const getPopular = (type = 'movie') => {
  return tmdb.get(`/${type}/popular`);
};

// ...outras funções de API (detalhes de séries, trending, etc.)