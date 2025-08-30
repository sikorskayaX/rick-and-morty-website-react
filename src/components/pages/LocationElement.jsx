
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import GoBack from '../GoBack';
import CharactersList from '../CharactersList';

const LocationElement = () => {
  const { locationId } = useParams();
  console.log('id', locationId)
  const location = useSelector((state) =>
    state.locations.locations.find((c) => 
      c.id.toString() === locationId)
  );

  if (!location) {
    return <div>Location not found</div>;
  }


  return (
    <body>
      <main>
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
        <CharactersList characterURLs = {location.residents}/>
      </main>
    </body>
  );
};

export default LocationElement;