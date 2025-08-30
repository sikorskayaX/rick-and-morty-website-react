import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import GoBack from "./GoBack";
import CharactersList from "./CharactersList";

const EpisodeElement = () => {
  const { episodeId } = useParams();
  const episode = useSelector((state) =>
    state.episodes.episodes.find((c) => c.id.toString() === episodeId)
  );

  console.log(episode.characters);
  if (!episode) {
    return <div>Episode not found</div>;
  }

  return (
    <body>
      <header></header>
      <main>
        <div className="character__head">
          <GoBack />
          <div className="episode__about">
            <p className="big">{episode.name}</p>
            <div className="episode__properties">
              <div className="episode__number">
                <h4>Episode</h4>
                <p className="small">{episode.episode}</p>
              </div>
              <div className="episode__date">
                <h4>{episode.air_date}</h4>
                <p className="small">{episode.air_date}</p>
              </div>
            </div>
          </div>
        </div>
        <CharactersList characterURLs={episode.characters} />
      </main>
    </body>
  );
};

export default EpisodeElement;
