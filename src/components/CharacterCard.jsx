import React from 'react';
import { Link } from "react-router-dom";

//  skip re-rendering
const CharacterCard = React.memo(({ character }) => {
  return (
    <div className='characters__container'>
      <Link to={`/characters/${character.id}`}>
        <img className="characters__image" src={character.image} alt={character.name} />
        <h6 className="characters__name">{character.name}</h6>
        <p className='characters__species regular'>{character.species}</p>
      </Link>
    </div>
  );
});

export default CharacterCard;