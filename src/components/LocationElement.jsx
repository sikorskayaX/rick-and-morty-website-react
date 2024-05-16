import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCharacters } from './charactersReducer';
import { Link } from "react-router-dom";

const LocationElement = () => {
  const dispatch = useDispatch();
  const { locationId } = useParams();
  const location = useSelector((state) =>
    state.locations.locations.find((c) => c.id.toString() === locationId)
  );
  const characters = useSelector((state) => state.characters.characters);

  useEffect(() => {
    if (location && location.residents) {
      dispatch(fetchCharacters(location.residents));
    }
  }, [dispatch]);

  if (!location) {
    return <div>Location not found</div>;
  }


  return (
    <div>
      <div className="location__about" id="location__about">
        <p className="big">{location.name}</p>
        <div className="location__properties">
                <div className="location__type">
                    <h4>Type</h4>
                    <p className="small">{location.type}</p>
                </div>
                <div className="location__dimension">
                    <h4>Dimension</h4>
                    <p className="small">{location.dimension}</p>
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

export default LocationElement;