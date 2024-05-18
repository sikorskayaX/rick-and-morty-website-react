import React from 'react';

const FilterSelect = ({ options, onSelect }) => {
  const handleFilterChange = (event) => {
    const value = event.target.value;
    onSelect(value);
  };

  return (
    <select onChange={handleFilterChange} className='filters__select'>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default FilterSelect;

