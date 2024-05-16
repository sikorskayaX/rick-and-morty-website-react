import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocations } from './locationsReducer';
import { Link } from "react-router-dom";

const Locations = () => {
  const dispatch = useDispatch();
  const { locations, loading, error } = useSelector((state) => state.locations);
  const [currentPage, setCurrentPage] = useState(1);
  const locationsPerPage = 12;

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  const showLocations = () => {
    setCurrentPage(currentPage + 1);
  };

  // Вычисляем индексы для текущей страницы
  const indexOfLastLocation = currentPage * locationsPerPage;
  const currentLocations = locations.slice(0, indexOfLastLocation);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main>
      <div className='locations'>
        {currentLocations.map((location) => (
          <Link to={`/locations/${location.id}`}>
            <div className='locations__container'  key={location.id}>
              <div>
                <h6 className="locations__name">{location.name}</h6>
                <h6 className="locations__name">{location.type}</h6>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {indexOfLastLocation < locations.length && (
        <button onClick={showLocations}>Load More</button>
      )}
    </main>
  );
};

export default Locations;