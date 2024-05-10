// FilterSelect.js
import React, { useState } from 'react';

export const FilterSelect = ({ name, characters, setDisplayedCharacters }) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setSelectedValue(value);
    const filteredCharacters = characters.filter(character =>
      value === '' || character[name] === value
    );
    setDisplayedCharacters(filteredCharacters.slice(0, 8));
  };

  const options = {
    species: ['Human', 'Alien'],
    gender: ['Male', 'Female', 'Genderless', 'unknown'],
    status: ['Alive', 'Dead', 'unknown'],
  };

  return (
    <select name={name} value={selectedValue} onChange={handleFilterChange}>
      <option value="">All</option>
      {options[name].map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  );
};