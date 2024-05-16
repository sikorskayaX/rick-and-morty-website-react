import React, { useState } from 'react';

const FilterSelect = ({ options, characters, onSelect, filterProperty }) => {
  const [filter, setFilter] = useState('');

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
      <option value="" disabled>
        Select an option
      </option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default FilterSelect;
