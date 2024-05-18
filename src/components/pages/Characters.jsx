import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters } from '../redux/charactersReducer';
import { Link } from "react-router-dom";
import FilterInput from '../filters/FilterInput';
import FilterSelect from '../filters/FilterSelect';
import LoadMore from '../LoadMore';
import logoBig from '../images/logo-big.png';

const Characters = () => {
  const dispatch = useDispatch();
  const { characters, loading, error } = useSelector((state) => state.characters);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const charactersPerPage = 8;

  useEffect(() => {
    const applyFilters = () => {
      const filtered = characters.filter((character) => {
        const matchesName = nameFilter === '' || character.name.toLowerCase().includes(nameFilter);
        const matchesSpecies = speciesFilter === '' || character.species === speciesFilter;
        const matchesStatus = statusFilter === '' || character.status === statusFilter;
        const matchesGender = genderFilter === '' || character.gender === genderFilter;
        return matchesSpecies && matchesStatus && matchesGender && matchesName;
      });
      setFilteredCharacters(filtered);
    };

    applyFilters();
  }, [characters, speciesFilter, statusFilter, genderFilter, nameFilter]);



  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]);


  const showCharacters = () => {
    setCurrentPage(currentPage + 1);
  };

  // Вычисляем индексы для текущей страницы
  const indexOfLastCharacter = currentPage * charactersPerPage;
  let currentCharacters = filteredCharacters.slice(0, indexOfLastCharacter);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <body>
      <header className='header'>
        <img src= {logoBig} alt="logo" className="header__logo"/>
      </header>
      <main>
        <div className='filters'>
        <FilterInput className = "filters__name-character" onChange={setNameFilter} />
        <FilterSelect
        options={[
          { value: '', label: 'Gender' },
          { value: 'Male', label: 'Male' },
          { value: 'Female', label: 'Female' }
        ]}
        onSelect={setGenderFilter}
        filterProperty="gender" 
        />

      <FilterSelect
        options={[
          { value: '', label: 'Species' },
          { value: 'Human', label: 'Human' },
          { value: 'Alien', label: 'Alien' }
        ]}
        onSelect={setSpeciesFilter}
        filterProperty="species"
      />

      <FilterSelect
        options={[
          { value: '', label: 'Status' },
          { value: 'Alive', label: 'Alive' },
          { value: 'Dead', label: 'Dead' }
        ]}
        onSelect={setStatusFilter}
        filterProperty="status"
      />
      </div>

        <div className='characters'>
          {currentCharacters.map((character) => (
            <div className='characters__container' key={character.id}>
            <Link to={`/characters/${character.id}`}>
              <img className="characters__image" src={character.image} alt={character.name} />
              <h6 className="characters__name">{character.name}</h6>
              <p className='characters__species regular'>{character.species}</p>
            </Link>
            </div>
          ))}
        </div>
        <LoadMore 
          onClick={showCharacters} 
          isVisible={indexOfLastCharacter < filteredCharacters.length} 
        />
      </main>
    </body>
  );
};

export default Characters;
