import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = process.env.REACT_APP_TMDB_BASE_URL;

// Configuração base do Axios com a API Key e idioma
const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'pt-BR', // Garante que os dados retornados estejam em português, se disponíveis
  },
});

/**
 * Função para buscar filmes, séries ou ambos (multi).
 * @param {string} query - O termo de busca.
 * @param {string} type - O tipo de busca ('multi', 'movie', 'tv').
 */
export const searchMoviesOrTV = (query, type = 'multi') => {
  // O tipo 'multi' busca por filmes, séries e pessoas
  return tmdb.get(`/search/${type}`, { params: { query } });
};

/**
 * Função para obter os detalhes completos de um filme ou série específica.
 * Renomeada de getMovieDetails para getDetails para consistência com o hook useDetails.
 * @param {number} id - O ID do filme ou série.
 * @param {string} type - O tipo de mídia ('movie' ou 'tv').
 */
export const getDetails = (id, type) => { // <-- Função atualizada/renomeada
  return tmdb.get(`/${type}/${id}`);
};

/**
 * Função para buscar os filmes ou séries mais populares.
 * @param {string} type - O tipo de mídia ('movie' ou 'tv').
 */
export const getPopular = (type = 'movie') => {
  return tmdb.get(`/${type}/popular`);
};