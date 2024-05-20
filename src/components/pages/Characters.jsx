import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters } from '../redux/charactersReducer';
import FilterInput from '../filters/FilterInput';
import FilterSelect from '../filters/FilterSelect';
import { GENDER_OPTIONS, SPECIES_OPTIONS, STATUS_OPTIONS } from '../filters/filterOptions';
import LoadMore from '../LoadMore';
import logoBig from '../images/logo-big.png';
import CharacterCard from '../CharacterCard';
import useFilteredEntities from '../useFilteredEntities'

const Characters = () => {
  const dispatch = useDispatch();
  const { characters, loading, error } = useSelector((state) => state.characters);
  const [currentPage, setCurrentPage] = useState(1);
  const [nameFilter, setNameFilter] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const charactersPerPage = 8;

  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]);

  const filteredCharacters = useFilteredEntities(characters, [
    { value: nameFilter, predicate: (character, value) => character.name.toLowerCase().includes(value.toLowerCase()) },
    { value: speciesFilter, predicate: (character, value) => character.species === value },
    { value: statusFilter, predicate: (character, value) => character.status === value },
    { value: genderFilter, predicate: (character, value) => character.gender === value },
  ]);

  const showCharacters = () => {
    setCurrentPage(currentPage + 1);
  };

  // Вычисляем индексы для текущей страницы
  const indexOfLastCharacter = currentPage * charactersPerPage;
  let currentCharacters = filteredCharacters.slice(0, indexOfLastCharacter);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <header className='header'>
        <img src= {logoBig} alt="logo" className="header__logo"/>
      </header>
      <main className='main'>
        <div className='filters'>
          <FilterInput className = "filters__name-character" onChange={setNameFilter} />
          <FilterSelect
            options={GENDER_OPTIONS}
            onSelect={setGenderFilter}
            filterProperty="gender" 
            />
          <FilterSelect
            options={SPECIES_OPTIONS}
            onSelect={setSpeciesFilter}
            filterProperty="species"
          />
          <FilterSelect
            options={STATUS_OPTIONS}
            onSelect={setStatusFilter}
            filterProperty="status"
          />
        </div>
      <div className='characters'>
        {currentCharacters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
        <LoadMore 
          onClick={showCharacters} 
          isVisible={indexOfLastCharacter < filteredCharacters.length} 
        />
      </main>
    </>
  );
};

export default Characters;

