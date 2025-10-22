import React, { useEffect, useState } from 'react';
import { useTMDB } from '../hooks/useTMDB';
import SearchBar from '../components/SearchBar';
import Card from '../components/Card';
import Spinner from '../components/Spinner';

const Home = () => {
  const { data, loading, error, fetchPopular, search } = useTMDB();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!searchQuery) {
      fetchPopular('movie'); // Carrega filmes populares por padrão
    }
  }, [fetchPopular, searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      search(query);
    }
  };

  return (
    <section>
      <h1>Catálogo TMDB</h1>
      <SearchBar onSearch={handleSearch} />

      {loading && <Spinner />}
      {error && <p className="error">{error}</p>}

      <div className="catalog-grid">
        {data.map(item => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default Home;