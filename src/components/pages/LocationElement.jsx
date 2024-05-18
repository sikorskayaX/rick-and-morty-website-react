import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import GoBack from '../GoBack';
import CharactersList from '../CharactersList';

const LocationElement = () => {
  const { locationId } = useParams();
  const location = useSelector((state) =>
    state.locations.locations.find((c) => 
      c.id.toString() === locationId)
  );

  if (!location) {
    return <div>Location not found</div>;
  }


  return (
    <>
      <main className='main'>
        <div className='character__head'>
          <GoBack/>
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
        </div>
        <h6  className ="main__title">Residents</h6>
        <CharactersList characterURLs = {location.residents}/>
      </main>
    </>
  );
};

export default LocationElement;