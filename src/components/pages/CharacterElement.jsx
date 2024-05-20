import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEpisodes } from '../redux/episodesReducer';
import { fetchLocations } from '../redux/locationsReducer';
import { Link } from "react-router-dom";
import GoBack from '../GoBack';
import CharacterInformation from '../CharacterInformation';

const CharacterElement = () => {
  const { characterId } = useParams();
  const dispatch = useDispatch();
  const character = useSelector((state) =>
    state.characters.characters.find((c) => c.id.toString() === characterId)
  );

  const episodes = useSelector((state) => state.episodes.episodes);
  const locations = useSelector((state) => state.locations.locations);

  
  useEffect(() => {
    if (character?.episode) {
      dispatch(fetchEpisodes(character.episode));
    }
  }, [dispatch, character?.episode]);

  useEffect(() => {
    if (character?.location.url || character?.origin.url) {
      dispatch(fetchLocations([character.location.url, character.origin.url]));
    }
  }, [dispatch, character?.location.url, character?.origin.url]);


  if (!character) {
    return <div>Character not found</div>;
  }
  

  return (
    <>
      <main className='main'>
        <GoBack/>
        <div className='character__head'>
          <img className='character__image' src={character.image} alt={character.name} />
          <h1>{character.name}</h1>
        </div>
        <div className='character__properties'>

          <div className='character__informations'>
            <h2 className='character__informations-title'>Informations</h2>
            <CharacterInformation title = 'Gender' info = {character.gender}/>
            <CharacterInformation title = 'Status' info = {character.status}/>
            <CharacterInformation title = 'Species' info = {character.species}/>
            <CharacterInformation title = 'Type' info = {character.type}/>
            <Link to={locations[0] ? `/locations/${locations[0].id}` : '#'}>
              <CharacterInformation title = 'Planet' info = {locations[0]?.name}className='character__information-clickable'/>
            </Link>
            <Link to={locations[1] ? `/locations/${locations[1].id}` : '#'}>
              <CharacterInformation title = 'Origin' info = {locations[1]?.name}className={'character__information-clickable'}/>
            </Link>
          </div>
          <div className='character__episodes'>
            <h2 className='character__informations-title'>Episodes</h2>
            <div className="character__episodes-container" >
            {episodes.map((episode) => (
                <div className='character__episode'key={episode.id}>
                  <Link to={`/episodes/${episode.id}`}>
                  <h2 className='character__info-title'>{episode.episode} </h2>
                  <p className='small'>{episode.name}</p>
                  <p className='little'>{episode.air_date}</p>
                  </Link>
                </div>
            ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default CharacterElement;