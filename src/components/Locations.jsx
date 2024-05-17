import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocations } from './locationsReducer';
import FilterInput from './filters/FilterInput';
import { Link } from "react-router-dom";

const Locations = () => {
  const dispatch = useDispatch();
  const { locations, loading, error } = useSelector((state) => state.locations);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const locationsPerPage = 12;

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  useEffect(() => {
    setFilteredLocations(locations);
  }, [locations]);

  const showLocations = () => {
    setCurrentPage(currentPage + 1);
  };

  // Вычисляем индексы для текущей страницы
  const indexOfLastLocation = currentPage * locationsPerPage;
  const currentLocations = filteredLocations.slice(0, indexOfLastLocation);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main>
        <div className='filters'>
        <FilterInput
          className="filters__name-location"
          items={locations}
          onChange={setFilteredLocations}
        />
      </div>
      <div className='locations'>
        {currentLocations.map((location) => (
          <Link to={`/locations/${location.id}`}>
            <div className='locations__container'  key={location.id}>
              <div>
                <h6 className="locations__name">{location.name}</h6>
                <p className="regular">{location.type}</p>
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