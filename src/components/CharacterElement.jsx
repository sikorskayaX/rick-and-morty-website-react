import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEpisodes } from './episodesReducer';

const CharacterElement = () => {
  const { characterId } = useParams();
  const dispatch = useDispatch();
  const character = useSelector((state) =>
    state.characters.characters.find((c) => c.id.toString() === characterId)
  );

  const episodes = useSelector((state) => state.episodes.episodes);

  useEffect(() => {
    if (character && character.episode) {
      dispatch(fetchEpisodes(character.episode));
    }
  }, [dispatch]);

  if (!character) {
    return <div>Character not found</div>;
  }

  return (
    <div>
      <h1>{character.name}</h1>
      <img src={character.image} alt={character.name} />

      {episodes.map((episode) => (
        <div className="characters__container" key={episode.id}>
          <h1>{episode.name}</h1>
          <p>{episode.air_date}</p>
        </div>
      ))}
    </div>
  );
};

export default CharacterElement;