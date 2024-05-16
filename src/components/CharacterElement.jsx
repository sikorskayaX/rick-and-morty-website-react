import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEpisodes } from './episodesReducer';
import { fetchLocations } from './locationsReducer';
import { Link } from "react-router-dom";
import GoBack from './GoBack';

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
    if (character) {
      console.log([character.origin.url, character.location.url])
      dispatch(fetchLocations([character.origin.url, character.location.url]));
    }
  }, [dispatch, character]);


  if (!character) {
    return <div>Character not found</div>;
  }

  return (
    <div>
      <GoBack/>
      <div className='character__head'>
        <img className='character__image' src={character.image} alt={character.name} />
        <h1>{character.name}</h1>
      </div>
      <div className='character__properties'>
        <div className='character__informations'>
          <h2 className='character__informations-title'>Informations</h2>
          <div className='character__information'>
            <p className='character__info-title'>Gender</p>
            <p className='small'>{character.gender}</p>
          </div>
          <div className='character__information'>
            <p className='character__info-title'>Status</p>
            <p className='small'>{character.status}</p>
          </div>
          <div className='character__information'>
            <p className='character__info-title'>Species</p>
            <p className='small'>{character.species}</p>
          </div>
          <div className='character__information'>
            <p className='character__info-title'>Type</p>
            <p className='small'>{character.type}</p>
          </div>
          <Link to={`/locations/${locations[0]?.id}`}>
          <div className='character__information-clickable'>
            <p className='character__info-title'>Origin</p>
            <p className='small'>{locations[0]?.name || 'unknown'}</p>
          </div>
          </Link>
          <Link to={`/locations/${locations[1]?.id}`}>
          <div className='character__information-clickable'>
            <p className='character__info-title'>Planet</p>
            <p className='small'>{locations[1]?.name || 'unknown'}</p>
          </div>
          </Link>
        </div>
        <div className='character__episodes'>
          <h2 className='character__informations-title'>Episodes</h2>
          <div className="character__episodes-container" >
          {episodes.map((episode) => (
              <Link to={`/episodes/${episode.id}`}>
              <div className='character__episode'key={episode.id}>
                <h2 className='character__info-title'>{episode.episode} </h2>
                <p className='small'>{episode.name}</p>
                <p className='little'>{episode.air_date}</p>
              </div>
              </Link>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterElement;