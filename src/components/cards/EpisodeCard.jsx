import React from 'react';
import { Link } from "react-router-dom";

const EpisodeCard = ({ episode }) => {
  return (
    <div key={episode.id}>
      <Link className='episodes__container' to={`/episodes/${episode.id}`}>
        <h6>{episode.name}</h6>
        <p className="regular">{episode.air_date}</p>
        <p className="bold">{episode.episode}</p>
      </Link>
    </div>
  );
};

export default React.memo(EpisodeCard);


