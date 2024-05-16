import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEpisodes } from './episodesReducer';
import { fetchLocations } from './locationsReducer';
import { Link } from "react-router-dom";

const CharacterElement = () => {
  const { characterId } = useParams();
  const dispatch = useDispatch();
  const character = useSelector((state) =>
    state.characters.characters.find((c) => c.id.toString() === characterId)
  );

  const episodes = useSelector((state) => state.episodes.episodes);
  const locations = useSelector((state) => state.locations.locations);

  useEffect(() => {
    if (character && character.episode) {
      dispatch(fetchEpisodes(character.episode));
    }
  }, [dispatch]);

  useEffect(() => {
    if (character && character.origin && character.location) {
      dispatch(fetchLocations(character.origin.url));
      dispatch(fetchLocations(character.location.url));
    }
  }, [dispatch]);

  if (!character) {
    return <div>Character not found</div>;
  }

  return (
    <div>
      <h1>{character.name}</h1>
      <img src={character.image} alt={character.name} />
      <div className='character__informations'>
        <p className='character__info-title'>Gender</p>
        <p className='small'>{character.gender}</p>
        <p className='character__info-title'>Status</p>
        <p className='small'>{character.status}</p>
        <p className='character__info-title'>Species</p>
        <p className='small'>{character.species}</p>
        <p className='character__info-title'>Type</p>
        <p className='small'>{character.type}</p>
        <p className='character__info-title'>Origin</p>
        <p className='small'>{locations[0]?.name}</p>
        <p className='character__info-title'>Planet</p>
        <p className='small'>{locations[1]?.name}</p>
      </div>
      <div>
        {episodes.map((episode) => (
          <div className="character__episodes-container" key={episode.id}>
            <Link to={`/episodes/${episode.id}`}>
            <div>
              <h2 className='character__info-title'>{episode.episode} </h2>
              <p className='small'>{episode.name}</p>
              <p className='little'>{episode.air_date}</p>
            </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterElement;