import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocations, resetLocations } from '../redux/locationsReducer';
import FilterInput from '../filters/FilterInput';
import FilterSelect from '../filters/FilterSelect';
import { PLANET_OPTIONS, DIMENSION_OPTIONS} from '../filters/filterOptions';
import logoBig from '../images/rick-and-morty-1.png';
import LocationCard from '../cards/LocationCard';

const Locations = () => {
  const dispatch = useDispatch();
  const { locations, loading, error } = useSelector((state) => state.locations);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [dimensionFilter, setDimensionFilter] = useState('');
  const locationsPerPage = 12;

  useEffect(() => {
    dispatch(resetLocations());
    dispatch(fetchLocations());
  }, [dispatch]);


  useEffect(() => {
    const applyFilters = () => {
      const filtered = locations.filter((location) => {
        const matchesName = nameFilter === '' || location.name.toLowerCase().includes(nameFilter);
        const matchesType = typeFilter === '' || location.type === typeFilter;
        const matchesDimension = dimensionFilter === '' || location.dimension === dimensionFilter;
        return matchesType && matchesDimension && matchesName;
      });
      setFilteredLocations(filtered);
    };

    applyFilters();
  }, [locations, typeFilter, dimensionFilter, nameFilter]);

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
            <LocationCard key={location.id} location={location} />
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