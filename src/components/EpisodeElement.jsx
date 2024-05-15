import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const EpisodeElement = () => {
  const { episodeId } = useParams();
  const episode = useSelector((state) =>
    state.episodes.episodes.find((c) => c.id.toString() === episodeId)
  );

  if (!episode) {
    return <div>Episode not found</div>;
  }

  return (
    <div>
      <h1>{episode.name}</h1>
    </div>
    
  );
};

export default EpisodeElement;