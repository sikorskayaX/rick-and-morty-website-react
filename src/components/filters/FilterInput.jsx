import React, { useState } from 'react';

const FilterInput = ({ className, characters, onFilter }) => {
  const [filter, setFilter] = useState('');

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilter(value);
    const filteredCharacters = characters.filter((character) =>
      character.name.toLowerCase().includes(value.toLowerCase())
    );
    onFilter(filteredCharacters);
  };

  return (
      <input
        className= {className}
        type="text"
        placeholder="Filter characters..."
        value={filter}
        onChange={handleFilterChange}
      />
  );
};

export default FilterInput;
