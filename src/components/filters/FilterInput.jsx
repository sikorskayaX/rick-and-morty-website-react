import React, { useState } from 'react';

const FilterInput = ({ characters, onFilter }) => {
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
    <div className="filter-input">
      <input
        type="text"
        placeholder="Filter characters..."
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  );
};

export default FilterInput;
