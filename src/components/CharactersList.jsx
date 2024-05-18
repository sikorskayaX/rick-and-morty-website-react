import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters } from './redux/charactersReducer';
import { Link } from "react-router-dom";

const CharactersList = ({ characterURLs = [] }) => {
  const dispatch = useDispatch();
  const { characters, loading, error } = useSelector((state) => state.characters);

  useEffect(() => {
    if(characterURLs.length > 0){
        dispatch(fetchCharacters(characterURLs));
    }
    else{
        dispatch(fetchCharacters());
    }
  }, [dispatch]);



  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='characters'>
      {characters.map((character) => (
        <div className='characters__container' key={character.id}>
          <Link to={`/characters/${character.id}`}>
            <img className="characters__image" src={character.image} alt={character.name} />
            <h6 className="characters__name">{character.name}</h6>
            <p className='characters__species regular'>{character.species}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};


export default CharactersList;

