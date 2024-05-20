import { useState, useEffect } from 'react';

const useFilteredEntities = (entities, filters) => {
const [filteredEntities, setFilteredEntities] = useState(entities);

// try to create custom hook...
useEffect(() => {
  const applyFilters = () => {
  let filtered = entities;
  filters.forEach((filter) => {
  if (filter.value) {
    filtered = filtered.filter((entity) => filter.predicate(entity, filter.value));
  }
  });
  setFilteredEntities(filtered);
  };


  applyFilters();

}, [entities, filters]);


  return filteredEntities;
};


export default useFilteredEntities;