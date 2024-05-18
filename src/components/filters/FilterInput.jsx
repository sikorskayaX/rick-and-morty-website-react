import React, { useState } from 'react';

const FilterInput = ({ className, onChange, placeholder = 'Filter by name...', filterProperty = 'name' }) => {
  const [value, setValue] = useState(''); // Add state to manage the input value

  const handleFilterChange = (event) => {
    const value = event.target.value.toLowerCase();
    setValue(value); 
    onChange(value); 
  };

  return (
    <input
      className={className}
      type="text"
      placeholder={placeholder}
      value={value} // Use the state value here
      onChange={handleFilterChange}
    />
  );
};

export default FilterInput;