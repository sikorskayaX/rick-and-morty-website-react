import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters } from './charactersReducer';
import { Link } from "react-router-dom";

const EpisodeElement = () => {
  const dispatch = useDispatch();
  const { episodeId } = useParams();
  const episode = useSelector((state) =>
    state.episodes.episodes.find((c) => c.id.toString() === episodeId)
  );
  const characters = useSelector((state) => state.characters.characters);

  useEffect(() => {
    if (episode && episode.characters) {
      dispatch(fetchCharacters(episode.characters));
    }
  }, [dispatch]);

  if (!episode) {
    return <div>Episode not found</div>;
  }

  return (
    <div>
      <div className="episode__about">
        <p className="big">{episode.name}</p>
        <div className="episode__properties">
                <div className="episode__number">
                    <h4>Episode</h4>
                    <p className="small">{episode.episode}</p>
                </div>
                <div className="episode__date">
                    <h4>{episode.air_date}</h4>
                    <p className="small">{episode.air_date}</p>
                </div>
        </div>
      </div>
      <div>
        {characters.map((character) => (
          <div className="character__episodes-container" key={character.id}>
            <Link to={`/characters/${character.id}`}>
            <div>
              <h2 className='character__info-title'>{character.name} </h2>
              <p className='small'>{character.name}</p>
              <p className='little'>{character.name}</p>
            </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
    
  );
};

export default EpisodeElement;