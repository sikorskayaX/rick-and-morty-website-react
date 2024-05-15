import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CharacterElement = () => {
  const { characterId } = useParams();
  const character = useSelector((state) =>
    state.characters.characters.find((c) => c.id.toString() === characterId)
  );

  if (!character) {
    return <div>Character not found</div>;
  }

  return (
    <div>
      <h1>{character.name}</h1>
      <img src={character.image} alt={character.name} />
      <div>{character.episode}</div>
    </div>
    
  );
};

export default CharacterElement;

