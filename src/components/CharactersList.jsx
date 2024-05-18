import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters } from './redux/charactersReducer';
import { Link } from "react-router-dom";

const CharactersList = ({ characterURLs = [] }) => {
  const dispatch = useDispatch();
  const { characters, loading, error } = useSelector((state) => state.characters);
  const [currentPage, setCurrentPage] = useState(1);
  const charactersPerPage = 8;

  useEffect(() => {
    if(characterURLs.length > 0){
        dispatch(fetchCharacters(characterURLs));
    }
    else{
        dispatch(fetchCharacters());
    }
  }, [dispatch]);


  const showCharacters = () => {
    setCurrentPage(currentPage + 1);
  };

  const indexOfLastCharacter = currentPage * charactersPerPage;
  const currentCharacters = characters.slice(0, indexOfLastCharacter);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
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
      {indexOfLastCharacter < characters.length && (
        <button onClick={showCharacters}>Load More</button>
      )}
    </div>
  );
};


export default CharactersList;

