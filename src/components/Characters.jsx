import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters } from './charactersReducer';
import { Link } from "react-router-dom";
import FilterInput from './filters/FilterInput';
import FilterSelect from './filters/FilterSelect';

const Characters = () => {
  const dispatch = useDispatch();
  const { characters, loading, error } = useSelector((state) => state.characters);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const charactersPerPage = 8;

  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]);

  useEffect(() => {
    setFilteredCharacters(characters);
  }, [characters]);

  const showCharacters = () => {
    setCurrentPage(currentPage + 1);
  };

  // Вычисляем индексы для текущей страницы
  const indexOfLastCharacter = currentPage * charactersPerPage;
  const currentCharacters = filteredCharacters.slice(0, indexOfLastCharacter);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main>
      <div className='filters'>
      <FilterInput className = "filters__name-character" characters={characters} onFilter={setFilteredCharacters} />
      <FilterSelect
      options={[
        { value: '', label: 'All Genders' },
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' }
      ]}
      characters={characters}
      onSelect={setFilteredCharacters}
      filterProperty="gender" // This is the property of the character to filter on
      />

    <FilterSelect
      options={[
        { value: '', label: 'All Species' },
        { value: 'Human', label: 'Human' },
        { value: 'Alien', label: 'Alien' }
      ]}
      characters={characters}
      onSelect={setFilteredCharacters}
      filterProperty="species" // This is the property of the character to filter on
    />

    <FilterSelect
      options={[
        { value: '', label: 'Status' },
        { value: 'Alive', label: 'Alive' },
        { value: 'Dead', label: 'Dead' }
      ]}
      characters={characters}
      onSelect={setFilteredCharacters}
      filterProperty="status" // This is the property of the character to filter on
    />
    </div>

      <div className='characters'>
        {currentCharacters.map((character) => (
          <div className='characters__container' key={character.id}>
            <Link to={`/characters/${character.id}`}>
              <img className ="characters__image" src={character.image} alt={character.name} />
              <h6 className="characters__name">{character.name}</h6>
            </Link>
          </div>
        ))}
      </div>
      {indexOfLastCharacter < characters.length && (
        <button onClick={showCharacters}>Load More</button>
      )}
    </main>
  );
};

export default Characters;
