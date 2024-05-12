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

  const showCharacters = () => {
    setCurrentPage(currentPage + 1);
  };

  // Вычисляем индексы для текущей страницы
  const indexOfLastCharacter = currentPage * charactersPerPage;
  const currentCharacters = characters.slice(0, indexOfLastCharacter);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main>
      <div className='characters'>
        {currentCharacters.map((character) => (
          <div className='characters__container'>
            <div key={character.id}>
              <img className ="characters__image" src={character.image} alt={character.name} />
              <h6 className="characters__name">{character.name}</h6>
            </div>
          </div>
        ))}
      </div>
      {indexOfLastCharacter < characters.length && (
        <button onClick={showCharacters}>Load More</button>
      )}
    </main>
  );
};

export default Characters;
