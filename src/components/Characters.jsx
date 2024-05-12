import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCharacters } from './charactersReducer';

const Characters = () => {
  const dispatch = useDispatch();
  const { characters, loading, error } = useSelector((state) => state.characters);
  const [currentPage, setCurrentPage] = useState(1);
  const charactersPerPage = 8;

  useEffect(() => {
    dispatch(fetchAllCharacters());
  }, [dispatch]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  // Вычисляем индексы для текущей страницы
  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = characters.slice(indexOfFirstCharacter, indexOfLastCharacter);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div>
        {currentCharacters.map((character) => (
          <div key={character.id}>
            <img src={character.image} alt={character.name} />
            <h3>{character.name}</h3>
          </div>
        ))}
      </div>
      {indexOfLastCharacter < characters.length && (
        <button onClick={handleNextPage}>Load More</button>
      )}
    </div>
  );
};

export default Characters;
