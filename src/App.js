import './App.css';
import { Route, Routes, Link } from "react-router-dom";
import Characters from './components/Characters';
import Locations from './components/Locations';
import Episodes from './components/Episodes';
import CharacterElement from './components/CharacterElement';
import EpisodeElement from './components/EpisodeElement';
import LocationElement from './components/LocationElement';

function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/characters">Characters</Link>
          </li>
          <li>
            <Link to="/locations">Locations</Link>
          </li>
          <li>
            <Link to="/episodes">Episodes</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/characters" element={<Characters />} />
        <Route path="/characters/:characterId" element={<CharacterElement />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/locations/:locationId" element={<LocationElement />} />
        <Route path="/episodes" element={<Episodes />} />
        <Route path="/episodes/:episodeId" element={<EpisodeElement />} />
      </Routes>
    </>
  );
}

export default App;

