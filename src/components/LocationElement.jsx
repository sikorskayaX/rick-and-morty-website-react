import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const LocationElement = () => {
  const { locationId } = useParams();
  const location = useSelector((state) =>
    state.locations.locations.find((c) => c.id.toString() === locationId)
  );

  if (!location) {
    return <div>Location not found</div>;
  }

  return (
    <div>
      <h1>{location.name}</h1>
    </div>
    
  );
};

export default LocationElement;