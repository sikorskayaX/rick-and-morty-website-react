﻿import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEpisodes } from './episodesReducer';
import { Link } from "react-router-dom";

const Episodes = () => {
  const dispatch = useDispatch();
  const { episodes, loading, error } = useSelector((state) => state.episodes);
  const [currentPage, setCurrentPage] = useState(1);
  const episodesPerPage = 12;

  useEffect(() => {
    dispatch(fetchEpisodes());
  }, [dispatch]);

  const showEpisodes = () => {
    setCurrentPage(currentPage + 1);
  };

  // Вычисляем индексы для текущей страницы
  const indexOfLastEpisode = currentPage * episodesPerPage;
  const currentEpisodes = episodes.slice(0, indexOfLastEpisode);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main>
      <div className='episodes'>
        {currentEpisodes.map((episode) => (
          <Link to={`/episodes/${episode.id}`}>
          <div className='episodes__container'  key={episode.id}>
              <div>
                <h6>{episode.name}</h6>
                <p className="regular">{episode.air_date}</p>
                <p className="bold">{episode.episode}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {indexOfLastEpisode < episodes.length && (
        <button onClick={showEpisodes}>Load More</button>
      )}
    </main>
  );
};

export default Episodes;