import React, { useState } from 'react';

const FilterInput = ({ className, items, onChange, filterProperty = 'name' }) => {
  const [filter, setFilter] = useState('');

  const handleFilterChange = (event) => {
    const value = event.target.value.toLowerCase();
    setFilter(value);
    const filteredItems = items.filter((item) =>
      item[filterProperty].toLowerCase().includes(value)
    );
    onChange(filteredItems);
  };

  return (
    <input
      className={className}
      type="text"
      placeholder={`Filter by ${filterProperty}...`}
      value={filter}
      onChange={handleFilterChange}
    />
  );
};

export default FilterInput;
