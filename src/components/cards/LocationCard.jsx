import React from 'react';
import { Link } from "react-router-dom";

const LocationCard = ({ location }) => {
  return (
    <div >
      <Link className='locations__container' key={location.id} to={`/locations/${location.id}`}>
        <h6 className="locations__name">{location.name}</h6>
        <p className="regular">{location.type}</p>
      </Link>
    </div>
  );
};

export default React.memo(LocationCard);
