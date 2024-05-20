import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters } from './redux/charactersReducer';
import CharacterCard from './CharacterCard';

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
      <CharacterCard key={character.id} character={character} />
    ))}
    </div>
  );
};


export default CharactersList;

