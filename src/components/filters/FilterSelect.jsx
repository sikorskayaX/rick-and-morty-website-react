import { useState, useEffect } from "react";

const FilterSelect = ({ options, characters, onSelect, filterProperty }) => {
  const [filter, setFilter] = useState("");

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilter(value);
  };

  useEffect(() => {
    const filteredCharacters = characters.filter((character) =>
      filter === "" ? true : character[filterProperty] === filter
    );
    onSelect(filteredCharacters);
  }, [characters, filter, filterProperty, onSelect]);

  return (
    <select
      onChange={handleFilterChange}
      value={filter}
      className="filters__select"
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default FilterSelect;
