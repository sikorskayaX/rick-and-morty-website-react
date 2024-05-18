import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocations, resetLocations } from '../redux/locationsReducer';
import FilterInput from '../filters/FilterInput';
import FilterSelect from '../filters/FilterSelect';
import { Link } from "react-router-dom";
import logoBig from '../images/rick-and-morty-1.png';

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
    <body>
      <header className='header'>
        <img src= {logoBig} alt="logo" className="header__logo"/>
      </header>
      <main>
          <div className='filters'>
          <FilterInput className="filters__name-location" onChange={setNameFilter}/>
      <FilterSelect
        options={[
          { value: '', label: 'Type' },
          { value: 'Planet', label: 'Planet' },
          { value: 'Space station', label: 'Space station' }
        ]}
        onSelect={setTypeFilter}
        filterProperty="type" // This is the property of the location to filter on
      />
      <FilterSelect
        options={[
          { value: '', label: 'Dimension' },
          { value: 'Post-Apocalyptic Dimension', label: 'Post-Apocalyptic Dimension' },
          { value: 'Cronenberg Dimension', label: 'Cronenberg Dimension' },
          { value: 'Chair Dimension', label: 'Chair Dimension' }
        ]}
        onSelect={setDimensionFilter}
        filterProperty="dimension" // This is the property of the location to filter on
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
        {indexOfLastLocation < filteredLocations.length && (
          <button onClick={showLocations}>Load More</button>
        )}
      </main>
    </body>
  );
};

export default Locations;