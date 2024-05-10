import React, { useState } from 'react';

export const FilterInput = ({ characters, setDisplayedCharacters }) => {
  const [name, setName] = useState('');

  const handleFilterChange = (e) => {
    const value = e.target.value.toLowerCase();
    setName(value);
    const filteredCharacters = characters.filter(character =>
      character.name.toLowerCase().includes(value)
    );
    setDisplayedCharacters(filteredCharacters.slice(0, 8));
  };

  return (
    <input
      type="text"
      name="name"
      placeholder="Filter by name"
      value={name}
      onChange={handleFilterChange}
    />
  );
};
