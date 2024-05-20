import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocations, resetLocations } from '../redux/locationsReducer';
import FilterInput from '../filters/FilterInput';
import FilterSelect from '../filters/FilterSelect';
import { PLANET_OPTIONS, DIMENSION_OPTIONS} from '../filters/filterOptions';
import { Link } from "react-router-dom";
import logoBig from '../images/rick-and-morty-1.png';
import useFilteredEntities from '../useFilteredEntities'

const Locations = () => {
  const dispatch = useDispatch();
  const { locations, loading, error } = useSelector((state) => state.locations);
  const [currentPage, setCurrentPage] = useState(1);
  const [nameFilter, setNameFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [dimensionFilter, setDimensionFilter] = useState('');
  const locationsPerPage = 12;

  useEffect(() => {
    dispatch(resetLocations());
    dispatch(fetchLocations());
  }, [dispatch]);


  const filteredLocations = useFilteredEntities(locations, [
    { value: nameFilter, predicate: (location, value) => location.name.toLowerCase().includes(value.toLowerCase()) },
    { value: typeFilter, predicate: (location, value) => location.type === value },
    { value: dimensionFilter, predicate: (location, value) => location.dimension === value },
  ]);

  const showLocations = () => {
    setCurrentPage(currentPage + 1);
  };

  // Вычисляем индексы для текущей страницы
  const indexOfLastLocation = currentPage * locationsPerPage;
  const currentLocations = filteredLocations.slice(0, indexOfLastLocation);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <header className='header'>
        <img src= {logoBig} alt="logo" className="header__logo"/>
      </header>
      <main className='main'>
          <div className='filters'>
          <FilterInput className="filters__name-location" onChange={setNameFilter}/>
      <FilterSelect
        options={PLANET_OPTIONS}
        onSelect={setTypeFilter}
        filterProperty="type" // This is the property of the location to filter on
      />
      <FilterSelect
        options={DIMENSION_OPTIONS}
        onSelect={setDimensionFilter}
        filterProperty="dimension" // This is the property of the location to filter on
      />          
        </div>
        <div className='locations'>
          {currentLocations.map((location) => (
              <div className='locations__container'  key={location.id}>
                  <Link to={`/locations/${location.id}`}>
                  <h6 className="locations__name">{location.name}</h6>
                  <p className="regular">{location.type}</p>
                  </Link>
              </div>
          ))}
        </div>
        {indexOfLastLocation < filteredLocations.length && (
          <button onClick={showLocations}>Load More</button>
        )}
      </main>
    </>
  );
};

export default Locations;