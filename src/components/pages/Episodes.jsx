﻿import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEpisodes } from '../redux/episodesReducer';
import FilterInput from '../filters/FilterInput';
import logoBig from '../images/rick-and-morty-2.png';
import EpisodeCard from '../cards/EpisodeCard';

const Episodes = () => {
  const dispatch = useDispatch();
  const { episodes, loading, error } = useSelector((state) => state.episodes);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredEpisodes, setFilteredEpisodes] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const episodesPerPage = 12;

  useEffect(() => {
    dispatch(fetchEpisodes());
  }, [dispatch]);

  useEffect(() => {
    setFilteredEpisodes(episodes);
  }, [episodes]);

  useEffect(() => {
    setFilteredEpisodes(
      episodes.filter((episode) =>
        episode.name.toLowerCase().includes(nameFilter.toLowerCase()) ||
        episode.episode.toLowerCase().includes(nameFilter.toLowerCase())
      )
    );
  }, [episodes, nameFilter]);  

  const showEpisodes = () => {
    setCurrentPage(currentPage + 1);
  };

  // Вычисляем индексы для текущей страницы
  const indexOfLastEpisode = currentPage * episodesPerPage;
  const currentEpisodes = filteredEpisodes.slice(0, indexOfLastEpisode);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <header className='header'>
        <img src= {logoBig} alt="logo" className="header__logo"/>
      </header>
      <main className='main'>
        <div className='filters'>
        <FilterInput 
          className = "filters__name-episode" 
          onChange={setNameFilter} 
          placeholder = 'Filter by name or episode (ex. S01 or S01E02)'
        />

        </div>
        <div className='episodes'>
          {currentEpisodes.map((episode) => (
            <EpisodeCard key={episode.id} episode={episode} />
        ))}
      </div>
        {indexOfLastEpisode < filteredEpisodes.length && (
          <button onClick={showEpisodes}>Load More</button>
        )}
      </main>
    </>
  );
};

export default Episodes;