import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [displayedCharacters, setDisplayedCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    name: '',
    species: '',
    gender: '',
    status: '',
  });

  useEffect(() => {
    const loadCharacters = async (page = 1) => {
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
        setCharacters(prevCharacters => [...prevCharacters, ...response.data.results]);
        const nextPage = page + 1;
        const totalPages = response.data.info.pages;

        if (nextPage <= totalPages) {
          loadCharacters(nextPage);
        } else {
          setLoading(false);
          setDisplayedCharacters(prevCharacters => [...prevCharacters, ...response.data.results].slice(0, 8));
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    loadCharacters();
  }, []);

  const handleLoadMore = () => {
    setDisplayedCharacters(characters.slice(0, displayedCharacters.length + 8));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  useEffect(() => {
    applyFilters();
  }, [filters, characters]);

  const applyFilters = () => {
    const filteredCharacters = characters.filter(character => {
      return (!filters.name || character.name.toLowerCase().includes(filters.name.toLowerCase())) &&
             (!filters.species || character.species === filters.species) &&
             (!filters.gender || character.gender === filters.gender) &&
             (!filters.status || character.status === filters.status);
    });

    setDisplayedCharacters(filteredCharacters.slice(0, 8));
  };

  const createCharacterElement = (character) => (
    <a key={character.id} className="characters__container" href="../pages/character-details.html" onClick={() => localStorage.setItem('selectedCharacterId', character.id)}>
      <img className="characters__image" src={character.image} alt={character.name} />
      <h6 className="characters__name">{character.name}</h6>
      <p className="characters__species regular">{character.species}</p>
    </a>
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <input type="text" name="name" placeholder="Filter by name" onChange={handleFilterChange} />
      <select name="species" onChange={handleFilterChange}>
        {/* Add species options here */}
      </select>
      <select name="gender" onChange={handleFilterChange}>
        {/* Add gender options here */}
      </select>
      <select name="status" onChange={handleFilterChange}>
        {/* Add status options here */}
      </select>
      <div id="characters">
        {displayedCharacters.map(createCharacterElement)}
      </div>
      <button id="load" onClick={handleLoadMore}>Load More</button>
    </div>
  );
};