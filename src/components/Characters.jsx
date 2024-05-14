import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllEntities } from './entitiesReducer';
import { Link } from "react-router-dom";

const Characters = () => {
  const dispatch = useDispatch();
  const { entities, loading, error } = useSelector((state) => state.entities);
  const [currentPage, setCurrentPage] = useState(1);
  const charactersPerPage = 8;

  useEffect(() => {
    dispatch(fetchAllEntities());
  }, [dispatch]);

  const showCharacters = () => {
    setCurrentPage(currentPage + 1);
  };

  // Вычисляем индексы для текущей страницы
  const indexOfLastCharacter = currentPage * charactersPerPage;
  const currentCharacters = entities.slice(0, indexOfLastCharacter);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main>
      <div className='characters'>
        {currentCharacters.map((character) => (
          <div className='characters__container' key={character.id}>
            <Link to={`characters/${character.id}`}>
            <div >
              <img className ="characters__image" src={character.image} alt={character.name} />
              <h6 className="characters__name">{character.name}</h6>
            </div>
            </Link>
          </div>
        ))}
      </div>
      {indexOfLastCharacter < entities.length && (
        <button onClick={showCharacters}>Load More</button>
      )}
    </main>
  );
};

export default Characters;
