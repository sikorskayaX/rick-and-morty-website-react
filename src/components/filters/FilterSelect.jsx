import React, { useState, useEffect } from 'react';

const FilterSelect = ({ options, characters, onSelect, filterProperty }) => {
  const [filter, setFilter] = useState('');

  useEffect(() => {
    handleFilterChange({ target: { value: filter } });
  }, [characters, filterProperty, onSelect]);

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilter(value);

    const filteredCharacters = characters.filter((character) =>
      value === '' ? true : character[filterProperty] === value
    );
    onSelect(filteredCharacters);
  };

  return (
    <select onChange={handleFilterChange} value={filter} className='filters__select'>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default FilterSelect;
