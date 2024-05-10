import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {FilterInput} from './filters/FilterInput';
import {FilterSelect} from './filters/FilterSelect';

export const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [displayedCharacters, setDisplayedCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <FilterInput characters={characters} setDisplayedCharacters={setDisplayedCharacters} />
      <FilterSelect name="species" characters={characters} setDisplayedCharacters={setDisplayedCharacters} />
      <FilterSelect name="gender" characters={characters} setDisplayedCharacters={setDisplayedCharacters} />
      <FilterSelect name="status" characters={characters} setDisplayedCharacters={setDisplayedCharacters} />
      <div id="characters">
        {displayedCharacters.map(createCharacterElement)}
      </div>
      <button id="load" onClick={handleLoadMore}>Load More</button>
    </div>
  );
};
